import { s as storeToRefs, b as useGroups } from './server.mjs';
import { mergeProps, unref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import moment from 'moment';
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
import 'nanoid';
import '@supabase/supabase-js';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$1 = {
  __name: "ActivityItem",
  __ssrInlineRender: true,
  props: ["item"],
  setup(__props) {
    const group = computed(() => useGroups().getGroupByID(__props.item.groupID));
    const groupName = computed(() => {
      var _a;
      return (_a = group.value) == null ? void 0 : _a.name;
    });
    const transactionTitle = computed(() => {
      var _a, _b, _c, _d, _e;
      const transaction = __props.item.data.cur || __props.item.data.prev;
      if (!transaction) return "";
      if (transaction.type === "expense") {
        return transaction.description;
      } else {
        if (transaction.data) {
          const { payers, splitters } = JSON.parse(transaction.data);
          transaction.payers = payers;
          transaction.splitters = splitters;
        }
        const from = (_a = Object.keys(transaction.payers)) == null ? void 0 : _a[0];
        const value = (_b = Object.values(transaction.payers)) == null ? void 0 : _b[0];
        const to = (_c = Object.keys(transaction.splitters)) == null ? void 0 : _c[0];
        return `${(_d = group.value.members[from]) == null ? void 0 : _d.name} \u{1F852} ${(_e = group.value.members[to]) == null ? void 0 : _e.name} (${group.value.currency}${value})`;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hover:bg-primary-200/40 dark:hover:bg-primary-800/20 p-4 cursor-pointer text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 [&:not(:last-child)]:border-b-0" }, _attrs))}><span class="font-medium text-primary-500 dark:text-primary-400">${ssrInterpolate(("useGroups" in _ctx ? _ctx.useGroups : unref(useGroups))().getMemberName(__props.item.groupID, __props.item.by) || "Someone")}</span>`);
      if (__props.item.data.type === "update_currency") {
        _push(`<span> updated the group <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>&#39;s currency from <span class="font-medium">${ssrInterpolate(__props.item.data.prev)}</span> to <span class="font-medium">${ssrInterpolate(__props.item.data.cur)}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "update_name") {
        _push(`<span> updated the group <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>&#39;s name from <span class="font-medium">${ssrInterpolate(__props.item.data.prev)}</span> to <span class="font-medium">${ssrInterpolate(__props.item.data.cur)}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "update_transaction" && ((_a = __props.item.data.cur) == null ? void 0 : _a.type) === "expense") {
        _push(`<span> updated the expense <span class="font-medium">${ssrInterpolate(unref(transactionTitle))}</span> in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "update_transaction" && ((_b = __props.item.data.cur) == null ? void 0 : _b.type) === "payment") {
        _push(`<span> updated the payment <span class="font-medium">${ssrInterpolate(unref(transactionTitle))}</span> in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "delete_transaction" && ((_c = __props.item.data.prev) == null ? void 0 : _c.type) === "expense") {
        _push(`<span> deleted the expense <span class="font-medium">${ssrInterpolate(unref(transactionTitle))}</span> in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "delete_transaction" && ((_d = __props.item.data.prev) == null ? void 0 : _d.type) === "payment") {
        _push(`<span> deleted the payment <span class="font-medium">${ssrInterpolate(unref(transactionTitle))}</span> in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "create_transaction" && ((_e = __props.item.data.cur) == null ? void 0 : _e.type) === "expense") {
        _push(`<span> added an expense <span class="font-medium">${ssrInterpolate(unref(transactionTitle))}</span> in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "create_transaction" && ((_f = __props.item.data.cur) == null ? void 0 : _f.type) === "payment") {
        _push(`<span> recorded a payment <span class="font-medium">${ssrInterpolate(unref(transactionTitle))}</span> in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "import_splitwise") {
        _push(`<span> imported <span class="font-medium">${ssrInterpolate(__props.item.data.members)}</span> members and <span class="font-medium">${ssrInterpolate(__props.item.data.transactions)}</span> transactions from Splitwise in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-sm text-gray-600/50 dark:text-gray-300/50">${ssrInterpolate(unref(moment).utc(__props.item.created_at).fromNow())}</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ActivityItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "activity",
  __ssrInlineRender: true,
  setup(__props) {
    const activity = storeToRefs(useGroups()).getAllActivity;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ActivityItem = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col" }, _attrs))}><div class="p-4 text-xl font-medium">Activity Logs</div><div class="flex-grow overflow-y-scroll"><!--[-->`);
      ssrRenderList(unref(activity), (item) => {
        _push(ssrRenderComponent(_component_ActivityItem, { item }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/activity.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=activity-BpADPpuY.mjs.map
