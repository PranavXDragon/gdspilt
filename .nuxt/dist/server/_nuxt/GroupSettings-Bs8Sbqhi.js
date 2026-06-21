import { p, u, i as i$1, w, e as c, f, _ as __nuxt_component_7$1, g as usePopper, a as __nuxt_component_1$2, h as useFormGroup, d as __nuxt_component_2$1, b as __nuxt_component_0$2 } from "./Modal-CpCVwxs4.js";
import { s as storeToRefs, b as useGroups, t as twMerge, i as appConfig, m as mergeConfig, h as useGroupID, j as computeTransaction, r as round, k as importSplitwise, l as importSupabase, o as groupGetBalances, p as groupGetPayments } from "../server.mjs";
import { useId as useId$1, defineComponent, ref, computed, watchEffect, nextTick, provide, inject, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, useSSRContext, toRef, resolveComponent, renderSlot, resolveDynamicComponent, createCommentVNode, Fragment, renderList, Transition, watch, useModel, mergeModels, isRef } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot, ssrRenderStyle, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderVNode, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderAttr } from "vue/server-renderer";
import "P:/group/peersplit-main/peersplit-main/node_modules/hookable/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import { defu } from "P:/group/peersplit-main/peersplit-main/node_modules/defu/dist/defu.mjs";
import { i, o, A as A$1, N, s, u as u$1, a as o$1, b as arrow, _ as __nuxt_component_1, c as useUI, d as s$1 } from "./selectMenu-DqLlXyUS.js";
import { twJoin } from "tailwind-merge";
import { l, i as i$2, t, u as useInjectButtonGroup, a as __nuxt_component_1$1, g as getNuxtLinkProps, _ as __nuxt_component_0$1 } from "./Button-CIOzeTUV.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import moment from "moment";
import { _ as __nuxt_component_0 } from "./nuxt-link-By9b6QI-.js";
import { w as w$1, h, _, v, N as N$1, O as O$1 } from "./hidden-O2d_FXXR.js";
import { nanoid } from "nanoid";
import { _ as __nuxt_component_2$3 } from "./Tabs-Bf4gLFcz.js";
import { _ as __nuxt_component_2$2, a as __nuxt_component_3$1 } from "./Accordion-9U6bskbT.js";
import { parse } from "csv-parse/browser/esm";
const useId = useId$1;
var Z = ((i2) => (i2[i2.Open = 0] = "Open", i2[i2.Closed = 1] = "Closed", i2))(Z || {}), ee = ((i2) => (i2[i2.Pointer = 0] = "Pointer", i2[i2.Other = 1] = "Other", i2))(ee || {});
function te(o2) {
  requestAnimationFrame(() => requestAnimationFrame(o2));
}
let A = /* @__PURE__ */ Symbol("MenuContext");
function O(o2) {
  let M = inject(A, null);
  if (M === null) {
    let i2 = new Error(`<${o2} /> is missing a parent <Menu /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(i2, O), i2;
  }
  return M;
}
let ge = defineComponent({ name: "Menu", props: { as: { type: [Object, String], default: "template" } }, setup(o$12, { slots: M, attrs: i2 }) {
  let I = ref(1), p2 = ref(null), e = ref(null), r = ref([]), f$1 = ref(""), d = ref(null), g = ref(1);
  function b(t2 = (a) => a) {
    let a = d.value !== null ? r.value[d.value] : null, n = O$1(t2(r.value.slice()), (v2) => o(v2.dataRef.domRef)), s2 = a ? n.indexOf(a) : null;
    return s2 === -1 && (s2 = null), { items: n, activeItemIndex: s2 };
  }
  let l2 = { menuState: I, buttonRef: p2, itemsRef: e, items: r, searchQuery: f$1, activeItemIndex: d, activationTrigger: g, closeMenu: () => {
    I.value = 1, d.value = null;
  }, openMenu: () => I.value = 0, goToItem(t2, a, n) {
    let s2 = b(), v2 = f(t2 === c.Specific ? { focus: c.Specific, id: a } : { focus: t2 }, { resolveItems: () => s2.items, resolveActiveIndex: () => s2.activeItemIndex, resolveId: (u2) => u2.id, resolveDisabled: (u2) => u2.dataRef.disabled });
    f$1.value = "", d.value = v2, g.value = n != null ? n : 1, r.value = s2.items;
  }, search(t2) {
    let n = f$1.value !== "" ? 0 : 1;
    f$1.value += t2.toLowerCase();
    let v2 = (d.value !== null ? r.value.slice(d.value + n).concat(r.value.slice(0, d.value + n)) : r.value).find((h2) => h2.dataRef.textValue.startsWith(f$1.value) && !h2.dataRef.disabled), u2 = v2 ? r.value.indexOf(v2) : -1;
    u2 === -1 || u2 === d.value || (d.value = u2, g.value = 1);
  }, clearSearch() {
    f$1.value = "";
  }, registerItem(t2, a) {
    let n = b((s2) => [...s2, { id: t2, dataRef: a }]);
    r.value = n.items, d.value = n.activeItemIndex, g.value = 1;
  }, unregisterItem(t2) {
    let a = b((n) => {
      let s2 = n.findIndex((v2) => v2.id === t2);
      return s2 !== -1 && n.splice(s2, 1), n;
    });
    r.value = a.items, d.value = a.activeItemIndex, g.value = 1;
  } };
  return w([p2, e], (t2, a) => {
    var n;
    l2.closeMenu(), w$1(a, h.Loose) || (t2.preventDefault(), (n = o(p2)) == null || n.focus());
  }, computed(() => I.value === 0)), provide(A, l2), t(computed(() => u$1(I.value, { [0]: i$2.Open, [1]: i$2.Closed }))), () => {
    let t2 = { open: I.value === 0, close: l2.closeMenu };
    return A$1({ ourProps: {}, theirProps: o$12, slot: t2, slots: M, attrs: i2, name: "Menu" });
  };
} }), Se = defineComponent({ name: "MenuButton", props: { disabled: { type: Boolean, default: false }, as: { type: [Object, String], default: "button" }, id: { type: String, default: null } }, setup(o$2, { attrs: M, slots: i$12, expose: I }) {
  var b;
  let p2 = (b = o$2.id) != null ? b : `headlessui-menu-button-${i()}`, e = O("MenuButton");
  I({ el: e.buttonRef, $el: e.buttonRef });
  function r(l2) {
    switch (l2.key) {
      case o$1.Space:
      case o$1.Enter:
      case o$1.ArrowDown:
        l2.preventDefault(), l2.stopPropagation(), e.openMenu(), nextTick(() => {
          var t2;
          (t2 = o(e.itemsRef)) == null || t2.focus({ preventScroll: true }), e.goToItem(c.First);
        });
        break;
      case o$1.ArrowUp:
        l2.preventDefault(), l2.stopPropagation(), e.openMenu(), nextTick(() => {
          var t2;
          (t2 = o(e.itemsRef)) == null || t2.focus({ preventScroll: true }), e.goToItem(c.Last);
        });
        break;
    }
  }
  function f2(l2) {
    switch (l2.key) {
      case o$1.Space:
        l2.preventDefault();
        break;
    }
  }
  function d(l2) {
    o$2.disabled || (e.menuState.value === 0 ? (e.closeMenu(), nextTick(() => {
      var t2;
      return (t2 = o(e.buttonRef)) == null ? void 0 : t2.focus({ preventScroll: true });
    })) : (l2.preventDefault(), e.openMenu(), te(() => {
      var t2;
      return (t2 = o(e.itemsRef)) == null ? void 0 : t2.focus({ preventScroll: true });
    })));
  }
  let g = s(computed(() => ({ as: o$2.as, type: M.type })), e.buttonRef);
  return () => {
    var n;
    let l2 = { open: e.menuState.value === 0 }, { ...t2 } = o$2, a = { ref: e.buttonRef, id: p2, type: g.value, "aria-haspopup": "menu", "aria-controls": (n = o(e.itemsRef)) == null ? void 0 : n.id, "aria-expanded": e.menuState.value === 0, onKeydown: r, onKeyup: f2, onClick: d };
    return A$1({ ourProps: a, theirProps: t2, slot: l2, attrs: M, slots: i$12, name: "MenuButton" });
  };
} }), Me = defineComponent({ name: "MenuItems", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: null } }, setup(o$2, { attrs: M, slots: i$3, expose: I }) {
  var l$1;
  let p2 = (l$1 = o$2.id) != null ? l$1 : `headlessui-menu-items-${i()}`, e = O("MenuItems"), r = ref(null);
  I({ el: e.itemsRef, $el: e.itemsRef }), i$1({ container: computed(() => o(e.itemsRef)), enabled: computed(() => e.menuState.value === 0), accept(t2) {
    return t2.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : t2.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(t2) {
    t2.setAttribute("role", "none");
  } });
  function f2(t2) {
    var a;
    switch (r.value && clearTimeout(r.value), t2.key) {
      case o$1.Space:
        if (e.searchQuery.value !== "") return t2.preventDefault(), t2.stopPropagation(), e.search(t2.key);
      case o$1.Enter:
        if (t2.preventDefault(), t2.stopPropagation(), e.activeItemIndex.value !== null) {
          let s2 = e.items.value[e.activeItemIndex.value];
          (a = o(s2.dataRef.domRef)) == null || a.click();
        }
        e.closeMenu(), _(o(e.buttonRef));
        break;
      case o$1.ArrowDown:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(c.Next);
      case o$1.ArrowUp:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(c.Previous);
      case o$1.Home:
      case o$1.PageUp:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(c.First);
      case o$1.End:
      case o$1.PageDown:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(c.Last);
      case o$1.Escape:
        t2.preventDefault(), t2.stopPropagation(), e.closeMenu(), nextTick(() => {
          var n;
          return (n = o(e.buttonRef)) == null ? void 0 : n.focus({ preventScroll: true });
        });
        break;
      case o$1.Tab:
        t2.preventDefault(), t2.stopPropagation(), e.closeMenu(), nextTick(() => v(o(e.buttonRef), t2.shiftKey ? N$1.Previous : N$1.Next));
        break;
      default:
        t2.key.length === 1 && (e.search(t2.key), r.value = setTimeout(() => e.clearSearch(), 350));
        break;
    }
  }
  function d(t2) {
    switch (t2.key) {
      case o$1.Space:
        t2.preventDefault();
        break;
    }
  }
  let g = l(), b = computed(() => g !== null ? (g.value & i$2.Open) === i$2.Open : e.menuState.value === 0);
  return () => {
    var s2, v2;
    let t2 = { open: e.menuState.value === 0 }, { ...a } = o$2, n = { "aria-activedescendant": e.activeItemIndex.value === null || (s2 = e.items.value[e.activeItemIndex.value]) == null ? void 0 : s2.id, "aria-labelledby": (v2 = o(e.buttonRef)) == null ? void 0 : v2.id, id: p2, onKeydown: f2, onKeyup: d, role: "menu", tabIndex: 0, ref: e.itemsRef };
    return A$1({ ourProps: n, theirProps: a, slot: t2, attrs: M, slots: i$3, features: N.RenderStrategy | N.Static, visible: b.value, name: "MenuItems" });
  };
} }), be = defineComponent({ name: "MenuItem", inheritAttrs: false, props: { as: { type: [Object, String], default: "template" }, disabled: { type: Boolean, default: false }, id: { type: String, default: null } }, setup(o$12, { slots: M, attrs: i$12, expose: I }) {
  var v2;
  let p$1 = (v2 = o$12.id) != null ? v2 : `headlessui-menu-item-${i()}`, e = O("MenuItem"), r = ref(null);
  I({ el: r, $el: r });
  let f2 = computed(() => e.activeItemIndex.value !== null ? e.items.value[e.activeItemIndex.value].id === p$1 : false), d = p(r);
  computed(() => ({ disabled: o$12.disabled, get textValue() {
    return d();
  }, domRef: r }));
  watchEffect(() => {
    e.menuState.value === 0 && f2.value && e.activationTrigger.value !== 0 && nextTick(() => {
      var u2, h2;
      return (h2 = (u2 = o(r)) == null ? void 0 : u2.scrollIntoView) == null ? void 0 : h2.call(u2, { block: "nearest" });
    });
  });
  function b(u2) {
    if (o$12.disabled) return u2.preventDefault();
    e.closeMenu(), _(o(e.buttonRef));
  }
  function l2() {
    if (o$12.disabled) return e.goToItem(c.Nothing);
    e.goToItem(c.Specific, p$1);
  }
  let t2 = u();
  function a(u2) {
    t2.update(u2);
  }
  function n(u2) {
    t2.wasMoved(u2) && (o$12.disabled || f2.value || e.goToItem(c.Specific, p$1, 0));
  }
  function s2(u2) {
    t2.wasMoved(u2) && (o$12.disabled || f2.value && e.goToItem(c.Nothing));
  }
  return () => {
    let { disabled: u2, ...h2 } = o$12, C = { active: f2.value, disabled: u2, close: e.closeMenu };
    return A$1({ ourProps: { id: p$1, ref: r, role: "menuitem", tabIndex: u2 === true ? void 0 : -1, "aria-disabled": u2 === true ? true : void 0, onClick: b, onFocus: l2, onPointerenter: a, onMouseenter: a, onPointermove: n, onMousemove: n, onPointerleave: s2, onMouseleave: s2 }, theirProps: { ...i$12, ...h2 }, slot: C, attrs: i$12, slots: M, name: "MenuItem" });
  };
} });
const badge = {
  base: "inline-flex items-center",
  rounded: "rounded-md",
  font: "font-medium",
  size: {
    xs: "text-xs px-1.5 py-0.5",
    sm: "text-xs px-2 py-1",
    md: "text-sm px-2 py-1",
    lg: "text-sm px-2.5 py-1.5"
  },
  gap: {
    xs: "gap-0.5",
    sm: "gap-1",
    md: "gap-1",
    lg: "gap-1.5"
  },
  color: {
    white: {
      solid: "ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-900"
    },
    gray: {
      solid: "ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"
    },
    black: {
      solid: "text-white dark:text-gray-900 bg-gray-900 dark:bg-white"
    }
  },
  variant: {
    solid: "bg-{color}-500 dark:bg-{color}-400 text-white dark:text-gray-900",
    outline: "text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400",
    soft: "bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400",
    subtle: "bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 ring-opacity-25 dark:ring-opacity-25"
  },
  icon: {
    base: "flex-shrink-0",
    size: {
      xs: "h-4 w-4",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-5 w-5"
    }
  },
  default: {
    size: "sm",
    variant: "solid",
    color: "primary"
  }
};
const dropdown = {
  wrapper: "relative inline-flex text-left rtl:text-right",
  container: "z-20 group",
  trigger: "inline-flex w-full",
  width: "w-48",
  height: "",
  background: "bg-white dark:bg-gray-800",
  shadow: "shadow-lg",
  rounded: "rounded-md",
  ring: "ring-1 ring-gray-200 dark:ring-gray-700",
  base: "relative focus:outline-none overflow-y-auto scroll-py-1",
  divide: "divide-y divide-gray-200 dark:divide-gray-700",
  padding: "p-1",
  item: {
    base: "group flex items-center gap-1.5 w-full",
    rounded: "rounded-md",
    padding: "px-1.5 py-1.5",
    size: "text-sm",
    active: "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white",
    inactive: "text-gray-700 dark:text-gray-200",
    disabled: "cursor-not-allowed opacity-50",
    icon: {
      base: "flex-shrink-0 w-5 h-5",
      active: "text-gray-500 dark:text-gray-400",
      inactive: "text-gray-400 dark:text-gray-500"
    },
    avatar: {
      base: "flex-shrink-0",
      size: "2xs"
    },
    label: "truncate",
    shortcuts: "hidden md:inline-flex flex-shrink-0 gap-0.5 ms-auto"
  },
  // Syntax for `<Transition>` component https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
  transition: {
    enterActiveClass: "transition duration-100 ease-out",
    enterFromClass: "transform scale-95 opacity-0",
    enterToClass: "transform scale-100 opacity-100",
    leaveActiveClass: "transition duration-75 ease-in",
    leaveFromClass: "transform scale-100 opacity-100",
    leaveToClass: "transform scale-95 opacity-0"
  },
  popper: {
    placement: "bottom-end",
    strategy: "fixed"
  },
  default: {
    openDelay: 0,
    closeDelay: 0
  },
  arrow: {
    ...arrow,
    ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-700",
    background: "before:bg-white dark:before:bg-gray-700"
  }
};
const kbd = {
  base: "inline-flex items-center justify-center text-gray-900 dark:text-white",
  padding: "px-1",
  size: {
    xs: "h-4 min-w-[16px] text-[10px]",
    sm: "h-5 min-w-[20px] text-[11px]",
    md: "h-6 min-w-[24px] text-[12px]"
  },
  rounded: "rounded",
  font: "font-medium font-sans",
  background: "bg-gray-100 dark:bg-gray-800",
  ring: "ring-1 ring-gray-300 dark:ring-gray-700 ring-inset",
  default: {
    size: "sm"
  }
};
const checkbox = {
  wrapper: "relative flex items-start",
  container: "flex items-center h-5",
  base: "h-4 w-4 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent",
  form: "form-checkbox",
  rounded: "rounded",
  color: "text-{color}-500 dark:text-{color}-400",
  background: "bg-white dark:bg-gray-900",
  border: "border border-gray-300 dark:border-gray-700",
  ring: "focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
  inner: "ms-3 flex flex-col",
  label: "text-sm font-medium text-gray-700 dark:text-gray-200",
  required: "text-sm text-red-500 dark:text-red-400",
  help: "text-sm text-gray-500 dark:text-gray-400",
  default: {
    color: "primary"
  }
};
const divider = {
  wrapper: {
    base: "flex items-center align-center text-center",
    horizontal: "w-full flex-row",
    vertical: "flex-col"
  },
  container: {
    base: "font-medium text-gray-700 dark:text-gray-200 flex",
    horizontal: "mx-3 whitespace-nowrap",
    vertical: "my-2"
  },
  border: {
    base: "flex border-gray-200 dark:border-gray-800",
    horizontal: "w-full",
    vertical: "h-full",
    size: {
      horizontal: {
        "2xs": "border-t",
        "xs": "border-t-[2px]",
        "sm": "border-t-[3px]",
        "md": "border-t-[4px]",
        "lg": "border-t-[5px]",
        "xl": "border-t-[6px]"
      },
      vertical: {
        "2xs": "border-s",
        "xs": "border-s-[2px]",
        "sm": "border-s-[3px]",
        "md": "border-s-[4px]",
        "lg": "border-s-[5px]",
        "xl": "border-s-[6px]"
      }
    },
    type: {
      solid: "border-solid",
      dotted: "border-dotted",
      dashed: "border-dashed"
    }
  },
  icon: {
    base: "flex-shrink-0 w-5 h-5"
  },
  avatar: {
    base: "flex-shrink-0",
    size: "2xs"
  },
  label: "text-sm",
  default: {
    size: "2xs",
    type: "solid"
  }
};
const _sfc_main$f = {
  __name: "YourBalances",
  __ssrInlineRender: true,
  props: ["groupID"],
  setup(__props) {
    const { getBalancesByGroupID, getGroupByID } = storeToRefs(useGroups());
    const myID = computed(() => {
      const { myID: myID2 } = getGroupByID.value(__props.groupID);
      return myID2;
    });
    const balance = computed(() => {
      const balances = getBalancesByGroupID.value(__props.groupID);
      return balances[myID.value] || 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-1" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-1"${_scopeId}>`);
            if (unref(balance) === 0) {
              _push2(`<span class="flex items-center gap-2"${_scopeId}>You are settled up in this group.</span>`);
            } else {
              _push2(`<div${_scopeId}><span class="flex items-center gap-2"${_scopeId}>You ${ssrInterpolate(unref(balance) > 0 ? "are owed" : "owe")} <span class="${ssrRenderClass([
                "text-2xl",
                unref(balance) > 0 ? "color-positive" : "color-negative"
              ])}"${_scopeId}>${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getGroupCurrency(__props.groupID))}${ssrInterpolate(Math.abs(unref(balance)))}</span></span></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-1" }, [
                unref(balance) === 0 ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "flex items-center gap-2"
                }, "You are settled up in this group.")) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("span", { class: "flex items-center gap-2" }, [
                    createTextVNode("You " + toDisplayString(unref(balance) > 0 ? "are owed" : "owe") + " ", 1),
                    createVNode("span", {
                      class: [
                        "text-2xl",
                        unref(balance) > 0 ? "color-positive" : "color-negative"
                      ]
                    }, toDisplayString(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getGroupCurrency(__props.groupID)) + toDisplayString(Math.abs(unref(balance))), 3)
                  ])
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/YourBalances.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const config$4 = mergeConfig(appConfig.ui.strategy, appConfig.ui.badge, badge);
const _sfc_main$e = defineComponent({
  components: {
    UIcon: __nuxt_component_1
  },
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: () => config$4.default.size,
      validator(value) {
        return Object.keys(config$4.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config$4.default.color,
      validator(value) {
        return [...appConfig.ui.colors, ...Object.keys(config$4.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config$4.default.variant,
      validator(value) {
        return [
          ...Object.keys(config$4.variant),
          ...Object.values(config$4.color).flatMap((value2) => Object.keys(value2))
        ].includes(value);
      }
    },
    label: {
      type: [String, Number],
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    leadingIcon: {
      type: String,
      default: null
    },
    trailingIcon: {
      type: String,
      default: null
    },
    trailing: {
      type: Boolean,
      default: false
    },
    leading: {
      type: Boolean,
      default: false
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("badge", toRef(props, "ui"), config$4);
    const { size, rounded } = useInjectButtonGroup({ ui, props });
    const isLeading = computed(() => {
      return props.icon && props.leading || props.icon && !props.trailing || !props.trailing || props.leadingIcon;
    });
    const isTrailing = computed(() => {
      return props.icon && props.trailing || props.trailing || props.trailingIcon;
    });
    const badgeClass = computed(() => {
      const variant = ui.value.color?.[props.color]?.[props.variant] || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.font,
        rounded.value,
        ui.value.size[size.value],
        ui.value.gap[size.value],
        variant?.replaceAll("{color}", props.color)
      ), props.class);
    });
    const leadingIconName = computed(() => {
      return props.leadingIcon || props.icon;
    });
    const trailingIconName = computed(() => {
      return props.trailingIcon || props.icon;
    });
    const leadingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        ui.value.icon.size[size.value]
      );
    });
    const trailingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        ui.value.icon.size[size.value]
      );
    });
    return {
      attrs,
      isLeading,
      isTrailing,
      badgeClass,
      leadingIconName,
      trailingIconName,
      leadingIconClass,
      trailingIconClass
    };
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = __nuxt_component_1;
  _push(`<span${ssrRenderAttrs(mergeProps({ class: _ctx.badgeClass }, _ctx.attrs, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
    if (_ctx.isLeading && _ctx.leadingIconName) {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.leadingIconName,
        class: _ctx.leadingIconClass,
        "aria-hidden": "true"
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
  }, _push, _parent);
  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
    if (_ctx.label !== void 0 && _ctx.label !== null) {
      _push(`<span>${ssrInterpolate(_ctx.label)}</span>`);
    } else {
      _push(`<!---->`);
    }
  }, _push, _parent);
  ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
    if (_ctx.isTrailing && _ctx.trailingIconName) {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.trailingIconName,
        class: _ctx.trailingIconClass,
        "aria-hidden": "true"
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
  }, _push, _parent);
  _push(`</span>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Badge.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$4]]);
const getColorForValue = (val) => {
  if (val > 0) return "color-positive";
  if (val < 0) return "color-negative";
  return "color-neutral";
};
const splitTypes = [
  "Split Equally",
  "Split by Amount",
  "Split by Percentages",
  "Split by Shares"
].map((x, i2) => ({ id: i2 + 1, name: x }));
const EXPENSE_CATEGORIES = [
  { id: "food", label: "Food & Drinks", icon: "i-heroicons-shopping-bag", color: "rose" },
  { id: "transport", label: "Transport", icon: "i-heroicons-truck", color: "sky" },
  { id: "utilities", label: "Utilities", icon: "i-heroicons-home", color: "amber" },
  { id: "entertainment", label: "Entertainment", icon: "i-heroicons-ticket", color: "violet" },
  { id: "shopping", label: "Shopping", icon: "i-heroicons-archive-box", color: "emerald" },
  { id: "health", label: "Health", icon: "i-heroicons-heart", color: "pink" },
  { id: "education", label: "Education", icon: "i-heroicons-academic-cap", color: "indigo" },
  { id: "bills", label: "Bills & Fees", icon: "i-heroicons-document-text", color: "orange" },
  { id: "travel", label: "Travel", icon: "i-heroicons-globe-alt", color: "teal" },
  { id: "groceries", label: "Groceries", icon: "i-heroicons-shopping-cart", color: "lime" },
  { id: "other", label: "Other", icon: "i-heroicons-ellipsis-horizontal", color: "gray" }
];
const _sfc_main$d = {
  __name: "ExpenseItem",
  __ssrInlineRender: true,
  props: ["expense"],
  setup(__props) {
    const groupID = useGroupID();
    const CATEGORY_BG_HEX = {
      rose: "#f43f5e1a",
      sky: "#0ea5e91a",
      amber: "#f59e0b1a",
      violet: "#8b5cf61a",
      emerald: "#10b9811a",
      pink: "#ec48991a",
      indigo: "#6366f11a",
      orange: "#f973161a",
      teal: "#14b8a61a",
      lime: "#84cc161a",
      gray: "#6b72801a"
    };
    const CATEGORY_TEXT_HEX = {
      rose: "#f43f5e",
      sky: "#0ea5e9",
      amber: "#f59e0b",
      violet: "#8b5cf6",
      emerald: "#10b981",
      pink: "#ec4899",
      indigo: "#6366f1",
      orange: "#f97316",
      teal: "#14b8a6",
      lime: "#84cc16",
      gray: "#6b7280"
    };
    const categoryData = computed(
      () => EXPENSE_CATEGORIES.find((c2) => c2.id === __props.expense.category)
    );
    const categoryLabel = computed(() => categoryData.value?.label || "");
    const categoryIcon = computed(
      () => categoryData.value?.icon || "i-heroicons-ellipsis-horizontal"
    );
    const categoryBgStyle = computed(() => {
      const color = categoryData.value?.color || "gray";
      return {
        backgroundColor: CATEGORY_BG_HEX[color] || "#6b72801a",
        color: CATEGORY_TEXT_HEX[color] || "#6b7280"
      };
    });
    const myID = computed(() => {
      const { myID: myID2 } = useGroups().getGroupByID(groupID);
      return myID2;
    });
    const value = computed(() => {
      const computedExpense = computeTransaction(__props.expense);
      return round(
        (computedExpense.payers[myID.value] || 0) - (computedExpense.splits[myID.value] || 0)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_1;
      const _component_UBadge = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group px-3 py-3 flex gap-3 bg-white dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]" }, _attrs))}><div class="flex flex-col items-center justify-center shrink-0">`);
      if (__props.expense.category) {
        _push(`<div class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium" style="${ssrRenderStyle(unref(categoryBgStyle))}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: unref(categoryIcon),
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-receipt-percent",
          class: "w-5 h-5 text-gray-400"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div><div class="flex-grow flex justify-between items-center gap-2 min-w-0">`);
      if (__props.expense.type === "expense") {
        _push(`<div class="flex flex-col min-w-0"><div class="flex items-center gap-2 flex-wrap"><span class="font-medium text-gray-900 dark:text-gray-100 truncate">${ssrInterpolate(__props.expense.description)}</span>`);
        if (__props.expense.category) {
          _push(ssrRenderComponent(_component_UBadge, {
            color: unref(categoryData)?.color || "gray",
            variant: "soft",
            size: "xs"
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(categoryLabel))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(categoryLabel)), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="text-xs text-gray-400 dark:text-gray-500 shrink-0">${ssrInterpolate(unref(moment).utc(__props.expense.created_at).format("MMM DD"))}</span></div><div class="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5"><!--[-->`);
        ssrRenderList(Object.entries(__props.expense.payers), ([payer, val]) => {
          _push(`<span class="text-xs text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-600 dark:text-gray-300">${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(unref(groupID), payer))}</span> paid ${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getGroupCurrency(unref(groupID)))}${ssrInterpolate(val)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div class="flex flex-col min-w-0"><div class="flex items-center gap-2 flex-wrap"><span class="font-medium text-gray-900 dark:text-gray-100">${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(unref(groupID), Object.keys(__props.expense.payers)[0]))} paid ${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(unref(groupID), Object.keys(__props.expense.splitters)[0], true))}</span><span class="text-xs text-gray-400 dark:text-gray-500">${ssrInterpolate(unref(moment).utc(__props.expense.created_at).format("MMM DD"))}</span></div></div>`);
      }
      _push(`<span class="${ssrRenderClass([
        "text-lg font-semibold tabular-nums shrink-0 transition-colors",
        ("getColorForValue" in _ctx ? _ctx.getColorForValue : unref(getColorForValue))(unref(value))
      ])}">${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getGroupCurrency(unref(groupID)))}${ssrInterpolate(Math.abs(unref(value)))}</span></div></div>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ExpenseItem.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = {
  __name: "ExpenseGroup",
  __ssrInlineRender: true,
  props: ["group"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ExpenseItem = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5" }, _attrs))}><div class="flex items-center gap-3 px-1"><span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">${ssrInterpolate(__props.group.month)}</span><div class="flex-grow h-px bg-gray-100 dark:bg-gray-800"></div></div>`);
      if (__props.group.expenses.length > 0) {
        _push(`<div class="space-y-1.5"><div class="flex items-center gap-2 px-1"><span class="text-xs font-medium text-gray-400 dark:text-gray-500">Expenses</span><div class="flex-grow h-px bg-gray-100 dark:bg-gray-800/50"></div></div><!--[-->`);
        ssrRenderList(__props.group.expenses, (expense) => {
          _push(ssrRenderComponent(_component_ExpenseItem, {
            expense,
            onEdit: ($event) => _ctx.$emit("edit", expense)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.group.payments.length > 0) {
        _push(`<div class="space-y-1.5"><div class="flex items-center gap-2 px-1"><span class="text-xs font-medium text-gray-400 dark:text-gray-500">Payments</span><div class="flex-grow h-px bg-gray-100 dark:bg-gray-800/50"></div></div><!--[-->`);
        ssrRenderList(__props.group.payments, (payment) => {
          _push(ssrRenderComponent(_component_ExpenseItem, {
            expense: payment,
            onEdit: ($event) => _ctx.$emit("edit", payment)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ExpenseGroup.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const config$3 = mergeConfig(appConfig.ui.strategy, appConfig.ui.kbd, kbd);
const _sfc_main$b = defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: () => config$3.default.size,
      validator(value) {
        return Object.keys(config$3.size).includes(value);
      }
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("kbd", toRef(props, "ui"), config$3);
    const kbdClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.size[props.size],
        ui.value.padding,
        ui.value.rounded,
        ui.value.font,
        ui.value.background,
        ui.value.ring
      ), props.class);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      kbdClass
    };
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<kbd${ssrRenderAttrs(mergeProps({ class: _ctx.kbdClass }, _ctx.attrs, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
    _push(`${ssrInterpolate(_ctx.value)}`);
  }, _push, _parent);
  _push(`</kbd>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Kbd.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$3]]);
const config$2 = mergeConfig(appConfig.ui.strategy, appConfig.ui.dropdown, dropdown);
const _sfc_main$a = defineComponent({
  components: {
    HMenu: ge,
    HMenuButton: Se,
    HMenuItems: Me,
    HMenuItem: be,
    UIcon: __nuxt_component_1,
    UAvatar: __nuxt_component_1$1,
    UKbd: __nuxt_component_3
  },
  inheritAttrs: false,
  props: {
    items: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: "click",
      validator: (value) => ["click", "hover"].includes(value)
    },
    open: {
      type: Boolean,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    popper: {
      type: Object,
      default: () => ({})
    },
    openDelay: {
      type: Number,
      default: () => config$2.default.openDelay
    },
    closeDelay: {
      type: Number,
      default: () => config$2.default.closeDelay
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:open"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("dropdown", toRef(props, "ui"), config$2, toRef(props, "class"));
    const popper = computed(() => defu(props.mode === "hover" ? { offsetDistance: 0 } : {}, props.popper, ui.value.popper));
    const [trigger, container] = usePopper(popper.value);
    const menuApi = ref(null);
    let openTimeout = null;
    let closeTimeout = null;
    const containerStyle = computed(() => {
      if (props.mode !== "hover") {
        return {};
      }
      const offsetDistance = props.popper?.offsetDistance || ui.value.popper?.offsetDistance || 8;
      const placement = popper.value.placement?.split("-")[0];
      const padding = `${offsetDistance}px`;
      if (placement === "top" || placement === "bottom") {
        return {
          paddingTop: padding,
          paddingBottom: padding
        };
      } else if (placement === "left" || placement === "right") {
        return {
          paddingLeft: padding,
          paddingRight: padding
        };
      } else {
        return {
          paddingTop: padding,
          paddingBottom: padding,
          paddingLeft: padding,
          paddingRight: padding
        };
      }
    });
    function onTouchStart(event) {
      if (!event.cancelable || !menuApi.value || props.mode === "click") {
        return;
      }
      if (menuApi.value.menuState === 0) {
        menuApi.value.closeMenu();
      } else {
        menuApi.value.openMenu();
      }
    }
    function onMouseEnter() {
      if (props.mode !== "hover" || !menuApi.value) {
        return;
      }
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
      if (menuApi.value.menuState === 0) {
        return;
      }
      openTimeout = openTimeout || setTimeout(() => {
        if (menuApi.value.openMenu) {
          menuApi.value.openMenu();
        }
        openTimeout = null;
      }, props.openDelay);
    }
    function onMouseLeave() {
      if (props.mode !== "hover" || !menuApi.value) {
        return;
      }
      if (openTimeout) {
        clearTimeout(openTimeout);
        openTimeout = null;
      }
      if (menuApi.value.menuState === 1) {
        return;
      }
      closeTimeout = closeTimeout || setTimeout(() => {
        if (menuApi.value.closeMenu) {
          menuApi.value.closeMenu();
        }
        closeTimeout = null;
      }, props.closeDelay);
    }
    function onClick(e, item, { href, navigate, close, isExternal }) {
      if (item.click) {
        item.click(e);
      }
      if (href && !isExternal) {
        navigate(e);
        close();
      }
    }
    watch(() => props.open, (newValue, oldValue) => {
      if (!menuApi.value) return;
      if (oldValue === void 0 || newValue === oldValue) return;
      if (newValue) {
        menuApi.value.openMenu();
      } else {
        menuApi.value.closeMenu();
      }
    });
    watch(() => menuApi.value?.menuState, (newValue, oldValue) => {
      if (oldValue === void 0 || newValue === oldValue) return;
      emit("update:open", newValue === 0);
    });
    const NuxtLink = __nuxt_component_0;
    s$1(() => useId$1());
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      popper,
      trigger,
      container,
      containerStyle,
      onTouchStart,
      onMouseEnter,
      onMouseLeave,
      onClick,
      getNuxtLinkProps,
      twMerge,
      twJoin,
      NuxtLink
    };
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HMenu = resolveComponent("HMenu");
  const _component_HMenuButton = resolveComponent("HMenuButton");
  const _component_HMenuItems = resolveComponent("HMenuItems");
  const _component_NuxtLink = __nuxt_component_0;
  const _component_HMenuItem = resolveComponent("HMenuItem");
  const _component_UIcon = __nuxt_component_1;
  const _component_UAvatar = __nuxt_component_1$1;
  const _component_UKbd = __nuxt_component_3;
  _push(ssrRenderComponent(_component_HMenu, mergeProps({
    as: "div",
    class: _ctx.ui.wrapper
  }, _ctx.attrs, { onMouseleave: _ctx.onMouseLeave }, _attrs), {
    default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HMenuButton, {
          ref: "trigger",
          as: "div",
          disabled: _ctx.disabled,
          class: _ctx.ui.trigger,
          role: "button",
          onMouseenter: _ctx.onMouseEnter,
          onTouchstart: _ctx.onTouchStart
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              ssrRenderSlot(_ctx.$slots, "default", {
                open,
                disabled: _ctx.disabled
              }, () => {
                _push3(`<button${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${_scopeId2}> Open </button>`);
              }, _push3, _parent3, _scopeId2);
            } else {
              return [
                renderSlot(_ctx.$slots, "default", {
                  open,
                  disabled: _ctx.disabled
                }, () => [
                  createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])
                ])
              ];
            }
          }),
          _: 2
        }, _parent2, _scopeId));
        if (open && _ctx.items.length) {
          _push2(`<div class="${ssrRenderClass([_ctx.ui.container, _ctx.ui.width])}" style="${ssrRenderStyle(_ctx.containerStyle)}"${_scopeId}><template><div${_scopeId}>`);
          if (_ctx.popper.arrow) {
            _push2(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.ui.arrow))}"${_scopeId}></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(ssrRenderComponent(_component_HMenuItems, {
            class: [_ctx.ui.base, _ctx.ui.divide, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.shadow, _ctx.ui.background, _ctx.ui.height],
            static: ""
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<!--[-->`);
                ssrRenderList(_ctx.items, (subItems, index) => {
                  _push3(`<div class="${ssrRenderClass(_ctx.ui.padding)}"${_scopeId2}><!--[-->`);
                  ssrRenderList(subItems, (item, subIndex) => {
                    _push3(ssrRenderComponent(_component_NuxtLink, mergeProps({ key: subIndex }, { ref_for: true }, _ctx.getNuxtLinkProps(item), { custom: "" }), {
                      default: withCtx(({ href, target, rel, navigate, isExternal, isActive }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_HMenuItem, {
                            disabled: item.disabled
                          }, {
                            default: withCtx(({ active, disabled: itemDisabled, close }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(!!href ? "a" : "button"), {
                                  href: !itemDisabled ? href : void 0,
                                  rel,
                                  target,
                                  class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
                                  onClick: ($event) => _ctx.onClick($event, item, { href, navigate, close, isExternal })
                                }, {
                                  default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      ssrRenderSlot(_ctx.$slots, item.slot || "item", { item }, () => {
                                        if (item.icon) {
                                          _push6(ssrRenderComponent(_component_UIcon, {
                                            name: item.icon,
                                            class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                          }, null, _parent6, _scopeId5));
                                        } else if (item.avatar) {
                                          _push6(ssrRenderComponent(_component_UAvatar, mergeProps({ ref_for: true }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                            class: _ctx.ui.item.avatar.base
                                          }), null, _parent6, _scopeId5));
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                        _push6(`<span class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.item.label, item.labelClass))}"${_scopeId5}>${ssrInterpolate(item.label)}</span>`);
                                        if (item.shortcuts?.length) {
                                          _push6(`<span class="${ssrRenderClass(_ctx.ui.item.shortcuts)}"${_scopeId5}><!--[-->`);
                                          ssrRenderList(item.shortcuts, (shortcut) => {
                                            _push6(ssrRenderComponent(_component_UKbd, { key: shortcut }, {
                                              default: withCtx((_4, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(`${ssrInterpolate(shortcut)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(shortcut), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          });
                                          _push6(`<!--]--></span>`);
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                      }, _push6, _parent6, _scopeId5);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, item.slot || "item", { item }, () => [
                                          item.icon ? (openBlock(), createBlock(_component_UIcon, {
                                            key: 0,
                                            name: item.icon,
                                            class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                          }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                                            key: 1,
                                            ref_for: true
                                          }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                            class: _ctx.ui.item.avatar.base
                                          }), null, 16, ["class"])) : createCommentVNode("", true),
                                          createVNode("span", {
                                            class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass)
                                          }, toDisplayString(item.label), 3),
                                          item.shortcuts?.length ? (openBlock(), createBlock("span", {
                                            key: 2,
                                            class: _ctx.ui.item.shortcuts
                                          }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
                                              return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(shortcut), 1)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ], 2)) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }), _parent5, _scopeId4);
                              } else {
                                return [
                                  (openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
                                    href: !itemDisabled ? href : void 0,
                                    rel,
                                    target,
                                    class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
                                    onClick: ($event) => _ctx.onClick($event, item, { href, navigate, close, isExternal })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, item.slot || "item", { item }, () => [
                                        item.icon ? (openBlock(), createBlock(_component_UIcon, {
                                          key: 0,
                                          name: item.icon,
                                          class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                        }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                                          key: 1,
                                          ref_for: true
                                        }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                          class: _ctx.ui.item.avatar.base
                                        }), null, 16, ["class"])) : createCommentVNode("", true),
                                        createVNode("span", {
                                          class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass)
                                        }, toDisplayString(item.label), 3),
                                        item.shortcuts?.length ? (openBlock(), createBlock("span", {
                                          key: 2,
                                          class: _ctx.ui.item.shortcuts
                                        }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
                                            return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(shortcut), 1)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ], 2)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["href", "rel", "target", "class", "onClick"]))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_HMenuItem, {
                              disabled: item.disabled
                            }, {
                              default: withCtx(({ active, disabled: itemDisabled, close }) => [
                                (openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
                                  href: !itemDisabled ? href : void 0,
                                  rel,
                                  target,
                                  class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
                                  onClick: ($event) => _ctx.onClick($event, item, { href, navigate, close, isExternal })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, item.slot || "item", { item }, () => [
                                      item.icon ? (openBlock(), createBlock(_component_UIcon, {
                                        key: 0,
                                        name: item.icon,
                                        class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                      }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                                        key: 1,
                                        ref_for: true
                                      }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                        class: _ctx.ui.item.avatar.base
                                      }), null, 16, ["class"])) : createCommentVNode("", true),
                                      createVNode("span", {
                                        class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass)
                                      }, toDisplayString(item.label), 3),
                                      item.shortcuts?.length ? (openBlock(), createBlock("span", {
                                        key: 2,
                                        class: _ctx.ui.item.shortcuts
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
                                          return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(shortcut), 1)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ], 2)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["href", "rel", "target", "class", "onClick"]))
                              ]),
                              _: 2
                            }, 1032, ["disabled"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                });
                _push3(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (subItems, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: _ctx.ui.padding
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(subItems, (item, subIndex) => {
                        return openBlock(), createBlock(_component_NuxtLink, mergeProps({ key: subIndex }, { ref_for: true }, _ctx.getNuxtLinkProps(item), { custom: "" }), {
                          default: withCtx(({ href, target, rel, navigate, isExternal, isActive }) => [
                            createVNode(_component_HMenuItem, {
                              disabled: item.disabled
                            }, {
                              default: withCtx(({ active, disabled: itemDisabled, close }) => [
                                (openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
                                  href: !itemDisabled ? href : void 0,
                                  rel,
                                  target,
                                  class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
                                  onClick: ($event) => _ctx.onClick($event, item, { href, navigate, close, isExternal })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, item.slot || "item", { item }, () => [
                                      item.icon ? (openBlock(), createBlock(_component_UIcon, {
                                        key: 0,
                                        name: item.icon,
                                        class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                      }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                                        key: 1,
                                        ref_for: true
                                      }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                        class: _ctx.ui.item.avatar.base
                                      }), null, 16, ["class"])) : createCommentVNode("", true),
                                      createVNode("span", {
                                        class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass)
                                      }, toDisplayString(item.label), 3),
                                      item.shortcuts?.length ? (openBlock(), createBlock("span", {
                                        key: 2,
                                        class: _ctx.ui.item.shortcuts
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
                                          return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(shortcut), 1)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ], 2)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["href", "rel", "target", "class", "onClick"]))
                              ]),
                              _: 2
                            }, 1032, ["disabled"])
                          ]),
                          _: 2
                        }, 1040);
                      }), 128))
                    ], 2);
                  }), 128))
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div></template></div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode(_component_HMenuButton, {
            ref: "trigger",
            as: "div",
            disabled: _ctx.disabled,
            class: _ctx.ui.trigger,
            role: "button",
            onMouseenter: _ctx.onMouseEnter,
            onTouchstartPassive: _ctx.onTouchStart
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {
                open,
                disabled: _ctx.disabled
              }, () => [
                createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])
              ])
            ]),
            _: 2
          }, 1032, ["disabled", "class", "onMouseenter", "onTouchstartPassive"]),
          open && _ctx.items.length ? (openBlock(), createBlock("div", {
            key: 0,
            ref: "container",
            class: [_ctx.ui.container, _ctx.ui.width],
            style: _ctx.containerStyle,
            onMouseenter: _ctx.onMouseEnter
          }, [
            createVNode(Transition, mergeProps({ appear: "" }, _ctx.ui.transition), {
              default: withCtx(() => [
                createVNode("div", null, [
                  _ctx.popper.arrow ? (openBlock(), createBlock("div", {
                    key: 0,
                    "data-popper-arrow": "",
                    class: Object.values(_ctx.ui.arrow)
                  }, null, 2)) : createCommentVNode("", true),
                  createVNode(_component_HMenuItems, {
                    class: [_ctx.ui.base, _ctx.ui.divide, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.shadow, _ctx.ui.background, _ctx.ui.height],
                    static: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (subItems, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: _ctx.ui.padding
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(subItems, (item, subIndex) => {
                            return openBlock(), createBlock(_component_NuxtLink, mergeProps({ key: subIndex }, { ref_for: true }, _ctx.getNuxtLinkProps(item), { custom: "" }), {
                              default: withCtx(({ href, target, rel, navigate, isExternal, isActive }) => [
                                createVNode(_component_HMenuItem, {
                                  disabled: item.disabled
                                }, {
                                  default: withCtx(({ active, disabled: itemDisabled, close }) => [
                                    (openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
                                      href: !itemDisabled ? href : void 0,
                                      rel,
                                      target,
                                      class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
                                      onClick: ($event) => _ctx.onClick($event, item, { href, navigate, close, isExternal })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, item.slot || "item", { item }, () => [
                                          item.icon ? (openBlock(), createBlock(_component_UIcon, {
                                            key: 0,
                                            name: item.icon,
                                            class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                          }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                                            key: 1,
                                            ref_for: true
                                          }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                            class: _ctx.ui.item.avatar.base
                                          }), null, 16, ["class"])) : createCommentVNode("", true),
                                          createVNode("span", {
                                            class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass)
                                          }, toDisplayString(item.label), 3),
                                          item.shortcuts?.length ? (openBlock(), createBlock("span", {
                                            key: 2,
                                            class: _ctx.ui.item.shortcuts
                                          }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
                                              return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(shortcut), 1)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ], 2)) : createCommentVNode("", true)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["href", "rel", "target", "class", "onClick"]))
                                  ]),
                                  _: 2
                                }, 1032, ["disabled"])
                              ]),
                              _: 2
                            }, 1040);
                          }), 128))
                        ], 2);
                      }), 128))
                    ]),
                    _: 3
                  }, 8, ["class"])
                ])
              ]),
              _: 3
            }, 16)
          ], 46, ["onMouseenter"])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Dropdown.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$9 = {
  __name: "MemberValueEdit",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels([
    "addLabel",
    "members",
    "noValues"
  ], {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const groupID = useGroupID();
    const model = useModel(__props, "modelValue");
    const availableMembers = computed(
      () => __props.members.filter((member) => !model.value.hasOwnProperty(member.id))
    );
    const dropdownWidth = ref(0);
    const cssVars = computed(() => ({ "--width": `${dropdownWidth.value}px` }));
    const button = ref(null);
    watch(availableMembers, () => {
      fixWidth();
    });
    function fixWidth() {
      nextTick(() => {
        if (button.value?.$el?.offsetWidth) {
          dropdownWidth.value = button.value.$el.offsetWidth;
        }
      });
    }
    function fixValue(member) {
      nextTick(() => {
        const fixed = model.value[member].match(/\d+(\.\d?\d?)?/)?.[0] || "";
        if (model.value[member] !== fixed) model.value[member] = fixed;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = __nuxt_component_1$2;
      const _component_UButton = __nuxt_component_0$1;
      const _component_UDropdown = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><div><!--[-->`);
      ssrRenderList(Object.keys(model.value || {}), (member) => {
        _push(`<div class="flex justify-between items-center"><div class="flex-grow flex items-center"><span class="font-light text-gray-700 dark:text-gray-300">${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(unref(groupID), member))}</span></div><div class="flex items-center gap-1">`);
        if (!__props.noValues) {
          _push(ssrRenderComponent(_component_UInput, {
            onInput: ($event) => fixValue(member),
            modelValue: model.value[member],
            "onUpdate:modelValue": ($event) => model.value[member] = $event,
            placeholder: "ex: 150.45",
            size: "xs"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_UButton, {
          color: "gray",
          icon: "i-heroicons-x-mark",
          size: "sm",
          variant: "ghost",
          onClick: ($event) => delete model.value[member]
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><div style="${ssrRenderStyle(unref(cssVars))}">`);
      if (unref(availableMembers).length > 0) {
        _push(ssrRenderComponent(_component_UDropdown, {
          class: "w-full",
          ui: { width: "w-[--width]" },
          items: [
            unref(availableMembers).map((member) => {
              return {
                label: member.name,
                click: () => {
                  model.value[member.id] = "";
                }
              };
            })
          ],
          popper: { placement: "bottom-start" }
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                icon: "i-heroicons-plus",
                block: "",
                size: "xs",
                color: "white",
                label: __props.addLabel,
                ref_key: "button",
                ref: button
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  icon: "i-heroicons-plus",
                  block: "",
                  size: "xs",
                  color: "white",
                  label: __props.addLabel,
                  ref_key: "button",
                  ref: button
                }, null, 8, ["label"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MemberValueEdit.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const config$1 = mergeConfig(appConfig.ui.strategy, appConfig.ui.checkbox, checkbox);
const _sfc_main$8 = defineComponent({
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: () => null
    },
    value: {
      type: [String, Number, Boolean, Object],
      default: null
    },
    modelValue: {
      type: [Boolean, Array],
      default: null
    },
    name: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: void 0
    },
    help: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: () => config$1.default.color,
      validator(value) {
        return appConfig.ui.colors.includes(value);
      }
    },
    inputClass: {
      type: String,
      default: ""
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("checkbox", toRef(props, "ui"), config$1, toRef(props, "class"));
    const { emitFormChange, color, name, inputId: _inputId } = useFormGroup(props);
    const inputId = _inputId.value ?? useId();
    const toggle = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const onChange = (event) => {
      emit("change", event.target.checked);
      emitFormChange();
    };
    const inputClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.form,
        ui.value.rounded,
        ui.value.background,
        ui.value.border,
        color.value && ui.value.ring.replaceAll("{color}", color.value),
        color.value && ui.value.color.replaceAll("{color}", color.value)
      ), props.inputClass);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      toggle,
      inputId,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      // eslint-disable-next-line vue/no-dupe-keys
      inputClass,
      onChange
    };
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  let _temp0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper,
    "data-n-ids": _ctx.attrs["data-n-ids"]
  }, _attrs))}><div class="${ssrRenderClass(_ctx.ui.container)}"><input${ssrRenderAttrs((_temp0 = mergeProps({
    id: _ctx.inputId,
    checked: Array.isArray(_ctx.toggle) ? ssrLooseContain(_ctx.toggle, _ctx.value) : _ctx.toggle,
    name: _ctx.name,
    required: _ctx.required,
    value: _ctx.value,
    disabled: _ctx.disabled,
    indeterminate: _ctx.indeterminate,
    type: "checkbox",
    class: _ctx.inputClass
  }, _ctx.attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, _ctx.toggle))))}></div>`);
  if (_ctx.label || _ctx.$slots.label) {
    _push(`<div class="${ssrRenderClass(_ctx.ui.inner)}"><label${ssrRenderAttr("for", _ctx.inputId)} class="${ssrRenderClass(_ctx.ui.label)}">`);
    ssrRenderSlot(_ctx.$slots, "label", { label: _ctx.label }, () => {
      _push(`${ssrInterpolate(_ctx.label)}`);
    }, _push, _parent);
    if (_ctx.required) {
      _push(`<span class="${ssrRenderClass(_ctx.ui.required)}">*</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</label>`);
    if (_ctx.help || _ctx.$slots.help) {
      _push(`<p class="${ssrRenderClass(_ctx.ui.help)}">`);
      ssrRenderSlot(_ctx.$slots, "help", { help: _ctx.help }, () => {
        _push(`${ssrInterpolate(_ctx.help)}`);
      }, _push, _parent);
      _push(`</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Checkbox.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$7 = {
  __name: "ExpenseEditor",
  __ssrInlineRender: true,
  props: ["expenseItem"],
  emits: ["update", "add"],
  setup(__props, { emit: __emit }) {
    const getCategoryColor = (id) => {
      const cat = EXPENSE_CATEGORIES.find((c2) => c2.id === id);
      return cat?.color || "gray";
    };
    const getCategoryLabel = (id) => {
      const cat = EXPENSE_CATEGORIES.find((c2) => c2.id === id);
      return cat?.label || "Other";
    };
    const CATEGORY_COLOR_HEX = {
      rose: "#f43f5e",
      sky: "#0ea5e9",
      amber: "#f59e0b",
      violet: "#8b5cf6",
      emerald: "#10b981",
      pink: "#ec4899",
      indigo: "#6366f1",
      orange: "#f97316",
      teal: "#14b8a6",
      lime: "#84cc16",
      gray: "#6b7280"
    };
    const emit = __emit;
    const groupID = useGroupID();
    const getDefaultSplit = () => {
      const json = localStorage.getItem(`peersplit.${groupID}.defaultSplit`);
      if (json) {
        return JSON.parse(json);
      }
      return { splitters: {}, splitType: 1 };
    };
    const onSubmit = () => {
      if (saveAsDefaultSplit.value) {
        localStorage.setItem(
          `peersplit.${groupID}.defaultSplit`,
          JSON.stringify({
            splitters: expense.value.splitters,
            splitType: expense.value.splitType
          })
        );
      }
      emit(__props.expenseItem ? "update" : "add", expense.value);
    };
    const getDefaultExpense = () => {
      const e = {
        id: nanoid(),
        type: "expense",
        description: "",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        ...getDefaultSplit()
      };
      const myID = useGroups().getGroupByID(groupID)?.myID;
      e.payers = myID ? { [myID]: "" } : {};
      return e;
    };
    const expenseDate = computed({
      get: () => expense.value.created_at ? moment.utc(expense.value.created_at).format("YYYY-MM-DD") : moment.utc().format("YYYY-MM-DD"),
      set: (val) => {
        expense.value.created_at = moment.utc(val).startOf("day").toISOString();
      }
    });
    const expense = ref(
      __props.expenseItem ? JSON.parse(JSON.stringify(__props.expenseItem)) : getDefaultExpense()
    );
    const saveAsDefaultSplit = ref(false);
    const paid = computed(
      () => Object.values(expense.value.payers).reduce(
        (a, b) => round(Number(a) + Number(b)),
        0
      )
    );
    const split = computed(
      () => Object.values(expense.value.splitters).reduce(
        (a, b) => round(Number(a) + Number(b)),
        0
      )
    );
    const remaining = computed(() => {
      if (expense.value.splitType === 4 || expense.value.splitType === 1) return 0;
      const total = expense.value.splitType === 2 ? paid.value : 100;
      return round(total - split.value);
    });
    const adding = ref(false);
    const members = computed(() => useGroups().getMembersList(groupID));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_7$1;
      const _component_UButton = __nuxt_component_0$1;
      const _component_UFormGroup = __nuxt_component_2$1;
      const _component_UInput = __nuxt_component_1$2;
      const _component_USelectMenu = __nuxt_component_0$2;
      const _component_MemberValueEdit = _sfc_main$9;
      const _component_UCheckbox = __nuxt_component_6;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><span class="font-medium"${_scopeId}>${ssrInterpolate(__props.expenseItem ? "Update" : "Add")} Expense</span>`);
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: ($event) => _ctx.$emit("close"),
              variant: "ghost",
              color: "gray",
              icon: "i-heroicons-x-mark"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("span", { class: "font-medium" }, toDisplayString(__props.expenseItem ? "Update" : "Add") + " Expense", 1),
                createVNode(_component_UButton, {
                  onClick: ($event) => _ctx.$emit("close"),
                  variant: "ghost",
                  color: "gray",
                  icon: "i-heroicons-x-mark"
                }, null, 8, ["onClick"])
              ])
            ];
          }
        }),
        footer: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: onSubmit,
              loading: unref(adding),
              variant: "outline",
              disabled: Object.keys(unref(expense).splitters).length === 0 || unref(expense).splitType === 4 && unref(split) === 0 || unref(paid) === 0 || !unref(expense).description || unref(remaining) !== 0
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.expenseItem ? "Update" : "Add")} Expense`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.expenseItem ? "Update" : "Add") + " Expense", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.expenseItem) {
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => _ctx.$emit("delete", unref(expense)),
                variant: "ghost",
                color: "rose"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Delete`);
                  } else {
                    return [
                      createTextVNode("Delete")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-2" }, [
                createVNode(_component_UButton, {
                  onClick: onSubmit,
                  loading: unref(adding),
                  variant: "outline",
                  disabled: Object.keys(unref(expense).splitters).length === 0 || unref(expense).splitType === 4 && unref(split) === 0 || unref(paid) === 0 || !unref(expense).description || unref(remaining) !== 0
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(__props.expenseItem ? "Update" : "Add") + " Expense", 1)
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"]),
                __props.expenseItem ? (openBlock(), createBlock(_component_UButton, {
                  key: 0,
                  onClick: ($event) => _ctx.$emit("delete", unref(expense)),
                  variant: "ghost",
                  color: "rose"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Delete")
                  ]),
                  _: 1
                }, 8, ["onClick"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Description" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(expense).description,
                    "onUpdate:modelValue": ($event) => unref(expense).description = $event,
                    placeholder: "ex: Groceries"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(expense).description,
                      "onUpdate:modelValue": ($event) => unref(expense).description = $event,
                      placeholder: "ex: Groceries"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Date" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(expenseDate),
                    "onUpdate:modelValue": ($event) => isRef(expenseDate) ? expenseDate.value = $event : null,
                    type: "date"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(expenseDate),
                      "onUpdate:modelValue": ($event) => isRef(expenseDate) ? expenseDate.value = $event : null,
                      type: "date"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Category" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelectMenu, {
                    modelValue: unref(expense).category,
                    "onUpdate:modelValue": ($event) => unref(expense).category = $event,
                    options: unref(EXPENSE_CATEGORIES),
                    "value-attribute": "id",
                    "option-attribute": "label",
                    placeholder: "Select category"
                  }, {
                    option: withCtx(({ option: cat }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}><span class="w-2 h-2 rounded-full" style="${ssrRenderStyle({ backgroundColor: CATEGORY_COLOR_HEX[cat.color] || "#6b7280" })}"${_scopeId3}></span><span${_scopeId3}>${ssrInterpolate(cat.label)}</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("span", {
                              class: "w-2 h-2 rounded-full",
                              style: { backgroundColor: CATEGORY_COLOR_HEX[cat.color] || "#6b7280" }
                            }, null, 4),
                            createVNode("span", null, toDisplayString(cat.label), 1)
                          ])
                        ];
                      }
                    }),
                    label: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(expense).category) {
                          _push4(`<div class="flex items-center gap-2"${_scopeId3}><span class="w-2 h-2 rounded-full" style="${ssrRenderStyle({ backgroundColor: CATEGORY_COLOR_HEX[getCategoryColor(unref(expense).category)] || "#6b7280" })}"${_scopeId3}></span><span${_scopeId3}>${ssrInterpolate(getCategoryLabel(unref(expense).category))}</span></div>`);
                        } else {
                          _push4(`<span${_scopeId3}>Select category</span>`);
                        }
                      } else {
                        return [
                          unref(expense).category ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-2"
                          }, [
                            createVNode("span", {
                              class: "w-2 h-2 rounded-full",
                              style: { backgroundColor: CATEGORY_COLOR_HEX[getCategoryColor(unref(expense).category)] || "#6b7280" }
                            }, null, 4),
                            createVNode("span", null, toDisplayString(getCategoryLabel(unref(expense).category)), 1)
                          ])) : (openBlock(), createBlock("span", { key: 1 }, "Select category"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelectMenu, {
                      modelValue: unref(expense).category,
                      "onUpdate:modelValue": ($event) => unref(expense).category = $event,
                      options: unref(EXPENSE_CATEGORIES),
                      "value-attribute": "id",
                      "option-attribute": "label",
                      placeholder: "Select category"
                    }, {
                      option: withCtx(({ option: cat }) => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("span", {
                            class: "w-2 h-2 rounded-full",
                            style: { backgroundColor: CATEGORY_COLOR_HEX[cat.color] || "#6b7280" }
                          }, null, 4),
                          createVNode("span", null, toDisplayString(cat.label), 1)
                        ])
                      ]),
                      label: withCtx(() => [
                        unref(expense).category ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode("span", {
                            class: "w-2 h-2 rounded-full",
                            style: { backgroundColor: CATEGORY_COLOR_HEX[getCategoryColor(unref(expense).category)] || "#6b7280" }
                          }, null, 4),
                          createVNode("span", null, toDisplayString(getCategoryLabel(unref(expense).category)), 1)
                        ])) : (openBlock(), createBlock("span", { key: 1 }, "Select category"))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, null, {
              label: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Paid By</span>`);
                  if (unref(paid) !== 0) {
                    _push3(`<span class="font-normal color-positive"${_scopeId2}> · ${ssrInterpolate(unref(paid))}</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("span", null, "Paid By"),
                    unref(paid) !== 0 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "font-normal color-positive"
                    }, " · " + toDisplayString(unref(paid)), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_MemberValueEdit, {
                    members: unref(members),
                    addLabel: "Add Payers",
                    modelValue: unref(expense).payers,
                    "onUpdate:modelValue": ($event) => unref(expense).payers = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_MemberValueEdit, {
                      members: unref(members),
                      addLabel: "Add Payers",
                      modelValue: unref(expense).payers,
                      "onUpdate:modelValue": ($event) => unref(expense).payers = $event
                    }, null, 8, ["members", "modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Split Type" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelectMenu, {
                    modelValue: unref(expense).splitType,
                    "onUpdate:modelValue": ($event) => unref(expense).splitType = $event,
                    "value-attribute": "id",
                    "option-attribute": "name",
                    placeholder: "Select split type",
                    options: "splitTypes" in _ctx ? _ctx.splitTypes : unref(splitTypes)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelectMenu, {
                      modelValue: unref(expense).splitType,
                      "onUpdate:modelValue": ($event) => unref(expense).splitType = $event,
                      "value-attribute": "id",
                      "option-attribute": "name",
                      placeholder: "Select split type",
                      options: "splitTypes" in _ctx ? _ctx.splitTypes : unref(splitTypes)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, null, {
              label: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Split Between</span>`);
                  if (unref(remaining) !== 0) {
                    _push3(`<span class="font-normal color-negative"${_scopeId2}> · ${ssrInterpolate(unref(remaining))} remaining</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(expense).splitType === 4) {
                    _push3(`<span class="font-normal color-neutral"${_scopeId2}> · ${ssrInterpolate(unref(split))} total shares</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("span", null, "Split Between"),
                    unref(remaining) !== 0 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "font-normal color-negative"
                    }, " · " + toDisplayString(unref(remaining)) + " remaining", 1)) : createCommentVNode("", true),
                    unref(expense).splitType === 4 ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "font-normal color-neutral"
                    }, " · " + toDisplayString(unref(split)) + " total shares", 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_MemberValueEdit, {
                    modelValue: unref(expense).splitters,
                    "onUpdate:modelValue": ($event) => unref(expense).splitters = $event,
                    members: unref(members),
                    addLabel: "Add Members",
                    noValues: unref(expense).splitType === 1
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_MemberValueEdit, {
                      modelValue: unref(expense).splitters,
                      "onUpdate:modelValue": ($event) => unref(expense).splitters = $event,
                      members: unref(members),
                      addLabel: "Add Members",
                      noValues: unref(expense).splitType === 1
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "members", "noValues"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, null, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UCheckbox, {
                    modelValue: unref(saveAsDefaultSplit),
                    "onUpdate:modelValue": ($event) => isRef(saveAsDefaultSplit) ? saveAsDefaultSplit.value = $event : null,
                    label: "Save as default split"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UCheckbox, {
                      modelValue: unref(saveAsDefaultSplit),
                      "onUpdate:modelValue": ($event) => isRef(saveAsDefaultSplit) ? saveAsDefaultSplit.value = $event : null,
                      label: "Save as default split"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-2" }, [
                createVNode(_component_UFormGroup, { label: "Description" }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(expense).description,
                      "onUpdate:modelValue": ($event) => unref(expense).description = $event,
                      placeholder: "ex: Groceries"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, { label: "Date" }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(expenseDate),
                      "onUpdate:modelValue": ($event) => isRef(expenseDate) ? expenseDate.value = $event : null,
                      type: "date"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, { label: "Category" }, {
                  default: withCtx(() => [
                    createVNode(_component_USelectMenu, {
                      modelValue: unref(expense).category,
                      "onUpdate:modelValue": ($event) => unref(expense).category = $event,
                      options: unref(EXPENSE_CATEGORIES),
                      "value-attribute": "id",
                      "option-attribute": "label",
                      placeholder: "Select category"
                    }, {
                      option: withCtx(({ option: cat }) => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("span", {
                            class: "w-2 h-2 rounded-full",
                            style: { backgroundColor: CATEGORY_COLOR_HEX[cat.color] || "#6b7280" }
                          }, null, 4),
                          createVNode("span", null, toDisplayString(cat.label), 1)
                        ])
                      ]),
                      label: withCtx(() => [
                        unref(expense).category ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode("span", {
                            class: "w-2 h-2 rounded-full",
                            style: { backgroundColor: CATEGORY_COLOR_HEX[getCategoryColor(unref(expense).category)] || "#6b7280" }
                          }, null, 4),
                          createVNode("span", null, toDisplayString(getCategoryLabel(unref(expense).category)), 1)
                        ])) : (openBlock(), createBlock("span", { key: 1 }, "Select category"))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, null, {
                  label: withCtx(() => [
                    createVNode("span", null, "Paid By"),
                    unref(paid) !== 0 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "font-normal color-positive"
                    }, " · " + toDisplayString(unref(paid)), 1)) : createCommentVNode("", true)
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_MemberValueEdit, {
                      members: unref(members),
                      addLabel: "Add Payers",
                      modelValue: unref(expense).payers,
                      "onUpdate:modelValue": ($event) => unref(expense).payers = $event
                    }, null, 8, ["members", "modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, { label: "Split Type" }, {
                  default: withCtx(() => [
                    createVNode(_component_USelectMenu, {
                      modelValue: unref(expense).splitType,
                      "onUpdate:modelValue": ($event) => unref(expense).splitType = $event,
                      "value-attribute": "id",
                      "option-attribute": "name",
                      placeholder: "Select split type",
                      options: "splitTypes" in _ctx ? _ctx.splitTypes : unref(splitTypes)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, null, {
                  label: withCtx(() => [
                    createVNode("span", null, "Split Between"),
                    unref(remaining) !== 0 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "font-normal color-negative"
                    }, " · " + toDisplayString(unref(remaining)) + " remaining", 1)) : createCommentVNode("", true),
                    unref(expense).splitType === 4 ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "font-normal color-neutral"
                    }, " · " + toDisplayString(unref(split)) + " total shares", 1)) : createCommentVNode("", true)
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_MemberValueEdit, {
                      modelValue: unref(expense).splitters,
                      "onUpdate:modelValue": ($event) => unref(expense).splitters = $event,
                      members: unref(members),
                      addLabel: "Add Members",
                      noValues: unref(expense).splitType === 1
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "members", "noValues"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, null, {
                  default: withCtx(() => [
                    createVNode(_component_UCheckbox, {
                      modelValue: unref(saveAsDefaultSplit),
                      "onUpdate:modelValue": ($event) => isRef(saveAsDefaultSplit) ? saveAsDefaultSplit.value = $event : null,
                      label: "Save as default split"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ExpenseEditor.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "SplitwiseImport",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false), error = ref(null), members = ref(null), transactions = ref([]), showConfirmation = ref(false), membersCount = ref(0), transactionsCount = ref(0), importing = ref(false);
    const handleFileChange = (files) => {
      const file = files[0];
      if (file && file.type === "text/csv") {
        loading.value = true;
        error.value = null;
        const reader = new FileReader();
        reader.onload = (e) => {
          const csvContent = e.target.result;
          parseCSV(csvContent);
        };
        reader.readAsText(file);
      } else {
        error.value = "Please select a valid CSV file.";
      }
    };
    const parseCSV = (csvContent) => {
      const records = csvContent.split("\n").map((line) => line.trim()).filter((line) => line.length > 0).join("\n");
      parse(records, {}, (err, data) => {
        if (err || !data || data.length < 2) {
          loading.value = false;
          error.value = true;
        } else {
          const m = data[0].slice(5);
          const t2 = data.slice(1, -1);
          members.value = m;
          transactions.value = t2;
          membersCount.value = m.length;
          transactionsCount.value = t2.length;
          loading.value = false;
          showConfirmation.value = true;
        }
      });
    };
    const confirmImport = async () => {
      showConfirmation.value = false;
      importing.value = true;
      try {
        const groupID = useGroupID();
        await importSplitwise(
          groupID,
          useGroups().getGroupByID(groupID).myID,
          members.value,
          transactions.value
        );
      } catch (err) {
        error.value = true;
      }
      importing.value = false;
    };
    const cancelImport = () => {
      showConfirmation.value = false;
      members.value = null;
      transactions.value = [];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormGroup = __nuxt_component_2$1;
      const _component_UAlert = __nuxt_component_2$2;
      const _component_UInput = __nuxt_component_1$2;
      _push(ssrRenderComponent(_component_UFormGroup, mergeProps({
        error: unref(error) ? "Something went wrong!" : null,
        label: "Import from Splitwise"
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(loading) && !unref(members) || unref(importing)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                title: "Importing...",
                variant: "soft",
                color: "primary",
                icon: "i-heroicons-arrow-path-20-solid",
                ui: { icon: { base: "animate-spin" } }
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(loading) && unref(members)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                title: "Importing...",
                variant: "soft",
                color: "primary",
                icon: "i-heroicons-information-circle"
              }, null, _parent2, _scopeId));
            } else if (!unref(showConfirmation) && !unref(importing)) {
              _push2(ssrRenderComponent(_component_UInput, {
                type: "file",
                size: "sm",
                icon: "i-heroicons-folder",
                accept: ".csv",
                onChange: handleFileChange
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(showConfirmation)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                actions: [
                  {
                    variant: "solid",
                    color: "primary",
                    label: "Confirm",
                    onClick: confirmImport
                  },
                  {
                    variant: "outline",
                    color: "primary",
                    label: "Cancel",
                    onClick: cancelImport
                  }
                ],
                title: "Confirm Import",
                icon: "i-heroicons-information-circle"
              }, {
                description: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` You are about to import <span class="font-medium"${_scopeId2}>${ssrInterpolate(unref(membersCount))}</span> members and <span class="font-medium"${_scopeId2}>${ssrInterpolate(unref(transactionsCount))}</span> transactions. Proceed? `);
                  } else {
                    return [
                      createTextVNode(" You are about to import "),
                      createVNode("span", { class: "font-medium" }, toDisplayString(unref(membersCount)), 1),
                      createTextVNode(" members and "),
                      createVNode("span", { class: "font-medium" }, toDisplayString(unref(transactionsCount)), 1),
                      createTextVNode(" transactions. Proceed? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(loading) && !unref(members) || unref(importing) ? (openBlock(), createBlock(_component_UAlert, {
                key: 0,
                title: "Importing...",
                variant: "soft",
                color: "primary",
                icon: "i-heroicons-arrow-path-20-solid",
                ui: { icon: { base: "animate-spin" } }
              })) : createCommentVNode("", true),
              unref(loading) && unref(members) ? (openBlock(), createBlock(_component_UAlert, {
                key: 1,
                title: "Importing...",
                variant: "soft",
                color: "primary",
                icon: "i-heroicons-information-circle"
              })) : !unref(showConfirmation) && !unref(importing) ? (openBlock(), createBlock(_component_UInput, {
                key: 2,
                type: "file",
                size: "sm",
                icon: "i-heroicons-folder",
                accept: ".csv",
                onChange: handleFileChange
              })) : createCommentVNode("", true),
              unref(showConfirmation) ? (openBlock(), createBlock(_component_UAlert, {
                key: 3,
                actions: [
                  {
                    variant: "solid",
                    color: "primary",
                    label: "Confirm",
                    onClick: confirmImport
                  },
                  {
                    variant: "outline",
                    color: "primary",
                    label: "Cancel",
                    onClick: cancelImport
                  }
                ],
                title: "Confirm Import",
                icon: "i-heroicons-information-circle"
              }, {
                description: withCtx(() => [
                  createTextVNode(" You are about to import "),
                  createVNode("span", { class: "font-medium" }, toDisplayString(unref(membersCount)), 1),
                  createTextVNode(" members and "),
                  createVNode("span", { class: "font-medium" }, toDisplayString(unref(transactionsCount)), 1),
                  createTextVNode(" transactions. Proceed? ")
                ]),
                _: 1
              }, 8, ["actions"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SplitwiseImport.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "SupabaseImport",
  __ssrInlineRender: true,
  setup(__props) {
    const supabaseUrl = ref(""), anonKey = ref(""), loading = ref(false), importing = ref(false), error = ref(null), members = ref([]), expenses = ref([]), payments = ref([]), showConfirmation = ref(false), membersCount = ref(0), expensesCount = ref(0), paymentsCount = ref(0);
    const fetchSupabaseData = async () => {
      loading.value = true;
      error.value = null;
      try {
        const headers = {
          apikey: anonKey.value,
          Authorization: `Bearer ${anonKey.value}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        let baseUrl = supabaseUrl.value.replace(/\/+$/, "");
        if (!baseUrl.includes("/rest/v1")) {
          baseUrl += "/rest/v1";
        }
        const limit = 5e3;
        const [membersRes, expensesRes, paymentsRes] = await Promise.all([
          fetch(`${baseUrl}/members?select=*&order=name.asc&limit=${limit}`, { headers }),
          fetch(`${baseUrl}/expenses?select=*&order=date.asc&limit=${limit}`, { headers }),
          fetch(`${baseUrl}/payments?select=*&order=date.asc&limit=${limit}`, { headers })
        ]);
        if (!membersRes.ok)
          throw new Error(
            `Failed to fetch members: ${membersRes.status} ${membersRes.statusText}`
          );
        if (!expensesRes.ok)
          throw new Error(
            `Failed to fetch expenses: ${expensesRes.status} ${expensesRes.statusText}`
          );
        if (!paymentsRes.ok)
          throw new Error(
            `Failed to fetch payments: ${paymentsRes.status} ${paymentsRes.statusText}`
          );
        members.value = await membersRes.json();
        expenses.value = await expensesRes.json();
        payments.value = await paymentsRes.json();
        membersCount.value = members.value.length;
        expensesCount.value = expenses.value.length;
        paymentsCount.value = payments.value.length;
        if (membersCount.value === 0) {
          error.value = "No members found in Supabase.";
          loading.value = false;
          return;
        }
        showConfirmation.value = true;
      } catch (err) {
        error.value = err.message || "Failed to connect to Supabase. Check your URL and key.";
      }
      loading.value = false;
    };
    const confirmImport = async () => {
      showConfirmation.value = false;
      importing.value = true;
      try {
        const groupID = useGroupID();
        await importSupabase(
          groupID,
          useGroups().getGroupByID(groupID).myID,
          members.value,
          expenses.value,
          payments.value
        );
        error.value = null;
      } catch (err) {
        error.value = "Something went wrong during import.";
      }
      importing.value = false;
    };
    const cancelImport = () => {
      showConfirmation.value = false;
      members.value = [];
      expenses.value = [];
      payments.value = [];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormGroup = __nuxt_component_2$1;
      const _component_UAlert = __nuxt_component_2$2;
      const _component_UInput = __nuxt_component_1$2;
      const _component_UButton = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_UFormGroup, mergeProps({
        error: unref(error) ? unref(error) : null,
        label: "Import from Supabase"
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(loading) || unref(importing)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                title: unref(loading) ? "Fetching data..." : "Importing...",
                variant: "soft",
                color: "primary",
                icon: unref(loading) || unref(importing) ? "i-heroicons-arrow-path-20-solid" : "i-heroicons-information-circle",
                ui: { icon: { base: unref(loading) || unref(importing) ? "animate-spin" : "" } }
              }, null, _parent2, _scopeId));
            } else if (!unref(showConfirmation)) {
              _push2(`<div class="space-y-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(supabaseUrl),
                "onUpdate:modelValue": ($event) => isRef(supabaseUrl) ? supabaseUrl.value = $event : null,
                type: "url",
                size: "sm",
                icon: "i-heroicons-link",
                placeholder: "Supabase URL (e.g. https://xxx.supabase.co)",
                disabled: unref(loading) || unref(importing)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(anonKey),
                "onUpdate:modelValue": ($event) => isRef(anonKey) ? anonKey.value = $event : null,
                type: "password",
                size: "sm",
                icon: "i-heroicons-key",
                placeholder: "Supabase anon / service_role key",
                disabled: unref(loading) || unref(importing)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: fetchSupabaseData,
                disabled: !unref(supabaseUrl) || !unref(anonKey) || unref(loading) || unref(importing),
                color: "primary",
                variant: "soft",
                block: "",
                size: "sm",
                icon: "i-heroicons-cloud-arrow-down"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Fetch Data `);
                  } else {
                    return [
                      createTextVNode(" Fetch Data ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(showConfirmation)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                actions: [
                  {
                    variant: "solid",
                    color: "primary",
                    label: "Confirm Import",
                    onClick: confirmImport
                  },
                  {
                    variant: "outline",
                    color: "primary",
                    label: "Cancel",
                    onClick: cancelImport
                  }
                ],
                title: "Confirm Import",
                icon: "i-heroicons-information-circle"
              }, {
                description: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` You are about to import <span class="font-medium"${_scopeId2}>${ssrInterpolate(unref(membersCount))}</span> members, <span class="font-medium"${_scopeId2}>${ssrInterpolate(unref(expensesCount))}</span> expenses, and <span class="font-medium"${_scopeId2}>${ssrInterpolate(unref(paymentsCount))}</span> payments. Proceed? `);
                  } else {
                    return [
                      createTextVNode(" You are about to import "),
                      createVNode("span", { class: "font-medium" }, toDisplayString(unref(membersCount)), 1),
                      createTextVNode(" members, "),
                      createVNode("span", { class: "font-medium" }, toDisplayString(unref(expensesCount)), 1),
                      createTextVNode(" expenses, and "),
                      createVNode("span", { class: "font-medium" }, toDisplayString(unref(paymentsCount)), 1),
                      createTextVNode(" payments. Proceed? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(loading) || unref(importing) ? (openBlock(), createBlock(_component_UAlert, {
                key: 0,
                title: unref(loading) ? "Fetching data..." : "Importing...",
                variant: "soft",
                color: "primary",
                icon: unref(loading) || unref(importing) ? "i-heroicons-arrow-path-20-solid" : "i-heroicons-information-circle",
                ui: { icon: { base: unref(loading) || unref(importing) ? "animate-spin" : "" } }
              }, null, 8, ["title", "icon", "ui"])) : !unref(showConfirmation) ? (openBlock(), createBlock("div", {
                key: 1,
                class: "space-y-2"
              }, [
                createVNode(_component_UInput, {
                  modelValue: unref(supabaseUrl),
                  "onUpdate:modelValue": ($event) => isRef(supabaseUrl) ? supabaseUrl.value = $event : null,
                  type: "url",
                  size: "sm",
                  icon: "i-heroicons-link",
                  placeholder: "Supabase URL (e.g. https://xxx.supabase.co)",
                  disabled: unref(loading) || unref(importing)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                createVNode(_component_UInput, {
                  modelValue: unref(anonKey),
                  "onUpdate:modelValue": ($event) => isRef(anonKey) ? anonKey.value = $event : null,
                  type: "password",
                  size: "sm",
                  icon: "i-heroicons-key",
                  placeholder: "Supabase anon / service_role key",
                  disabled: unref(loading) || unref(importing)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                createVNode(_component_UButton, {
                  onClick: fetchSupabaseData,
                  disabled: !unref(supabaseUrl) || !unref(anonKey) || unref(loading) || unref(importing),
                  color: "primary",
                  variant: "soft",
                  block: "",
                  size: "sm",
                  icon: "i-heroicons-cloud-arrow-down"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Fetch Data ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])) : createCommentVNode("", true),
              unref(showConfirmation) ? (openBlock(), createBlock(_component_UAlert, {
                key: 2,
                actions: [
                  {
                    variant: "solid",
                    color: "primary",
                    label: "Confirm Import",
                    onClick: confirmImport
                  },
                  {
                    variant: "outline",
                    color: "primary",
                    label: "Cancel",
                    onClick: cancelImport
                  }
                ],
                title: "Confirm Import",
                icon: "i-heroicons-information-circle"
              }, {
                description: withCtx(() => [
                  createTextVNode(" You are about to import "),
                  createVNode("span", { class: "font-medium" }, toDisplayString(unref(membersCount)), 1),
                  createTextVNode(" members, "),
                  createVNode("span", { class: "font-medium" }, toDisplayString(unref(expensesCount)), 1),
                  createTextVNode(" expenses, and "),
                  createVNode("span", { class: "font-medium" }, toDisplayString(unref(paymentsCount)), 1),
                  createTextVNode(" payments. Proceed? ")
                ]),
                _: 1
              }, 8, ["actions"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SupabaseImport.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "CsvExport",
  __ssrInlineRender: true,
  setup(__props) {
    const exportCSV = () => {
      const group = useGroups().getGroupByID(useGroupID());
      const members = group.members;
      const memberIDs = Object.keys(members);
      const memberNames = memberIDs.map((id) => members[id].name);
      const header = `Time,Description,Currency,${memberNames.join(",")}`;
      const getPaymentDescription = (transaction) => {
        const from = members[Object.keys(transaction.payers)?.[0]]?.name;
        const to = members[Object.keys(transaction.splitters)?.[0]]?.name;
        return `${from} paid ${to}`;
      };
      const transactionRows = group.transactionOrder.map((id) => {
        const transaction = group.transactions[id];
        const computedTransaction = computeTransaction(transaction);
        const memberValues = memberIDs.map((id2) => {
          return round(
            (computedTransaction.payers[id2] || 0) - (computedTransaction.splits[id2] || 0)
          ).toFixed(2);
        });
        return `${moment.utc(transaction.created_at).format()},${transaction.type === "expense" ? transaction.description : getPaymentDescription(transaction)},${group.currency},${memberValues.join(",")}`;
      });
      const csvContent = header + "\n" + transactionRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = (void 0).createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `peersplit_export_${moment(/* @__PURE__ */ new Date()).format("YYYY-MM-DD")}.csv`
      );
      link.style.visibility = "hidden";
      (void 0).body.appendChild(link);
      link.click();
      (void 0).body.removeChild(link);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormGroup = __nuxt_component_2$1;
      const _component_UButton = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_UFormGroup, mergeProps({ label: "Export to CSV" }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: exportCSV,
              label: "Export"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                onClick: exportCSV,
                label: "Export"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CsvExport.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.divider, divider);
const _sfc_main$3 = defineComponent({
  components: {
    UIcon: __nuxt_component_1,
    UAvatar: __nuxt_component_1$1
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    avatar: {
      type: Object,
      default: null
    },
    size: {
      type: String,
      default: () => config.default.size,
      validator(value) {
        return Object.keys(config.border.size.horizontal).includes(value) || Object.keys(config.border.size.vertical).includes(value);
      }
    },
    orientation: {
      type: String,
      default: "horizontal",
      validator: (value) => ["horizontal", "vertical"].includes(value)
    },
    type: {
      type: String,
      default: () => config.default.type,
      validator: (value) => ["solid", "dotted", "dashed"].includes(value)
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("divider", toRef(props, "ui"), config);
    const wrapperClass = computed(() => {
      return twMerge(twJoin(
        ui.value.wrapper.base,
        ui.value.wrapper[props.orientation]
      ), props.class);
    });
    const containerClass = computed(() => {
      return twJoin(
        ui.value.container.base,
        ui.value.container[props.orientation]
      );
    });
    const borderClass = computed(() => {
      return twJoin(
        ui.value.border.base,
        ui.value.border[props.orientation],
        ui.value.border.size[props.orientation][props.size],
        ui.value.border.type[props.type]
      );
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      wrapperClass,
      containerClass,
      borderClass
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = __nuxt_component_1;
  const _component_UAvatar = __nuxt_component_1$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.wrapperClass }, _ctx.attrs, _attrs))}><div class="${ssrRenderClass(_ctx.borderClass)}"></div>`);
  if (_ctx.label || _ctx.icon || _ctx.avatar || _ctx.$slots.default) {
    _push(`<!--[--><div class="${ssrRenderClass(_ctx.containerClass)}">`);
    ssrRenderSlot(_ctx.$slots, "default", {}, () => {
      if (_ctx.label) {
        _push(`<span class="${ssrRenderClass(_ctx.ui.label)}">${ssrInterpolate(_ctx.label)}</span>`);
      } else if (_ctx.icon) {
        _push(ssrRenderComponent(_component_UIcon, {
          name: _ctx.icon,
          class: _ctx.ui.icon.base
        }, null, _parent));
      } else if (_ctx.avatar) {
        _push(ssrRenderComponent(_component_UAvatar, mergeProps({ size: _ctx.ui.avatar.size, ..._ctx.avatar }, {
          class: _ctx.ui.avatar.base
        }), null, _parent));
      } else {
        _push(`<!---->`);
      }
    }, _push, _parent);
    _push(`</div><div class="${ssrRenderClass(_ctx.borderClass)}"></div><!--]-->`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/layout/Divider.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = {
  __name: "GroupSettingsMembers",
  __ssrInlineRender: true,
  setup(__props) {
    const groupID = useGroupID();
    const assigning = ref(false);
    const members = computed(() => useGroups().getMembersList(groupID));
    const myID = computed(() => {
      const { myID: myID2 } = useGroups().getGroupByID(groupID);
      return myID2;
    });
    const name = ref("");
    function add() {
      useGroups().addMember(groupID, { id: nanoid(), name: name.value });
      name.value = "";
    }
    function assign(id) {
      assigning.value = false;
      useGroups().assignMember(groupID, id);
    }
    function remove(id) {
      const member = members.value.find((m) => m.id === id);
      if (member && confirm(`Remove "${member.name}" from this group?`)) {
        useGroups().deleteMember(groupID, id);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormGroup = __nuxt_component_2$1;
      const _component_UInput = __nuxt_component_1$2;
      const _component_UButton = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><div>`);
      _push(ssrRenderComponent(_component_UFormGroup, { label: "Add Member" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex w-full gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              class: "flex-grow",
              modelValue: unref(name),
              "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
              placeholder: "New member name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              onClick: add,
              disabled: unref(name).length === 0
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add`);
                } else {
                  return [
                    createTextVNode("Add")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex w-full gap-2" }, [
                createVNode(_component_UInput, {
                  class: "flex-grow",
                  modelValue: unref(name),
                  "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                  placeholder: "New member name"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_UButton, {
                  variant: "outline",
                  onClick: add,
                  disabled: unref(name).length === 0
                }, {
                  default: withCtx(() => [
                    createTextVNode("Add")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div><div class="flex gap-2 items-center"><span class="font-medium py-1 block">Members </span>`);
      if (unref(myID) && !unref(assigning)) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_UButton, {
          onClick: ($event) => assigning.value = true,
          variant: "link",
          class: "p-0"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Assign`);
            } else {
              return [
                createTextVNode("Assign")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(myID) && unref(assigning)) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_UButton, {
          onClick: ($event) => assigning.value = false,
          variant: "link",
          class: "p-0"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Cancel`);
            } else {
              return [
                createTextVNode("Cancel")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--[-->`);
      ssrRenderList(unref(members), (member) => {
        _push(`<div><div class="flex gap-2 items-center"><span class="${ssrRenderClass([
          "font-light text-primary-700 dark:text-primary-300",
          member.id === unref(myID) && "font-medium"
        ])}">${ssrInterpolate(member.name)} ${ssrInterpolate(member.id === unref(myID) ? " (You)" : "")}</span><div class="flex-1"></div>`);
        if ((!unref(myID) || unref(assigning)) && unref(myID) !== member.id) {
          _push(ssrRenderComponent(_component_UButton, {
            variant: "link",
            class: "p-0",
            onClick: ($event) => assign(member.id)
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`That&#39;s me!`);
              } else {
                return [
                  createTextVNode("That's me!")
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (member.id !== unref(myID)) {
          _push(ssrRenderComponent(_component_UButton, {
            variant: "link",
            color: "red",
            class: "p-0",
            icon: "i-heroicons-trash",
            onClick: ($event) => remove(member.id)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GroupSettingsMembers.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "GroupSettingsBalances",
  __ssrInlineRender: true,
  setup(__props) {
    const groupID = useGroupID();
    const { getGroupByID, getPaymentsByGroupID } = storeToRefs(useGroups());
    const myID = computed(() => {
      const { myID: myID2 } = getGroupByID.value(groupID);
      return myID2;
    });
    const members = computed(() => useGroups().getMembersList(groupID));
    const payments = computed(() => {
      const paymentsByUser = {};
      const payments2 = getPaymentsByGroupID.value(groupID);
      for (const payment of payments2) {
        paymentsByUser[payment.from] ||= [];
        paymentsByUser[payment.from].push(payment);
        paymentsByUser[payment.to] ||= [];
        paymentsByUser[payment.to].push(payment);
      }
      return paymentsByUser;
    });
    const balances = computed(() => {
      const balancesByUser = {};
      const payments2 = getPaymentsByGroupID.value(groupID);
      for (const payment of payments2) {
        balancesByUser[payment.from] ||= 0;
        balancesByUser[payment.from] = round(
          balancesByUser[payment.from] - payment.value
        );
        balancesByUser[payment.to] ||= 0;
        balancesByUser[payment.to] = round(
          balancesByUser[payment.to] + payment.value
        );
      }
      return balancesByUser;
    });
    const maxAbsBalance = computed(() => {
      return Math.max(...Object.values(balances.value).map(Math.abs), 1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAccordion = __nuxt_component_3$1;
      _push(`<!--[-->`);
      if (unref(maxAbsBalance) > 0) {
        _push(`<div class="mb-4 space-y-2"><p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Balance Overview</p><div class="space-y-1.5"><!--[-->`);
        ssrRenderList(unref(members), (member) => {
          _push(`<div class="flex items-center gap-2"><span class="text-xs w-20 truncate shrink-0 text-gray-600 dark:text-gray-400">${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(unref(groupID), member.id))}</span><div class="flex-grow h-5 rounded-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">`);
          if (unref(balances)[member.id]) {
            _push(`<div>`);
            if (unref(balances)[member.id] > 0) {
              _push(`<div class="absolute right-0 top-0 h-full rounded-full bg-emerald-400/60 dark:bg-emerald-500/40 transition-all duration-500" style="${ssrRenderStyle({ width: unref(balances)[member.id] / unref(maxAbsBalance) * 100 + "%" })}"></div>`);
            } else {
              _push(`<div class="absolute left-0 top-0 h-full rounded-full bg-amber-400/60 dark:bg-amber-500/40 transition-all duration-500" style="${ssrRenderStyle({ width: Math.abs(unref(balances)[member.id]) / unref(maxAbsBalance) * 100 + "%" })}"></div>`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><span class="${ssrRenderClass([unref(balances)[member.id] > 0 ? "text-emerald-600 dark:text-emerald-400" : unref(balances)[member.id] < 0 ? "text-amber-600 dark:text-amber-400" : "text-gray-400", "text-xs w-16 text-right shrink-0 tabular-nums"])}">${ssrInterpolate(unref(balances)[member.id] > 0 ? "+" : "")}${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getGroupCurrency(unref(groupID)))}${ssrInterpolate(unref(balances)[member.id] || 0)}</span></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UAccordion, {
        items: unref(members).map((member) => ({
          label: ("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(unref(groupID), member.id),
          name: ("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(unref(groupID), member.id),
          id: member.id
        }))
      }, {
        item: withCtx(({ item: member }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(balances)[member.id]) {
              _push2(`<span${_scopeId}>${ssrInterpolate(member.name)} ${ssrInterpolate(member.name === "You" ? "are" : "is")} settled up in this group.</span>`);
            } else {
              _push2(`<div${_scopeId}><span class="flex items-center gap-2"${_scopeId}>${ssrInterpolate(member.name)} ${ssrInterpolate(unref(balances)[member.id] > 0 ? `${member.id === unref(myID) ? "are" : "is"} owed` : `${member.id === unref(myID) ? "owe" : "owes"}`)} <span class="${ssrRenderClass([
                "text-lg",
                unref(balances)[member.id] > 0 ? "color-positive" : "color-negative"
              ])}"${_scopeId}>${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getGroupCurrency(unref(groupID)))}${ssrInterpolate(Math.abs(unref(balances)[member.id]))}</span></span><div${_scopeId}><!--[-->`);
              ssrRenderList(unref(payments)[member.id], (payment) => {
                _push2(`<span class="flex items-center gap-1 text-sm"${_scopeId}>- ${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(unref(groupID), payment.from))} ${ssrInterpolate(payment.from === unref(myID) ? "owe" : "owes")} ${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(unref(groupID), payment.to, true))} <span class="${ssrRenderClass([
                  "text-md",
                  unref(balances)[member.id] > 0 ? "color-positive" : "color-negative"
                ])}"${_scopeId}>${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getGroupCurrency(unref(groupID)))}${ssrInterpolate(payment.value)}</span></span>`);
              });
              _push2(`<!--]--></div></div>`);
            }
          } else {
            return [
              !unref(balances)[member.id] ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(member.name) + " " + toDisplayString(member.name === "You" ? "are" : "is") + " settled up in this group.", 1)) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("span", { class: "flex items-center gap-2" }, [
                  createTextVNode(toDisplayString(member.name) + " " + toDisplayString(unref(balances)[member.id] > 0 ? `${member.id === unref(myID) ? "are" : "is"} owed` : `${member.id === unref(myID) ? "owe" : "owes"}`) + " ", 1),
                  createVNode("span", {
                    class: [
                      "text-lg",
                      unref(balances)[member.id] > 0 ? "color-positive" : "color-negative"
                    ]
                  }, toDisplayString(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getGroupCurrency(unref(groupID))) + toDisplayString(Math.abs(unref(balances)[member.id])), 3)
                ]),
                createVNode("div", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(payments)[member.id], (payment) => {
                    return openBlock(), createBlock("span", { class: "flex items-center gap-1 text-sm" }, [
                      createTextVNode("- " + toDisplayString(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(unref(groupID), payment.from)) + " " + toDisplayString(payment.from === unref(myID) ? "owe" : "owes") + " " + toDisplayString(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(unref(groupID), payment.to, true)) + " ", 1),
                      createVNode("span", {
                        class: [
                          "text-md",
                          unref(balances)[member.id] > 0 ? "color-positive" : "color-negative"
                        ]
                      }, toDisplayString(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getGroupCurrency(unref(groupID))) + toDisplayString(payment.value), 3)
                    ]);
                  }), 256))
                ])
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GroupSettingsBalances.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "GroupSettings",
  __ssrInlineRender: true,
  setup(__props) {
    const groupID = useGroupID();
    const copiedSummary = ref(false);
    const tabs = [
      { label: "General", icon: "i-heroicons-user-circle" },
      { label: "Members", icon: "i-heroicons-user-group" },
      { label: "Balances", icon: "i-heroicons-document-currency-dollar" }
    ];
    const name = ref(useGroups().getGroupByID(groupID)?.name), currency = ref(useGroups().getGroupByID(groupID)?.currency);
    function updateName() {
      useGroups().setGroupName(groupID, name.value);
    }
    function updateCurrency() {
      useGroups().setGroupCurrency(groupID, currency.value);
    }
    function copySummary() {
      const group = useGroups().getGroupByID(groupID);
      const currency2 = group?.currency || "₹";
      const members = Object.values(group?.members || {});
      const transactions = Object.values(group?.transactions || {});
      const balances = groupGetBalances(group);
      const payments = groupGetPayments(group);
      let text = `📊 ${group?.name || "Group"} - Expense Summary
`;
      text += `━━━━━━━━━━━━━━━━━━━━━━━━━━

`;
      text += `👥 Members (${members.length}):
`;
      for (const m of members) {
        const tag = m.id === group?.myID ? " (You)" : "";
        const bal = balances[m.id];
        const balStr = bal !== void 0 ? bal > 0 ? ` +${currency2}${bal}` : bal < 0 ? ` ${currency2}${Math.abs(bal)}` : " settled" : "";
        text += `  • ${m.name}${tag} — ${balStr}
`;
      }
      text += `
`;
      const expenseCount = transactions.filter((t2) => t2.type === "expense").length;
      const paymentCount = transactions.filter((t2) => t2.type === "payment").length;
      text += `💳 ${expenseCount} expense${expenseCount !== 1 ? "s" : ""}`;
      if (paymentCount > 0) text += `, ${paymentCount} payment${paymentCount !== 1 ? "s" : ""}`;
      text += `
`;
      let totalSpent = 0;
      for (const tx of transactions) {
        const computed2 = computeTransaction(tx);
        totalSpent += computed2.totalCost;
      }
      text += `💰 Total spent: ${currency2}${round(totalSpent)}

`;
      if (payments.length > 0) {
        text += `📋 Outstanding Debts:
`;
        for (const p2 of payments) {
          const fromName = useGroups().getMemberName(group.id, p2.from);
          const toName = useGroups().getMemberName(group.id, p2.to);
          text += `  • ${fromName} → ${toName}: ${currency2}${p2.value}
`;
        }
      } else {
        text += `✅ All settled up!
`;
      }
      text += `
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
      text += `Generated by PeerSplit`;
      (void 0).clipboard.writeText(text);
      copiedSummary.value = true;
      setTimeout(() => {
        copiedSummary.value = false;
      }, 2e3);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_7$1;
      const _component_UButton = __nuxt_component_0$1;
      const _component_UTabs = __nuxt_component_2$3;
      const _component_UFormGroup = __nuxt_component_2$1;
      const _component_UInput = __nuxt_component_1$2;
      const _component_SplitwiseImport = _sfc_main$6;
      const _component_SupabaseImport = _sfc_main$5;
      const _component_CsvExport = _sfc_main$4;
      const _component_UDivider = __nuxt_component_8;
      const _component_GroupSettingsMembers = _sfc_main$2;
      const _component_GroupSettingsBalances = _sfc_main$1;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><span class="font-medium"${_scopeId}>${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getGroupByID(unref(groupID)).name)} - Settings</span>`);
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: ($event) => _ctx.$emit("close"),
              variant: "ghost",
              color: "gray",
              icon: "i-heroicons-x-mark"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("span", { class: "font-medium" }, toDisplayString(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getGroupByID(unref(groupID)).name) + " - Settings", 1),
                createVNode(_component_UButton, {
                  onClick: ($event) => _ctx.$emit("close"),
                  variant: "ghost",
                  color: "gray",
                  icon: "i-heroicons-x-mark"
                }, null, 8, ["onClick"])
              ])
            ];
          }
        }),
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UTabs, {
              color: "primary",
              items: tabs
            }, {
              item: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (item.label === "General") {
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UFormGroup, { label: "Group Name" }, {
                      default: withCtx((_22, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UInput, {
                            onBlur: updateName,
                            placeholder: "New Group",
                            modelValue: unref(name),
                            "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UInput, {
                              onBlur: updateName,
                              placeholder: "New Group",
                              modelValue: unref(name),
                              "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UFormGroup, { label: "Currency Symbol" }, {
                      default: withCtx((_22, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UInput, {
                            onBlur: updateCurrency,
                            placeholder: "ex: $ or ₹",
                            modelValue: unref(currency),
                            "onUpdate:modelValue": ($event) => isRef(currency) ? currency.value = $event : null
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UInput, {
                              onBlur: updateCurrency,
                              placeholder: "ex: $ or ₹",
                              modelValue: unref(currency),
                              "onUpdate:modelValue": ($event) => isRef(currency) ? currency.value = $event : null
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_SplitwiseImport, null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_SupabaseImport, null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_CsvExport, null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UDivider, null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UFormGroup, { label: "Share Group Summary" }, {
                      default: withCtx((_22, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<p class="text-xs text-gray-400 dark:text-gray-500 mb-2"${_scopeId3}> Copy a text summary of all expenses and balances in this group to your clipboard. </p>`);
                          _push4(ssrRenderComponent(_component_UButton, {
                            onClick: copySummary,
                            color: "primary",
                            variant: "soft",
                            block: "",
                            icon: "i-heroicons-document-text"
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(copiedSummary) ? "Copied!" : "Copy Summary")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(copiedSummary) ? "Copied!" : "Copy Summary"), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mb-2" }, " Copy a text summary of all expenses and balances in this group to your clipboard. "),
                            createVNode(_component_UButton, {
                              onClick: copySummary,
                              color: "primary",
                              variant: "soft",
                              block: "",
                              icon: "i-heroicons-document-text"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(copiedSummary) ? "Copied!" : "Copy Summary"), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (item.label === "Members") {
                    _push3(ssrRenderComponent(_component_GroupSettingsMembers, null, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (item.label === "Balances") {
                    _push3(ssrRenderComponent(_component_GroupSettingsBalances, null, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    item.label === "General" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      createVNode(_component_UFormGroup, { label: "Group Name" }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            onBlur: updateName,
                            placeholder: "New Group",
                            modelValue: unref(name),
                            "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, { label: "Currency Symbol" }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            onBlur: updateCurrency,
                            placeholder: "ex: $ or ₹",
                            modelValue: unref(currency),
                            "onUpdate:modelValue": ($event) => isRef(currency) ? currency.value = $event : null
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_SplitwiseImport),
                      createVNode(_component_SupabaseImport),
                      createVNode(_component_CsvExport),
                      createVNode(_component_UDivider),
                      createVNode(_component_UFormGroup, { label: "Share Group Summary" }, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mb-2" }, " Copy a text summary of all expenses and balances in this group to your clipboard. "),
                          createVNode(_component_UButton, {
                            onClick: copySummary,
                            color: "primary",
                            variant: "soft",
                            block: "",
                            icon: "i-heroicons-document-text"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(copiedSummary) ? "Copied!" : "Copy Summary"), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    item.label === "Members" ? (openBlock(), createBlock(_component_GroupSettingsMembers, { key: 1 })) : createCommentVNode("", true),
                    item.label === "Balances" ? (openBlock(), createBlock(_component_GroupSettingsBalances, { key: 2 })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode(_component_UTabs, {
                  color: "primary",
                  items: tabs
                }, {
                  item: withCtx(({ item }) => [
                    item.label === "General" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      createVNode(_component_UFormGroup, { label: "Group Name" }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            onBlur: updateName,
                            placeholder: "New Group",
                            modelValue: unref(name),
                            "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, { label: "Currency Symbol" }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            onBlur: updateCurrency,
                            placeholder: "ex: $ or ₹",
                            modelValue: unref(currency),
                            "onUpdate:modelValue": ($event) => isRef(currency) ? currency.value = $event : null
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_SplitwiseImport),
                      createVNode(_component_SupabaseImport),
                      createVNode(_component_CsvExport),
                      createVNode(_component_UDivider),
                      createVNode(_component_UFormGroup, { label: "Share Group Summary" }, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mb-2" }, " Copy a text summary of all expenses and balances in this group to your clipboard. "),
                          createVNode(_component_UButton, {
                            onClick: copySummary,
                            color: "primary",
                            variant: "soft",
                            block: "",
                            icon: "i-heroicons-document-text"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(copiedSummary) ? "Copied!" : "Copy Summary"), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    item.label === "Members" ? (openBlock(), createBlock(_component_GroupSettingsMembers, { key: 1 })) : createCommentVNode("", true),
                    item.label === "Balances" ? (openBlock(), createBlock(_component_GroupSettingsBalances, { key: 2 })) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GroupSettings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  EXPENSE_CATEGORIES as E,
  _sfc_main$f as _,
  __nuxt_component_7 as a,
  _sfc_main$c as b,
  _sfc_main$7 as c,
  _sfc_main as d
};
//# sourceMappingURL=GroupSettings-Bs8Sbqhi.js.map
