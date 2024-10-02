import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ConversationSidebar from './ConversationSidebar.vue';
import ChatHeader from './ChatHeader.vue';
import ChatMessages from './ChatMessages.vue';
import ChatInput from './ChatInput.vue';
import SettingsDialog from './SettingsDialog.vue';
import ErrorToast from './ErrorToast.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import { chatService, userService, authService } from '@/services/api';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const route = useRoute();
const router = useRouter();
// 使用 props 接收用户信息
let __VLS_typeProps;
const props = defineProps();
const emit = defineEmits(['logout']);
const user = ref(props.user);
const models = ref([]);
const selectedModel = ref('');
const apiKey = ref('');
const baseUrl = ref('');
const messages = ref([]);
const conversations = ref([]);
const currentConversationId = ref('');
const isSettingsOpen = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);
const isDarkMode = ref(false);
async function startNewConversation() {
    try {
        const newConversation = await chatService.startNewConversation();
        currentConversationId.value = newConversation.id;
        conversations.value.unshift({
            id: newConversation.id,
            title: newConversation.title || 'New Conversation',
            date: new Date().toISOString(),
        });
        messages.value = [];
        return newConversation;
    }
    catch (error) {
        console.error('Failed to start new conversation:', error);
        throw error;
    }
}
async function loadMessages(conversationId) {
    try {
        currentConversationId.value = conversationId;
        const response = await chatService.getMessages(conversationId);
        messages.value = Array.isArray(response.messages) ? response.messages : [];
    }
    catch (error) {
        console.error('加载消息失败:', error);
        messages.value = [];
    }
}
async function sendMessage(content) {
    if (content.trim()) {
        isLoading.value = true;
        try {
            if (!currentConversationId.value) {
                await startNewConversation();
            }
            const newMessage = {
                id: Date.now().toString(),
                content,
                sender: 'user',
                conversationId: currentConversationId.value,
                timestamp: new Date().toISOString(),
                status: 'sending'
            };
            messages.value.push(newMessage);
            const response = await chatService.sendMessage(currentConversationId.value, content);
            newMessage.status = 'sent';
            messages.value.push(response);
        }
        catch (error) {
            console.error('Failed to send message:', error);
            errorMessage.value = '发送消息失败,请重试。';
            setTimeout(() => {
                errorMessage.value = '';
            }, 2000);
        }
        finally {
            isLoading.value = false;
        }
    }
}
async function loadUserInfo() {
    try {
        const userInfo = await userService.getUserInfo();
        user.value = userInfo;
    }
    catch (error) {
        console.error('Failed to load user info:', error);
    }
}
function handleLogout() {
    emit('logout');
}
async function loadSettings() {
    try {
        const settings = await userService.getSettings();
        applySettings(settings);
    }
    catch (error) {
        console.error('Failed to load settings:', error);
        loadSettingsFromLocalStorage();
    }
}
function applySettings(settings) {
    models.value = settings.models || [];
    baseUrl.value = settings.baseUrl || '';
    apiKey.value = settings.apiKey || '';
    selectedModel.value = settings.selectedModel || '';
}
async function updateSettings(newSettings) {
    try {
        await userService.updateSettings(newSettings);
        baseUrl.value = newSettings.baseUrl;
        apiKey.value = newSettings.apiKey;
        models.value = newSettings.models;
        selectedModel.value = newSettings.models[0] || '';
        closeSettings();
    }
    catch (error) {
        console.error('Failed to update settings:', error);
        errorMessage.value = '更新设置失败,请重试。';
    }
}
function loadSettingsFromLocalStorage() {
    const settings = {
        models: JSON.parse(localStorage.getItem('models') || '[]'),
        baseUrl: localStorage.getItem('baseUrl') || '',
        apiKey: localStorage.getItem('apiKey') || '',
        selectedModel: localStorage.getItem('selectedModel') || ''
    };
    applySettings(settings);
}
function saveSettingsToLocalStorage(settings) {
    localStorage.setItem('models', JSON.stringify(settings.models));
    localStorage.setItem('baseUrl', settings.baseUrl);
    localStorage.setItem('apiKey', settings.apiKey);
    localStorage.setItem('selectedModel', settings.selectedModel);
}
function openSettings() {
    isSettingsOpen.value = true;
}
function closeSettings() {
    isSettingsOpen.value = false;
}
function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle('dark', isDarkMode.value);
    localStorage.setItem('darkMode', isDarkMode.value ? 'true' : 'false');
}
function initDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode');
    isDarkMode.value = savedDarkMode === 'true';
    document.documentElement.classList.toggle('dark', isDarkMode.value);
}
async function loadConversations() {
    try {
        const loadedConversations = await chatService.getConversations();
        conversations.value = Array.isArray(loadedConversations) ? loadedConversations : [];
    }
    catch (error) {
        console.error('Failed to load conversations:', error);
        conversations.value = [];
    }
}
onMounted(async () => {
    initDarkMode();
    try {
        const { valid } = await authService.verifyToken();
        if (!valid) {
            console.log('Token is invalid');
            router.push('/');
        }
        else {
            console.log('Token is valid');
            await loadUserInfo();
            await loadSettings();
            await loadConversations();
            if (conversations.value.length > 0) {
                await loadMessages(conversations.value[0].id);
            }
            else {
                await startNewConversation();
            }
        }
    }
    catch (error) {
        console.error('Token verification failed:', error);
        router.push('/');
    }
});
watch(isDarkMode, (newValue) => {
    localStorage.setItem('darkMode', newValue ? 'true' : 'false');
});
const __VLS_exposed = {
    startNewConversation
};
defineExpose({
    startNewConversation
});
const __VLS_fnComponent = (await import('vue')).defineComponent({
    emits: {},
});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex h-screen bg-gray-100 dark:bg-gray-900") }, });
    // @ts-ignore
    [ConversationSidebar,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ConversationSidebar, new ConversationSidebar({ ...{ 'onNewConversation': {} }, ...{ 'onSelectConversation': {} }, ...{ 'onLogout': {} }, conversations: ((__VLS_ctx.conversations)), currentConversationId: ((__VLS_ctx.currentConversationId)), user: ((__VLS_ctx.user)), }));
    const __VLS_1 = __VLS_0({ ...{ 'onNewConversation': {} }, ...{ 'onSelectConversation': {} }, ...{ 'onLogout': {} }, conversations: ((__VLS_ctx.conversations)), currentConversationId: ((__VLS_ctx.currentConversationId)), user: ((__VLS_ctx.user)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_5;
    const __VLS_6 = {
        onNewConversation: (__VLS_ctx.startNewConversation)
    };
    const __VLS_7 = {
        onSelectConversation: (__VLS_ctx.loadMessages)
    };
    const __VLS_8 = {
        onLogout: (__VLS_ctx.handleLogout)
    };
    let __VLS_2;
    let __VLS_3;
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(ConversationSidebar, __VLS_1);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex-1 flex flex-col bg-gray-100 dark:bg-gray-900") }, });
    // @ts-ignore
    [ChatHeader,];
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(ChatHeader, new ChatHeader({ ...{ 'onSelectModel': {} }, ...{ 'onOpenSettings': {} }, ...{ 'onToggleDarkMode': {} }, models: ((__VLS_ctx.models)), selectedModel: ((__VLS_ctx.selectedModel)), isDarkMode: ((__VLS_ctx.isDarkMode)), }));
    const __VLS_10 = __VLS_9({ ...{ 'onSelectModel': {} }, ...{ 'onOpenSettings': {} }, ...{ 'onToggleDarkMode': {} }, models: ((__VLS_ctx.models)), selectedModel: ((__VLS_ctx.selectedModel)), isDarkMode: ((__VLS_ctx.isDarkMode)), }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_14;
    const __VLS_15 = {
        onSelectModel: (...[$event]) => {
            __VLS_ctx.selectedModel = $event;
        }
    };
    const __VLS_16 = {
        onOpenSettings: (__VLS_ctx.openSettings)
    };
    const __VLS_17 = {
        onToggleDarkMode: (__VLS_ctx.toggleDarkMode)
    };
    let __VLS_11;
    let __VLS_12;
    const __VLS_13 = __VLS_pickFunctionalComponentCtx(ChatHeader, __VLS_10);
    // @ts-ignore
    [ChatMessages,];
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(ChatMessages, new ChatMessages({ messages: ((__VLS_ctx.messages)), }));
    const __VLS_19 = __VLS_18({ messages: ((__VLS_ctx.messages)), }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    // @ts-ignore
    [ChatInput,];
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(ChatInput, new ChatInput({ ...{ 'onSendMessage': {} }, }));
    const __VLS_24 = __VLS_23({ ...{ 'onSendMessage': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    let __VLS_28;
    const __VLS_29 = {
        onSendMessage: (__VLS_ctx.sendMessage)
    };
    let __VLS_25;
    let __VLS_26;
    const __VLS_27 = __VLS_pickFunctionalComponentCtx(ChatInput, __VLS_24);
    // @ts-ignore
    [SettingsDialog,];
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(SettingsDialog, new SettingsDialog({ ...{ 'onClose': {} }, ...{ 'onUpdateSettings': {} }, isOpen: ((__VLS_ctx.isSettingsOpen)), baseUrl: ((__VLS_ctx.baseUrl)), apiKey: ((__VLS_ctx.apiKey)), models: ((__VLS_ctx.models)), }));
    const __VLS_31 = __VLS_30({ ...{ 'onClose': {} }, ...{ 'onUpdateSettings': {} }, isOpen: ((__VLS_ctx.isSettingsOpen)), baseUrl: ((__VLS_ctx.baseUrl)), apiKey: ((__VLS_ctx.apiKey)), models: ((__VLS_ctx.models)), }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    let __VLS_35;
    const __VLS_36 = {
        onClose: (__VLS_ctx.closeSettings)
    };
    const __VLS_37 = {
        onUpdateSettings: (__VLS_ctx.updateSettings)
    };
    let __VLS_32;
    let __VLS_33;
    const __VLS_34 = __VLS_pickFunctionalComponentCtx(SettingsDialog, __VLS_31);
    // @ts-ignore
    [ErrorToast,];
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(ErrorToast, new ErrorToast({ message: ((__VLS_ctx.errorMessage)), }));
    const __VLS_39 = __VLS_38({ message: ((__VLS_ctx.errorMessage)), }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    // @ts-ignore
    [LoadingIndicator,];
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(LoadingIndicator, new LoadingIndicator({ isLoading: ((__VLS_ctx.isLoading)), message: ("正在思考回复..."), }));
    const __VLS_44 = __VLS_43({ isLoading: ((__VLS_ctx.isLoading)), message: ("正在思考回复..."), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['h-screen'];
    __VLS_styleScopedClasses['bg-gray-100'];
    __VLS_styleScopedClasses['dark:bg-gray-900'];
    __VLS_styleScopedClasses['flex-1'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['bg-gray-100'];
    __VLS_styleScopedClasses['dark:bg-gray-900'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ConversationSidebar: ConversationSidebar,
            ChatHeader: ChatHeader,
            ChatMessages: ChatMessages,
            ChatInput: ChatInput,
            SettingsDialog: SettingsDialog,
            ErrorToast: ErrorToast,
            LoadingIndicator: LoadingIndicator,
            user: user,
            models: models,
            selectedModel: selectedModel,
            apiKey: apiKey,
            baseUrl: baseUrl,
            messages: messages,
            conversations: conversations,
            currentConversationId: currentConversationId,
            isSettingsOpen: isSettingsOpen,
            errorMessage: errorMessage,
            isLoading: isLoading,
            isDarkMode: isDarkMode,
            startNewConversation: startNewConversation,
            loadMessages: loadMessages,
            sendMessage: sendMessage,
            handleLogout: handleLogout,
            updateSettings: updateSettings,
            openSettings: openSettings,
            closeSettings: closeSettings,
            toggleDarkMode: toggleDarkMode,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    emits: {},
    __typeProps: {},
});
;
//# sourceMappingURL=ChatInterface.vue.js.map