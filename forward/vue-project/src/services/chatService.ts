import axios from 'axios';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Conversation, Message } from '../types';

const API_URL = 'http://localhost:8080/api';

export function useChatService() {
	const conversations: Ref<Conversation[]> = ref([]);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	const getAuthHeaders = () => ({
		'Authorization': `Bearer ${localStorage.getItem('token')}`
	});

	const fetchConversations = async (): Promise<Conversation[]> => {
		isLoading.value = true;
		error.value = null;
		try {
			const response = await axios.get<{ conversations: Conversation[] }>(`${API_URL}/conversations`, { headers: getAuthHeaders() });
			return response.data.conversations;
		} catch (err) {
			error.value = '获取对话列表失败';
			console.error(err);
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	const sendMessage = async (content: string, conversationId: string): Promise<Message> => {
		isLoading.value = true;
		error.value = null;
		try {
			const response = await axios.post<Message>(`${API_URL}/chat`, {
				content,
				conversation_id: conversationId
			}, { headers: getAuthHeaders() });
			return response.data;
		} catch (err) {
			error.value = '发送消息失败';
			console.error(err);
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	const startNewConversation = async (): Promise<string> => {
		isLoading.value = true;
		error.value = null;
		try {
			const response = await axios.post<{ id: string }>(`${API_URL}/conversations`, {}, { headers: getAuthHeaders() });
			return response.data.id;
		} catch (err) {
			error.value = '创建新对话失败';
			console.error(err);
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	const updateConversationTitle = async (conversationId: string, title: string): Promise<void> => {
		isLoading.value = true;
		error.value = null;
		try {
			await axios.put(`${API_URL}/conversations/${conversationId}/title`, { title }, { headers: getAuthHeaders() });
			await fetchConversations(); // 刷新对话列表
		} catch (err) {
			error.value = '更新对话标题失败';
			console.error(err);
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	return {
		conversations,
		isLoading,
		error,
		fetchConversations,
		sendMessage,
		startNewConversation,
		updateConversationTitle,
	};
}
