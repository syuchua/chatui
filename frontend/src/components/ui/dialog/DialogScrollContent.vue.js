import { computed } from 'vue';
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, useForwardPropsEmits, } from 'radix-vue';
import { X } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const emits = defineEmits();
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
const forwarded = useForwardPropsEmits(delegatedProps, emits);
const __VLS_fnComponent = (await import('vue')).defineComponent({
    __typeEmits: {},
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.DialogPortal;
    /** @type { [typeof __VLS_components.DialogPortal, typeof __VLS_components.DialogPortal, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.DialogOverlay;
    /** @type { [typeof __VLS_components.DialogOverlay, typeof __VLS_components.DialogOverlay, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0") }, }));
    const __VLS_8 = __VLS_7({ ...{ class: ("fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.DialogContent;
    /** @type { [typeof __VLS_components.DialogContent, typeof __VLS_components.DialogContent, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ 'onPointerDownOutside': {} }, ...{ class: ((__VLS_ctx.cn('relative z-50 grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full', props.class))) }, ...(__VLS_ctx.forwarded), }));
    const __VLS_14 = __VLS_13({ ...{ 'onPointerDownOutside': {} }, ...{ class: ((__VLS_ctx.cn('relative z-50 grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full', props.class))) }, ...(__VLS_ctx.forwarded), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    let __VLS_18;
    const __VLS_19 = {
        onPointerDownOutside: ((event) => {
            const originalEvent = event.detail.originalEvent;
            const target = originalEvent.target;
            if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
                event.preventDefault();
            }
        })
    };
    let __VLS_15;
    let __VLS_16;
    var __VLS_20 = {};
    const __VLS_21 = __VLS_resolvedLocalAndGlobalComponents.DialogClose;
    /** @type { [typeof __VLS_components.DialogClose, typeof __VLS_components.DialogClose, ] } */
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({ ...{ class: ("absolute top-3 right-3 p-0.5 transition-colors rounded-md hover:bg-secondary") }, }));
    const __VLS_23 = __VLS_22({ ...{ class: ("absolute top-3 right-3 p-0.5 transition-colors rounded-md hover:bg-secondary") }, }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    const __VLS_27 = __VLS_resolvedLocalAndGlobalComponents.X;
    /** @type { [typeof __VLS_components.X, ] } */
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({ ...{ class: ("w-4 h-4") }, }));
    const __VLS_29 = __VLS_28({ ...{ class: ("w-4 h-4") }, }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("sr-only") }, });
    __VLS_nonNullable(__VLS_26.slots).default;
    const __VLS_26 = __VLS_pickFunctionalComponentCtx(__VLS_21, __VLS_23);
    __VLS_nonNullable(__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    __VLS_nonNullable(__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['place-items-center'];
    __VLS_styleScopedClasses['overflow-y-auto'];
    __VLS_styleScopedClasses['bg-black/80'];
    __VLS_styleScopedClasses['data-[state=open]:animate-in'];
    __VLS_styleScopedClasses['data-[state=closed]:animate-out'];
    __VLS_styleScopedClasses['data-[state=closed]:fade-out-0'];
    __VLS_styleScopedClasses['data-[state=open]:fade-in-0'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['top-3'];
    __VLS_styleScopedClasses['right-3'];
    __VLS_styleScopedClasses['p-0.5'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['hover:bg-secondary'];
    __VLS_styleScopedClasses['w-4'];
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['sr-only'];
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
            DialogClose: DialogClose,
            DialogContent: DialogContent,
            DialogOverlay: DialogOverlay,
            DialogPortal: DialogPortal,
            X: X,
            cn: cn,
            forwarded: forwarded,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
export default {};
;
//# sourceMappingURL=DialogScrollContent.vue.js.map