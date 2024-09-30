package db

import (
	"chatui/backend/internal/config"
	"chatui/backend/internal/models"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"

	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
)

// Database 接口定义了数据库操作
type Database interface {
	GetUserByUsername(username string) (models.User, error)
	CreateUser(user models.User) error
	CreateConversation(userID, title string) (string, error)
	InsertChatMessage(conversationID, userID, role, content string) error
	GetConversationMessages(conversationID string) ([]models.Message, error)
	GetConversations(userID string) ([]models.Conversation, error)
	UpdateConversationTitle(conversationID, title string) error
	UserOwnsConversation(userID, conversationID string) bool
	UpdateUserSettings(userID, baseURL, apiKey, model string) error
	GetUserSettings(userID string) (string, string, string, error)
	MigrateDB() error
	GetUserByEmail(email string) (models.User, error)
	GetUserByID(userID string) (models.User, error)
}

// MySQLDatabase 实现了 Database 接口
type MySQLDatabase struct {
	db  *sql.DB
	log *logrus.Logger
}

// NewDatabase 创建一个新的数据库连接
func NewDatabase(cfg *config.Config, logger *logrus.Logger) (Database, error) {
	if cfg == nil {
		return nil, fmt.Errorf("config is nil")
	}

	if cfg.Database.URL == "" {
		return nil, fmt.Errorf("database URL is empty")
	}

	if logger == nil {
		logger = logrus.New() // 如果没有提供 logger，创建一个新的
	}

	logger.Infof("Connecting to database: %s", cfg.Database.URL)

	db, err := sql.Open("mysql", cfg.Database.URL)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err = db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	logger.Info("Successfully connected to database")

	return &MySQLDatabase{db: db, log: logger}, nil
}

// GetUserByUsername 根据用户名获取用户信息
func (d *MySQLDatabase) GetUserByUsername(username string) (models.User, error) {
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
func (d *MySQLDatabase) CreateUser(user models.User) error {
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
func (d *MySQLDatabase) CreateConversation(userID, title string) (string, error) {
	conversationID := uuid.New().String()
	_, err := d.db.Exec("INSERT INTO conversations (id, user_id, title) VALUES (?, ?, ?)", conversationID, userID, title)
	if err != nil {
		return "", err
	}
	return conversationID, nil
}

// InsertChatMessage 插入一个新的聊天消息
func (d *MySQLDatabase) InsertChatMessage(conversationID, userID, role, content string) error {
	query := `INSERT INTO messages (id, conversation_id, user_id, role, content, created_at) 
              VALUES (?, ?, ?, ?, ?, ?)`

	id := uuid.New().String()

	if role == "assistant" {
		userID = "AI"
	}

	_, err := d.db.Exec(query, id, conversationID, userID, role, content, time.Now())
	if err != nil {
		return fmt.Errorf("failed to insert chat message: %w", err)
	}
	return nil
}

// GetConversationMessages 获取一个对话的所有消息
func (d *MySQLDatabase) GetConversationMessages(conversationID string) ([]models.Message, error) {
	rows, err := d.db.Query("SELECT id, conversation_id, user_id, role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY created_at", conversationID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []models.Message
	for rows.Next() {
		var msg models.Message
		var userID sql.NullString
		err := rows.Scan(&msg.ID, &msg.ConversationID, &userID, &msg.Role, &msg.Content, &msg.CreatedAt)
		if err != nil {
			return nil, err
		}
		msg.UserID = userID.String // 如果 userID 为 NULL，这将是一个空字符串
		messages = append(messages, msg)
	}
	return messages, nil
}

// GetConversations 获取一个用户的所有对话
func (d *MySQLDatabase) GetConversations(userID string) ([]models.Conversation, error) {
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

// UpdateConversationTitle 更新对话的标题
func (d *MySQLDatabase) UpdateConversationTitle(conversationID, title string) error {
	_, err := d.db.Exec("UPDATE conversations SET title = ? WHERE id = ?", title, conversationID)
	return err
}

// UserOwnsConversation 检查用户是否拥有指定的对话
func (d *MySQLDatabase) UserOwnsConversation(userID, conversationID string) bool {
	var count int
	err := d.db.QueryRow("SELECT COUNT(*) FROM conversations WHERE id = ? AND user_id = ?", conversationID, userID).Scan(&count)
	if err != nil {
		return false
	}
	return count > 0
}

// UpdateUserSettings 更新用户的API设置
func (d *MySQLDatabase) UpdateUserSettings(userID, baseURL, apiKey, model string) error {
	_, err := d.db.Exec("UPDATE users SET base_url = ?, api_key = ?, model = ? WHERE id = ?", baseURL, apiKey, model, userID)
	return err
}

// GetUserSettings 获取用户的API设置
func (d *MySQLDatabase) GetUserSettings(userID string) (string, string, string, error) {
	var baseURL, apiKey, model string
	err := d.db.QueryRow("SELECT base_url, api_key, model FROM users WHERE id = ?", userID).Scan(&baseURL, &apiKey, &model)
	return baseURL, apiKey, model, err
}

// MigrateDB 执行数据库迁移
func (d *MySQLDatabase) MigrateDB() error {
	// 检查 base_url 列是否存在
	checkBaseURLColumnQuery := `
		SELECT COUNT(*)
		FROM information_schema.columns
		WHERE table_schema = DATABASE()
		AND table_name = 'users'
		AND column_name = 'base_url'
	`

	var count int
	err := d.db.QueryRow(checkBaseURLColumnQuery).Scan(&count)
	if err != nil {
		return fmt.Errorf("failed to check if base_url column exists: %w", err)
	}

	// 如果 base_url 列不存在，则添加该列
	if count == 0 {
		addBaseURLColumnQuery := `ALTER TABLE users ADD COLUMN base_url VARCHAR(255)`
		d.log.Infof("Executing query: %s", addBaseURLColumnQuery)
		if _, err := d.db.Exec(addBaseURLColumnQuery); err != nil {
			return fmt.Errorf("failed to add base_url column: %w", err)
		}
	}

	// 检查 api_key 列是否存在
	checkAPIKeyColumnQuery := `
		SELECT COUNT(*)
		FROM information_schema.columns
		WHERE table_schema = DATABASE()
		AND table_name = 'users'
		AND column_name = 'api_key'
	`

	err = d.db.QueryRow(checkAPIKeyColumnQuery).Scan(&count)
	if err != nil {
		return fmt.Errorf("failed to check if api_key column exists: %w", err)
	}

	// 如果 api_key 列不存在，则添加该列
	if count == 0 {
		addAPIKeyColumnQuery := `ALTER TABLE users ADD COLUMN api_key VARCHAR(255)`
		d.log.Infof("Executing query: %s", addAPIKeyColumnQuery)
		if _, err := d.db.Exec(addAPIKeyColumnQuery); err != nil {
			return fmt.Errorf("failed to add api_key column: %w", err)
		}
	}

	// 检查 model 列是否存在
	checkModelColumnQuery := `
		SELECT COUNT(*)
		FROM information_schema.columns
		WHERE table_schema = DATABASE()
		AND table_name = 'users'
		AND column_name = 'model'
	`

	err = d.db.QueryRow(checkModelColumnQuery).Scan(&count)
	if err != nil {
		return fmt.Errorf("failed to check if model column exists: %w", err)
	}

	// 如果 model 列不存在，则添加该列
	if count == 0 {
		addModelColumnQuery := `ALTER TABLE users ADD COLUMN model VARCHAR(255)`
		d.log.Infof("Executing query: %s", addModelColumnQuery)
		if _, err := d.db.Exec(addModelColumnQuery); err != nil {
			return fmt.Errorf("failed to add model column: %w", err)
		}
	}

	return nil
}

// GetUserByEmail 根据邮箱获取用户信息
func (d *MySQLDatabase) GetUserByEmail(email string) (models.User, error) {
	var user models.User
	err := d.db.QueryRow("SELECT id, username, email, password, role FROM users WHERE email = ?", email).
		Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Role)
	if err != nil {
		if err == sql.ErrNoRows {
			return models.User{}, errors.New("用户不存在")
		}
		return models.User{}, err
	}
	return user, nil
}

// GetUserByID 根据用户ID获取用户信息
func (d *MySQLDatabase) GetUserByID(userID string) (models.User, error) {
	var user models.User
	err := d.db.QueryRow("SELECT id, username, email, password, role FROM users WHERE id = ?", userID).
		Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Role)
	if err != nil {
		if err == sql.ErrNoRows {
			return models.User{}, errors.New("用户不存在")
		}
		return models.User{}, err
	}
	return user, nil
}
