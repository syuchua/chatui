import { computed } from 'vue';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-vue-next';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const __VLS_emit = defineEmits(['logout']);
const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F06292', '#AED581', '#FFD54F', '#4DB6AC', '#7986CB'
];
function getUserColor(name) {
    if (!name)
        return colors[0];
    return colors[name.charCodeAt(0) % colors.length];
}
function getUserInitial(name) {
    if (!name)
        return '?';
    return name.charAt(0).toUpperCase();
}
function getTextColor(bgColor) {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}
const avatarStyle = computed(() => {
    const bgColor = getUserColor(props.user?.name);
    return {
        backgroundColor: bgColor,
        color: getTextColor(bgColor),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1.2rem'
    };
});
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-4 border-t dark:border-gray-700") }, });
    if (__VLS_ctx.user) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center space-x-3") }, });
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Avatar;
        /** @type { [typeof __VLS_components.Avatar, typeof __VLS_components.Avatar, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
        const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
        if (__VLS_ctx.user.avatar) {
            const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.AvatarImage;
            /** @type { [typeof __VLS_components.AvatarImage, ] } */
            // @ts-ignore
            const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ src: ((__VLS_ctx.user.avatar)), alt: ("User avatar"), }));
            const __VLS_8 = __VLS_7({ src: ((__VLS_ctx.user.avatar)), alt: ("User avatar"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        }
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.AvatarFallback;
        /** @type { [typeof __VLS_components.AvatarFallback, typeof __VLS_components.AvatarFallback, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ style: ((__VLS_ctx.avatarStyle)) }, }));
        const __VLS_14 = __VLS_13({ ...{ style: ((__VLS_ctx.avatarStyle)) }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        (__VLS_ctx.getUserInitial(__VLS_ctx.user.name));
        __VLS_nonNullable(__VLS_17.slots).default;
        const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
        __VLS_nonNullable(__VLS_5.slots).default;
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("font-medium dark:text-white") }, });
        (__VLS_ctx.user.name || '未知用户');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-500 dark:text-gray-400") }, });
        (__VLS_ctx.user.email || '无邮箱');
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-center text-gray-500 dark:text-gray-400") }, });
    }
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ 'onClick': {} }, variant: ("ghost"), ...{ class: ("w-full mt-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300") }, }));
    const __VLS_20 = __VLS_19({ ...{ 'onClick': {} }, variant: ("ghost"), ...{ class: ("w-full mt-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300") }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    let __VLS_24;
    const __VLS_25 = {
        onClick: (...[$event]) => {
            __VLS_ctx.$emit('logout');
        }
    };
    let __VLS_21;
    let __VLS_22;
    const __VLS_26 = __VLS_resolvedLocalAndGlobalComponents.LogOut;
    /** @type { [typeof __VLS_components.LogOut, ] } */
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({ ...{ class: ("w-4 h-4 mr-2") }, }));
    const __VLS_28 = __VLS_27({ ...{ class: ("w-4 h-4 mr-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    __VLS_nonNullable(__VLS_23.slots).default;
    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['border-t'];
    __VLS_styleScopedClasses['dark:border-gray-700'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-3'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['dark:text-white'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['dark:text-gray-400'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['dark:text-gray-400'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['hover:text-red-700'];
    __VLS_styleScopedClasses['dark:text-red-400'];
    __VLS_styleScopedClasses['dark:hover:text-red-300'];
    __VLS_styleScopedClasses['w-4'];
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['mr-2'];
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
            Avatar: Avatar,
            AvatarImage: AvatarImage,
            AvatarFallback: AvatarFallback,
            Button: Button,
            LogOut: LogOut,
            getUserInitial: getUserInitial,
            avatarStyle: avatarStyle,
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
//# sourceMappingURL=UserInfo.vue.js.map