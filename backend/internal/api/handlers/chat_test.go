package handlers

import (
	"bytes"
	"chatui/backend/internal/config"
	"chatui/backend/internal/models"
	"encoding/json"
	"net/http"

	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// MockDatabase 是一个模拟数据库的结构体
type MockDatabase struct {
	mock.Mock
}

// 实现 db.Database 接口的所有方法
func (m *MockDatabase) GetUserByUsername(username string) (models.User, error) {
	args := m.Called(username)
	return args.Get(0).(models.User), args.Error(1)
}

func (m *MockDatabase) GetUserByEmail(email string) (models.User, error) {
	args := m.Called(email)
	return args.Get(0).(models.User), args.Error(1)
}

func (m *MockDatabase) GetUserByID(userID string) (models.User, error) {
	args := m.Called(userID)
	return args.Get(0).(models.User), args.Error(1)
}

func (m *MockDatabase) CreateUser(user models.User) error {
	args := m.Called(user)
	return args.Error(0)
}

func (m *MockDatabase) CreateConversation(userID, title string) (string, error) {
	args := m.Called(userID, title)
	return args.String(0), args.Error(1)
}

func (m *MockDatabase) InsertChatMessage(conversationID, userID, role, content string) error {
	args := m.Called(conversationID, userID, role, content)
	return args.Error(0)
}

func (m *MockDatabase) GetConversationMessages(conversationID string) ([]models.Message, error) {
	args := m.Called(conversationID)
	return args.Get(0).([]models.Message), args.Error(1)
}

func (m *MockDatabase) GetConversations(userID string) ([]models.Conversation, error) {
	args := m.Called(userID)
	return args.Get(0).([]models.Conversation), args.Error(1)
}

func (m *MockDatabase) UpdateConversationTitle(conversationID, title string) error {
	args := m.Called(conversationID, title)
	return args.Error(0)
}

func (m *MockDatabase) UserOwnsConversation(userID, conversationID string) bool {
	args := m.Called(userID, conversationID)
	return args.Bool(0)
}

func (m *MockDatabase) UpdateUserSettings(userID, baseURL, apiKey, model string) error {
	args := m.Called(userID, baseURL, apiKey, model)
	return args.Error(0)
}

func (m *MockDatabase) GetUserSettings(userID string) (string, string, string, error) {
	args := m.Called(userID)
	return args.String(0), args.String(1), args.String(2), args.Error(3)
}

func (m *MockDatabase) MigrateDB() error {
	args := m.Called()
	return args.Error(0)
}

// MockAIService 是一个模拟AI服务的结构体
type MockAIService struct {
	mock.Mock
}

// GenerateResponse 模拟生成响应的方法
func (m *MockAIService) GenerateResponse(messages []models.Message) (string, error) {
	args := m.Called(messages)
	return args.String(0), args.Error(1)
}

// TestHandleChat 测试处理聊天的函数
func TestHandleChat(t *testing.T) {
	gin.SetMode(gin.TestMode)

	// 创建模拟数据库和AI服务
	mockDB := new(MockDatabase)
	mockAI := new(MockAIService)
	cfg := &config.Config{}
	logger := logrus.New()

	// 创建聊天处理器
	handler := NewChatHandler(mockDB, cfg, mockAI, logger, nil)

	t.Run("Successful chat", func(t *testing.T) {

		// 设置模拟数据库和AI服务的期望行为
		mockDB.On("CreateConversation", "user123", "新对话").Return("conv123", nil)
		mockDB.On("InsertChatMessage", "conv123", "user123", "user", "Hello, AI!").Return(nil)
		mockDB.On("GetConversationMessages", "conv123").Return([]models.Message{
			{ConversationID: "conv123", UserID: "user123", Role: "user", Content: "Hello, AI!"},
		}, nil)
		mockAI.On("GenerateResponse", mock.Anything).Return("Hello, human!", nil)
		mockDB.On("InsertChatMessage", "conv123", "", "assistant", "Hello, human!").Return(nil)

		// 创建测试请求和响应
		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Set("user_id", "user123")

		body := bytes.NewBufferString(`{"content": "Hello, AI!"}`)
		c.Request, _ = http.NewRequest("POST", "/chat", body)

		// 调用处理聊天的方法
		handler.HandleChat(c)

		// 检查响应代码是否为200
		assert.Equal(t, http.StatusOK, w.Code)

		// 解析响应体
		var response map[string]interface{}
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, "Hello, human!", response["content"])
		assert.Equal(t, "conv123", response["conversation_id"])
		assert.Equal(t, "assistant", response["sender"])
	})

	// 可以添加更多测试用例,如错误处理等
}
