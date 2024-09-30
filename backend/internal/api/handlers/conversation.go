package handlers

import (
	"chatui/backend/internal/config"
	"chatui/backend/internal/db"
	"chatui/backend/internal/services/conversation"
	"chatui/backend/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// ConversationHandler 处理与对话相关的请求
type ConversationHandler struct {
	logger              *logrus.Logger
	config              *config.Config
	conversationService conversation.ConversationService
	db                  db.Database
}

// NewConversationHandler 创建一个新的ConversationHandler实例
func NewConversationHandler(logger *logrus.Logger, config *config.Config, conversationService conversation.ConversationService, database db.Database) *ConversationHandler {
	return &ConversationHandler{
		logger:              logger,
		config:              config,
		conversationService: conversationService,
		db:                  database,
	}
}

// GetConversations 获取用户的所有对话
func (h *ConversationHandler) GetConversations(c *gin.Context) {
	userID, _ := c.Get("user_id")
	userIDStr := userID.(string)

	conversations, err := h.db.GetConversations(userIDStr)
	if err != nil {
		h.logger.WithError(err).Error("Failed to get conversations")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to get conversations"))
		return
	}

	c.JSON(http.StatusOK, gin.H{"conversations": conversations})
}

// GetConversationMessages 获取指定对话的消息
func (h *ConversationHandler) GetConversationMessages(c *gin.Context) {
	conversationID := c.Param("id")
	userID, _ := c.Get("user_id")
	userIDStr := userID.(string)

	// 验证用户是否有权限访问此对话
	if !h.db.UserOwnsConversation(userIDStr, conversationID) {
		utils.HandleError(c, utils.NewAppError(http.StatusForbidden, "FORBIDDEN", "You don't have permission to access this conversation"))
		return
	}

	messages, err := h.db.GetConversationMessages(conversationID)
	if err != nil {
		h.logger.WithError(err).Error("Failed to get conversation messages")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to get conversation messages"))
		return
	}

	c.JSON(http.StatusOK, gin.H{"messages": messages})
}

// UpdateConversationTitle 更新对话标题
func (h *ConversationHandler) UpdateConversationTitle(c *gin.Context) {
	conversationID := c.Param("id")
	var request struct {
		Title string `json:"title" binding:"required,min=1,max=100"`
	}
	if err := c.ShouldBindJSON(&request); err != nil {
		utils.HandleError(c, utils.NewAppError(http.StatusBadRequest, "INVALID_INPUT", err.Error()))
		return
	}

	userID, _ := c.Get("user_id")
	userIDStr := userID.(string)

	// 验证用户是否有权限访问此对话
	if !h.db.UserOwnsConversation(userIDStr, conversationID) {
		utils.HandleError(c, utils.NewAppError(http.StatusForbidden, "FORBIDDEN", "You don't have permission to update this conversation"))
		return
	}

	// 更新对话标题
	err := h.db.UpdateConversationTitle(conversationID, request.Title)
	if err != nil {
		h.logger.WithError(err).Error("Failed to update conversation title")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to update conversation title"))
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Conversation title updated successfully"})
}

// StartNewConversation 创建新对话
func (h *ConversationHandler) StartNewConversation(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		utils.HandleError(c, utils.NewAppError(http.StatusUnauthorized, "UNAUTHORIZED", "User not authenticated"))
		return
	}

	// 确保 userID 是字符串类型
	userIDStr, ok := userID.(string)
	if !ok {
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "INTERNAL_ERROR", "Invalid user ID"))
		return
	}

	conversation, err := h.conversationService.CreateConversation(userIDStr)
	if err != nil {
		h.logger.WithError(err).Error("Failed to create conversation")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "INTERNAL_ERROR", "Failed to create conversation"))
		return
	}

	c.JSON(http.StatusCreated, conversation)
}
