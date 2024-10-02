import { TransitionRoot, TransitionChild } from '@headlessui/vue';
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.TransitionRoot;
    /** @type { [typeof __VLS_components.TransitionRoot, typeof __VLS_components.TransitionRoot, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ appear: (true), show: ((!!__VLS_ctx.message)), as: ("template"), }));
    const __VLS_2 = __VLS_1({ appear: (true), show: ((!!__VLS_ctx.message)), as: ("template"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("fixed bottom-4 right-4 z-50") }, });
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.TransitionChild;
    /** @type { [typeof __VLS_components.TransitionChild, typeof __VLS_components.TransitionChild, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ as: ("template"), enter: ("ease-out duration-300"), enterFrom: ("opacity-0 translate-y-2"), enterTo: ("opacity-100 translate-y-0"), leave: ("ease-in duration-200"), leaveFrom: ("opacity-100 translate-y-0"), leaveTo: ("opacity-0 translate-y-2"), }));
    const __VLS_8 = __VLS_7({ as: ("template"), enter: ("ease-out duration-300"), enterFrom: ("opacity-0 translate-y-2"), enterTo: ("opacity-100 translate-y-0"), leave: ("ease-in duration-200"), leaveFrom: ("opacity-100 translate-y-0"), leaveTo: ("opacity-0 translate-y-2"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-red-500 text-white p-3 rounded shadow-lg") }, });
    (__VLS_ctx.message);
    __VLS_nonNullable(__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['bottom-4'];
    __VLS_styleScopedClasses['right-4'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['bg-red-500'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['p-3'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['shadow-lg'];
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
            TransitionRoot: TransitionRoot,
            TransitionChild: TransitionChild,
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
//# sourceMappingURL=ErrorToast.vue.js.map