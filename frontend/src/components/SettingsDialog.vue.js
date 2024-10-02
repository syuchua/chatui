import { ref, watch } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-vue-next';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const emit = defineEmits(['close', 'update-settings']);
const localBaseUrl = ref(props.baseUrl);
const localApiKey = ref(props.apiKey);
const localModels = ref(props.models.join(', '));
const isSaving = ref(false);
watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        localBaseUrl.value = props.baseUrl;
        localApiKey.value = props.apiKey;
        localModels.value = props.models.join(', ');
    }
});
function closeDialog() {
    emit('close');
}
async function saveSettings() {
    isSaving.value = true;
    try {
        const updatedSettings = {
            baseUrl: localBaseUrl.value,
            apiKey: localApiKey.value,
            models: localModels.value.split(',').map(model => model.trim()).filter(model => model !== '')
        };
        emit('update-settings', updatedSettings);
        closeDialog();
    }
    catch (error) {
        console.error('Failed to save settings:', error);
    }
    finally {
        isSaving.value = false;
    }
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.TransitionRoot;
    /** @type { [typeof __VLS_components.TransitionRoot, typeof __VLS_components.TransitionRoot, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ appear: (true), show: ((__VLS_ctx.isOpen)), as: ("template"), }));
    const __VLS_2 = __VLS_1({ appear: (true), show: ((__VLS_ctx.isOpen)), as: ("template"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.Dialog;
    /** @type { [typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ 'onClose': {} }, as: ("div"), ...{ class: ("relative z-50") }, }));
    const __VLS_8 = __VLS_7({ ...{ 'onClose': {} }, as: ("div"), ...{ class: ("relative z-50") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_12;
    const __VLS_13 = {
        onClose: (__VLS_ctx.closeDialog)
    };
    let __VLS_9;
    let __VLS_10;
    const __VLS_14 = __VLS_resolvedLocalAndGlobalComponents.TransitionChild;
    /** @type { [typeof __VLS_components.TransitionChild, typeof __VLS_components.TransitionChild, ] } */
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({ as: ("template"), enter: ("duration-300 ease-out"), enterFrom: ("opacity-0"), enterTo: ("opacity-100"), leave: ("duration-200 ease-in"), leaveFrom: ("opacity-100"), leaveTo: ("opacity-0"), }));
    const __VLS_16 = __VLS_15({ as: ("template"), enter: ("duration-300 ease-out"), enterFrom: ("opacity-0"), enterTo: ("opacity-100"), leave: ("duration-200 ease-in"), leaveFrom: ("opacity-100"), leaveTo: ("opacity-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div)({ ...{ class: ("fixed inset-0 bg-black/30 backdrop-blur-sm") }, });
    __VLS_nonNullable(__VLS_19.slots).default;
    const __VLS_19 = __VLS_pickFunctionalComponentCtx(__VLS_14, __VLS_16);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("fixed inset-0 overflow-y-auto") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex min-h-full items-center justify-center p-4 text-center") }, });
    const __VLS_20 = __VLS_resolvedLocalAndGlobalComponents.TransitionChild;
    /** @type { [typeof __VLS_components.TransitionChild, typeof __VLS_components.TransitionChild, ] } */
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ as: ("template"), enter: ("duration-300 ease-out"), enterFrom: ("opacity-0 scale-95"), enterTo: ("opacity-100 scale-100"), leave: ("duration-200 ease-in"), leaveFrom: ("opacity-100 scale-100"), leaveTo: ("opacity-0 scale-95"), }));
    const __VLS_22 = __VLS_21({ as: ("template"), enter: ("duration-300 ease-out"), enterFrom: ("opacity-0 scale-95"), enterTo: ("opacity-100 scale-100"), leave: ("duration-200 ease-in"), leaveFrom: ("opacity-100 scale-100"), leaveTo: ("opacity-0 scale-95"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const __VLS_26 = __VLS_resolvedLocalAndGlobalComponents.DialogPanel;
    /** @type { [typeof __VLS_components.DialogPanel, typeof __VLS_components.DialogPanel, ] } */
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({ ...{ class: ("w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all") }, }));
    const __VLS_28 = __VLS_27({ ...{ class: ("w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all") }, }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    const __VLS_32 = __VLS_resolvedLocalAndGlobalComponents.DialogTitle;
    /** @type { [typeof __VLS_components.DialogTitle, typeof __VLS_components.DialogTitle, ] } */
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ as: ("h3"), ...{ class: ("text-lg font-medium leading-6 text-gray-900 dark:text-white") }, }));
    const __VLS_34 = __VLS_33({ as: ("h3"), ...{ class: ("text-lg font-medium leading-6 text-gray-900 dark:text-white") }, }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_nonNullable(__VLS_37.slots).default;
    const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-500 dark:text-gray-400") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4 space-y-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("space-y-2") }, });
    const __VLS_38 = __VLS_resolvedLocalAndGlobalComponents.Label;
    /** @type { [typeof __VLS_components.Label, typeof __VLS_components.Label, ] } */
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({ htmlFor: ("baseUrl"), }));
    const __VLS_40 = __VLS_39({ htmlFor: ("baseUrl"), }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    __VLS_nonNullable(__VLS_43.slots).default;
    const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40);
    const __VLS_44 = __VLS_resolvedLocalAndGlobalComponents.Input;
    /** @type { [typeof __VLS_components.Input, ] } */
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({ id: ("baseUrl"), modelValue: ((__VLS_ctx.localBaseUrl)), ...{ class: ("w-full") }, }));
    const __VLS_46 = __VLS_45({ id: ("baseUrl"), modelValue: ((__VLS_ctx.localBaseUrl)), ...{ class: ("w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("space-y-2") }, });
    const __VLS_50 = __VLS_resolvedLocalAndGlobalComponents.Label;
    /** @type { [typeof __VLS_components.Label, typeof __VLS_components.Label, ] } */
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({ htmlFor: ("apiKey"), }));
    const __VLS_52 = __VLS_51({ htmlFor: ("apiKey"), }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    __VLS_nonNullable(__VLS_55.slots).default;
    const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52);
    const __VLS_56 = __VLS_resolvedLocalAndGlobalComponents.Input;
    /** @type { [typeof __VLS_components.Input, ] } */
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({ id: ("apiKey"), modelValue: ((__VLS_ctx.localApiKey)), type: ("password"), ...{ class: ("w-full") }, }));
    const __VLS_58 = __VLS_57({ id: ("apiKey"), modelValue: ((__VLS_ctx.localApiKey)), type: ("password"), ...{ class: ("w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("space-y-2") }, });
    const __VLS_62 = __VLS_resolvedLocalAndGlobalComponents.Label;
    /** @type { [typeof __VLS_components.Label, typeof __VLS_components.Label, ] } */
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({ htmlFor: ("models"), }));
    const __VLS_64 = __VLS_63({ htmlFor: ("models"), }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    __VLS_nonNullable(__VLS_67.slots).default;
    const __VLS_67 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64);
    const __VLS_68 = __VLS_resolvedLocalAndGlobalComponents.Input;
    /** @type { [typeof __VLS_components.Input, ] } */
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({ id: ("models"), modelValue: ((__VLS_ctx.localModels)), ...{ class: ("w-full") }, }));
    const __VLS_70 = __VLS_69({ id: ("models"), modelValue: ((__VLS_ctx.localModels)), ...{ class: ("w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-6 flex justify-end space-x-2") }, });
    const __VLS_74 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({ ...{ 'onClick': {} }, variant: ("outline"), }));
    const __VLS_76 = __VLS_75({ ...{ 'onClick': {} }, variant: ("outline"), }, ...__VLS_functionalComponentArgsRest(__VLS_75));
    let __VLS_80;
    const __VLS_81 = {
        onClick: (__VLS_ctx.closeDialog)
    };
    let __VLS_77;
    let __VLS_78;
    __VLS_nonNullable(__VLS_79.slots).default;
    const __VLS_79 = __VLS_pickFunctionalComponentCtx(__VLS_74, __VLS_76);
    const __VLS_82 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.isSaving)), }));
    const __VLS_84 = __VLS_83({ ...{ 'onClick': {} }, disabled: ((__VLS_ctx.isSaving)), }, ...__VLS_functionalComponentArgsRest(__VLS_83));
    let __VLS_88;
    const __VLS_89 = {
        onClick: (__VLS_ctx.saveSettings)
    };
    let __VLS_85;
    let __VLS_86;
    if (__VLS_ctx.isSaving) {
        const __VLS_90 = __VLS_resolvedLocalAndGlobalComponents.Loader2;
        /** @type { [typeof __VLS_components.Loader2, ] } */
        // @ts-ignore
        const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({ ...{ class: ("mr-2 h-4 w-4 animate-spin") }, }));
        const __VLS_92 = __VLS_91({ ...{ class: ("mr-2 h-4 w-4 animate-spin") }, }, ...__VLS_functionalComponentArgsRest(__VLS_91));
    }
    __VLS_nonNullable(__VLS_87.slots).default;
    const __VLS_87 = __VLS_pickFunctionalComponentCtx(__VLS_82, __VLS_84);
    __VLS_nonNullable(__VLS_31.slots).default;
    const __VLS_31 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28);
    __VLS_nonNullable(__VLS_25.slots).default;
    const __VLS_25 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
    __VLS_nonNullable(__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['bg-black/30'];
    __VLS_styleScopedClasses['backdrop-blur-sm'];
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['overflow-y-auto'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['min-h-full'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['max-w-md'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['rounded-2xl'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['dark:bg-gray-800'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['align-middle'];
    __VLS_styleScopedClasses['shadow-xl'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['leading-6'];
    __VLS_styleScopedClasses['text-gray-900'];
    __VLS_styleScopedClasses['dark:text-white'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['dark:text-gray-400'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['space-y-4'];
    __VLS_styleScopedClasses['space-y-2'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['space-y-2'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['space-y-2'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-end'];
    __VLS_styleScopedClasses['space-x-2'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['w-4'];
    __VLS_styleScopedClasses['animate-spin'];
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
            Dialog: Dialog,
            DialogPanel: DialogPanel,
            DialogTitle: DialogTitle,
            Button: Button,
            Input: Input,
            Label: Label,
            Loader2: Loader2,
            localBaseUrl: localBaseUrl,
            localApiKey: localApiKey,
            localModels: localModels,
            isSaving: isSaving,
            closeDialog: closeDialog,
            saveSettings: saveSettings,
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
//# sourceMappingURL=SettingsDialog.vue.js.map