package db

import (
	"chatui/backend/internal/config"
	"chatui/backend/internal/models"
	"chatui/backend/internal/utils"
	"database/sql"
	"errors"
	"fmt"

	"github.com/go-sql-driver/mysql"
	"github.com/sirupsen/logrus"

	"github.com/google/uuid"
)

// Database 定义了一个数据库连接
type Database struct {
	db *sql.DB
}

// NewDatabase 创建一个新的数据库连接
func NewDatabase(cfg *config.Config) (*Database, error) {
	if cfg == nil {
		return nil, fmt.Errorf("config is nil")
	}

	if cfg.Database.URL == "" {
		return nil, fmt.Errorf("database URL is empty")
	}

	logrus.Infof("Connecting to database: %s", cfg.Database.URL)

	db, err := sql.Open("mysql", cfg.Database.URL)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err = db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	utils.Log.Info("Successfully connected to database")

	return &Database{db: db}, nil
}

// GetUserByUsername 根据用户名获取用户信息
func (d *Database) GetUserByUsername(username string) (models.User, error) {
	var user models.User
	err := d.db.QueryRow("SELECT id, username, email, password, role FROM users WHERE username = ?", username).
		Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Role)
	if err != nil {
		if err == sql.ErrNoRows {
			return models.User{}, errors.New("用户不存在")
		}
		return models.User{}, err
	}
	return user, nil
}

// CreateUser 创建一个新的用户
func (d *Database) CreateUser(user models.User) error {
	_, err := d.db.Exec("INSERT INTO users (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
		user.ID, user.Username, user.Email, user.Password, user.Role)
	if err != nil {
		if mysqlErr, ok := err.(*mysql.MySQLError); ok && mysqlErr.Number == 1062 {
			return errors.New("用户名已存在")
		}
		return err
	}
	return nil
}

// CreateConversation 创建一个新的对话
func (d *Database) CreateConversation(userID, title string) (string, error) {
	id := uuid.New().String()
	_, err := d.db.Exec("INSERT INTO conversations (id, user_id, title) VALUES (?, ?, ?)", id, userID, title)
	if err != nil {
		return "", err
	}
	return id, nil
}

// InsertChatMessage 插入一个新的聊天消息
func (d *Database) InsertChatMessage(conversationID, userID, role, content string) error {
	id := uuid.New().String()
	_, err := d.db.Exec("INSERT INTO messages (id, conversation_id, user_id, role, content, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
		id, conversationID, userID, role, content)
	return err
}

// GetConversationMessages 获取一个对话的所有消息
func (d *Database) GetConversationMessages(conversationID string) ([]models.Message, error) {
	rows, err := d.db.Query("SELECT id, conversation_id, user_id, role, content FROM messages WHERE conversation_id = ? ORDER BY id", conversationID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []models.Message
	for rows.Next() {
		var msg models.Message
		err := rows.Scan(&msg.ID, &msg.ConversationID, &msg.UserID, &msg.Role, &msg.Content)
		if err != nil {
			return nil, err
		}
		messages = append(messages, msg)
	}
	return messages, nil
}

// GetConversations 获取一个用户的所有对话
func (d *Database) GetConversations(userID string) ([]models.Conversation, error) {
	rows, err := d.db.Query("SELECT id, user_id, title, created_at, updated_at FROM conversations WHERE user_id = ? ORDER BY updated_at DESC", userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var conversations []models.Conversation
	for rows.Next() {
		var conv models.Conversation
		err := rows.Scan(&conv.ID, &conv.UserID, &conv.Title, &conv.CreatedAt, &conv.UpdatedAt)
		if err != nil {
			return nil, err
		}
		conversations = append(conversations, conv)
	}
	return conversations, nil
}

// CreateConversationWithMessage 创建一个新的对话并插入一条消息
func (d *Database) CreateConversationWithMessage(userID, title, message string) (string, error) {
	tx, err := d.db.Begin()
	if err != nil {
		return "", err
	}
	defer tx.Rollback()

	convID := uuid.New().String()
	_, err = tx.Exec("INSERT INTO conversations (id, user_id, title) VALUES (?, ?, ?)", convID, userID, title)
	if err != nil {
		return "", err
	}

	msgID := uuid.New().String()
	_, err = tx.Exec("INSERT INTO messages (id, conversation_id, user_id, role, content, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
		msgID, convID, userID, "user", message)
	if err != nil {
		return "", err
	}

	if err := tx.Commit(); err != nil {
		return "", err
	}

	return convID, nil
}

// BeginTx 开始一个新的事务
func (d *Database) BeginTx() (*sql.Tx, error) {
	return d.db.Begin()
}

// CreateConversationTx 在事务中创建一个新的对话
func (d *Database) CreateConversationTx(tx *sql.Tx, userID, title string) (string, error) {
	id := uuid.New().String()
	_, err := tx.Exec("INSERT INTO conversations (id, user_id, title) VALUES (?, ?, ?)", id, userID, title)
	if err != nil {
		return "", err
	}
	return id, nil
}

// InsertChatMessageTx 在事务中插入一个新的聊天消息
func (d *Database) InsertChatMessageTx(tx *sql.Tx, conversationID, userID, role, content string) error {
	id := uuid.New().String()
	_, err := tx.Exec("INSERT INTO messages (id, conversation_id, user_id, role, content, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
		id, conversationID, userID, role, content)
	return err
}

// GetConversationMessagesTx 在事务中获取一个对话的所有消息
func (d *Database) GetConversationMessagesTx(tx *sql.Tx, conversationID string) ([]models.Message, error) {
	rows, err := tx.Query("SELECT id, conversation_id, user_id, role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY created_at", conversationID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []models.Message
	for rows.Next() {
		var msg models.Message
		err := rows.Scan(&msg.ID, &msg.ConversationID, &msg.UserID, &msg.Role, &msg.Content, &msg.CreatedAt)
		if err != nil {
			return nil, err
		}
		messages = append(messages, msg)
	}
	return messages, nil
}

// UserOwnsConversationTx 在事务中检查用户是否拥有指定的对话
func (d *Database) UserOwnsConversationTx(tx *sql.Tx, userID, conversationID string) bool {
	var count int
	err := tx.QueryRow("SELECT COUNT(*) FROM conversations WHERE id = ? AND user_id = ?", conversationID, userID).Scan(&count)
	if err != nil {
		return false
	}
	return count > 0
}

// UpdateConversationTitle 更新对话的标题
func (d *Database) UpdateConversationTitle(conversationID, title string) error {
	_, err := d.db.Exec("UPDATE conversations SET title = ? WHERE id = ?", title, conversationID)
	return err
}

// UpdateConversationTitleTx 在事务中更新对话的标题
func (d *Database) UpdateConversationTitleTx(tx *sql.Tx, conversationID, title string) error {
	_, err := tx.Exec("UPDATE conversations SET title = ? WHERE id = ?", title, conversationID)
	return err
}

// UserOwnsConversation 检查用户是否拥有指定的对话
func (d *Database) UserOwnsConversation(userID, conversationID string) bool {
	var count int
	err := d.db.QueryRow("SELECT COUNT(*) FROM conversations WHERE id = ? AND user_id = ?", conversationID, userID).Scan(&count)
	if err != nil {
		return false
	}
	return count > 0
}
