import { MarkdownRenderer } from '@/components/ui/markdown';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-vue-next';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const __VLS_props = defineProps();
function formatTime(timestamp) {
    if (!timestamp)
        return '';
    return new Date(timestamp).toLocaleTimeString();
}
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex-1 overflow-auto p-4") }, });
    if (__VLS_ctx.messages.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        (__VLS_ctx.messages.length);
    }
    for (const [msg] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((msg.id)), ...{ class: ("mb-4 flex") }, ...{ class: ((msg.sender === 'user' ? 'justify-end' : 'justify-start')) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((['p-3 rounded-lg max-w-[70%]',
                    msg.sender === 'user'
                        ? 'bg-blue-100 dark:bg-blue-800 text-black dark:text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white'])) }, });
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.MarkdownRenderer;
        /** @type { [typeof __VLS_components.MarkdownRenderer, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ content: ((msg.content)), }));
        const __VLS_2 = __VLS_1({ content: ((msg.content)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center") }, });
        (__VLS_ctx.formatTime(msg.timestamp));
        if (msg.sender === 'user') {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("ml-2") }, });
            if (msg.status === 'sent') {
                const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.CheckCircle2;
                /** @type { [typeof __VLS_components.CheckCircle2, ] } */
                // @ts-ignore
                const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("h-4 w-4 text-green-500") }, }));
                const __VLS_8 = __VLS_7({ ...{ class: ("h-4 w-4 text-green-500") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
            }
            else if (msg.status === 'sending') {
                const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.Loader2;
                /** @type { [typeof __VLS_components.Loader2, ] } */
                // @ts-ignore
                const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ class: ("h-4 w-4 animate-spin") }, }));
                const __VLS_14 = __VLS_13({ ...{ class: ("h-4 w-4 animate-spin") }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
            }
            else if (msg.status === 'error') {
                const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.AlertCircle;
                /** @type { [typeof __VLS_components.AlertCircle, ] } */
                // @ts-ignore
                const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ class: ("h-4 w-4 text-red-500") }, }));
                const __VLS_20 = __VLS_19({ ...{ class: ("h-4 w-4 text-red-500") }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
            }
        }
    }
    __VLS_styleScopedClasses['flex-1'];
    __VLS_styleScopedClasses['overflow-auto'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['p-3'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['max-w-[70%]'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['dark:text-gray-400'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['w-4'];
    __VLS_styleScopedClasses['text-green-500'];
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['w-4'];
    __VLS_styleScopedClasses['animate-spin'];
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['w-4'];
    __VLS_styleScopedClasses['text-red-500'];
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
            MarkdownRenderer: MarkdownRenderer,
            CheckCircle2: CheckCircle2,
            Loader2: Loader2,
            AlertCircle: AlertCircle,
            formatTime: formatTime,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
;
//# sourceMappingURL=ChatMessages.vue.js.map