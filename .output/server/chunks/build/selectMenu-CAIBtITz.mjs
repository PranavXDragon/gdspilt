import __nuxt_component_0 from './index-DMPXWIV5.mjs';
import * as e from 'vue';
import { mergeProps, defineComponent, useAttrs, computed, toValue, ref, watchEffect, cloneVNode, h, Fragment, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { G as useAppConfig, m as mergeConfig, y as get, z as omit } from './server.mjs';

const _sfc_main = defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      required: false,
      default: null
    },
    customize: {
      type: Function,
      required: false,
      default: null
    }
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Icon = __nuxt_component_0;
  _push(ssrRenderComponent(_component_Icon, mergeProps(_ctx.$props, _attrs), null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
var r$1;
let n = /* @__PURE__ */ Symbol("headlessui.useid"), o$2 = 0;
const i = (r$1 = e.useId) != null ? r$1 : function() {
  return e.inject(n, () => `${++o$2}`)();
};
function s$1(t) {
  e.provide(n, t);
}
function o$1(e2) {
  var l;
  if (e2 == null || e2.value == null) return null;
  let n2 = (l = e2.value.$el) != null ? l : e2.value;
  return n2 instanceof Node ? n2 : null;
}
function u(r2, n2, ...a) {
  if (r2 in n2) {
    let e2 = n2[r2];
    return typeof e2 == "function" ? e2(...a) : e2;
  }
  let t = new Error(`Tried to handle "${r2}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e2) => `"${e2}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t, u), t;
}
function r(t, e2) {
  if (t) return t;
  let n2 = e2 != null ? e2 : "button";
  if (typeof n2 == "string" && n2.toLowerCase() === "button") return "button";
}
function s(t, e2) {
  let n2 = ref(r(t.value.type, t.value.as));
  return watchEffect(() => {
    var u2;
    n2.value || o$1(e2) && o$1(e2) instanceof HTMLButtonElement && !((u2 = o$1(e2)) != null && u2.hasAttribute("type")) && (n2.value = "button");
  }), n2;
}
var N = ((o2) => (o2[o2.None = 0] = "None", o2[o2.RenderStrategy = 1] = "RenderStrategy", o2[o2.Static = 2] = "Static", o2))(N || {}), S = ((e2) => (e2[e2.Unmount = 0] = "Unmount", e2[e2.Hidden = 1] = "Hidden", e2))(S || {});
function A({ visible: r2 = true, features: t = 0, ourProps: e2, theirProps: o2, ...i2 }) {
  var a;
  let n2 = j(o2, e2), l = Object.assign(i2, { props: n2 });
  if (r2 || t & 2 && n2.static) return y(l);
  if (t & 1) {
    let d = (a = n2.unmount) == null || a ? 0 : 1;
    return u(d, { [0]() {
      return null;
    }, [1]() {
      return y({ ...i2, props: { ...n2, hidden: true, style: { display: "none" } } });
    } });
  }
  return y(l);
}
function y({ props: r2, attrs: t, slots: e2, slot: o2, name: i2 }) {
  var m, h$1;
  let { as: n2, ...l } = T(r2, ["unmount", "static"]), a = (m = e2.default) == null ? void 0 : m.call(e2, o2), d = {};
  if (o2) {
    let u2 = false, c = [];
    for (let [p, f] of Object.entries(o2)) typeof f == "boolean" && (u2 = true), f === true && c.push(p);
    u2 && (d["data-headlessui-state"] = c.join(" "));
  }
  if (n2 === "template") {
    if (a = b(a != null ? a : []), Object.keys(l).length > 0 || Object.keys(t).length > 0) {
      let [u2, ...c] = a != null ? a : [];
      if (!v(u2) || c.length > 0) throw new Error(['Passing props on "template"!', "", `The current component <${i2} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(l).concat(Object.keys(t)).map((s2) => s2.trim()).filter((s2, g, R) => R.indexOf(s2) === g).sort((s2, g) => s2.localeCompare(g)).map((s2) => `  - ${s2}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((s2) => `  - ${s2}`).join(`
`)].join(`
`));
      let p = j((h$1 = u2.props) != null ? h$1 : {}, l, d), f = cloneVNode(u2, p, true);
      for (let s2 in p) s2.startsWith("on") && (f.props || (f.props = {}), f.props[s2] = p[s2]);
      return f;
    }
    return Array.isArray(a) && a.length === 1 ? a[0] : a;
  }
  return h(n2, Object.assign({}, l, d), { default: () => a });
}
function b(r2) {
  return r2.flatMap((t) => t.type === Fragment ? b(t.children) : [t]);
}
function j(...r2) {
  if (r2.length === 0) return {};
  if (r2.length === 1) return r2[0];
  let t = {}, e2 = {};
  for (let i2 of r2) for (let n2 in i2) n2.startsWith("on") && typeof i2[n2] == "function" ? (e2[n2] != null || (e2[n2] = []), e2[n2].push(i2[n2])) : t[n2] = i2[n2];
  if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(e2).map((i2) => [i2, void 0])));
  for (let i2 in e2) Object.assign(t, { [i2](n2, ...l) {
    let a = e2[i2];
    for (let d of a) {
      if (n2 instanceof Event && n2.defaultPrevented) return;
      d(n2, ...l);
    }
  } });
  return t;
}
function E(r2) {
  let t = Object.assign({}, r2);
  for (let e2 in t) t[e2] === void 0 && delete t[e2];
  return t;
}
function T(r2, t = []) {
  let e2 = Object.assign({}, r2);
  for (let o2 of t) o2 in e2 && delete e2[o2];
  return e2;
}
function v(r2) {
  return r2 == null ? false : typeof r2.type == "string" || typeof r2.type == "object" || typeof r2.type == "function";
}
var o = ((r2) => (r2.Space = " ", r2.Enter = "Enter", r2.Escape = "Escape", r2.Backspace = "Backspace", r2.Delete = "Delete", r2.ArrowLeft = "ArrowLeft", r2.ArrowUp = "ArrowUp", r2.ArrowRight = "ArrowRight", r2.ArrowDown = "ArrowDown", r2.Home = "Home", r2.End = "End", r2.PageUp = "PageUp", r2.PageDown = "PageDown", r2.Tab = "Tab", r2))(o || {});
const useUI = (key, $ui, $config, $wrapperClass, withAppConfig = false) => {
  const $attrs = useAttrs();
  const appConfig = useAppConfig();
  const ui = computed(() => {
    var _a;
    const _ui = toValue($ui);
    const _config = toValue($config);
    const _wrapperClass = toValue($wrapperClass);
    return mergeConfig(
      (_ui == null ? void 0 : _ui.strategy) || ((_a = appConfig.ui) == null ? void 0 : _a.strategy),
      _wrapperClass ? { wrapper: _wrapperClass } : {},
      _ui || {},
      withAppConfig ? get(appConfig.ui, key, {}) : {},
      _config || {}
    );
  });
  const attrs = computed(() => omit($attrs, ["class"]));
  return {
    ui,
    attrs
  };
};
const arrow = {
  base: "invisible before:visible before:block before:rotate-45 before:z-[-1] before:w-2 before:h-2",
  ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-800",
  rounded: "before:rounded-sm",
  background: "before:bg-gray-200 dark:before:bg-gray-800",
  shadow: "before:shadow",
  placement: `group-data-[popper-placement*='right']:-left-1 group-data-[popper-placement*='left']:-right-1 group-data-[popper-placement*='top']:-bottom-1 group-data-[popper-placement*='bottom']:-top-1`
};
const input = {
  wrapper: "relative",
  base: "relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0",
  form: "form-input",
  rounded: "rounded-md",
  placeholder: "placeholder-gray-400 dark:placeholder-gray-500",
  file: {
    base: "file:mr-1.5 file:font-medium file:text-gray-500 dark:file:text-gray-400 file:bg-transparent file:border-0 file:p-0 file:outline-none"
  },
  size: {
    "2xs": "text-xs",
    "xs": "text-xs",
    "sm": "text-sm",
    "md": "text-sm",
    "lg": "text-sm",
    "xl": "text-base"
  },
  gap: {
    "2xs": "gap-x-1",
    "xs": "gap-x-1.5",
    "sm": "gap-x-1.5",
    "md": "gap-x-2",
    "lg": "gap-x-2.5",
    "xl": "gap-x-2.5"
  },
  padding: {
    "2xs": "px-2 py-1",
    "xs": "px-2.5 py-1.5",
    "sm": "px-2.5 py-1.5",
    "md": "px-3 py-2",
    "lg": "px-3.5 py-2.5",
    "xl": "px-3.5 py-2.5"
  },
  leading: {
    padding: {
      "2xs": "ps-7",
      "xs": "ps-8",
      "sm": "ps-9",
      "md": "ps-10",
      "lg": "ps-11",
      "xl": "ps-12"
    }
  },
  trailing: {
    padding: {
      "2xs": "pe-7",
      "xs": "pe-8",
      "sm": "pe-9",
      "md": "pe-10",
      "lg": "pe-11",
      "xl": "pe-12"
    }
  },
  color: {
    white: {
      outline: "shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
    },
    gray: {
      outline: "shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
    }
  },
  variant: {
    outline: "shadow-sm bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 focus:ring-2 focus:ring-{color}-500 dark:focus:ring-{color}-400",
    none: "bg-transparent focus:ring-0 focus:shadow-none"
  },
  icon: {
    base: "flex-shrink-0 text-gray-400 dark:text-gray-500",
    color: "text-{color}-500 dark:text-{color}-400",
    loading: "animate-spin",
    size: {
      "2xs": "h-4 w-4",
      "xs": "h-4 w-4",
      "sm": "h-5 w-5",
      "md": "h-5 w-5",
      "lg": "h-5 w-5",
      "xl": "h-6 w-6"
    },
    leading: {
      wrapper: "absolute inset-y-0 start-0 flex items-center",
      pointer: "pointer-events-none",
      padding: {
        "2xs": "px-2",
        "xs": "px-2.5",
        "sm": "px-2.5",
        "md": "px-3",
        "lg": "px-3.5",
        "xl": "px-3.5"
      }
    },
    trailing: {
      wrapper: "absolute inset-y-0 end-0 flex items-center",
      pointer: "pointer-events-none",
      padding: {
        "2xs": "px-2",
        "xs": "px-2.5",
        "sm": "px-2.5",
        "md": "px-3",
        "lg": "px-3.5",
        "xl": "px-3.5"
      }
    }
  },
  default: {
    size: "sm",
    color: "white",
    variant: "outline",
    loadingIcon: "i-heroicons-arrow-path-20-solid"
  }
};
const inputMenu = {
  container: "z-20 group",
  trigger: "flex items-center w-full",
  width: "w-full",
  height: "max-h-60",
  base: "relative focus:outline-none overflow-y-auto scroll-py-1",
  background: "bg-white dark:bg-gray-800",
  shadow: "shadow-lg",
  rounded: "rounded-md",
  padding: "p-1",
  ring: "ring-1 ring-gray-200 dark:ring-gray-700",
  empty: "text-sm text-gray-400 dark:text-gray-500 px-2 py-1.5",
  option: {
    base: "cursor-default select-none relative flex items-center justify-between gap-1",
    rounded: "rounded-md",
    padding: "px-1.5 py-1.5",
    size: "text-sm",
    color: "text-gray-900 dark:text-white",
    container: "flex items-center gap-1.5 min-w-0",
    active: "bg-gray-100 dark:bg-gray-900",
    inactive: "",
    selected: "pe-7",
    disabled: "cursor-not-allowed opacity-50",
    empty: "text-sm text-gray-400 dark:text-gray-500 px-2 py-1.5",
    icon: {
      base: "flex-shrink-0 h-5 w-5",
      active: "text-gray-900 dark:text-white",
      inactive: "text-gray-400 dark:text-gray-500"
    },
    selectedIcon: {
      wrapper: "absolute inset-y-0 end-0 flex items-center",
      padding: "pe-2",
      base: "h-5 w-5 text-gray-900 dark:text-white flex-shrink-0"
    },
    avatar: {
      base: "flex-shrink-0",
      size: "2xs"
    },
    chip: {
      base: "flex-shrink-0 w-2 h-2 mx-1 rounded-full"
    }
  },
  // Syntax for `<Transition>` component https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
  transition: {
    leaveActiveClass: "transition ease-in duration-100",
    leaveFromClass: "opacity-100",
    leaveToClass: "opacity-0"
  },
  popper: {
    placement: "bottom-end"
  },
  default: {
    selectedIcon: "i-heroicons-check-20-solid",
    trailingIcon: "i-heroicons-chevron-down-20-solid",
    empty: {
      label: "No options."
    },
    optionEmpty: {
      label: 'No results for "{query}".'
    }
  },
  arrow: {
    ...arrow,
    ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-700",
    background: "before:bg-white dark:before:bg-gray-700"
  }
};
({
  ...input
});
const select = {
  ...input,
  form: "form-select",
  placeholder: "text-gray-400 dark:text-gray-500",
  default: {
    size: "sm",
    color: "white",
    variant: "outline",
    loadingIcon: "i-heroicons-arrow-path-20-solid",
    trailingIcon: "i-heroicons-chevron-down-20-solid"
  }
};
const selectMenu = {
  ...inputMenu,
  select: "inline-flex items-center text-left cursor-default",
  input: "block w-[calc(100%+0.5rem)] focus:ring-transparent text-sm px-3 py-1.5 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-0 border-b border-gray-200 dark:border-gray-700 sticky -top-1 -mt-1 mb-1 -mx-1 z-10 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none",
  required: "absolute inset-0 w-px opacity-0 cursor-default",
  label: "block truncate",
  option: {
    ...inputMenu.option,
    create: "block truncate"
  },
  // Syntax for `<Transition>` component https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
  transition: {
    leaveActiveClass: "transition ease-in duration-100",
    leaveFromClass: "opacity-100",
    leaveToClass: "opacity-0"
  },
  popper: {
    placement: "bottom-end"
  },
  default: {
    selectedIcon: "i-heroicons-check-20-solid",
    clearSearchOnClose: false,
    showCreateOptionWhen: "empty",
    searchablePlaceholder: {
      label: "Search..."
    },
    empty: {
      label: "No options."
    },
    optionEmpty: {
      label: 'No results for "{query}".'
    }
  },
  arrow: {
    ...arrow,
    ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-700",
    background: "before:bg-white dark:before:bg-gray-700"
  }
};

export { A, E, N, S, T, __nuxt_component_1 as _, arrow as a, s as b, u as c, o as d, input as e, select as f, selectMenu as g, i, o$1 as o, s$1 as s, useUI as u };
//# sourceMappingURL=selectMenu-CAIBtITz.mjs.map
