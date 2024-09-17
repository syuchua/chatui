package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

// GenerateJWT 生成JWT
func GenerateJWT(userID string, secret string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = userID
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix() // Token 有效期为 24 小时

	return token.SignedString([]byte(secret))
}
