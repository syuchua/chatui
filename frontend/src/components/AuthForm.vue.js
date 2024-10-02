import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { defineEmits } from 'vue';
import { authService, userService } from '@/services/api';
const { defineProps, defineSlots, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const isLogin = ref(true);
const username = ref('');
const email = ref('');
const emailOrUsername = ref('');
const password = ref('');
const emit = defineEmits(['login', 'register', 'update-user']);
const handleSubmit = async () => {
    try {
        if (isLogin.value) {
            const loginData = { emailOrUsername: emailOrUsername.value, password: password.value };
            const response = await authService.login(loginData.emailOrUsername, loginData.password);
            emit('login', response);
            // 登录成功后立即获取用户信息
            const userInfo = await userService.getUserInfo();
            emit('update-user', userInfo);
        }
        else {
            const registerData = { username: username.value, email: email.value, password: password.value };
            const response = await authService.register(registerData.username, registerData.email, registerData.password);
            emit('register', response);
            // 注册成功后也获取用户信息
            const userInfo = await userService.getUserInfo();
            emit('update-user', userInfo);
        }
    }
    catch (error) {
        console.error('Authentication error:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error response:', error.response.data);
            alert(`Error: ${error.response.data.error || 'An unknown error occurred'}`);
        }
        else {
            alert('An unknown error occurred');
        }
    }
};
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
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-5") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-2xl font-bold text-center text-gray-700 mb-4") }, });
    (__VLS_ctx.isLogin ? 'Welcome Back' : 'Create an Account');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center mb-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.isLogin = true;
            } }, ...{ class: ((['px-4 py-2 rounded-l-md', __VLS_ctx.isLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.isLogin = false;
            } }, ...{ class: ((['px-4 py-2 rounded-r-md', !__VLS_ctx.isLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.handleSubmit) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("space-y-4") }, });
    if (!__VLS_ctx.isLogin) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("username"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("username"), value: ((__VLS_ctx.username)), type: ("text"), required: (true), ...{ class: ("\u006d\u0074\u002d\u0031\u0020\u0062\u006c\u006f\u0063\u006b\u0020\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0062\u0067\u002d\u0067\u0072\u0061\u0079\u002d\u0035\u0030\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006d\u0064\u0020\u0074\u0065\u0078\u0074\u002d\u0073\u006d\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u0073\u006d\u0020\u0070\u006c\u0061\u0063\u0065\u0068\u006f\u006c\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0034\u0030\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0069\u006e\u0064\u0069\u0067\u006f\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0031\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0069\u006e\u0064\u0069\u0067\u006f\u002d\u0035\u0030\u0030") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ((__VLS_ctx.isLogin ? 'emailOrUsername' : 'email')), ...{ class: ("block text-sm font-medium text-gray-700") }, });
    (__VLS_ctx.isLogin ? 'Email or Username' : 'Email Address');
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ((__VLS_ctx.isLogin ? 'emailOrUsername' : 'email')), type: ((__VLS_ctx.isLogin ? 'text' : 'email')), required: (true), ...{ class: ("\u006d\u0074\u002d\u0031\u0020\u0062\u006c\u006f\u0063\u006b\u0020\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0062\u0067\u002d\u0067\u0072\u0061\u0079\u002d\u0035\u0030\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006d\u0064\u0020\u0074\u0065\u0078\u0074\u002d\u0073\u006d\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u0073\u006d\u0020\u0070\u006c\u0061\u0063\u0065\u0068\u006f\u006c\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0034\u0030\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0069\u006e\u0064\u0069\u0067\u006f\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0031\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0069\u006e\u0064\u0069\u0067\u006f\u002d\u0035\u0030\u0030") }, placeholder: ((__VLS_ctx.isLogin ? 'Enter email or username' : 'Enter email')), });
    (__VLS_ctx.emailOrUsername);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("password"), ...{ class: ("block text-sm font-medium text-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("password"), type: ("password"), required: (true), ...{ class: ("\u006d\u0074\u002d\u0031\u0020\u0062\u006c\u006f\u0063\u006b\u0020\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0070\u0078\u002d\u0033\u0020\u0070\u0079\u002d\u0032\u0020\u0062\u0067\u002d\u0067\u0072\u0061\u0079\u002d\u0035\u0030\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006d\u0064\u0020\u0074\u0065\u0078\u0074\u002d\u0073\u006d\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u0073\u006d\u0020\u0070\u006c\u0061\u0063\u0065\u0068\u006f\u006c\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0034\u0030\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0069\u006e\u0064\u0069\u0067\u006f\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0031\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0069\u006e\u0064\u0069\u0067\u006f\u002d\u0035\u0030\u0030") }, });
    (__VLS_ctx.password);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6") }, });
    (__VLS_ctx.isLogin ? 'Sign In' : 'Sign Up');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ("#"), ...{ class: ("font-medium text-indigo-600 hover:text-indigo-500") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ("#"), ...{ class: ("font-medium text-indigo-600 hover:text-indigo-500") }, });
    __VLS_styleScopedClasses['min-h-screen'];
    __VLS_styleScopedClasses['bg-gradient-to-br'];
    __VLS_styleScopedClasses['from-purple-500'];
    __VLS_styleScopedClasses['to-indigo-600'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-xl'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['max-w-md'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['p-5'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['mb-6'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-l-md'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-r-md'];
    __VLS_styleScopedClasses['space-y-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-gray-50'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['placeholder-gray-400'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['focus:ring-1'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-gray-50'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['placeholder-gray-400'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['focus:ring-1'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-3'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-gray-50'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['placeholder-gray-400'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['focus:ring-1'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-transparent'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-indigo-600'];
    __VLS_styleScopedClasses['hover:bg-indigo-700'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-offset-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['px-5'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['bg-gray-50'];
    __VLS_styleScopedClasses['border-t'];
    __VLS_styleScopedClasses['border-gray-200'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-indigo-600'];
    __VLS_styleScopedClasses['hover:text-indigo-500'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-indigo-600'];
    __VLS_styleScopedClasses['hover:text-indigo-500'];
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
            isLogin: isLogin,
            username: username,
            emailOrUsername: emailOrUsername,
            password: password,
            handleSubmit: handleSubmit,
        };
    },
    emits: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
});
;
//# sourceMappingURL=AuthForm.vue.js.map