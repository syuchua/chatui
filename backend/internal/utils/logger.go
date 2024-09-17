package utils

import (
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/sirupsen/logrus"
	"gopkg.in/natefinch/lumberjack.v2"
)

var Log *logrus.Logger

// InitLogger 初始化日志
func InitLogger() {
	Log = logrus.New()

	// 设置日志格式为 JSON
	Log.SetFormatter(&logrus.JSONFormatter{})

	// 设置日志级别
	Log.SetLevel(logrus.InfoLevel)

	// 创建 logs 目录（如果不存在）
	logsDir := "logs"
	if err := os.MkdirAll(logsDir, 0755); err != nil {
		fmt.Printf("无法创建日志目录: %v\n", err)
		os.Exit(1)
	}

	// 设置日志文件名（包含日期）
	currentTime := time.Now()
	logFileName := filepath.Join(logsDir, fmt.Sprintf("app_%s.log", currentTime.Format("2006-01-02")))

	// 使用 lumberjack 进行日志轮转
	Log.SetOutput(&lumberjack.Logger{
		Filename:   logFileName,
		MaxSize:    100, // 每个日志文件的最大大小（MB）
		MaxBackups: 3,   // 保留的旧日志文件数量
		MaxAge:     28,  // 保留日志文件的最大天数
		Compress:   true,
	})

	// 同时将日志输出到控制台
	Log.AddHook(new(ConsoleHook))
}

// ConsoleHook 用于将日志同时输出到控制台
type ConsoleHook struct{}

func (hook *ConsoleHook) Levels() []logrus.Level {
	return logrus.AllLevels
}

func (hook *ConsoleHook) Fire(entry *logrus.Entry) error {
	line, err := entry.String()
	if err != nil {
		return err
	}
	fmt.Printf("%s", line)
	return nil
}
