import { _ as __nuxt_component_0, a as useRoute, n as navigateTo } from './server.mjs';
import { _ as __nuxt_component_2 } from './Tabs-Bf4gLFcz.mjs';
import { mergeProps, defineComponent, computed, isRef, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:module';
import 'node:path';
import 'vue-router';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';
import 'moment';
import 'nanoid';
import '@supabase/supabase-js';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import './selectMenu-DqLlXyUS.mjs';
import './index-CkXSRQJd.mjs';
import '@iconify/utils/lib/css/icon';
import './hidden-O2d_FXXR.mjs';

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

export { app as default };
//# sourceMappingURL=app-DExwiOhy.mjs.map
