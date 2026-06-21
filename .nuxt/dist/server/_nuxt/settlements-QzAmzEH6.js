import { b as __nuxt_component_0, c as __nuxt_component_4 } from "./Modal-CpCVwxs4.js";
import { _ as __nuxt_component_1 } from "./selectMenu-DqLlXyUS.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./PaymentEditor-Bpw8D6nD.js";
import { _ as __nuxt_component_0$1 } from "./Button-CIOzeTUV.js";
import { ref, computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, nextTick, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { nanoid } from "nanoid";
import "P:/group/peersplit-main/peersplit-main/node_modules/hookable/dist/index.mjs";
import { s as storeToRefs, b as useGroups, j as computeTransaction, r as round } from "../server.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "P:/group/peersplit-main/peersplit-main/node_modules/defu/dist/defu.mjs";
import "tailwind-merge";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@tanstack/vue-virtual";
import "./hidden-O2d_FXXR.js";
import "@vueuse/core";
import "ohash/utils";
import "./index-CkXSRQJd.js";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "P:/group/peersplit-main/peersplit-main/node_modules/perfect-debounce/dist/index.mjs";
import "moment";
import "./nuxt-link-By9b6QI-.js";
import "P:/group/peersplit-main/peersplit-main/node_modules/ufo/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/ofetch/dist/node.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/unctx/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/h3/dist/index.mjs";
import "vue-router";
import "P:/group/peersplit-main/peersplit-main/node_modules/@unhead/vue/dist/index.mjs";
import "@supabase/supabase-js";
const _sfc_main = {
  __name: "settlements",
  __ssrInlineRender: true,
  setup(__props) {
    const { loading, groupsList, getGroupByID, getPaymentsByGroupID, getBalancesByGroupID } = storeToRefs(useGroups());
    const showPaymentEditor = ref(false);
    const ugly = ref({ hello: "" });
    const expense = ref(null);
    const expandedIndex = ref(null);
    const simplifyDebts = ref(true);
    const groupID = computed({
      get() {
        const current = useGroups().currentGroup;
        if (current) return current;
        if (groupsList.value.length > 0) return groupsList.value[0].id;
        return null;
      },
      set(val) {
        useGroups().setCurrentGroup(val);
      }
    });
    const group = computed(() => groupID.value ? getGroupByID.value(groupID.value) : null);
    const myID = computed(() => group.value?.myID);
    const currency = computed(() => useGroups().getGroupCurrency(groupID.value));
    const allPayments = computed(() => {
      if (!groupID.value) return [];
      if (simplifyDebts.value) {
        return getPaymentsByGroupID.value(groupID.value) || [];
      }
      const g = getGroupByID.value(groupID.value);
      if (!g || !g.transactions || !g.members) return [];
      const debts = {};
      for (const tx of Object.values(g.transactions)) {
        if (tx.type === "payment") continue;
        const computed2 = computeTransaction(tx);
        const totalPaid = Object.values(computed2.payers).reduce((a, b) => round(Number(a) + Number(b)), 0);
        if (totalPaid <= 0) continue;
        for (const [payer, paid] of Object.entries(computed2.payers)) {
          const paidNum = Number(paid);
          if (paidNum <= 0) continue;
          for (const [splitter, split] of Object.entries(computed2.splits)) {
            if (payer === splitter) continue;
            const splitNum = Number(split);
            if (splitNum <= 0) continue;
            const amount = round(splitNum * (paidNum / totalPaid));
            if (amount <= 0) continue;
            const key = `${splitter}->${payer}`;
            debts[key] = round((debts[key] || 0) + amount);
          }
        }
      }
      const paymentMap = {};
      for (const [key, amount] of Object.entries(debts)) {
        if (amount <= 0) continue;
        const [from, to] = key.split("->");
        const revKey = `${to}->${from}`;
        const revAmount = paymentMap[revKey] || 0;
        if (revAmount > 0) {
          const net = round(amount - revAmount);
          if (net > 0) paymentMap[key] = net;
          delete paymentMap[revKey];
        } else {
          paymentMap[key] = round((paymentMap[key] || 0) + amount);
        }
      }
      return Object.entries(paymentMap).map(([key, value]) => {
        const [from, to] = key.split("->");
        return { from, to, value };
      });
    });
    const paymentsInvolvingMe = computed(
      () => allPayments.value.filter((p) => p.from === myID.value || p.to === myID.value)
    );
    const netBalance = computed(() => {
      if (!groupID.value) return 0;
      const balances = getBalancesByGroupID.value(groupID.value);
      return balances[myID.value] || 0;
    });
    function involvesMe(payment) {
      return payment.from === myID.value || payment.to === myID.value;
    }
    function memberName(id) {
      return useGroups().getMemberName(groupID.value, id);
    }
    function getDebtBreakdown(payment) {
      const g = getGroupByID.value(groupID.value);
      if (!g || !g.transactions) return [];
      const items = [];
      for (const tx of Object.values(g.transactions)) {
        const computed2 = computeTransaction(tx);
        const fromSplit = computed2.splits[payment.from] || 0;
        const toSplit = computed2.splits[payment.to] || 0;
        const fromPaid = computed2.payers[payment.from] || 0;
        const toPaid = computed2.payers[payment.to] || 0;
        if (toPaid > 0 && fromSplit > 0) {
          const amount = Math.min(fromSplit, toPaid);
          items.push({
            description: computed2.description || (computed2.type === "payment" ? "Payment" : "Expense"),
            type: computed2.type,
            amount,
            fromPaysTo: true
          });
        }
        if (fromPaid > 0 && toSplit > 0) {
          const amount = Math.min(toSplit, fromPaid);
          items.push({
            description: computed2.description || (computed2.type === "payment" ? "Payment" : "Expense"),
            type: computed2.type,
            amount,
            fromPaysTo: false
            // this reduces what 'from' owes 'to'
          });
        }
      }
      return items;
    }
    function settle(payment) {
      expense.value = {
        id: nanoid(),
        type: "payment",
        created_at: /* @__PURE__ */ new Date(),
        splitType: 1,
        payers: { [payment.from]: String(payment.value) },
        splitters: { [payment.to]: String(payment.value) }
      };
      nextTick(() => {
        showPaymentEditor.value = true;
      });
    }
    function add(trx) {
      const gid = groupID.value;
      if (gid) {
        useGroups().addTransaction(gid, trx);
      }
      clearEditors();
    }
    function update(trx) {
      const gid = groupID.value;
      if (gid) {
        useGroups().updateTransaction(gid, trx);
      }
      clearEditors();
    }
    const settlementHistory = computed(() => {
      if (!groupID.value) return [];
      const g = getGroupByID.value(groupID.value);
      if (!g || !g.transactions) return [];
      return Object.values(g.transactions).filter((tx) => tx.type === "payment").sort((a, b) => b.created_at?.localeCompare(a.created_at) || 0);
    });
    function markAsPaid(payment) {
      const gid = groupID.value;
      if (!gid) return;
      const tx = {
        id: nanoid(),
        type: "payment",
        description: `Settlement: ${memberName(payment.from)} → ${memberName(payment.to)}`,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        splitType: 1,
        payers: { [payment.from]: String(payment.value) },
        splitters: { [payment.to]: String(payment.value) }
      };
      useGroups().addTransaction(gid, tx);
      expandedIndex.value = null;
    }
    function formatDate(dateStr) {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
    }
    function clearEditors() {
      showPaymentEditor.value = false;
      expense.value = null;
      ugly.value = { hello: "" };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USelectMenu = __nuxt_component_0;
      const _component_UIcon = __nuxt_component_1;
      const _component_SpinLoader = _sfc_main$1;
      const _component_UButton = __nuxt_component_0$1;
      const _component_UModal = __nuxt_component_4;
      const _component_PaymentEditor = _sfc_main$2;
      _push(`<!--[--><div class="h-full flex flex-col"><div class="px-3 pt-3 pb-1 flex items-center justify-between gap-2"><div class="flex items-center gap-2"><p class="text-lg font-medium">Settlements</p><span class="text-sm text-gray-400">·</span><span class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[160px]">${ssrInterpolate(group.value?.name)}</span></div>`);
      if (unref(groupsList).length > 1) {
        _push(ssrRenderComponent(_component_USelectMenu, {
          modelValue: groupID.value,
          "onUpdate:modelValue": ($event) => groupID.value = $event,
          options: unref(groupsList),
          "value-attribute": "id",
          "option-attribute": "name",
          size: "sm",
          class: "w-40",
          placeholder: "Switch group"
        }, {
          label: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-1.5 text-xs truncate"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrows-right-left",
                class: "w-3 h-3 text-gray-400 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`<span class="truncate"${_scopeId}>${ssrInterpolate(unref(groupsList).find((g) => g.id === groupID.value)?.name || "Switch")}</span></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-1.5 text-xs truncate" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-arrows-right-left",
                    class: "w-3 h-3 text-gray-400 shrink-0"
                  }),
                  createVNode("span", { class: "truncate" }, toDisplayString(unref(groupsList).find((g) => g.id === groupID.value)?.name || "Switch"), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex-grow overflow-y-scroll px-2 pb-2">`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_SpinLoader, { height: "h-full" }, null, _parent));
      } else if (!group.value) {
        _push(`<div class="flex flex-col items-center justify-center h-full text-center"><div class="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-banknotes",
          class: "w-8 h-8 text-primary-400 dark:text-primary-500"
        }, null, _parent));
        _push(`</div><p class="text-gray-500 dark:text-gray-400 font-medium">No group selected</p></div>`);
      } else {
        _push(`<div class="py-1 space-y-4"><div class="${ssrRenderClass([netBalance.value === 0 ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/30" : netBalance.value > 0 ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30" : "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30", "p-4 rounded-xl border"])}"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400">${ssrInterpolate(netBalance.value === 0 ? "You're settled up" : netBalance.value > 0 ? "You are owed" : "You owe")}</p><p class="${ssrRenderClass([netBalance.value === 0 ? "text-green-600 dark:text-green-400" : netBalance.value > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400", "text-2xl font-bold mt-0.5"])}">${ssrInterpolate(currency.value)}${ssrInterpolate(Math.abs(netBalance.value))}</p></div><div class="${ssrRenderClass([netBalance.value === 0 ? "bg-green-100 dark:bg-green-900/30" : netBalance.value > 0 ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-amber-100 dark:bg-amber-900/30", "w-12 h-12 rounded-full flex items-center justify-center"])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: netBalance.value === 0 ? "i-heroicons-check-circle" : netBalance.value > 0 ? "i-heroicons-arrow-down-circle" : "i-heroicons-arrow-up-circle",
          class: ["w-7 h-7", netBalance.value === 0 ? "text-green-500" : netBalance.value > 0 ? "text-emerald-500" : "text-amber-500"]
        }, null, _parent));
        _push(`</div></div>`);
        if (netBalance.value < 0) {
          _push(`<div class="mt-3 space-y-1.5 pt-3 border-t border-amber-200/50 dark:border-amber-800/20"><!--[-->`);
          ssrRenderList(paymentsInvolvingMe.value.filter((p) => p.from === myID.value), (p) => {
            _push(`<p class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400"> You owe <span class="font-medium text-gray-800 dark:text-gray-200">${ssrInterpolate(memberName(p.to))}</span></span><span class="font-semibold text-amber-600 dark:text-amber-400">${ssrInterpolate(currency.value)}${ssrInterpolate(p.value)}</span></p>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (netBalance.value > 0) {
          _push(`<div class="mt-3 space-y-1.5 pt-3 border-t border-emerald-200/50 dark:border-emerald-800/20"><!--[-->`);
          ssrRenderList(paymentsInvolvingMe.value.filter((p) => p.to === myID.value), (p) => {
            _push(`<p class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400"><span class="font-medium text-gray-800 dark:text-gray-200">${ssrInterpolate(memberName(p.from))}</span> owes you </span><span class="font-semibold text-emerald-600 dark:text-emerald-400">${ssrInterpolate(currency.value)}${ssrInterpolate(p.value)}</span></p>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div><div class="flex items-center justify-between mb-3"><p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Outstanding Debts</p><div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5"><button class="${ssrRenderClass([simplifyDebts.value ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300", "text-xs px-2 py-1 rounded-md transition-all duration-200 font-medium"])}">Simplified</button><button class="${ssrRenderClass([!simplifyDebts.value ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300", "text-xs px-2 py-1 rounded-md transition-all duration-200 font-medium"])}">Raw</button></div></div>`);
        if (allPayments.value.length === 0) {
          _push(`<div class="text-center py-8"><div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-check-circle",
            class: "w-6 h-6 text-green-500"
          }, null, _parent));
          _push(`</div><p class="text-gray-500 dark:text-gray-400 font-medium">All settled up!</p><p class="text-sm text-gray-400 dark:text-gray-500 mt-1">No outstanding debts in ${ssrInterpolate(group.value.name)}.</p></div>`);
        } else {
          _push(`<div class="space-y-2"><!--[-->`);
          ssrRenderList(allPayments.value, (payment, index) => {
            _push(`<div class="${ssrRenderClass([{ "ring-2 ring-primary-100 dark:ring-primary-900/30": involvesMe(payment) }, "rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden transition-all duration-200"])}"><div class="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><div class="${ssrRenderClass([payment.from === myID.value ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400", "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"])}">${ssrInterpolate(payment.from === myID.value ? "U" : memberName(payment.from).charAt(0).toUpperCase())}</div><div class="flex-grow min-w-0"><p class="text-sm font-medium text-gray-800 dark:text-gray-200"><span class="${ssrRenderClass({ "font-bold": payment.from === myID.value })}">${ssrInterpolate(payment.from === myID.value ? "You" : memberName(payment.from))}</span><span class="text-gray-400 mx-1">→</span><span class="${ssrRenderClass({ "font-bold": payment.to === myID.value })}">${ssrInterpolate(payment.to === myID.value ? "you" : memberName(payment.to))}</span></p><p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">${ssrInterpolate(payment.from === myID.value ? "You owe" : memberName(payment.from) + " owes")} ${ssrInterpolate(payment.to === myID.value ? "you" : memberName(payment.to))}</p></div><div class="text-right shrink-0 flex items-center gap-2"><div><p class="${ssrRenderClass([payment.from === myID.value ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400", "text-lg font-bold tabular-nums"])}">${ssrInterpolate(currency.value)}${ssrInterpolate(payment.value)}</p></div>`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: expandedIndex.value === index ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
              class: "w-4 h-4 text-gray-400"
            }, null, _parent));
            _push(`</div></div>`);
            if (expandedIndex.value === index) {
              _push(`<div class="border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/20"><div class="px-3 py-2"><p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Why ${ssrInterpolate(memberName(payment.from))} owes ${ssrInterpolate(memberName(payment.to))}:</p>`);
              if (getDebtBreakdown(payment).length === 0) {
                _push(`<div class="text-xs text-gray-400 py-1 text-center"> From balance simplification </div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--[-->`);
              ssrRenderList(getDebtBreakdown(payment), (item, i) => {
                _push(`<div class="flex items-center justify-between py-1.5 text-sm border-b border-gray-100 dark:border-gray-700/30 last:border-0"><div class="flex items-center gap-2 min-w-0"><div class="${ssrRenderClass([item.type === "expense" ? "bg-primary-400" : "bg-amber-400", "w-1.5 h-1.5 rounded-full shrink-0"])}"></div><span class="text-gray-700 dark:text-gray-300 truncate">${ssrInterpolate(item.description)}</span></div><span class="${ssrRenderClass([item.fromPaysTo ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400", "font-medium tabular-nums shrink-0 ml-2"])}">${ssrInterpolate(item.fromPaysTo ? "+" : "–")}${ssrInterpolate(currency.value)}${ssrInterpolate(Math.abs(item.amount))}</span></div>`);
              });
              _push(`<!--]--><div class="flex items-center justify-between pt-2 text-sm font-semibold border-t border-gray-200 dark:border-gray-700/50 mt-1"><span class="text-gray-600 dark:text-gray-400">Total</span><span class="${ssrRenderClass(payment.from === myID.value ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400")}">${ssrInterpolate(currency.value)}${ssrInterpolate(payment.value)}</span></div></div><div class="px-3 pb-3 flex gap-2">`);
              _push(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => markAsPaid(payment),
                size: "sm",
                color: "emerald",
                block: "",
                variant: "soft",
                icon: "i-heroicons-check-circle"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(` Mark as Paid `);
                  } else {
                    return [
                      createTextVNode(" Mark as Paid ")
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => settle(payment),
                size: "sm",
                color: "primary",
                variant: "outline",
                icon: "i-heroicons-arrow-right-left",
                class: "shrink-0"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(` Customize `);
                  } else {
                    return [
                      createTextVNode(" Customize ")
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
        if (settlementHistory.value.length > 0) {
          _push(`<div><p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">Settlement History</p><div class="space-y-2"><!--[-->`);
          ssrRenderList(settlementHistory.value, (tx, index) => {
            _push(`<div class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700/50"><div class="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle",
              class: "w-5 h-5 text-primary-500"
            }, null, _parent));
            _push(`</div><div class="flex-grow min-w-0"><p class="text-sm text-gray-700 dark:text-gray-300"><span class="font-medium">${ssrInterpolate(memberName(Object.keys(tx.payers)[0]))}</span> paid <span class="font-medium">${ssrInterpolate(memberName(Object.keys(tx.splitters)[0]))}</span></p><p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">${ssrInterpolate(formatDate(tx.created_at))} `);
            if (tx.description) {
              _push(`<span> · ${ssrInterpolate(tx.description)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</p></div><div class="text-right shrink-0"><p class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">${ssrInterpolate(currency.value)}${ssrInterpolate(Object.values(tx.payers)[0])}</p></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_UModal, {
        ui: { transition: { enter: "transition-all duration-300", leave: "transition-all duration-200" } },
        "prevent-close": "",
        modelValue: showPaymentEditor.value,
        "onUpdate:modelValue": ($event) => showPaymentEditor.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_PaymentEditor, {
              modelValue: ugly.value,
              "onUpdate:modelValue": ($event) => ugly.value = $event,
              expenseItem: expense.value,
              onUpdate: update,
              onRecord: add,
              onClose: clearEditors
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_PaymentEditor, {
                modelValue: ugly.value,
                "onUpdate:modelValue": ($event) => ugly.value = $event,
                expenseItem: expense.value,
                onUpdate: update,
                onRecord: add,
                onClose: clearEditors
              }, null, 8, ["modelValue", "onUpdate:modelValue", "expenseItem"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/settlements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=settlements-QzAmzEH6.js.map
