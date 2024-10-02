import { ref, onMounted } from 'vue';
import AuthForm from './components/AuthForm.vue';
import ChatInterface from './components/ChatInterface.vue';
import router from './router';
import { authService } from './services/api';
import Cookies from 'js-cookie';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const isAuthenticated = ref(false);
const user = ref(null);
const handleLogin = async (data) => {
    Cookies.set('token', data.token, { secure: true, sameSite: 'strict' });
    isAuthenticated.value = true;
    user.value = data.user;
    router.push('/chat');
};
const handleRegister = async (userData) => {
    try {
        const response = await authService.register(userData.name, userData.email, userData.password);
        if (response.token) {
            Cookies.set('token', response.token, { secure: true, sameSite: 'strict' });
            isAuthenticated.value = true;
            user.value = response.user;
            router.push('/chat');
        }
    }
    catch (error) {
        console.error('Registration failed:', error);
        alert('注册失败，请检查您的信息。');
    }
};
const handleLogout = () => {
    Cookies.remove('token');
    isAuthenticated.value = false;
    user.value = null;
    router.push('/');
    alert('您已成功登出。');
};
onMounted(async () => {
    const token = Cookies.get('token');
    if (token) {
        try {
            const response = await authService.verifyToken();
            if (response.valid) {
                isAuthenticated.value = true;
                user.value = response.user;
            }
            else {
                handleLogout();
            }
        }
        catch (error) {
            console.error('Token verification failed:', error);
            handleLogout();
        }
    }
});
const __VLS_fnComponent = (await import('vue')).defineComponent({});
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
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    if (!__VLS_ctx.isAuthenticated) {
        // @ts-ignore
        [AuthForm,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(AuthForm, new AuthForm({ ...{ 'onLogin': {} }, ...{ 'onRegister': {} }, }));
        const __VLS_1 = __VLS_0({ ...{ 'onLogin': {} }, ...{ 'onRegister': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        let __VLS_5;
        const __VLS_6 = {
            onLogin: (__VLS_ctx.handleLogin)
        };
        const __VLS_7 = {
            onRegister: (__VLS_ctx.handleRegister)
        };
        let __VLS_2;
        let __VLS_3;
        const __VLS_4 = __VLS_pickFunctionalComponentCtx(AuthForm, __VLS_1);
    }
    else {
        // @ts-ignore
        [ChatInterface,];
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(ChatInterface, new ChatInterface({ ...{ 'onLogout': {} }, user: ((__VLS_ctx.user)), }));
        const __VLS_9 = __VLS_8({ ...{ 'onLogout': {} }, user: ((__VLS_ctx.user)), }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        let __VLS_13;
        const __VLS_14 = {
            onLogout: (__VLS_ctx.handleLogout)
        };
        let __VLS_10;
        let __VLS_11;
        const __VLS_12 = __VLS_pickFunctionalComponentCtx(ChatInterface, __VLS_9);
    }
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
            AuthForm: AuthForm,
            ChatInterface: ChatInterface,
            isAuthenticated: isAuthenticated,
            user: user,
            handleLogin: handleLogin,
            handleRegister: handleRegister,
            handleLogout: handleLogout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
//# sourceMappingURL=App.vue.js.map