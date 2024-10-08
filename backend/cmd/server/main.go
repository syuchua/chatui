package main

import (
	"chatui/backend/internal/api"
	"chatui/backend/internal/config"
	"chatui/backend/internal/db"
	"chatui/backend/internal/services/ai"
	"chatui/backend/internal/utils"

	"github.com/sirupsen/logrus"
)

func main() {
	// 设置日志级别
	utils.InitLogger()

	// 加载配置
	cfg, err := config.Load()
	if err != nil {
		utils.Log.Fatalf("Failed to load config: %v", err)
	}

	if cfg == nil {
		utils.Log.Fatal("Config is nil after loading")
	}

	utils.Log.Infof("Loaded config: %+v", cfg)

	// 连接到数据库
	logger := logrus.New()
	database, err := db.NewDatabase(cfg, logger)
	if err != nil {
		utils.Log.Fatalf("Failed to connect to database: %v", err)
	}

	// 执行数据库迁移
	err = database.MigrateDB()
	if err != nil {
		utils.Log.Fatalf("Failed to migrate database: %v", err)
	}

	// 创建AI服务
	aiService := ai.NewService(cfg, utils.Log)

	// 创建服务器
	server := api.NewServer(cfg, database, aiService)
	utils.Log.Fatal(server.Start())

}
