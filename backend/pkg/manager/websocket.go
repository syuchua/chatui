package manager

import (
	"sync"

	"github.com/gorilla/websocket"
)

// Manager 定义了一个WebSocket管理器
type Manager struct {
	clients    map[*websocket.Conn]bool // 存储已连接的客户端
	broadcast  chan []byte              // 广播消息的通道
	register   chan *websocket.Conn     // 注册客户端的通道
	unregister chan *websocket.Conn     // 取消注册客户端的通道
	mutex      sync.Mutex               // 用于保护客户端列表的互斥锁
}

// NewManager 创建并返回一个新的Manager实例
func NewManager() *Manager {
	return &Manager{
		clients:    make(map[*websocket.Conn]bool),
		broadcast:  make(chan []byte),
		register:   make(chan *websocket.Conn),
		unregister: make(chan *websocket.Conn),
	}
}

// Run 启动WebSocket管理器
func (m *Manager) Run() {
	for {
		select {
		case client := <-m.register:
			m.mutex.Lock()
			m.clients[client] = true
			m.mutex.Unlock()
		case client := <-m.unregister:
			m.mutex.Lock()
			if _, ok := m.clients[client]; ok {
				delete(m.clients, client)
				client.Close()
			}
			m.mutex.Unlock()
		case message := <-m.broadcast:
			m.mutex.Lock()
			for client := range m.clients {
				if err := client.WriteMessage(websocket.TextMessage, message); err != nil {
					client.Close()
					delete(m.clients, client)
				}
			}
			m.mutex.Unlock()
		}
	}
}
