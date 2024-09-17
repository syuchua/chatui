package chat

import (
	"chatui/backend/internal/models"
	"chatui/backend/internal/services/ai"
	"fmt"

	"github.com/sirupsen/logrus"
)

// Processor 处理消息
type Processor struct {
	aiService *ai.Service
	logger    *logrus.Logger
}

// NewProcessor 创建一个新的Processor实例
func NewProcessor(aiService *ai.Service, logger *logrus.Logger) *Processor {
	return &Processor{
		aiService: aiService,
		logger:    logger,
	}
}

// ProcessMessage 处理消息
func (p *Processor) ProcessMessage(message models.Message, conversationHistory []models.Message) (models.Message, error) {
	p.logger.WithFields(logrus.Fields{
		"message_content": message.Content,
		"conversation_id": message.ConversationID,
		"history_length":  len(conversationHistory),
	}).Info("Processing message")

	// 将当前消息添加到对话历史
	conversationHistory = append(conversationHistory, message)

	// 调用 AI 服务生成回复
	aiResponse, err := p.aiService.GenerateResponse(conversationHistory)
	if err != nil {
		p.logger.WithError(err).Error("Failed to generate AI response")
		return models.Message{}, fmt.Errorf("AI service error: %w", err)
	}

	p.logger.WithField("ai_response", aiResponse).Info("Received AI response")

	// 验证 AI 响应
	if aiResponse == "" {
		p.logger.Error("AI response is empty")
		return models.Message{}, fmt.Errorf("unexpected empty response from AI service")
	}

	// 创建 AI 回复消息
	aiMessage := models.Message{
		ConversationID: message.ConversationID,
		Role:           "assistant",
		Content:        aiResponse,
	}

	p.logger.WithFields(logrus.Fields{
		"ai_message_content": aiMessage.Content,
		"conversation_id":    aiMessage.ConversationID,
	}).Info("AI message created")

	return aiMessage, nil
}
