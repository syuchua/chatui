package handlers

import (
	"chatui/backend/internal/config"
	"chatui/backend/internal/db"
	"chatui/backend/internal/models"
	"chatui/backend/internal/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// AuthHandler 处理用户认证相关的请求
type AuthHandler struct {
	db     db.Database
	config *config.Config
}

// NewAuthHandler 创建一个新的 AuthHandler
func NewAuthHandler(database db.Database, cfg *config.Config) *AuthHandler {
	return &AuthHandler{db: database, config: cfg}
}

// Register 处理用户注册请求
func (h *AuthHandler) Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		utils.Log.WithError(err).Error("Failed to bind user data")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 检查用户名是否已存在
	existingUser, err := h.db.GetUserByUsername(user.Username)
	if err == nil && existingUser.ID != "" {
		utils.Log.WithError(err).Error("User already exists")
		c.JSON(http.StatusConflict, gin.H{"error": "用户名已存在"})
		return
	}

	// 哈希密码
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		utils.Log.WithError(err).Error("Failed to hash password")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "密码加密失败"})
		return
	}
	user.Password = string(hashedPassword)

	// 创建用户
	err = h.db.CreateUser(user)
	if err != nil {
		utils.Log.WithError(err).Error("Failed to create user")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "创建用户失败"})
		return
	}

	// 生成 JWT
	token, err := h.generateJWT(user.Username)
	if err != nil {
		utils.Log.WithError(err).Error("Failed to generate JWT")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "生成token失败"})
		return
	}

	utils.Log.Info("用户注册成功")

	// 返回响应
	c.SetCookie("token", token, 3600*24*7, "/", "localhost", true, true)
	c.JSON(http.StatusCreated, gin.H{"user": user})
}

// Login 处理用户登录请求
func (h *AuthHandler) Login(c *gin.Context) {
	var loginInfo struct {
		EmailOrUsername string `json:"emailOrUsername" binding:"required"`
		Password        string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&loginInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": utils.NewAppError(http.StatusBadRequest, "INVALID_INPUT", err.Error())})
		return
	}

	var user models.User
	var err error

	// 尝试通过邮箱查找用户
	user, err = h.db.GetUserByEmail(loginInfo.EmailOrUsername)
	if err != nil {
		// 如果通过邮箱找不到，尝试通过用户名查找
		user, err = h.db.GetUserByUsername(loginInfo.EmailOrUsername)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": utils.NewAppError(http.StatusUnauthorized, "INVALID_CREDENTIALS", "Invalid email/username or password")})
			return
		}
	}

	// 验证密码
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginInfo.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": utils.NewAppError(http.StatusUnauthorized, "INVALID_CREDENTIALS", "Invalid email/username or password")})
		return
	}

	// 生成 JWT token
	token, err := utils.GenerateJWT(user.ID, h.config.JWT.Secret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": utils.NewAppError(http.StatusInternalServerError, "TOKEN_GENERATION_FAILED", "Failed to generate token")})
		return
	}

	c.SetCookie("token", token, 3600*24*7, "/", "localhost", true, true)
	c.JSON(http.StatusOK, gin.H{"user": user})
}

// generateJWT 生成JWT
func (h *AuthHandler) generateJWT(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})

	return token.SignedString([]byte(h.config.JWT.Secret))
}

// VerifyToken 验证token的有效性
func (h *AuthHandler) VerifyToken(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"valid": false})
		return
	}

	userIDStr, ok := userID.(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"valid": false})
		return
	}

	user, err := h.db.GetUserByID(userIDStr)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"valid": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"valid": true,
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
		},
	})
}

// 其他处理程序文件（chat.go, conversation.go, user.go）也类似地实现
