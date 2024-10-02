import { computed } from 'vue';
import { DropdownMenuSubTrigger, useForwardProps, } from 'radix-vue';
import { ChevronRight } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
const forwardedProps = useForwardProps(delegatedProps);
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.DropdownMenuSubTrigger;
    /** @type { [typeof __VLS_components.DropdownMenuSubTrigger, typeof __VLS_components.DropdownMenuSubTrigger, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...(__VLS_ctx.forwardedProps), ...{ class: ((__VLS_ctx.cn('flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent', props.class))) }, }));
    const __VLS_2 = __VLS_1({ ...(__VLS_ctx.forwardedProps), ...{ class: ((__VLS_ctx.cn('flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent', props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    const __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.ChevronRight;
    /** @type { [typeof __VLS_components.ChevronRight, ] } */
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({ ...{ class: ("ml-auto h-4 w-4") }, }));
    const __VLS_9 = __VLS_8({ ...{ class: ("ml-auto h-4 w-4") }, }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['ml-auto'];
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['w-4'];
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
            DropdownMenuSubTrigger: DropdownMenuSubTrigger,
            ChevronRight: ChevronRight,
            cn: cn,
            forwardedProps: forwardedProps,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default {};
;
//# sourceMappingURL=DropdownMenuSubTrigger.vue.js.map