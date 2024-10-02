import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-vue-next';
import UserInfo from './UserInfo.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const __VLS_props = defineProps();
const __VLS_emit = defineEmits(['new-conversation', 'select-conversation', 'logout']);
function formatDate(dateString) {
    if (!dateString)
        return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex-1 overflow-y-auto") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-xl font-bold mb-4 dark:text-white") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onClick': {} }, ...{ class: ("mb-4 p-2 bg-blue-500 text-white rounded-full w-full hover:bg-blue-600 transition-colors duration-200") }, }));
    const __VLS_2 = __VLS_1({ ...{ 'onClick': {} }, ...{ class: ("mb-4 p-2 bg-blue-500 text-white rounded-full w-full hover:bg-blue-600 transition-colors duration-200") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onClick: (...[$event]) => {
            __VLS_ctx.$emit('new-conversation');
        }
    };
    let __VLS_3;
    let __VLS_4;
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    for (const [conv] of __VLS_getVForSourceType((__VLS_ctx.conversations))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.$emit('select-conversation', conv.id);
                } }, key: ((conv.id)), ...{ class: ("mt-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200") }, ...{ class: (({ 'bg-blue-100 dark:bg-blue-900': conv.id === __VLS_ctx.currentConversationId })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center") }, });
        const __VLS_8 = __VLS_resolvedLocalAndGlobalComponents.MessageSquare;
        /** @type { [typeof __VLS_components.MessageSquare, ] } */
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ ...{ class: ("w-5 h-5 mr-3 text-gray-500 dark:text-gray-400") }, }));
        const __VLS_10 = __VLS_9({ ...{ class: ("w-5 h-5 mr-3 text-gray-500 dark:text-gray-400") }, }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-sm font-medium dark:text-white") }, });
        (conv.title || 'Untitled');
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-xs text-gray-400 dark:text-gray-500 mt-1 block") }, });
        (__VLS_ctx.formatDate(conv.date));
    }
    // @ts-ignore
    [UserInfo,];
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(UserInfo, new UserInfo({ ...{ 'onLogout': {} }, user: ((__VLS_ctx.user)), }));
    const __VLS_15 = __VLS_14({ ...{ 'onLogout': {} }, user: ((__VLS_ctx.user)), }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    let __VLS_19;
    const __VLS_20 = {
        onLogout: (...[$event]) => {
            __VLS_ctx.$emit('logout');
        }
    };
    let __VLS_16;
    let __VLS_17;
    const __VLS_18 = __VLS_pickFunctionalComponentCtx(UserInfo, __VLS_15);
    __VLS_styleScopedClasses['w-64'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['dark:bg-gray-800'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['flex-1'];
    __VLS_styleScopedClasses['overflow-y-auto'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['dark:text-white'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['bg-blue-500'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['hover:bg-blue-600'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['p-3'];
    __VLS_styleScopedClasses['hover:bg-gray-100'];
    __VLS_styleScopedClasses['dark:hover:bg-gray-700'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['bg-blue-100'];
    __VLS_styleScopedClasses['dark:bg-blue-900'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['mr-3'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['dark:text-gray-400'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['dark:text-white'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['dark:text-gray-500'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
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
            Button: Button,
            MessageSquare: MessageSquare,
            UserInfo: UserInfo,
            formatDate: formatDate,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
;
//# sourceMappingURL=ConversationSidebar.vue.js.map