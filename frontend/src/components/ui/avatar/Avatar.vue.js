import { AvatarRoot } from 'radix-vue';
import { avatarVariant } from '.';
import { cn } from '@/lib/utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    size: 'sm',
    shape: 'circle',
});
const __VLS_withDefaultsArg = (function (t) { return t; })({
    size: 'sm',
    shape: 'circle',
});
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.AvatarRoot;
    /** @type { [typeof __VLS_components.AvatarRoot, typeof __VLS_components.AvatarRoot, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: ((__VLS_ctx.cn(__VLS_ctx.avatarVariant({ size: __VLS_ctx.size, shape: __VLS_ctx.shape }), props.class))) }, }));
    const __VLS_2 = __VLS_1({ ...{ class: ((__VLS_ctx.cn(__VLS_ctx.avatarVariant({ size: __VLS_ctx.size, shape: __VLS_ctx.shape }), props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
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
            AvatarRoot: AvatarRoot,
            avatarVariant: avatarVariant,
            cn: cn,
        };
    },
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
export default {};
;
//# sourceMappingURL=Avatar.vue.js.map