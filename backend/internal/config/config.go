package config

import (
	"time"

	"github.com/spf13/viper"
)

// Config 定义了应用程序的配置结构体
type Config struct {
	Database struct {
		URL string
	}
	Server struct {
		Address     string
		Environment string
	}
	JWT struct {
		Secret     string
		Expiration time.Duration
	}
	OpenAI struct {
		APIKey  string `mapstructure:"api_key"`
		BaseURL string `mapstructure:"base_url"`
		Model   string
	}
	Logging struct {
		Level string
		File  string
	}
	CORS struct {
		AllowedOrigins []string `mapstructure:"allowed_origins"`
		AllowedMethods []string `mapstructure:"allowed_methods"`
		AllowedHeaders []string `mapstructure:"allowed_headers"`
	}
	WebSocket struct {
		MaxMessageSize int           `mapstructure:"max_message_size"`
		WriteWait      time.Duration `mapstructure:"write_wait"`
		PongWait       time.Duration `mapstructure:"pong_wait"`
		PingPeriod     time.Duration `mapstructure:"ping_period"`
	}
	RateLimit struct {
		RequestsPerSecond float64 `mapstructure:"requests_per_second"`
		Burst             int
	}
}

// Load 加载配置
func Load() (*Config, error) {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("internal/config")
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		return nil, err
	}

	var config Config
	if err := viper.Unmarshal(&config); err != nil {
		return nil, err
	}

	return &config, nil
}
