package handlers

import (
	"chatui/backend/internal/config"
	"chatui/backend/internal/db"
	"chatui/backend/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// ConversationHandler 处理与对话相关的请求
type ConversationHandler struct {
	db     *db.Database
	config *config.Config
	logger *logrus.Logger
}

// NewConversationHandler 创建一个新的ConversationHandler实例
func NewConversationHandler(database *db.Database, cfg *config.Config, logger *logrus.Logger) *ConversationHandler {
	return &ConversationHandler{db: database, config: cfg, logger: logger}
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

	// 开始事务
	tx, err := h.db.BeginTx()
	if err != nil {
		h.logger.WithError(err).Error("Failed to begin transaction")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to process request"))
		return
	}
	defer tx.Rollback()

	// 验证用户是否有权限访问此对话
	if !h.db.UserOwnsConversationTx(tx, userIDStr, conversationID) {
		utils.HandleError(c, utils.NewAppError(http.StatusForbidden, "FORBIDDEN", "You don't have permission to access this conversation"))
		return
	}

	messages, err := h.db.GetConversationMessagesTx(tx, conversationID)
	if err != nil {
		h.logger.WithError(err).Error("Failed to get conversation messages")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to get conversation messages"))
		return
	}

	if err := tx.Commit(); err != nil {
		h.logger.WithError(err).Error("Failed to commit transaction")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to process request"))
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

	// 开始事务
	tx, err := h.db.BeginTx()
	if err != nil {
		h.logger.WithError(err).Error("Failed to begin transaction")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to process request"))
		return
	}
	defer tx.Rollback()

	// 验证用户是否有权限访问此对话
	if !h.db.UserOwnsConversationTx(tx, userIDStr, conversationID) {
		utils.HandleError(c, utils.NewAppError(http.StatusForbidden, "FORBIDDEN", "You don't have permission to update this conversation"))
		return
	}

	// 更新对话标题
	err = h.db.UpdateConversationTitleTx(tx, conversationID, request.Title)
	if err != nil {
		h.logger.WithError(err).Error("Failed to update conversation title")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to update conversation title"))
		return
	}

	// 提交事务
	if err := tx.Commit(); err != nil {
		h.logger.WithError(err).Error("Failed to commit transaction")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to process request"))
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Conversation title updated successfully"})
}
