package conversation

import (
	"chatui/backend/internal/db"
	"chatui/backend/internal/models"

	"github.com/sirupsen/logrus"
)

type ConversationService interface {
	CreateConversation(userID string) (*models.Conversation, error)
}

type conversationService struct {
	db     db.Database
	logger *logrus.Logger
}

func NewConversationService(db db.Database, logger *logrus.Logger) ConversationService {
	return &conversationService{db: db, logger: logger}
}

func (s *conversationService) CreateConversation(userID string) (*models.Conversation, error) {
	title := "新对话"
	conversationID, err := s.db.CreateConversation(userID, title)
	if err != nil {
		s.logger.WithError(err).Error("Failed to create conversation in database")
		return nil, err
	}

	return &models.Conversation{
		ID:     conversationID,
		UserID: userID,
		Title:  title,
	}, nil
}
