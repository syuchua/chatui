package handlers

import (
	"chatui/backend/internal/config"
	"chatui/backend/internal/db"
	"chatui/backend/internal/models"
	"chatui/backend/internal/services/ai"
	services "chatui/backend/internal/services/session"
	"chatui/backend/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// ChatHandler 定义了一个处理聊天的处理器结构体
type ChatHandler struct {
	db             db.Database
	config         *config.Config
	ai             ai.AIService
	logger         *logrus.Logger
	sessionManager *services.SessionManager
}

// NewChatHandler 创建一个新的聊天处理器实例
func NewChatHandler(database db.Database, cfg *config.Config, aiService ai.AIService, logger *logrus.Logger, sm *services.SessionManager) *ChatHandler {
	return &ChatHandler{db: database, config: cfg, ai: aiService, logger: logger, sessionManager: sm}
}

// HandleChat 处理聊天请求
func (h *ChatHandler) HandleChat(c *gin.Context) {
	var request struct {
		ConversationID string           `json:"conversationId" binding:"required"`
		Content        string           `json:"content" binding:"required"`
		Messages       []models.Message `json:"messages"`
	}
	if err := c.ShouldBindJSON(&request); err != nil {
		utils.HandleError(c, utils.NewAppError(http.StatusBadRequest, "INVALID_INPUT", err.Error()))
		return
	}

	h.logger.WithFields(logrus.Fields{
		"conversation_id": request.ConversationID,
		"content":         request.Content,
	}).Info("Received chat request")

	userID, exists := c.Get("user_id")
	if !exists {
		utils.HandleError(c, utils.NewAppError(http.StatusUnauthorized, "UNAUTHORIZED", "User not authenticated"))
		return
	}

	userIDStr, ok := userID.(string)
	if !ok {
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "INTERNAL_ERROR", "Invalid user ID"))
		return
	}

	// 如果 conversationId 为空，创建新的对话
	if request.ConversationID == "" {
		var err error
		request.ConversationID, err = h.db.CreateConversation(userIDStr, "新对话")
		if err != nil {
			h.logger.WithError(err).Error("Failed to create conversation")
			utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "DB_ERROR", "Failed to create conversation"))
			return
		}
		h.logger.WithField("conversation_id", request.ConversationID).Info("Created new conversation")
	} else {
		// 验证用户是否有权限访问此对话
		if !h.db.UserOwnsConversation(userIDStr, request.ConversationID) {
			utils.HandleError(c, utils.NewAppError(http.StatusForbidden, "FORBIDDEN", "You don't have permission to access this conversation"))
			return
		}
	}

	// 获取历史消息
	messages := h.getConversationHistory(request.ConversationID)
	h.logger.WithFields(logrus.Fields{
		"conversation_id": request.ConversationID,
		"history_length":  len(messages),
	}).Info("Retrieved conversation history")

	// 添加新的用户消息
	newMessage := models.Message{
		ConversationID: request.ConversationID,
		UserID:         userIDStr,
		Role:           "user",
		Content:        request.Content,
	}
	messages = append(messages, newMessage)

	h.logger.WithFields(logrus.Fields{
		"conversation_id": request.ConversationID,
		"message_content": request.Content,
		"total_messages":  len(messages),
	}).Info("Sending messages to AI service")

	// 调用 AI 服务生成回复，传递完整的消息历史
	aiResponse, err := h.ai.GenerateResponse(messages)
	if err != nil {
		h.logger.WithError(err).Error("Failed to generate AI response")
		utils.HandleError(c, utils.NewAppError(http.StatusInternalServerError, "AI_ERROR", "Failed to generate AI response"))
		return
	}

	h.logger.WithFields(logrus.Fields{
		"conversation_id": request.ConversationID,
		"ai_response":     aiResponse,
	}).Info("Received AI response")

	// 创建 AI 回复消息
	aiMessage := models.Message{
		ConversationID: request.ConversationID,
		UserID:         "AI",
		Role:           "assistant",
		Content:        aiResponse,
	}

	// 更新会话管理器
	h.sessionManager.AddMessage(request.ConversationID, newMessage)
	h.sessionManager.AddMessage(request.ConversationID, aiMessage)

	// 异步保存消息到数据库
	go func() {
		if err := h.db.InsertChatMessage(request.ConversationID, userIDStr, "user", request.Content); err != nil {
			h.logger.WithError(err).Error("Failed to save user message")
		}
		if err := h.db.InsertChatMessage(request.ConversationID, "AI", "assistant", aiResponse); err != nil {
			h.logger.WithError(err).Error("Failed to save AI response")
		}
	}()

	c.JSON(http.StatusOK, gin.H{
		"conversation_id": request.ConversationID,
		"content":         aiResponse,
	})
}

func (h *ChatHandler) getConversationHistory(conversationID string) []models.Message {
	// 首先尝试从会话管理器获取历史消息
	messages := h.sessionManager.GetMessages(conversationID)

	h.logger.WithFields(logrus.Fields{
		"conversation_id":  conversationID,
		"session_messages": len(messages),
	}).Info("Retrieved messages from session manager")

	// 如果会话管理器中没有消息，则从数据库获取
	if len(messages) == 0 {
		var err error
		messages, err = h.db.GetConversationMessages(conversationID)
		if err != nil {
			h.logger.WithError(err).Error("Failed to get conversation history from database")
			// 如果从数据库获取失败，返回空切片
			return []models.Message{}
		}
		h.logger.WithFields(logrus.Fields{
			"conversation_id": conversationID,
			"db_messages":     len(messages),
		}).Info("Retrieved messages from database")

		// 将从数据库获取的消息添加到会话管理器
		for _, msg := range messages {
			h.sessionManager.AddMessage(conversationID, msg)
		}
	}

	return messages
}
