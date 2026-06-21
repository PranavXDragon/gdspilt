import { _ as __nuxt_component_1$1 } from "./selectMenu-CAIBtITz.js";
import { d as __nuxt_component_2, a as __nuxt_component_1, b as __nuxt_component_0, c as __nuxt_component_4, _ as __nuxt_component_7 } from "./Modal-JZzGCXgD.js";
import { e as useName, q as setName, v as useState, s as storeToRefs, b as useGroups, o as groupGetBalances, r as round, w as wipeData } from "../server.mjs";
import { ref, mergeProps, withCtx, isRef, unref, createVNode, useSSRContext, createTextVNode, toDisplayString, computed } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { a as __nuxt_component_3, _ as __nuxt_component_2$1 } from "./Accordion-DjD1tMCY.js";
import { _ as __nuxt_component_0$1 } from "./Button-97Zr3Qqu.js";
import "P:/group/peersplit-main/peersplit-main/node_modules/hookable/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "P:/group/peersplit-main/peersplit-main/node_modules/defu/dist/defu.mjs";
import "./index-DMPXWIV5.js";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "P:/group/peersplit-main/peersplit-main/node_modules/perfect-debounce/dist/index.mjs";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "tailwind-merge";
import "@tanstack/vue-virtual";
import "./hidden-CTntKjAB.js";
import "@vueuse/core";
import "ohash/utils";
import "P:/group/peersplit-main/peersplit-main/node_modules/ofetch/dist/node.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/unctx/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/h3/dist/index.mjs";
import "vue-router";
import "P:/group/peersplit-main/peersplit-main/node_modules/ufo/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/@unhead/vue/dist/index.mjs";
import "nanoid";
import "moment";
import "@supabase/supabase-js";
import "./nuxt-link-By9b6QI-.js";
const _sfc_main$2 = {
  __name: "SettingsName",
  __ssrInlineRender: true,
  setup(__props) {
    const name = ref(useName());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormGroup = __nuxt_component_2;
      const _component_UInput = __nuxt_component_1;
      _push(ssrRenderComponent(_component_UFormGroup, mergeProps({ label: "Name" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              onBlur: ($event) => ("setName" in _ctx ? _ctx.setName : unref(setName))(unref(name)),
              modelValue: unref(name),
              "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
              placeholder: "John Doe"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                onBlur: ($event) => ("setName" in _ctx ? _ctx.setName : unref(setName))(unref(name)),
                modelValue: unref(name),
                "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
                placeholder: "John Doe"
              }, null, 8, ["onBlur", "modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SettingsName.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$1 = {
  __name: "DarkModeSwitch",
  __ssrInlineRender: true,
  setup(__props) {
    useColorMode();
    const icons = {
      system: "i-heroicons-computer-desktop-20-solid",
      light: "i-heroicons-sun",
      dark: "i-heroicons-moon"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USelectMenu = __nuxt_component_0;
      const _component_UIcon = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_USelectMenu, mergeProps({
        modelValue: _ctx.$colorMode.preference,
        "onUpdate:modelValue": ($event) => _ctx.$colorMode.preference = $event,
        placeholder: "Select a server",
        options: ["system", "light", "dark"]
      }, _attrs), {
        option: withCtx(({ option }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              class: "w-5 h-5",
              name: icons[option]
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(("toTitleCase" in _ctx ? _ctx.toTitleCase : unref(toTitleCase))(option))}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                class: "w-5 h-5",
                name: icons[option]
              }, null, 8, ["name"]),
              createTextVNode(" " + toDisplayString(("toTitleCase" in _ctx ? _ctx.toTitleCase : unref(toTitleCase))(option)), 1)
            ];
          }
        }),
        label: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              class: "w-5 h-5",
              name: icons[_ctx.$colorMode.preference]
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(("toTitleCase" in _ctx ? _ctx.toTitleCase : unref(toTitleCase))(_ctx.$colorMode.preference))}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                class: "w-5 h-5",
                name: icons[_ctx.$colorMode.preference]
              }, null, 8, ["name"]),
              createTextVNode(" " + toDisplayString(("toTitleCase" in _ctx ? _ctx.toTitleCase : unref(toTitleCase))(_ctx.$colorMode.preference)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DarkModeSwitch.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    const confirmClear = ref(false), clearing = ref(false);
    const { groupsList } = storeToRefs(useGroups());
    const netWorth = computed(() => {
      let owedToMe = 0;
      let iOwe = 0;
      let groupCount = 0;
      let txCount = 0;
      for (const group of groupsList.value) {
        if (!group.myID) continue;
        groupCount++;
        const balances = groupGetBalances(group);
        const myBalance = balances[group.myID] || 0;
        if (myBalance > 0) owedToMe += myBalance;
        else iOwe += Math.abs(myBalance);
        txCount += Object.keys(group.transactions || {}).length;
      }
      return {
        owedToMe: round(owedToMe),
        iOwe: round(iOwe),
        net: round(owedToMe - iOwe),
        groupCount,
        txCount
      };
    });
    async function del() {
      clearing.value = true;
      await wipeData();
      (void 0).location.reload();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_1$1;
      const _component_SettingsName = _sfc_main$2;
      const _component_UFormGroup = __nuxt_component_2;
      const _component_DarkModeSwitch = _sfc_main$1;
      const _component_UAccordion = __nuxt_component_3;
      const _component_UButton = __nuxt_component_0$1;
      const _component_UModal = __nuxt_component_4;
      const _component_UCard = __nuxt_component_7;
      const _component_UAlert = __nuxt_component_2$1;
      _push(`<!--[--><div class="px-4 py-2 flex flex-col h-full"><div class="space-y-3 flex-grow"><div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-gradient-to-br from-primary-50/50 via-transparent to-emerald-50/30 dark:from-primary-950/10 dark:via-transparent dark:to-emerald-950/10"><p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3"> Net Worth Across All Groups </p><div class="grid grid-cols-3 gap-3"><div class="text-center"><p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Owed to you</p><p class="text-lg font-bold text-emerald-600 dark:text-emerald-400">${ssrInterpolate(unref(netWorth).owedToMe)}</p></div><div class="text-center"><p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">You owe</p><p class="text-lg font-bold text-amber-600 dark:text-amber-400">${ssrInterpolate(unref(netWorth).iOwe)}</p></div><div class="text-center"><p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Net</p><p class="${ssrRenderClass([unref(netWorth).net >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400", "text-lg font-bold"])}">${ssrInterpolate(Math.abs(unref(netWorth).net))}</p></div></div><div class="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800"><div class="flex items-center gap-1.5 text-xs text-gray-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-user-group",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(netWorth).groupCount)} group${ssrInterpolate(unref(netWorth).groupCount !== 1 ? "s" : "")}</span></div><div class="flex items-center gap-1.5 text-xs text-gray-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-receipt-percent",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(netWorth).txCount)} transaction${ssrInterpolate(unref(netWorth).txCount !== 1 ? "s" : "")}</span></div></div></div>`);
      _push(ssrRenderComponent(_component_SettingsName, null, null, _parent));
      _push(ssrRenderComponent(_component_UFormGroup, { label: "Color Mode" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DarkModeSwitch, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DarkModeSwitch)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UAccordion, { items: [{ label: "Danger Zone", color: "red" }] }, {
        item: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Clear All Data" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    onClick: ($event) => confirmClear.value = true,
                    label: "Clear All Data",
                    color: "red",
                    block: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      onClick: ($event) => confirmClear.value = true,
                      label: "Clear All Data",
                      color: "red",
                      block: ""
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UFormGroup, { label: "Clear All Data" }, {
                default: withCtx(() => [
                  createVNode(_component_UButton, {
                    onClick: ($event) => confirmClear.value = true,
                    label: "Clear All Data",
                    color: "red",
                    block: ""
                  }, null, 8, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(confirmClear),
        "onUpdate:modelValue": ($event) => isRef(confirmClear) ? confirmClear.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-between items-center"${_scopeId2}><span class="font-medium"${_scopeId2}>Permanently Delete All Data</span>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    onClick: ($event) => confirmClear.value = false,
                    variant: "ghost",
                    color: "gray",
                    icon: "i-heroicons-x-mark"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-between items-center" }, [
                      createVNode("span", { class: "font-medium" }, "Permanently Delete All Data"),
                      createVNode(_component_UButton, {
                        onClick: ($event) => confirmClear.value = false,
                        variant: "ghost",
                        color: "gray",
                        icon: "i-heroicons-x-mark"
                      }, null, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UAlert, {
                    description: "This will erase all your groups and transactions. This action cannot be undone.",
                    color: "red",
                    variant: "subtle",
                    icon: "i-heroicons-exclamation-triangle"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    onClick: del,
                    color: "rose",
                    variant: "outline",
                    loading: unref(clearing)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Yes, delete everything`);
                      } else {
                        return [
                          createTextVNode("Yes, delete everything")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    onClick: ($event) => confirmClear.value = false,
                    variant: "ghost"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cancel`);
                      } else {
                        return [
                          createTextVNode("Cancel")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode(_component_UAlert, {
                        description: "This will erase all your groups and transactions. This action cannot be undone.",
                        color: "red",
                        variant: "subtle",
                        icon: "i-heroicons-exclamation-triangle"
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(_component_UButton, {
                          onClick: del,
                          color: "rose",
                          variant: "outline",
                          loading: unref(clearing)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Yes, delete everything")
                          ]),
                          _: 1
                        }, 8, ["loading"]),
                        createVNode(_component_UButton, {
                          onClick: ($event) => confirmClear.value = false,
                          variant: "ghost"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, null, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex justify-between items-center" }, [
                    createVNode("span", { class: "font-medium" }, "Permanently Delete All Data"),
                    createVNode(_component_UButton, {
                      onClick: ($event) => confirmClear.value = false,
                      variant: "ghost",
                      color: "gray",
                      icon: "i-heroicons-x-mark"
                    }, null, 8, ["onClick"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode(_component_UAlert, {
                      description: "This will erase all your groups and transactions. This action cannot be undone.",
                      color: "red",
                      variant: "subtle",
                      icon: "i-heroicons-exclamation-triangle"
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(_component_UButton, {
                        onClick: del,
                        color: "rose",
                        variant: "outline",
                        loading: unref(clearing)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Yes, delete everything")
                        ]),
                        _: 1
                      }, 8, ["loading"]),
                      createVNode(_component_UButton, {
                        onClick: ($event) => confirmClear.value = false,
                        variant: "ghost"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=settings-By9gcTlt.js.map
