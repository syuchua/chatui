package handlers

import (
	"chatui/backend/internal/config"
	"chatui/backend/internal/services/user"
	"chatui/backend/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// UserHandler 处理与用户相关的请求
type UserHandler struct {
	userService *user.Service
	config      *config.Config
	logger      *logrus.Logger
}

// NewUserHandler 创建一个新的UserHandler实例
func NewUserHandler(userService *user.Service, cfg *config.Config, logger *logrus.Logger) *UserHandler {
	return &UserHandler{userService: userService, config: cfg, logger: logger}
}

// Register 处理用户注册请求
func (h *UserHandler) Register(c *gin.Context) {
	var request struct {
		Username string `json:"username" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=6"`
	}
	if err := c.ShouldBindJSON(&request); err != nil {
		utils.HandleError(c, utils.NewAppError(http.StatusBadRequest, "INVALID_INPUT", err.Error()))
		return
	}

	err := h.userService.RegisterUser(request.Username, request.Email, request.Password)
	if err != nil {
		h.logger.WithError(err).Error("Failed to register user")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "REGISTRATION_FAILED", "Failed to register user"))
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}

// Login 处理用户登录请求
func (h *UserHandler) Login(c *gin.Context) {
	var request struct {
		EmailOrUsername string `json:"emailOrUsername" binding:"required"`
		Password        string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&request); err != nil {
		utils.HandleError(c, utils.NewAppError(http.StatusBadRequest, "INVALID_INPUT", err.Error()))
		return
	}

	user, err := h.userService.AuthenticateUser(request.EmailOrUsername, request.Password)
	if err != nil {
		utils.HandleError(c, utils.NewAppError(http.StatusUnauthorized, "INVALID_CREDENTIALS", "Invalid username or password"))
		return
	}

	// 生成 JWT token
	token, err := utils.GenerateJWT(user.ID, h.config.JWT.Secret)
	if err != nil {
		h.logger.WithError(err).Error("Failed to generate JWT")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "INTERNAL_ERROR", "Failed to generate token"))
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token, "user": user})
}

// GetUserInfo 获取用户信息
func (h *UserHandler) GetUserInfo(c *gin.Context) {
	userID, _ := c.Get("user_id")
	userIDStr := userID.(string)

	user, err := h.userService.GetUserByID(userIDStr)
	if err != nil {
		h.logger.WithError(err).Error("Failed to get user info")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user info"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":       user.ID,
		"username": user.Username,
		"email":    user.Email,
		// 不要返回密码和其他敏感信息
	})
}
