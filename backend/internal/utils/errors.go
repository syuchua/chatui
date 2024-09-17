package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// AppError 定义了应用程序错误结构体
type AppError struct {
	HTTPStatus int
	Code       string
	Message    string
}

// Error 返回错误信息
func (e AppError) Error() string {
	return e.Message
}

// NewAppError 创建一个新的AppError实例
func NewAppError(httpStatus int, code, message string) AppError {
	return AppError{
		HTTPStatus: httpStatus,
		Code:       code,
		Message:    message,
	}
}

// HandleError 处理错误
func HandleError(c *gin.Context, err error) {
	appErr, ok := err.(AppError)
	if !ok {
		appErr = NewAppError(http.StatusInternalServerError, "INTERNAL_SERVER_ERROR", "An unexpected error occurred")
	}

	logrus.WithFields(logrus.Fields{
		"status": appErr.HTTPStatus,
		"code":   appErr.Code,
		"error":  err.Error(),
	}).Error("API error occurred")

	c.JSON(appErr.HTTPStatus, gin.H{
		"error": gin.H{
			"code":    appErr.Code,
			"message": appErr.Message,
		},
	})
}
