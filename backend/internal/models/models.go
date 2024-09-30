package models

import (
	"time"
)

// User 定义了用户结构体
type User struct {
	ID        string    `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Password  string    `json:"-"` // 不在JSON中暴露密码
	Role      string    `json:"role"`
	BaseURL   string    `json:"base_url"`
	APIKey    string    `json:"-"` // 不在JSON中暴露API密钥
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Conversation 定义了对话结构体
type Conversation struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	Title     string    `json:"title"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Message 定义了消息结构体
type Message struct {
	ID             string    `json:"id"`
	ConversationID string    `json:"conversation_id"`
	UserID         string    `json:"user_id"`
	Role           string    `json:"role"` // "user" 或 "assistant"
	Content        string    `json:"content"`
	CreatedAt      time.Time `json:"created_at"`
}

// WebSocketMessage 定义了WebSocket消息结构体
type WebSocketMessage struct {
	Type           string `json:"type"`
	Content        string `json:"content"`
	ConversationID string `json:"conversation_id,omitempty"`
}
