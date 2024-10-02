import { Loader2 } from 'lucide-vue-next';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const __VLS_props = defineProps();
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
    if (__VLS_ctx.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg") }, });
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Loader2;
        /** @type { [typeof __VLS_components.Loader2, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: ("h-8 w-8 animate-spin text-blue-500") }, }));
        const __VLS_2 = __VLS_1({ ...{ class: ("h-8 w-8 animate-spin text-blue-500") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-2 text-gray-600 dark:text-gray-300") }, });
        (__VLS_ctx.message);
    }
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['bg-black'];
    __VLS_styleScopedClasses['bg-opacity-50'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['dark:bg-gray-800'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['h-8'];
    __VLS_styleScopedClasses['w-8'];
    __VLS_styleScopedClasses['animate-spin'];
    __VLS_styleScopedClasses['text-blue-500'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['dark:text-gray-300'];
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
            Loader2: Loader2,
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
//# sourceMappingURL=LoadingIndicator.vue.js.map