package services

import (
	"chatui/backend/internal/models"
	"sync"

	"github.com/sirupsen/logrus"
)

type SessionManager struct {
	sessions map[string][]models.Message
	mutex    sync.RWMutex
	maxSize  int
	logger   *logrus.Logger
}

func NewSessionManager(maxSize int) *SessionManager {
	return &SessionManager{
		sessions: make(map[string][]models.Message),
		maxSize:  1000,
		logger:   logrus.New(),
	}
}

func (sm *SessionManager) AddMessage(conversationID string, message models.Message) {
	sm.mutex.Lock()
	defer sm.mutex.Unlock()

	if _, ok := sm.sessions[conversationID]; !ok {
		sm.sessions[conversationID] = []models.Message{}
	}

	sm.sessions[conversationID] = append(sm.sessions[conversationID], message)

	// 如果消息数量超过限制，删除最旧的消息
	if len(sm.sessions[conversationID]) > sm.maxSize {
		sm.sessions[conversationID] = sm.sessions[conversationID][1:]
	}

	sm.logger.WithFields(logrus.Fields{
		"conversation_id": conversationID,
		"message_content": message.Content,
		"total_messages":  len(sm.sessions[conversationID]),
	}).Info("Added message to session")
}

func (sm *SessionManager) GetMessages(conversationID string) []models.Message {
	sm.mutex.RLock()
	defer sm.mutex.RUnlock()

	messages := sm.sessions[conversationID]
	sm.logger.WithFields(logrus.Fields{
		"conversation_id": conversationID,
		"message_count":   len(messages),
	}).Info("Retrieved messages from session")

	return messages
}

func (sm *SessionManager) ClearSession(conversationID string) {
	sm.mutex.Lock()
	defer sm.mutex.Unlock()

	delete(sm.sessions, conversationID)
}

func (sm *SessionManager) TrimMessages(conversationID string, maxTokens int) {
	sm.mutex.Lock()
	defer sm.mutex.Unlock()

	messages := sm.sessions[conversationID]
	totalTokens := 0
	var trimmedMessages []models.Message

	for i := len(messages) - 1; i >= 0; i-- {
		messageTokens := len(messages[i].Content) / 4 // 粗略估计，每个token约4个字符
		if totalTokens+messageTokens > maxTokens {
			break
		}
		totalTokens += messageTokens
		trimmedMessages = append([]models.Message{messages[i]}, trimmedMessages...)
	}

	sm.sessions[conversationID] = trimmedMessages
}
