import { a as useRoute, n as navigateTo, _ as __nuxt_component_0 } from "../server.mjs";
import { _ as __nuxt_component_2 } from "./Tabs-CH6Wi0un.js";
import { defineComponent, computed, mergeProps, isRef, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "P:/group/peersplit-main/peersplit-main/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "P:/group/peersplit-main/peersplit-main/node_modules/hookable/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/unctx/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/h3/dist/index.mjs";
import "vue-router";
import "P:/group/peersplit-main/peersplit-main/node_modules/defu/dist/defu.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/ufo/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "tailwind-merge";
import "P:/group/peersplit-main/peersplit-main/node_modules/@unhead/vue/dist/index.mjs";
import "@iconify/vue";
import "nanoid";
import "moment";
import "@supabase/supabase-js";
import "./selectMenu-CAIBtITz.js";
import "./index-DMPXWIV5.js";
import "@iconify/utils/lib/css/icon";
import "P:/group/peersplit-main/peersplit-main/node_modules/perfect-debounce/dist/index.mjs";
import "./hidden-CTntKjAB.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Navigation",
  __ssrInlineRender: true,
  setup(__props) {
    const items = [
      {
        label: "Groups",
        icon: "i-heroicons-users"
      },
      {
        label: "Activity",
        icon: "i-heroicons-clipboard-document-list"
      },
      {
        label: "Settlements",
        icon: "i-heroicons-banknotes"
      },
      {
        label: "Settings",
        icon: "i-heroicons-cog"
      }
    ];
    const route = useRoute();
    const selected = computed({
      get() {
        const index = items.findIndex(
          (item) => route.name.includes(item.label.toLowerCase())
        );
        if (index === -1) {
          navigateTo("/app/" + items[0].label.toLowerCase());
          return 0;
        }
        return index;
      },
      set(value) {
        const tab = items[value].label.toLowerCase();
        navigateTo("/app/" + tab);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTabs = __nuxt_component_2;
      _push(ssrRenderComponent(_component_UTabs, mergeProps({
        ui: {
          wrapper: "space-y-0",
          list: {
            height: "h-auto",
            rounded: "rounded-none rounded-t-lg",
            tab: {
              base: "flex flex-col items-center py-1 gap-1",
              height: "h-auto",
              icon: "w-5 h-5 me-0"
            }
          }
        },
        class: "w-full",
        items,
        modelValue: unref(selected),
        "onUpdate:modelValue": ($event) => isRef(selected) ? selected.value = $event : null
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navigation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtPage = __nuxt_component_0;
  const _component_Navigation = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "xl:max-w-xl lg:mx-auto w-screen h-screen flex flex-col bg-white dark:bg-gray-900" }, _attrs))} data-v-a3682ce9><div class="flex flex-col flex-grow" data-v-a3682ce9><div class="flex-grow overflow-y-scroll scroll-smooth" data-v-a3682ce9>`);
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(`</div><div class="h-14" data-v-a3682ce9></div></div><div class="xl:max-w-xl lg:mx-auto bottom-navigation safe-bottom" data-v-a3682ce9>`);
  _push(ssrRenderComponent(_component_Navigation, null, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const app = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a3682ce9"]]);
export {
  app as default
};
//# sourceMappingURL=app-CX8dnYZ8.js.map
