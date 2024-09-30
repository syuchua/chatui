package db

import (
	"chatui/backend/internal/config"
	"chatui/backend/internal/models"
	"io/ioutil"
	"strings"
	"testing"

	"github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setupTestDatabase(t *testing.T) Database {
	cfg := &config.Config{
		Database: config.DatabaseConfig{
			URL: "chatui_test:test_password@tcp(localhost:3306)/chatui_test?parseTime=true",
		},
	}

	logger := logrus.New()
	db, err := NewDatabase(cfg, logger)
	require.NoError(t, err)
	require.NotNil(t, db)

	// 读取 SQL 文件
	sqlBytes, err := ioutil.ReadFile("schema.sql")
	require.NoError(t, err)

	// 将 SQL 文件内容分割成单独的语句
	sqlStatements := strings.Split(string(sqlBytes), ";")

	// 执行每个 SQL 语句
	for _, stmt := range sqlStatements {
		stmt = strings.TrimSpace(stmt)
		if stmt == "" {
			continue
		}
		_, err = db.(*MySQLDatabase).db.Exec(stmt)
		require.NoError(t, err)
	}

	// 清理所有表
	_, err = db.(*MySQLDatabase).db.Exec("DELETE FROM messages")
	require.NoError(t, err)
	_, err = db.(*MySQLDatabase).db.Exec("DELETE FROM conversations")
	require.NoError(t, err)
	_, err = db.(*MySQLDatabase).db.Exec("DELETE FROM users")
	require.NoError(t, err)

	return db
}

func TestCreateAndGetUser(t *testing.T) {
	db := setupTestDatabase(t)

	user := models.User{
		ID:       "test-user-id",
		Username: "testuser",
		Email:    "test@example.com",
		Password: "hashedpassword",
		Role:     "user",
	}

	err := db.CreateUser(user)
	require.NoError(t, err)

	fetchedUser, err := db.GetUserByUsername("testuser")

	assert.NoError(t, err)
	assert.Equal(t, user.ID, fetchedUser.ID)
	assert.Equal(t, user.Username, fetchedUser.Username)
	assert.Equal(t, user.Email, fetchedUser.Email)
	assert.Equal(t, user.Password, fetchedUser.Password)
	assert.Equal(t, user.Role, fetchedUser.Role)
}

func TestCreateAndGetConversation(t *testing.T) {
	db := setupTestDatabase(t)

	// 首先创建一个用户
	user := models.User{
		ID:       "test-user-id",
		Username: "testuser",
		Email:    "test@example.com",
		Password: "hashedpassword",
		Role:     "user",
	}
	err := db.CreateUser(user)
	require.NoError(t, err, "Failed to create user")

	title := "Test Conversation"

	conversationID, err := db.CreateConversation(user.ID, title)
	assert.NoError(t, err, "Failed to create conversation")
	assert.NotEmpty(t, conversationID, "Conversation ID should not be empty")

	conversations, err := db.GetConversations(user.ID)
	assert.NoError(t, err, "Failed to get conversations")
	assert.Len(t, conversations, 1, "Should have 1 conversation")
	if len(conversations) > 0 {
		assert.Equal(t, conversationID, conversations[0].ID)
		assert.Equal(t, user.ID, conversations[0].UserID)
		assert.Equal(t, title, conversations[0].Title)
	}
}

func TestInsertAndGetChatMessages(t *testing.T) {
	db := setupTestDatabase(t)

	// 创建一个测试用户
	user := models.User{
		ID:       "test-user-id",
		Username: "testuser",
		Email:    "test@example.com",
		Password: "hashedpassword",
		Role:     "user",
	}
	err := db.CreateUser(user)
	require.NoError(t, err, "Failed to create user")

	// 创建一个测试对话
	conversationID, err := db.CreateConversation(user.ID, "Test Conversation")
	require.NoError(t, err, "Failed to create conversation")

	// 插入用户消息
	err = db.InsertChatMessage(conversationID, user.ID, "user", "Hello, AI!")
	assert.NoError(t, err, "Failed to insert user message")

	// 插入 AI 助手消息
	err = db.InsertChatMessage(conversationID, "", "assistant", "Hello, human!")
	assert.NoError(t, err, "Failed to insert assistant message")

	// 获取对话消息
	messages, err := db.GetConversationMessages(conversationID)
	assert.NoError(t, err, "Failed to get conversation messages")
	assert.Len(t, messages, 2, "Should have 2 messages")

	if len(messages) >= 2 {
		assert.Equal(t, "user", messages[0].Role, "First message should be from user")
		assert.Equal(t, "Hello, AI!", messages[0].Content, "Incorrect user message content")
		assert.Equal(t, user.ID, messages[0].UserID, "User message should have user ID")

		assert.Equal(t, "assistant", messages[1].Role, "Second message should be from assistant")
		assert.Equal(t, "Hello, human!", messages[1].Content, "Incorrect assistant message content")
		assert.Empty(t, messages[1].UserID, "Assistant message should have empty user ID")
	}
}
