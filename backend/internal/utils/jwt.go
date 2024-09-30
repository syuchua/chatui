package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

// GenerateJWT 生成JWT
func GenerateJWT(userID string, secret string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(), // 7天过期
	})

	return token.SignedString([]byte(secret))
}
