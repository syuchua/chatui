package user

import (
	"chatui/backend/internal/db"
	"chatui/backend/internal/models"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

// Service 用户服务
type Service struct {
	db db.Database
}

// NewService 创建一个新的Service实例
func NewService(database db.Database) *Service {
	return &Service{
		db: database,
	}
}

// RegisterUser 注册用户
func (s *Service) RegisterUser(username, email, password string) error {
	// 检查用户名是否已存在
	_, err := s.db.GetUserByUsername(username)
	if err == nil {
		return errors.New("用户名已存在")
	}

	// 哈希密码
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	// 创建新用户
	user := models.User{
		Username: username,
		Email:    email,
		Password: string(hashedPassword),
		Role:     "user", // 默认角色
	}

	return s.db.CreateUser(user)
}

// AuthenticateUser 认证用户
func (s *Service) AuthenticateUser(emailOrUsername, password string) (*models.User, error) {
	var user models.User
	var err error

	// 尝试通过用户名查找用户
	user, err = s.db.GetUserByUsername(emailOrUsername)
	if err != nil {
		// 如果通过用户名找不到,尝试通过邮箱查找
		user, err = s.db.GetUserByEmail(emailOrUsername)
		if err != nil {
			return nil, errors.New("用户名或邮箱不存在")
		}
	}

	// 验证密码
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, errors.New("密码错误")
	}

	return &user, nil
}

// GetUserByID 根据ID获取用户
func (s *Service) GetUserByID(userID string) (*models.User, error) {
	user, err := s.db.GetUserByID(userID)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
