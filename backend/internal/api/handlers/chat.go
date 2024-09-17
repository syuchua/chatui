package handlers

import (
	"chatui/backend/internal/config"
	"chatui/backend/internal/db"
	"chatui/backend/internal/services/ai"
	"chatui/backend/internal/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// ChatHandler 定义了一个处理聊天的处理器结构体
type ChatHandler struct {
	db     *db.Database
	config *config.Config
	ai     *ai.Service
	logger *logrus.Logger
}

// NewChatHandler 创建一个新的聊天处理器实例
func NewChatHandler(database *db.Database, cfg *config.Config, aiService *ai.Service, logger *logrus.Logger) *ChatHandler {
	return &ChatHandler{db: database, config: cfg, ai: aiService, logger: logger}
}

// HandleChat 处理聊天请求
func (h *ChatHandler) HandleChat(c *gin.Context) {
	var request struct {
		ConversationID string `json:"conversation_id"`
		Content        string `json:"content" binding:"required,min=1,max=1000"`
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

	if request.ConversationID == "" {
		request.ConversationID, err = h.db.CreateConversationTx(tx, userIDStr, "新对话")
		if err != nil {
			h.logger.WithError(err).Error("Failed to create conversation")
			utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to create conversation"))
			return
		}
	} else {
		// 验证用户是否有权限访问此对话
		if !h.db.UserOwnsConversationTx(tx, userIDStr, request.ConversationID) {
			utils.HandleError(c, utils.NewAppError(http.StatusForbidden, "FORBIDDEN", "You don't have permission to access this conversation"))
			return
		}
	}

	// 保存用户消息
	err = h.db.InsertChatMessageTx(tx, request.ConversationID, userIDStr, "user", request.Content)
	if err != nil {
		h.logger.WithError(err).Error("Failed to save user message")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to save user message"))
		return
	}

	// 获取对话历史
	messages, err := h.db.GetConversationMessagesTx(tx, request.ConversationID)
	if err != nil {
		h.logger.WithError(err).Error("Failed to get conversation history")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to get conversation history"))
		return
	}

	// 调用 AI 服务生成回复
	aiResponse, err := h.ai.GenerateResponse(messages)
	if err != nil {
		h.logger.WithError(err).Error("Failed to generate AI response")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "AI_ERROR", "Failed to generate AI response"))
		return
	}

	// 保存 AI 回复
	err = h.db.InsertChatMessageTx(tx, request.ConversationID, "", "assistant", aiResponse)
	if err != nil {
		h.logger.WithError(err).Error("Failed to save AI response")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to save AI response"))
		return
	}

	// 提交事务
	if err := tx.Commit(); err != nil {
		h.logger.WithError(err).Error("Failed to commit transaction")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to process request"))
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"conversation_id": request.ConversationID,
		"content":         aiResponse,
		"sender":          "assistant",
		"timestamp":       time.Now().Unix(),
	})
}

// StartNewConversation 创建新对话
func (h *ChatHandler) StartNewConversation(c *gin.Context) {
	userID, _ := c.Get("user_id")
	userIDStr := userID.(string)

	conversationID, err := h.db.CreateConversation(userIDStr, "新对话")
	if err != nil {
		h.logger.WithError(err).Error("Failed to create new conversation")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to create new conversation"))
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": conversationID})
}

// GetConversations 获取用户的所有对话
func (h *ChatHandler) GetConversations(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		utils.HandleError(c, utils.NewAppError(http.StatusUnauthorized, "UNAUTHORIZED", "Unauthorized"))
		return
	}

	conversations, err := h.db.GetConversations(userID.(string))
	if err != nil {
		h.logger.WithError(err).Error("Failed to get conversations")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to get conversations"))
		return
	}

	c.JSON(http.StatusOK, gin.H{"conversations": conversations})
}

// GetConversationMessages 获取特定对话的所有消息
func (h *ChatHandler) GetConversationMessages(c *gin.Context) {
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
func (h *ChatHandler) UpdateConversationTitle(c *gin.Context) {
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
