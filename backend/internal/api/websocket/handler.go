package websocket

import (
	"chatui/backend/internal/config"
	"chatui/backend/internal/db"
	"chatui/backend/internal/models"
	"chatui/backend/internal/services/chat"
	"chatui/backend/internal/utils"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

// upgrader 用于升级HTTP连接到WebSocket
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // 注意：在生产环境中应该实现适当的源检查
	},
}

// Handler 处理WebSocket请求
type Handler struct {
	db            *db.Database
	config        *config.Config
	chatProcessor *chat.Processor
}

// NewHandler 创建一个新的Handler实例
func NewHandler(database *db.Database, cfg *config.Config, chatProcessor *chat.Processor) *Handler {
	return &Handler{
		db:            database,
		config:        cfg,
		chatProcessor: chatProcessor,
	}
}

// HandleWebSocket 处理WebSocket请求
func (h *Handler) HandleWebSocket(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	userIDStr := userID.(string)

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		utils.Log.Error("WebSocket连接失败:", err)
		return
	}
	defer conn.Close()

	utils.Log.Info("WebSocket连接已建立")
	for {
		_, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		utils.Log.Info("接收到消息:", string(p))
		var wsMessage models.WebSocketMessage
		if err := json.Unmarshal(p, &wsMessage); err != nil {
			log.Println(err)
			continue
		}

		switch wsMessage.Type {
		case "message":
			h.handleChatMessage(conn, wsMessage, userIDStr)
		case "start_conversation":
			h.handleStartConversation(conn, userIDStr)
		default:
			log.Printf("Unknown message type: %s", wsMessage.Type)
		}
	}
}

// handleChatMessage 处理聊天消息
func (h *Handler) handleChatMessage(conn *websocket.Conn, message models.WebSocketMessage, userID string) {
	// 保存用户消息
	err := h.db.InsertChatMessage(message.ConversationID, userID, "user", message.Content)
	if err != nil {
		log.Printf("Failed to save user message: %v", err)
		sendErrorMessage(conn, "Failed to save user message")
		return
	}

	// 获取对话历史
	messages, err := h.db.GetConversationMessages(message.ConversationID)
	if err != nil {
		log.Printf("Failed to get conversation history: %v", err)
		sendErrorMessage(conn, "Failed to get conversation history")
		return
	}

	// 使用 chatProcessor 处理消息
	userMessage := models.Message{
		ConversationID: message.ConversationID,
		UserID:         userID,
		Role:           "user",
		Content:        message.Content,
	}
	aiMessage, err := h.chatProcessor.ProcessMessage(userMessage, messages)
	if err != nil {
		log.Printf("Failed to generate AI response: %v", err)
		sendErrorMessage(conn, "Failed to generate AI response")
		return
	}
	utils.Log.Info("AI 回复:", aiMessage)
	// 保存 AI 回复
	err = h.db.InsertChatMessage(message.ConversationID, "", "assistant", aiMessage.Content)
	if err != nil {
		log.Printf("Failed to save AI response: %v", err)
		sendErrorMessage(conn, "Failed to save AI response")
		return
	}

	// 发送回复给客户端
	response := models.WebSocketMessage{
		Type:           "message",
		Content:        aiMessage.Content,
		ConversationID: message.ConversationID,
	}
	if err := conn.WriteJSON(response); err != nil {
		log.Printf("Failed to send AI response: %v", err)
	}
}

// handleStartConversation 处理开始新对话的请求
func (h *Handler) handleStartConversation(conn *websocket.Conn, userID string) {
	// 创建新对话
	conversationID, err := h.db.CreateConversation(userID, "新对话")
	if err != nil {
		log.Printf("Failed to create new conversation: %v", err)
		sendErrorMessage(conn, "Failed to create new conversation")
		return
	}

	// 发送新对话 ID 给客户端
	response := models.WebSocketMessage{
		Type:    "new_conversation",
		Content: conversationID,
	}
	if err := conn.WriteJSON(response); err != nil {
		log.Printf("Failed to send new conversation ID: %v", err)
	}
}

// sendErrorMessage 发送错误信息给客户端
func sendErrorMessage(conn *websocket.Conn, errorMsg string) {
	response := models.WebSocketMessage{
		Type:    "error",
		Content: errorMsg,
	}
	if err := conn.WriteJSON(response); err != nil {
		log.Printf("Failed to send error message: %v", err)
	}
}
