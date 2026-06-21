import { _ as __nuxt_component_0 } from "./Button-97Zr3Qqu.js";
import { _ as __nuxt_component_1 } from "./selectMenu-CAIBtITz.js";
import { _ as __nuxt_component_2, a as __nuxt_component_3 } from "./Accordion-DjD1tMCY.js";
import { createVNode, resolveDynamicComponent, mergeProps, useSSRContext, h, openBlock, createElementBlock, createElementVNode, unref, withCtx, createTextVNode, createBlock, toDisplayString } from "vue";
import { ssrRenderVNode, ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "P:/group/peersplit-main/peersplit-main/node_modules/hookable/dist/index.mjs";
import "tailwind-merge";
import "../server.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "P:/group/peersplit-main/peersplit-main/node_modules/unctx/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/h3/dist/index.mjs";
import "vue-router";
import "P:/group/peersplit-main/peersplit-main/node_modules/defu/dist/defu.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/ufo/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "P:/group/peersplit-main/peersplit-main/node_modules/@unhead/vue/dist/index.mjs";
import "@iconify/vue";
import "nanoid";
import "moment";
import "@supabase/supabase-js";
import "./nuxt-link-By9b6QI-.js";
import "ohash/utils";
import "./index-DMPXWIV5.js";
import "@iconify/utils/lib/css/icon";
import "P:/group/peersplit-main/peersplit-main/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main$1 = {
  props: {
    filled: {
      type: Boolean,
      required: false,
      default: false
    },
    fontControlled: {
      type: Boolean,
      required: false,
      default: true
    },
    icon: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: false,
      default: void 0
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent($props.icon), mergeProps({
    class: {
      "nuxt-icon": $props.fontControlled,
      "nuxt-icon--fill": !$props.filled
    }
  }, _attrs), null), _parent);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-svgo/dist/runtime/components/nuxt-icon.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const NuxtIcon = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 34 34"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, [..._cache[0] || (_cache[0] = [
    createElementVNode("path", {
      fill: "#1c1b22",
      d: "M34 17c0 9.389-7.611 17-17 17S0 26.389 0 17 7.611 0 17 0s17 7.611 17 17"
    }, null, -1),
    createElementVNode("path", {
      fill: "#89a1f0",
      d: "M19.984 11.21q.624 1.272.624 2.832t-.624 2.832q-.624 1.248-1.608 1.992-1.992 1.536-4.128 1.536h-3v2.712q0 .552-.048.84-.024.264-.216.624-.336.648-1.872.648-1.68 0-1.968-.888Q7 23.93 7 23.09V9.77q0-.552.024-.816.048-.288.24-.648.336-.648 1.872-.648h5.136q2.112 0 4.104 1.536.984.744 1.608 2.016m-5.712 4.944q.72 0 1.416-.528t.696-1.584-.696-1.584q-.696-.552-1.44-.552h-3v4.248z"
    }, null, -1),
    createElementVNode("path", {
      fill: "#bef264",
      d: "M27.54 19.96q0 2.34-1.35 3.75t-3.27 1.86v1.92q0 1.05-.21 1.47a1 1 0 0 1-.57.57q-.36.15-.99.15t-1.02-.15a.9.9 0 0 1-.51-.54q-.21-.51-.21-1.53V25.6q-1.23-.27-2.22-.9t-1.38-1.11l-.39-.51q-.63-.81-.63-1.41t1.02-1.59q.6-.57 1.26-.57.69 0 1.89 1.2.93 1.14 2.1 1.14 2.22 0 2.22-1.83 0-.66-.84-1.02t-2.04-.63q-1.2-.3-2.4-.78t-2.04-1.65-.84-2.97 1.14-3.24 3.15-1.86V6.19q0-1.02.18-1.47.3-.72 1.59-.72.81 0 1.2.36.42.33.48.72t.06 1.14V7.9q.84.18 1.53.51t.96.54l.27.24.12.09q.75.69.75 1.14t-.72 1.5q-.69 1.05-1.53 1.05-.54 0-.93-.27-.36-.27-.57-.45t-.39-.3q-.51-.33-1.29-.33t-1.29.39q-.51.36-.51 1.02t.6 1.08q.63.39 1.53.54.9.12 1.98.45 1.08.3 1.98.72t1.5 1.5q.63 1.05.63 2.64"
    }, null, -1)
  ])]);
}
const Icon = { render() {
  return h(NuxtIcon, { icon: { render }, name: "logo" });
} };
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const devlog = [
      {
        date: "Oct 22, 2024",
        text: "Product Hunt launch!",
        link: "https://producthunt.com/posts/peersplit"
      },
      {
        date: "Oct 17, 2024",
        text: "Added Splitwise import and CSV export functionality.",
        link: "https://x.com/tanayvk/status/1846787787812753444"
      },
      {
        date: "Oct 16, 2024",
        text: "Added default splits for groups and improved stats.",
        link: "https://x.com/tanayvk/status/1846498652770218347"
      },
      {
        date: "Oct 12, 2024",
        text: "The app is live and stable! Turned it into a PWA. Ready for everyone to start using it.",
        link: "https://x.com/tanayvk/status/1845138111749292519"
      },
      {
        date: "Oct 10, 2024",
        text: "Fixed a few sync issues, added currency symbol customization, and built out group stats.",
        link: "https://x.com/tanayvk/status/1844409444639310298"
      },
      {
        date: "Oct 9, 2024",
        text: "Got peer-to-peer sync working! You can now invite and join groups.",
        link: "https://x.com/tanayvk/status/1844030889061503127"
      },
      {
        date: "Oct 8, 2024",
        text: "More UI/UX polish, persisting data locally, and made some progress on peer-to-peer syncing.",
        link: "https://x.com/tanayvk/status/1843682849402360020"
      },
      {
        date: "Oct 6, 2024",
        text: "'Simplifying Debts'—added balance and repayment computations.",
        link: "https://x.com/tanayvk/status/1842957866526973978"
      },
      {
        date: "Oct 5, 2024",
        text: "Tweaked the UI and built the 'Add Expense' form. Small but crucial stuff!",
        link: "https://x.com/tanayvk/status/1842574320171929889"
      },
      {
        date: "Oct 4, 2024",
        text: "Added group UI, started working on the database design, and started looking into peer-to-peer syncing with gun.eco.",
        link: "https://x.com/tanayvk/status/1842189991688249622"
      },
      {
        date: "Oct 3, 2024",
        text: "Launched the app with a simple UI and landing page. Minimal but it works!",
        link: "https://x.com/tanayvk/status/1841837882061082816"
      }
    ];
    const features = [
      { text: "100% free—no signup required", icon: "i-heroicons-shield-check" },
      { text: "Local-first and works fully offline", icon: "i-heroicons-signal-slash" },
      { text: "Cross-platform: use it on mobile, desktop, or laptop", icon: "i-heroicons-device-phone-mobile" },
      { text: "Peer-to-peer sync with friends while keeping data private", icon: "i-heroicons-link" },
      { text: "Smooth UX that stays out of your way", icon: "i-heroicons-sparkles" },
      { text: "Available in dark and light modes", icon: "i-heroicons-sun" },
      { text: "Import from Splitwise, export to CSV", icon: "i-heroicons-arrow-up-tray" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_0;
      const _component_UIcon = __nuxt_component_1;
      const _component_UAlert = __nuxt_component_2;
      const _component_UAccordion = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))}><div class="relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-transparent to-lime-50/40 dark:from-primary-950/20 dark:via-transparent dark:to-lime-950/20 pointer-events-none"></div><div class="mx-auto container max-w-[800px] px-6 pb-16 pt-12 flex-grow space-y-6 relative"><div class="text-center space-y-6"><div class="flex flex-col items-center gap-3"><div class="relative">`);
      _push(ssrRenderComponent(unref(Icon), {
        class: "w-24 h-24 drop-shadow-lg",
        filled: "",
        fontControlled: false
      }, null, _parent));
      _push(`</div><h1 class="text-5xl sm:text-7xl select-none tracking-tight"><span class="text-primary">Peer</span><span class="text-lime-400">Split</span></h1><p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-[500px] leading-relaxed"> Track and split group expenses. <span class="font-medium text-gray-800 dark:text-gray-200">100% free, 100% private.</span></p></div><div class="flex flex-row items-center justify-center gap-3 pt-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/app",
        size: "xl",
        class: "shadow-lg shadow-primary/20"
      }, {
        trailing: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-right-20-solid",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-right-20-solid",
                class: "w-5 h-5"
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Get Started `);
          } else {
            return [
              createTextVNode(" Get Started ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        to: "https://github.com/tanayvk/peersplit",
        size: "xl",
        target: "_blank"
      }, {
        leading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "fa6-brands-github",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "fa6-brands-github",
                class: "w-5 h-5"
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Star on GitHub `);
          } else {
            return [
              createTextVNode(" Star on GitHub ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-8"><!--[-->`);
      ssrRenderList(features, (feature) => {
        _push(`<div class="flex items-start gap-3 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 hover:shadow-md hover:shadow-primary/5"><div class="shrink-0 w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: feature.icon,
          class: "w-4 h-4 text-primary-600 dark:text-primary-400"
        }, null, _parent));
        _push(`</div><span class="text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate(feature.text)}</span></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_UAlert, {
        icon: "i-heroicons-rocket-launch",
        color: "primary",
        variant: "subtle",
        title: "Product Hunt Launch!",
        description: "PeerSplit just launched on Product Hunt! I'd love your support—click below to leave a comment and share your thoughts. Your feedback means a lot!",
        actions: [
          {
            label: "Visit Launch",
            target: "_blank",
            to: "https://www.producthunt.com/posts/peersplit",
            variant: "solid",
            color: "emerald"
          }
        ],
        class: "rounded-xl"
      }, null, _parent));
      _push(`<div class="text-base space-y-3 pt-4 leading-relaxed text-gray-600 dark:text-gray-400"><p><span class="text-primary font-medium">PeerSplit</span> is a <span class="font-semibold text-gray-800 dark:text-gray-200">free</span> app that helps you split and track group expenses with ease. </p><p> It&#39;s peer-to-peer, so your data stays <span class="font-semibold">completely private</span>—nothing is stored on the cloud. </p><p> Got feedback or ideas? Reach out to me `);
      _push(ssrRenderComponent(_component_UButton, {
        class: "p-0 text-base",
        to: "https://x.com/tanayvk",
        variant: "link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`@tanayvk`);
          } else {
            return [
              createTextVNode("@tanayvk")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` on X, or create an issue on GitHub. </p></div><div class="space-y-4 pt-2"><h2 class="text-2xl font-semibold flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-rocket-launch",
        class: "w-6 h-6 text-primary"
      }, null, _parent));
      _push(` Quick Start Guide </h2><div class="text-base space-y-4 text-gray-600 dark:text-gray-400"><p><span class="text-primary font-medium">PeerSplit</span> works directly in your browser, so you can use it as a web app instantly or install it as a PWA (Progressive Web App) for an even better experience. Here&#39;s how: </p>`);
      _push(ssrRenderComponent(_component_UAccordion, {
        items: [
          { label: "On Android (Using Chrome)" },
          { label: "On iOS (Using Safari or Chrome)" },
          { label: "On Desktop (Chrome or Edge)" }
        ],
        class: "rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700",
        ui: {
          item: {
            color: "text-gray-800 dark:text-gray-100"
          }
        }
      }, {
        item: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-sm space-y-3 p-4 bg-gray-50/50 dark:bg-gray-800/30"${_scopeId}>`);
            if (slotProps.item.label === "On Android (Using Chrome)") {
              _push2(`<ol class="list-decimal pl-5 space-y-2"${_scopeId}><li${_scopeId}>Open <span class="font-semibold"${_scopeId}>Chrome</span> and visit the <span class="text-primary font-medium"${_scopeId}>PeerSplit</span> website.</li><li${_scopeId}>Tap the menu icon (three dots) in the top-right corner.</li><li${_scopeId}>Select <span class="font-semibold"${_scopeId}>&quot;Add to Home screen&quot;</span>.</li><li${_scopeId}>Follow the prompts to install the app and create a shortcut on your home screen.</li><li${_scopeId}>Now, you can launch <span class="text-primary font-medium"${_scopeId}>PeerSplit</span> like any other app from your home screen!</li></ol>`);
            } else if (slotProps.item.label === "On iOS (Using Safari or Chrome)") {
              _push2(`<ol class="list-decimal pl-5 space-y-2"${_scopeId}><li${_scopeId}>Open <span class="font-semibold"${_scopeId}>Safari</span> or <span class="font-semibold"${_scopeId}>Chrome</span> and navigate to the <span class="text-primary font-medium"${_scopeId}>PeerSplit</span> website.</li><li${_scopeId}>Tap the <span class="font-semibold"${_scopeId}>Share</span> icon at the bottom (the square with an arrow pointing up).</li><li${_scopeId}>Scroll down and select <span class="font-semibold"${_scopeId}>&quot;Add to Home Screen&quot;</span>.</li><li${_scopeId}>Choose a name for the app (PeerSplit is default) and tap <span class="font-semibold"${_scopeId}>&quot;Add&quot;</span>.</li><li${_scopeId}><span class="text-primary font-medium"${_scopeId}>PeerSplit</span> will now appear on your home screen, ready to use like a regular app!</li></ol>`);
            } else {
              _push2(`<ol class="list-decimal pl-5 space-y-2"${_scopeId}><li${_scopeId}>Open <span class="font-semibold"${_scopeId}>Chrome</span> or <span class="font-semibold"${_scopeId}>Microsoft Edge</span> and visit the <span class="text-primary font-medium"${_scopeId}>PeerSplit</span> website.</li><li${_scopeId}>Look for the install icon (a small plus sign in the address bar) and click it.</li><li${_scopeId}>Follow the prompts to install <span class="text-primary font-medium"${_scopeId}>PeerSplit</span> as a desktop app.</li><li${_scopeId}>Once installed, you can open <span class="text-primary font-medium"${_scopeId}>PeerSplit</span> from your Start menu or desktop.</li></ol>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "text-sm space-y-3 p-4 bg-gray-50/50 dark:bg-gray-800/30" }, [
                slotProps.item.label === "On Android (Using Chrome)" ? (openBlock(), createBlock("ol", {
                  key: 0,
                  class: "list-decimal pl-5 space-y-2"
                }, [
                  createVNode("li", null, [
                    createTextVNode("Open "),
                    createVNode("span", { class: "font-semibold" }, "Chrome"),
                    createTextVNode(" and visit the "),
                    createVNode("span", { class: "text-primary font-medium" }, "PeerSplit"),
                    createTextVNode(" website.")
                  ]),
                  createVNode("li", null, "Tap the menu icon (three dots) in the top-right corner."),
                  createVNode("li", null, [
                    createTextVNode("Select "),
                    createVNode("span", { class: "font-semibold" }, '"Add to Home screen"'),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, "Follow the prompts to install the app and create a shortcut on your home screen."),
                  createVNode("li", null, [
                    createTextVNode("Now, you can launch "),
                    createVNode("span", { class: "text-primary font-medium" }, "PeerSplit"),
                    createTextVNode(" like any other app from your home screen!")
                  ])
                ])) : slotProps.item.label === "On iOS (Using Safari or Chrome)" ? (openBlock(), createBlock("ol", {
                  key: 1,
                  class: "list-decimal pl-5 space-y-2"
                }, [
                  createVNode("li", null, [
                    createTextVNode("Open "),
                    createVNode("span", { class: "font-semibold" }, "Safari"),
                    createTextVNode(" or "),
                    createVNode("span", { class: "font-semibold" }, "Chrome"),
                    createTextVNode(" and navigate to the "),
                    createVNode("span", { class: "text-primary font-medium" }, "PeerSplit"),
                    createTextVNode(" website.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Tap the "),
                    createVNode("span", { class: "font-semibold" }, "Share"),
                    createTextVNode(" icon at the bottom (the square with an arrow pointing up).")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Scroll down and select "),
                    createVNode("span", { class: "font-semibold" }, '"Add to Home Screen"'),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Choose a name for the app (PeerSplit is default) and tap "),
                    createVNode("span", { class: "font-semibold" }, '"Add"'),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("span", { class: "text-primary font-medium" }, "PeerSplit"),
                    createTextVNode(" will now appear on your home screen, ready to use like a regular app!")
                  ])
                ])) : (openBlock(), createBlock("ol", {
                  key: 2,
                  class: "list-decimal pl-5 space-y-2"
                }, [
                  createVNode("li", null, [
                    createTextVNode("Open "),
                    createVNode("span", { class: "font-semibold" }, "Chrome"),
                    createTextVNode(" or "),
                    createVNode("span", { class: "font-semibold" }, "Microsoft Edge"),
                    createTextVNode(" and visit the "),
                    createVNode("span", { class: "text-primary font-medium" }, "PeerSplit"),
                    createTextVNode(" website.")
                  ]),
                  createVNode("li", null, "Look for the install icon (a small plus sign in the address bar) and click it."),
                  createVNode("li", null, [
                    createTextVNode("Follow the prompts to install "),
                    createVNode("span", { class: "text-primary font-medium" }, "PeerSplit"),
                    createTextVNode(" as a desktop app.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Once installed, you can open "),
                    createVNode("span", { class: "text-primary font-medium" }, "PeerSplit"),
                    createTextVNode(" from your Start menu or desktop.")
                  ])
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="space-y-3 pt-2"><h2 class="text-2xl font-semibold flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-document-text",
        class: "w-6 h-6 text-primary"
      }, null, _parent));
      _push(` Devlog </h2><div class="space-y-2"><!--[-->`);
      ssrRenderList(devlog, (log) => {
        _push(`<p class="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          to: log.link,
          target: "_blank",
          class: "m-0 p-0 shrink-0",
          variant: "link",
          color: "lime",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="font-medium whitespace-nowrap"${_scopeId}>${ssrInterpolate(log.date)}</span>`);
            } else {
              return [
                createVNode("span", { class: "font-medium whitespace-nowrap" }, toDisplayString(log.date), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<span class="text-gray-500 dark:text-gray-500">— ${ssrInterpolate(log.text)}</span></p>`);
      });
      _push(`<!--]--></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-B4G09qar.js.map
