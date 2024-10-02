import { Button } from "@/components/ui/button";
import { Settings, Sun, Moon } from 'lucide-vue-next';
import ModelSelector from './ModelSelector.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const __VLS_props = defineProps();
const __VLS_emit = defineEmits(['select-model', 'open-settings', 'toggle-dark-mode']);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({ ...{ class: ("bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center") }, });
    // @ts-ignore
    [ModelSelector,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ModelSelector, new ModelSelector({ ...{ 'onSelect': {} }, models: ((__VLS_ctx.models)), selectedModel: ((__VLS_ctx.selectedModel)), }));
    const __VLS_1 = __VLS_0({ ...{ 'onSelect': {} }, models: ((__VLS_ctx.models)), selectedModel: ((__VLS_ctx.selectedModel)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_5;
    const __VLS_6 = {
        onSelect: (...[$event]) => {
            __VLS_ctx.$emit('select-model', $event);
        }
    };
    let __VLS_2;
    let __VLS_3;
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(ModelSelector, __VLS_1);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center") }, });
    const __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({ ...{ 'onClick': {} }, variant: ("ghost"), size: ("icon"), ...{ class: ("hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200") }, }));
    const __VLS_9 = __VLS_8({ ...{ 'onClick': {} }, variant: ("ghost"), size: ("icon"), ...{ class: ("hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200") }, }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_13;
    const __VLS_14 = {
        onClick: (...[$event]) => {
            __VLS_ctx.$emit('open-settings');
        }
    };
    let __VLS_10;
    let __VLS_11;
    const __VLS_15 = __VLS_resolvedLocalAndGlobalComponents.Settings;
    /** @type { [typeof __VLS_components.Settings, ] } */
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({ ...{ class: ("h-5 w-5") }, }));
    const __VLS_17 = __VLS_16({ ...{ class: ("h-5 w-5") }, }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    __VLS_nonNullable(__VLS_12.slots).default;
    const __VLS_12 = __VLS_pickFunctionalComponentCtx(__VLS_7, __VLS_9);
    const __VLS_21 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({ ...{ 'onClick': {} }, variant: ("ghost"), size: ("icon"), ...{ class: ("ml-2") }, }));
    const __VLS_23 = __VLS_22({ ...{ 'onClick': {} }, variant: ("ghost"), size: ("icon"), ...{ class: ("ml-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_27;
    const __VLS_28 = {
        onClick: (...[$event]) => {
            __VLS_ctx.$emit('toggle-dark-mode');
        }
    };
    let __VLS_24;
    let __VLS_25;
    if (__VLS_ctx.isDarkMode) {
        const __VLS_29 = __VLS_resolvedLocalAndGlobalComponents.Sun;
        /** @type { [typeof __VLS_components.Sun, ] } */
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({ ...{ class: ("h-5 w-5") }, }));
        const __VLS_31 = __VLS_30({ ...{ class: ("h-5 w-5") }, }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    }
    else {
        const __VLS_35 = __VLS_resolvedLocalAndGlobalComponents.Moon;
        /** @type { [typeof __VLS_components.Moon, ] } */
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({ ...{ class: ("h-5 w-5") }, }));
        const __VLS_37 = __VLS_36({ ...{ class: ("h-5 w-5") }, }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    }
    __VLS_nonNullable(__VLS_26.slots).default;
    const __VLS_26 = __VLS_pickFunctionalComponentCtx(__VLS_21, __VLS_23);
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['dark:bg-gray-800'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['hover:bg-gray-100'];
    __VLS_styleScopedClasses['dark:hover:bg-gray-700'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['w-5'];
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
            Button: Button,
            Settings: Settings,
            Sun: Sun,
            Moon: Moon,
            ModelSelector: ModelSelector,
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
//# sourceMappingURL=ChatHeader.vue.js.map