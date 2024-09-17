package ai

import (
	"bytes"
	"chatui/backend/internal/config"
	"chatui/backend/internal/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/sirupsen/logrus"
)

// Service 定义了一个服务结构体
type Service struct {
	config *config.Config
	logger *logrus.Logger
}

// NewService 创建一个新的服务实例
func NewService(cfg *config.Config, logger *logrus.Logger) *Service {
	return &Service{config: cfg, logger: logger}
}

// GenerateResponse 生成响应
func (s *Service) GenerateResponse(messages []models.Message) (string, error) {
	// 构建请求payload
	payload := map[string]interface{}{
		"model":    "gpt-3.5-turbo",
		"messages": messages,
	}

	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		s.logger.WithError(err).Error("Failed to marshal payload")
		return "", fmt.Errorf("failed to marshal payload: %w", err)
	}

	// 创建HTTP请求
	req, err := http.NewRequest("POST", s.config.OpenAI.BaseURL+"/chat/completions", bytes.NewBuffer(jsonPayload))
	if err != nil {
		s.logger.WithError(err).Error("Failed to create HTTP request")
		return "", fmt.Errorf("failed to create HTTP request: %w", err)
	}

	// 设置请求头
	req.Header.Set("Authorization", "Bearer "+s.config.OpenAI.APIKey)
	req.Header.Set("Content-Type", "application/json")

	// 发送请求
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		s.logger.WithError(err).Error("Failed to send request to OpenAI")
		return "", fmt.Errorf("failed to send request to OpenAI: %w", err)
	}
	defer resp.Body.Close()

	// 读取响应体
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		s.logger.WithError(err).Error("Failed to read response body")
		return "", fmt.Errorf("failed to read response body: %w", err)
	}

	// 记录原始响应
	s.logger.WithField("response", string(body)).Debug("Received response from OpenAI")

	// 检查响应状态码
	if resp.StatusCode != http.StatusOK {
		s.logger.WithField("status_code", resp.StatusCode).Error("Received non-200 status code from OpenAI")
		return "", fmt.Errorf("received non-200 status code from OpenAI: %d", resp.StatusCode)
	}

	// 解析响应
	var result map[string]interface{}
	if err := json.Unmarshal(body, &result); err != nil {
		s.logger.WithError(err).Error("Failed to unmarshal response")
		return "", fmt.Errorf("failed to unmarshal response: %w", err)
	}

	// 检查响应格式
	choices, ok := result["choices"].([]interface{})
	if !ok || len(choices) == 0 {
		s.logger.Error("Unexpected response format: missing or empty choices")
		return "", fmt.Errorf("unexpected response format: missing or empty choices")
	}

	choice, ok := choices[0].(map[string]interface{})
	if !ok {
		s.logger.Error("Unexpected choice format")
		return "", fmt.Errorf("unexpected choice format")
	}

	message, ok := choice["message"].(map[string]interface{})
	if !ok {
		s.logger.Error("Unexpected message format")
		return "", fmt.Errorf("unexpected message format")
	}

	content, ok := message["content"].(string)
	if !ok {
		s.logger.Error("Unexpected content format")
		return "", fmt.Errorf("unexpected content format")
	}

	if content == "" {
		s.logger.Error("Empty content received from OpenAI")
		return "", fmt.Errorf("empty content received from OpenAI")
	}

	return content, nil
}
