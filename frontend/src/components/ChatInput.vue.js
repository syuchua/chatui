import { ref } from 'vue';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-vue-next';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const inputMessage = ref('');
const emit = defineEmits(['send-message']);
function sendMessage() {
    if (inputMessage.value.trim()) {
        emit('send-message', inputMessage.value);
        inputMessage.value = '';
    }
}
function newLine(event) {
    const target = event.target;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    inputMessage.value = inputMessage.value.substring(0, start) + '\n' + inputMessage.value.substring(end);
    // 在下一个事件循环中设置光标位置,以确保在 Vue 更新 DOM 后执行
    setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
    }, 0);
}
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center space-x-2") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Textarea;
    /** @type { [typeof __VLS_components.Textarea, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onKeydown': {} }, ...{ 'onKeydown': {} }, modelValue: ((__VLS_ctx.inputMessage)), placeholder: ("输入消息,按 Enter 发送,Shift+Enter 换行..."), ...{ class: ("flex-1 rounded-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-400") }, rows: ("3"), }));
    const __VLS_2 = __VLS_1({ ...{ 'onKeydown': {} }, ...{ 'onKeydown': {} }, modelValue: ((__VLS_ctx.inputMessage)), placeholder: ("输入消息,按 Enter 发送,Shift+Enter 换行..."), ...{ class: ("flex-1 rounded-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-400") }, rows: ("3"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onKeydown: (__VLS_ctx.sendMessage)
    };
    const __VLS_8 = {
        onKeydown: (__VLS_ctx.newLine)
    };
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    const __VLS_9 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({ ...{ 'onClick': {} }, size: ("icon"), ...{ class: ("bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition-colors duration-200") }, }));
    const __VLS_11 = __VLS_10({ ...{ 'onClick': {} }, size: ("icon"), ...{ class: ("bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition-colors duration-200") }, }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_15;
    const __VLS_16 = {
        onClick: (__VLS_ctx.sendMessage)
    };
    let __VLS_12;
    let __VLS_13;
    const __VLS_17 = __VLS_resolvedLocalAndGlobalComponents.Send;
    /** @type { [typeof __VLS_components.Send, ] } */
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({ ...{ class: ("h-5 w-5") }, }));
    const __VLS_19 = __VLS_18({ ...{ class: ("h-5 w-5") }, }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_nonNullable(__VLS_14.slots).default;
    const __VLS_14 = __VLS_pickFunctionalComponentCtx(__VLS_9, __VLS_11);
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['dark:bg-gray-800'];
    __VLS_styleScopedClasses['border-t'];
    __VLS_styleScopedClasses['dark:border-gray-700'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-2'];
    __VLS_styleScopedClasses['flex-1'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['dark:bg-gray-700'];
    __VLS_styleScopedClasses['dark:text-white'];
    __VLS_styleScopedClasses['dark:placeholder-gray-400'];
    __VLS_styleScopedClasses['bg-blue-500'];
    __VLS_styleScopedClasses['hover:bg-blue-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['p-3'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['w-5'];
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
            Textarea: Textarea,
            Button: Button,
            Send: Send,
            inputMessage: inputMessage,
            sendMessage: sendMessage,
            newLine: newLine,
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
//# sourceMappingURL=ChatInput.vue.js.map