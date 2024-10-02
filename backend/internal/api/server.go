package api

import (
	"chatui/backend/internal/api/handlers"
	"chatui/backend/internal/api/middleware"
	"chatui/backend/internal/config"
	"chatui/backend/internal/db"
	"chatui/backend/internal/services/ai"
	"chatui/backend/internal/services/conversation"
	services "chatui/backend/internal/services/session"
	"chatui/backend/internal/services/user"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"golang.org/x/time/rate"
)

// Server 定义了一个服务器结构体
type Server struct {
	router         *gin.Engine
	config         *config.Config
	db             db.Database
	logger         *logrus.Logger
	ai             ai.AIService
	sessionManager *services.SessionManager
}

// NewServer 创建一个新的服务器实例
func NewServer(cfg *config.Config, database db.Database, aiService ai.AIService) *Server {
	logger := logrus.New()
	logger.SetFormatter(&logrus.JSONFormatter{})

	server := &Server{
		router:         gin.New(), // 使用 gin.New() 而不是 gin.Default()
		config:         cfg,
		db:             database,
		logger:         logger,
		ai:             aiService,
		sessionManager: services.NewSessionManager(10),
	}
	server.setupRoutes()
	return server
}

// setupRoutes 设置路由
func (s *Server) setupRoutes() {
	// 全局中间件
	s.router.Use(middleware.Recovery())
	s.router.Use(middleware.Logger(s.logger))
	s.router.Use(middleware.CORS(s.config))

	// 创建限流器
	limiter := middleware.NewIPRateLimiter(rate.Limit(1), 5) // 每秒1个请求，突发5个
	s.router.Use(middleware.RateLimiter(limiter))

	// 初始化服务
	userService := user.NewService(s.db)
	conversationService := conversation.NewConversationService(s.db, s.logger)

	// 初始化处理器
	authHandler := handlers.NewAuthHandler(s.db, s.config)
	userHandler := handlers.NewUserHandler(userService, s.config, s.logger)
	chatHandler := handlers.NewChatHandler(s.db, s.config, s.ai, s.logger, s.sessionManager)
	conversationHandler := handlers.NewConversationHandler(s.logger, s.config, conversationService, s.db)

	api := s.router.Group("/api")
	{
		api.POST("/register", userHandler.Register)
		api.POST("/login", userHandler.Login)
		api.GET("/verify-token", middleware.JWTAuth(s.config.JWT.Secret), authHandler.VerifyToken)

		protected := api.Group("/")
		protected.Use(middleware.JWTAuth(s.config.JWT.Secret))
		{
			protected.POST("/chat", chatHandler.HandleChat)
			protected.POST("/conversations", middleware.JWTAuth(s.config.JWT.Secret), conversationHandler.StartNewConversation)
			protected.GET("/conversations", conversationHandler.GetConversations)
			protected.GET("/conversations/:id/messages", conversationHandler.GetConversationMessages)
			protected.PUT("/conversations/:id/title", conversationHandler.UpdateConversationTitle)

			// 新增路由
			// protected.GET("/models", s.getModels)
			protected.POST("/user/settings", s.updateSettings)
			protected.GET("/user/settings", s.getUserSettings)
			protected.GET("/user/info", userHandler.GetUserInfo)
		}
	}

	// 服务前端静态文件
	s.router.StaticFS("/", http.Dir("./static"))

	// 对于任何未匹配的路由,返回 index.html
	s.router.NoRoute(func(c *gin.Context) {
		c.File("./static/index.html")
	})
}

// getModels 获取可用的模型列表
// func (s *Server) getModels(c *gin.Context) {
// 	userID, exists := c.Get("user_id")
// 	if !exists {
// 		s.logger.Error("User ID not found in context")
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
// 		return
// 	}

// 	userIDStr := userID.(string)
// 	baseURL, apiKey, model, err := s.db.GetUserSettings(userIDStr)
// 	if err != nil {
// 		s.logger.WithError(err).Error("Failed to get user settings")
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user settings"})
// 		return
// 	}

// 	if baseURL == "" || apiKey == "" {
// 		s.logger.Warn("User settings not configured")
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "API settings not configured"})
// 		return
// 	}

// 	client := &http.Client{}
// 	req, err := http.NewRequest("GET", baseURL+"/models", nil)
// 	if err != nil {
// 		s.logger.WithError(err).Error("Failed to create request")
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
// 		return
// 	}

// 	req.Header.Add("Authorization", "Bearer "+apiKey)

// 	resp, err := client.Do(req)
// 	if err != nil {
// 		s.logger.WithError(err).Error("Failed to send request")
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get models"})
// 		return
// 	}
// 	defer resp.Body.Close()

// 	if resp.StatusCode != http.StatusOK {
// 		s.logger.WithField("status", resp.Status).Error("API request failed")
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get models from API"})
// 		return
// 	}

// 	var result map[string]interface{}
// 	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
// 		s.logger.WithError(err).Error("Failed to decode response")
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode API response"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, result)
// }

// updateSettings 更新用户的base_url和api_key设置
func (s *Server) updateSettings(c *gin.Context) {
	var settings struct {
		BaseURL string `json:"base_url"`
		APIKey  string `json:"api_key"`
		Model   string `json:"model"`
	}
	if err := c.ShouldBindJSON(&settings); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	userID, _ := c.Get("user_id")
	userIDStr := userID.(string)

	err := s.db.UpdateUserSettings(userIDStr, settings.BaseURL, settings.APIKey, settings.Model)
	if err != nil {
		s.logger.WithError(err).Error("Failed to update user settings")
		c.JSON(500, gin.H{"error": "Failed to update settings"})
		return
	}

	s.logger.WithFields(logrus.Fields{
		"user_id":  userIDStr,
		"base_url": settings.BaseURL,
		"model":    settings.Model,
		"api_key":  "******", // 不要记录实际的API密钥
	}).Info("User settings updated")

	c.JSON(200, gin.H{"message": "Settings updated successfully"})
}

// getUserSettings 获取用户设置
func (s *Server) getUserSettings(c *gin.Context) {
	userID, _ := c.Get("user_id")
	userIDStr := userID.(string)

	baseURL, _, model, err := s.db.GetUserSettings(userIDStr)
	if err != nil {
		s.logger.WithError(err).Error("Failed to get user settings")
		c.JSON(500, gin.H{"error": "Failed to get settings"})
		return
	}

	c.JSON(200, gin.H{
		"base_url":    baseURL,
		"model":       model,
		"api_key_set": baseURL != "" && model != "", // 简单的检查，表示是否已设置API密钥
	})
}

// Start 启动服务器
func (s *Server) Start() error {
	return s.router.Run(s.config.Server.Address)
}
