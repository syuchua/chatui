package api

import (
	"chatui/backend/internal/api/handlers"
	"chatui/backend/internal/api/middleware"
	"chatui/backend/internal/config"
	"chatui/backend/internal/db"
	"chatui/backend/internal/services/ai"
	"chatui/backend/internal/services/user"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"golang.org/x/time/rate"
)

// Server 定义了一个服务器结构体
type Server struct {
	router *gin.Engine
	config *config.Config
	db     *db.Database
	logger *logrus.Logger
	ai     *ai.Service
}

// NewServer 创建一个新的服务器实例
func NewServer(cfg *config.Config, database *db.Database, aiService *ai.Service) *Server {
	logger := logrus.New()
	logger.SetFormatter(&logrus.JSONFormatter{})

	server := &Server{
		router: gin.New(), // 使用 gin.New() 而不是 gin.Default()
		config: cfg,
		db:     database,
		logger: logger,
		ai:     aiService,
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

	// 初始化处理器
	userHandler := handlers.NewUserHandler(userService, s.config, s.logger)
	chatHandler := handlers.NewChatHandler(s.db, s.config, s.ai, s.logger)

	api := s.router.Group("/api")
	{
		api.POST("/register", userHandler.Register)
		api.POST("/login", userHandler.Login)

		protected := api.Group("/")
		protected.Use(middleware.JWTAuth(s.config.JWT.Secret))
		{
			protected.POST("/chat", chatHandler.HandleChat)
			protected.POST("/conversations", chatHandler.StartNewConversation)
			protected.GET("/conversations", chatHandler.GetConversations)
			protected.GET("/conversations/:id/messages", chatHandler.GetConversationMessages)
			protected.PUT("/conversations/:id/title", chatHandler.UpdateConversationTitle)
		}
	}
}

// Start 启动服务器
func (s *Server) Start() error {
	return s.router.Run(s.config.Server.Address)
}
