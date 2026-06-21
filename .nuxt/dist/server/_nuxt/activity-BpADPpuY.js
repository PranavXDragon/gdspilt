import { b as useGroups, s as storeToRefs } from "../server.mjs";
import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import moment from "moment";
import "P:/group/peersplit-main/peersplit-main/node_modules/hookable/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "P:/group/peersplit-main/peersplit-main/node_modules/defu/dist/defu.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/ofetch/dist/node.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/unctx/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/h3/dist/index.mjs";
import "vue-router";
import "P:/group/peersplit-main/peersplit-main/node_modules/ufo/dist/index.mjs";
import "@vueuse/core";
import "tailwind-merge";
import "P:/group/peersplit-main/peersplit-main/node_modules/@unhead/vue/dist/index.mjs";
import "@iconify/vue";
import "nanoid";
import "@supabase/supabase-js";
const _sfc_main$1 = {
  __name: "ActivityItem",
  __ssrInlineRender: true,
  props: ["item"],
  setup(__props) {
    const group = computed(() => useGroups().getGroupByID(__props.item.groupID));
    const groupName = computed(() => group.value?.name);
    const transactionTitle = computed(() => {
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
        const from = Object.keys(transaction.payers)?.[0];
        const value = Object.values(transaction.payers)?.[0];
        const to = Object.keys(transaction.splitters)?.[0];
        return `${group.value.members[from]?.name} 🡒 ${group.value.members[to]?.name} (${group.value.currency}${value})`;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
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
      if (__props.item.data.type === "update_transaction" && __props.item.data.cur?.type === "expense") {
        _push(`<span> updated the expense <span class="font-medium">${ssrInterpolate(unref(transactionTitle))}</span> in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "update_transaction" && __props.item.data.cur?.type === "payment") {
        _push(`<span> updated the payment <span class="font-medium">${ssrInterpolate(unref(transactionTitle))}</span> in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "delete_transaction" && __props.item.data.prev?.type === "expense") {
        _push(`<span> deleted the expense <span class="font-medium">${ssrInterpolate(unref(transactionTitle))}</span> in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "delete_transaction" && __props.item.data.prev?.type === "payment") {
        _push(`<span> deleted the payment <span class="font-medium">${ssrInterpolate(unref(transactionTitle))}</span> in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "create_transaction" && __props.item.data.cur?.type === "expense") {
        _push(`<span> added an expense <span class="font-medium">${ssrInterpolate(unref(transactionTitle))}</span> in <span class="font-medium">${ssrInterpolate(unref(groupName))}</span>. </span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.type === "create_transaction" && __props.item.data.cur?.type === "payment") {
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
export {
  _sfc_main as default
};
//# sourceMappingURL=activity-BpADPpuY.js.map
