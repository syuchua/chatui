import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-vue-next';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const __VLS_props = defineProps();
const __VLS_emit = defineEmits(['select']);
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.DropdownMenu;
    /** @type { [typeof __VLS_components.DropdownMenu, typeof __VLS_components.DropdownMenu, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.DropdownMenuTrigger;
    /** @type { [typeof __VLS_components.DropdownMenuTrigger, typeof __VLS_components.DropdownMenuTrigger, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ asChild: (true), }));
    const __VLS_8 = __VLS_7({ asChild: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ variant: ("outline"), ...{ class: ("flex items-center") }, }));
    const __VLS_14 = __VLS_13({ variant: ("outline"), ...{ class: ("flex items-center") }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    (__VLS_ctx.selectedModel || '选择模型');
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.ChevronDown;
    /** @type { [typeof __VLS_components.ChevronDown, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ class: ("ml-2 h-4 w-4") }, }));
    const __VLS_20 = __VLS_19({ ...{ class: ("ml-2 h-4 w-4") }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_nonNullable(__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    __VLS_nonNullable(__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.DropdownMenuContent;
    /** @type { [typeof __VLS_components.DropdownMenuContent, typeof __VLS_components.DropdownMenuContent, ] } */
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    for (const [model] of __VLS_getVForSourceType((__VLS_ctx.models))) {
        const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.DropdownMenuItem;
        /** @type { [typeof __VLS_components.DropdownMenuItem, typeof __VLS_components.DropdownMenuItem, ] } */
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ ...{ 'onSelect': {} }, key: ((model)), }));
        const __VLS_32 = __VLS_31({ ...{ 'onSelect': {} }, key: ((model)), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        let __VLS_36;
        const __VLS_37 = {
            onSelect: (...[$event]) => {
                __VLS_ctx.$emit('select', model);
            }
        };
        let __VLS_33;
        let __VLS_34;
        (model);
        __VLS_nonNullable(__VLS_35.slots).default;
        const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
    }
    __VLS_nonNullable(__VLS_29.slots).default;
    const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['ml-2'];
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
            Button: Button,
            DropdownMenu: DropdownMenu,
            DropdownMenuContent: DropdownMenuContent,
            DropdownMenuItem: DropdownMenuItem,
            DropdownMenuTrigger: DropdownMenuTrigger,
            ChevronDown: ChevronDown,
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
//# sourceMappingURL=ModelSelector.vue.js.map