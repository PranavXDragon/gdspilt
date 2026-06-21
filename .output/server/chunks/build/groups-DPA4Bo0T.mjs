import { _ as __nuxt_component_1 } from './selectMenu-CAIBtITz.mjs';
import { _ as __nuxt_component_7, a as __nuxt_component_2, b as __nuxt_component_1$1, c as __nuxt_component_0$1, d as __nuxt_component_4 } from './Modal-JZzGCXgD.mjs';
import { _ as __nuxt_component_2$1 } from './Accordion-DjD1tMCY.mjs';
import { _ as __nuxt_component_0 } from './Button-97Zr3Qqu.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './PaymentEditor-D71moaMy.mjs';
import { _ as _sfc_main$f, a as __nuxt_component_7$1, E as EXPENSE_CATEGORIES, b as _sfc_main$c, c as _sfc_main$7, d as _sfc_main$4 } from './GroupSettings-BIOBJ73E.mjs';
import { s as storeToRefs, b as useGroups, e as useName, f as createEmptyGroup, g as updateGroup, n as navigateTo, c as __nuxt_component_8, d as __nuxt_component_9, r as round } from './server.mjs';
import { computed, ref, watch, unref, mergeProps, withCtx, isRef, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, toDisplayString, Fragment, renderList, withModifiers, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { nanoid } from 'nanoid';
import moment from 'moment';
import './index-DMPXWIV5.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'tailwind-merge';
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
import '@tanstack/vue-virtual';
import './hidden-CTntKjAB.mjs';
import '@vueuse/core';
import './nuxt-link-By9b6QI-.mjs';
import './Tabs-CH6Wi0un.mjs';
import 'csv-parse/browser/esm';
import 'vue-router';
import '@supabase/supabase-js';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$2 = {
  __name: "Settlements",
  __ssrInlineRender: true,
  props: ["groupID"],
  emits: ["close", "settle"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { getGroupByID, getPaymentsByGroupID, getBalancesByGroupID } = storeToRefs(useGroups());
    const group = computed(() => getGroupByID.value(__props.groupID));
    const myID = computed(() => {
      var _a;
      return (_a = group.value) == null ? void 0 : _a.myID;
    });
    const currency = computed(() => useGroups().getGroupCurrency(__props.groupID));
    const allPayments = computed(() => getPaymentsByGroupID.value(__props.groupID) || []);
    const paymentsInvolvingMe = computed(
      () => allPayments.value.filter(
        (p) => p.from === myID.value || p.to === myID.value
      )
    );
    const netBalance = computed(() => {
      const balances = getBalancesByGroupID.value(__props.groupID);
      return balances[myID.value] || 0;
    });
    function involvesMe(payment) {
      return payment.from === myID.value || payment.to === myID.value;
    }
    function memberName(id) {
      return useGroups().getMemberName(__props.groupID, id);
    }
    function settle(payment) {
      emit("settle", {
        from: payment.from,
        to: payment.to,
        value: payment.value
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_7;
      const _component_UButton = __nuxt_component_0;
      const _component_UIcon = __nuxt_component_1;
      _push(ssrRenderComponent(_component_UCard, mergeProps({ class: "max-h-[85vh] overflow-y-auto" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><span class="font-medium text-lg"${_scopeId}>Settlements</span>`);
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
                createVNode("span", { class: "font-medium text-lg" }, "Settlements"),
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
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            if (unref(myID)) {
              _push2(`<div class="${ssrRenderClass([
                unref(netBalance) === 0 ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/30" : unref(netBalance) > 0 ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30" : "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30",
                "p-4 rounded-xl border"
              ])}"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(netBalance) === 0 ? "You're settled up" : unref(netBalance) > 0 ? "You are owed" : "You owe")}</p><p class="${ssrRenderClass([
                unref(netBalance) === 0 ? "text-green-600 dark:text-green-400" : unref(netBalance) > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400",
                "text-2xl font-bold mt-0.5"
              ])}"${_scopeId}>${ssrInterpolate(unref(currency))}${ssrInterpolate(Math.abs(unref(netBalance)))}</p></div><div class="${ssrRenderClass([
                unref(netBalance) === 0 ? "bg-green-100 dark:bg-green-900/30" : unref(netBalance) > 0 ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-amber-100 dark:bg-amber-900/30",
                "w-12 h-12 rounded-full flex items-center justify-center"
              ])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(netBalance) === 0 ? "i-heroicons-check-circle" : unref(netBalance) > 0 ? "i-heroicons-arrow-down-circle" : "i-heroicons-arrow-up-circle",
                class: [
                  "w-7 h-7",
                  unref(netBalance) === 0 ? "text-green-500" : unref(netBalance) > 0 ? "text-emerald-500" : "text-amber-500"
                ]
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (unref(netBalance) < 0) {
                _push2(`<div class="mt-3 space-y-1.5 pt-3 border-t border-amber-200/50 dark:border-amber-800/20"${_scopeId}><!--[-->`);
                ssrRenderList(unref(paymentsInvolvingMe).filter((p) => p.from === unref(myID)), (payment) => {
                  _push2(`<p class="flex items-center justify-between text-sm"${_scopeId}><span class="text-gray-600 dark:text-gray-400"${_scopeId}> You owe <span class="font-medium text-gray-800 dark:text-gray-200"${_scopeId}>${ssrInterpolate(memberName(payment.to))}</span></span><span class="font-semibold text-amber-600 dark:text-amber-400"${_scopeId}>${ssrInterpolate(unref(currency))}${ssrInterpolate(payment.value)}</span></p>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(netBalance) > 0) {
                _push2(`<div class="mt-3 space-y-1.5 pt-3 border-t border-emerald-200/50 dark:border-emerald-800/20"${_scopeId}><!--[-->`);
                ssrRenderList(unref(paymentsInvolvingMe).filter((p) => p.to === unref(myID)), (payment) => {
                  _push2(`<p class="flex items-center justify-between text-sm"${_scopeId}><span class="text-gray-600 dark:text-gray-400"${_scopeId}><span class="font-medium text-gray-800 dark:text-gray-200"${_scopeId}>${ssrInterpolate(memberName(payment.from))}</span> owes you </span><span class="font-semibold text-emerald-600 dark:text-emerald-400"${_scopeId}>${ssrInterpolate(unref(currency))}${ssrInterpolate(payment.value)}</span></p>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3"${_scopeId}> Outstanding Debts </p>`);
            if (unref(allPayments).length === 0) {
              _push2(`<div class="text-center py-8"${_scopeId}><div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "w-6 h-6 text-green-500"
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="text-gray-500 dark:text-gray-400 font-medium"${_scopeId}>All settled up!</p><p class="text-sm text-gray-400 dark:text-gray-500 mt-1"${_scopeId}>No outstanding debts in this group.</p></div>`);
            } else {
              _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(allPayments), (payment, index) => {
                _push2(`<div class="${ssrRenderClass([{ "ring-2 ring-primary-100 dark:ring-primary-900/30": involvesMe(payment) }, "group p-3 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:border-primary-200 dark:hover:border-primary-700/50 transition-all duration-200"])}"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="${ssrRenderClass([payment.from === unref(myID) ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400", "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"])}"${_scopeId}>${ssrInterpolate(payment.from === unref(myID) ? "U" : memberName(payment.from).charAt(0).toUpperCase())}</div><div class="flex-grow min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-800 dark:text-gray-200"${_scopeId}><span class="${ssrRenderClass({ "font-bold": payment.from === unref(myID) })}"${_scopeId}>${ssrInterpolate(payment.from === unref(myID) ? "You" : memberName(payment.from))}</span><span class="text-gray-400 mx-1"${_scopeId}>\u2192</span><span class="${ssrRenderClass({ "font-bold": payment.to === unref(myID) })}"${_scopeId}>${ssrInterpolate(payment.to === unref(myID) ? "you" : memberName(payment.to))}</span></p><p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5"${_scopeId}>${ssrInterpolate(payment.from === unref(myID) ? "Owes" : memberName(payment.from) + " owes")} ${ssrInterpolate(payment.to === unref(myID) ? "you" : memberName(payment.to))}</p></div><div class="text-right shrink-0"${_scopeId}><p class="${ssrRenderClass([payment.from === unref(myID) ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400", "text-lg font-bold tabular-nums"])}"${_scopeId}>${ssrInterpolate(unref(currency))}${ssrInterpolate(payment.value)}</p>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => settle(payment),
                  size: "2xs",
                  color: "primary",
                  variant: "soft",
                  class: "mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Settle Up `);
                    } else {
                      return [
                        createTextVNode(" Settle Up ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                unref(myID) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: [
                    "p-4 rounded-xl border",
                    unref(netBalance) === 0 ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/30" : unref(netBalance) > 0 ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30" : "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30"
                  ]
                }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, toDisplayString(unref(netBalance) === 0 ? "You're settled up" : unref(netBalance) > 0 ? "You are owed" : "You owe"), 1),
                      createVNode("p", {
                        class: [
                          "text-2xl font-bold mt-0.5",
                          unref(netBalance) === 0 ? "text-green-600 dark:text-green-400" : unref(netBalance) > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                        ]
                      }, toDisplayString(unref(currency)) + toDisplayString(Math.abs(unref(netBalance))), 3)
                    ]),
                    createVNode("div", {
                      class: [
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        unref(netBalance) === 0 ? "bg-green-100 dark:bg-green-900/30" : unref(netBalance) > 0 ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-amber-100 dark:bg-amber-900/30"
                      ]
                    }, [
                      createVNode(_component_UIcon, {
                        name: unref(netBalance) === 0 ? "i-heroicons-check-circle" : unref(netBalance) > 0 ? "i-heroicons-arrow-down-circle" : "i-heroicons-arrow-up-circle",
                        class: [
                          "w-7 h-7",
                          unref(netBalance) === 0 ? "text-green-500" : unref(netBalance) > 0 ? "text-emerald-500" : "text-amber-500"
                        ]
                      }, null, 8, ["name", "class"])
                    ], 2)
                  ]),
                  unref(netBalance) < 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-3 space-y-1.5 pt-3 border-t border-amber-200/50 dark:border-amber-800/20"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(paymentsInvolvingMe).filter((p) => p.from === unref(myID)), (payment) => {
                      return openBlock(), createBlock("p", { class: "flex items-center justify-between text-sm" }, [
                        createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, [
                          createTextVNode(" You owe "),
                          createVNode("span", { class: "font-medium text-gray-800 dark:text-gray-200" }, toDisplayString(memberName(payment.to)), 1)
                        ]),
                        createVNode("span", { class: "font-semibold text-amber-600 dark:text-amber-400" }, toDisplayString(unref(currency)) + toDisplayString(payment.value), 1)
                      ]);
                    }), 256))
                  ])) : createCommentVNode("", true),
                  unref(netBalance) > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-3 space-y-1.5 pt-3 border-t border-emerald-200/50 dark:border-emerald-800/20"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(paymentsInvolvingMe).filter((p) => p.to === unref(myID)), (payment) => {
                      return openBlock(), createBlock("p", { class: "flex items-center justify-between text-sm" }, [
                        createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, [
                          createVNode("span", { class: "font-medium text-gray-800 dark:text-gray-200" }, toDisplayString(memberName(payment.from)), 1),
                          createTextVNode(" owes you ")
                        ]),
                        createVNode("span", { class: "font-semibold text-emerald-600 dark:text-emerald-400" }, toDisplayString(unref(currency)) + toDisplayString(payment.value), 1)
                      ]);
                    }), 256))
                  ])) : createCommentVNode("", true)
                ], 2)) : createCommentVNode("", true),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3" }, " Outstanding Debts "),
                  unref(allPayments).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-8"
                  }, [
                    createVNode("div", { class: "w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-check-circle",
                        class: "w-6 h-6 text-green-500"
                      })
                    ]),
                    createVNode("p", { class: "text-gray-500 dark:text-gray-400 font-medium" }, "All settled up!"),
                    createVNode("p", { class: "text-sm text-gray-400 dark:text-gray-500 mt-1" }, "No outstanding debts in this group.")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(allPayments), (payment, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: ["group p-3 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:border-primary-200 dark:hover:border-primary-700/50 transition-all duration-200", { "ring-2 ring-primary-100 dark:ring-primary-900/30": involvesMe(payment) }]
                      }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", {
                            class: ["w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0", payment.from === unref(myID) ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"]
                          }, toDisplayString(payment.from === unref(myID) ? "U" : memberName(payment.from).charAt(0).toUpperCase()), 3),
                          createVNode("div", { class: "flex-grow min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-800 dark:text-gray-200" }, [
                              createVNode("span", {
                                class: { "font-bold": payment.from === unref(myID) }
                              }, toDisplayString(payment.from === unref(myID) ? "You" : memberName(payment.from)), 3),
                              createVNode("span", { class: "text-gray-400 mx-1" }, "\u2192"),
                              createVNode("span", {
                                class: { "font-bold": payment.to === unref(myID) }
                              }, toDisplayString(payment.to === unref(myID) ? "you" : memberName(payment.to)), 3)
                            ]),
                            createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mt-0.5" }, toDisplayString(payment.from === unref(myID) ? "Owes" : memberName(payment.from) + " owes") + " " + toDisplayString(payment.to === unref(myID) ? "you" : memberName(payment.to)), 1)
                          ]),
                          createVNode("div", { class: "text-right shrink-0" }, [
                            createVNode("p", {
                              class: ["text-lg font-bold tabular-nums", payment.from === unref(myID) ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"]
                            }, toDisplayString(unref(currency)) + toDisplayString(payment.value), 3),
                            createVNode(_component_UButton, {
                              onClick: withModifiers(($event) => settle(payment), ["stop"]),
                              size: "2xs",
                              color: "primary",
                              variant: "soft",
                              class: "mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Settle Up ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ])
                      ], 2);
                    }), 128))
                  ]))
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Settlements.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Group",
  __ssrInlineRender: true,
  setup(__props) {
    const CATEGORY_DOT_HEX = {
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
    const showExpenseEditor = ref(false), showPaymentEditor = ref(false), showGroupSettings = ref(false), showStats = ref(false), showSettlements = ref(false), showDeleteConfirmation = ref(false), ugly = ref({ hello: "" }), expense = ref(null), deleteExpense = ref(null), activeCategory = ref(null), searchQuery = ref(""), sortBy = ref("newest"), startDate = ref(""), endDate = ref("");
    const sortOptions = [
      { id: "newest", label: "Newest First" },
      { id: "oldest", label: "Oldest First" },
      { id: "highest", label: "Highest Amount" },
      { id: "lowest", label: "Lowest Amount" }
    ];
    const { getGroupByID, loading } = storeToRefs(useGroups());
    const groupID = useGroups().currentGroup;
    const group = computed(() => getGroupByID.value(groupID));
    const hasTransactions = computed(() => {
      const g = getGroupByID.value(groupID);
      return g && Object.keys(g.transactions || {}).length > 0;
    });
    const computeTotalCost = (tx) => Object.values(tx.payers || {}).reduce(
      (a, b) => round(Number(a) + Number(b)),
      0
    );
    const sortedFilteredTransactions = computed(() => {
      const group2 = getGroupByID.value(groupID);
      if (!group2) return [];
      let transactions = Object.values(group2.transactions || {});
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        transactions = transactions.filter(
          (tx) => {
            var _a;
            return (_a = tx.description) == null ? void 0 : _a.toLowerCase().includes(q);
          }
        );
      }
      if (activeCategory.value) {
        transactions = transactions.filter(
          (tx) => tx.category === activeCategory.value
        );
      }
      if (startDate.value) {
        transactions = transactions.filter(
          (tx) => tx.created_at && tx.created_at.slice(0, 10) >= startDate.value
        );
      }
      if (endDate.value) {
        transactions = transactions.filter(
          (tx) => tx.created_at && tx.created_at.slice(0, 10) <= endDate.value
        );
      }
      const sorted = [...transactions].sort((a, b) => {
        switch (sortBy.value) {
          case "oldest":
            return a.created_at.localeCompare(b.created_at);
          case "highest": {
            const aCost = computeTotalCost(a);
            const bCost = computeTotalCost(b);
            return bCost - aCost;
          }
          case "lowest": {
            const aCost = computeTotalCost(a);
            const bCost = computeTotalCost(b);
            return aCost - bCost;
          }
          case "newest":
          default:
            return b.created_at.localeCompare(a.created_at);
        }
      });
      const groups = [];
      const monthMap = {};
      for (const tx of sorted) {
        const month = moment.utc(tx.created_at).format("MMMM YYYY");
        if (!monthMap[month]) {
          monthMap[month] = { month, expenses: [], payments: [] };
          groups.push(monthMap[month]);
        }
        if (tx.type === "payment") {
          monthMap[month].payments.push(tx);
        } else {
          monthMap[month].expenses.push(tx);
        }
      }
      return groups;
    });
    const hasActiveFilters = computed(
      () => !!searchQuery.value || !!activeCategory.value || !!startDate.value || !!endDate.value
    );
    const emptyStateTitle = computed(() => {
      if (searchQuery.value) return "No matching expenses";
      if (activeCategory.value) return "No expenses in this category yet";
      if (startDate.value || endDate.value) return "No expenses in this date range";
      return "No expenses yet";
    });
    const emptyStateDescription = computed(() => {
      if (searchQuery.value) return "Try a different search term";
      if (activeCategory.value) return "Try a different category or add a new expense";
      if (startDate.value || endDate.value) return "Try a wider date range";
      return 'Tap "Add Expense" to get started';
    });
    watch(loading, () => {
      checkGroup();
    });
    function checkGroup() {
      if (!loading.value && !group.value) {
        navigateTo("/app");
      }
    }
    function add(expense2) {
      useGroups().addTransaction(groupID, expense2);
      clearEditors();
    }
    function update(expense2) {
      useGroups().updateTransaction(groupID, expense2);
      clearEditors();
    }
    function edit(exp) {
      expense.value = exp;
      if (exp.type === "expense") {
        showExpenseEditor.value = true;
      } else {
        showPaymentEditor.value = true;
      }
    }
    function handleSettle(payment) {
      showSettlements.value = false;
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
    function clearEditors() {
      showExpenseEditor.value = false;
      showPaymentEditor.value = false;
      expense.value = null;
      ugly.value = { hello: "" };
    }
    function requestDel(expense2) {
      deleteExpense.value = expense2;
      showDeleteConfirmation.value = true;
    }
    function del() {
      useGroups().deleteTransaction(groupID, deleteExpense.value.id);
      showDeleteConfirmation.value = false;
      clearEditors();
    }
    function cancelDel() {
      showDeleteConfirmation.value = false;
      deleteExpense.value = null;
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_SpinLoader = _sfc_main$1$1;
      const _component_UButton = __nuxt_component_0;
      const _component_UAlert = __nuxt_component_2$1;
      const _component_YourBalances = _sfc_main$f;
      const _component_UInput = __nuxt_component_1$1;
      const _component_UIcon = __nuxt_component_1;
      const _component_USelectMenu = __nuxt_component_0$1;
      const _component_UBadge = __nuxt_component_7$1;
      const _component_ExpenseGroup = _sfc_main$c;
      const _component_UModal = __nuxt_component_4;
      const _component_PaymentEditor = _sfc_main$3;
      const _component_ExpenseEditor = _sfc_main$7;
      const _component_ClientOnly = __nuxt_component_8;
      const _component_Stats = __nuxt_component_9;
      const _component_Settlements = _sfc_main$2;
      const _component_GroupSettings = _sfc_main$4;
      const _component_UCard = __nuxt_component_7;
      _push(`<!--[-->`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_SpinLoader, { height: "h-full" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && unref(group)) {
        _push(`<div class="flex flex-col gap-3 h-full px-3"><div class="h-14 flex items-center gap-1"><span class="font-semibold text-lg truncate">${ssrInterpolate((_a = unref(getGroupByID)(unref(groupID))) == null ? void 0 : _a.name)}</span><div class="flex gap-0.5 ml-auto">`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-banknotes",
          variant: "ghost",
          color: "gray",
          onClick: ($event) => showSettlements.value = true
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-chart-bar",
          variant: "ghost",
          color: "gray",
          onClick: ($event) => showStats.value = true
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          onClick: ($event) => showGroupSettings.value = true,
          icon: "i-heroicons-cog-6-tooth",
          variant: "ghost",
          color: "gray"
        }, null, _parent));
        _push(`</div></div><div class="space-y-3 overflow-y-scroll pb-2 scroll-smooth">`);
        if (unref(group) && !unref(group).myID) {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_UAlert, {
            variant: "soft",
            color: "primary",
            description: "You don't have a member assigned in this group.",
            actions: [
              {
                click() {
                  showGroupSettings.value = true;
                },
                variant: "solid",
                label: "Assign Member"
              }
            ]
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_YourBalances, { groupID: unref(groupID) }, null, _parent));
        _push(`<div class="w-full flex text-center gap-2"><div class="flex-grow">`);
        _push(ssrRenderComponent(_component_UButton, {
          onClick: ($event) => showExpenseEditor.value = true,
          block: "",
          icon: "i-heroicons-plus",
          class: "shadow-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Add Expense `);
            } else {
              return [
                createTextVNode(" Add Expense ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex-grow">`);
        _push(ssrRenderComponent(_component_UButton, {
          onClick: ($event) => showPaymentEditor.value = true,
          block: "",
          variant: "outline",
          icon: "i-heroicons-arrow-right-left"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Payment `);
            } else {
              return [
                createTextVNode(" Payment ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="flex gap-2 items-center"><div class="flex-grow relative">`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: unref(searchQuery),
          "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
          placeholder: "Search expenses...",
          size: "sm",
          class: "w-full",
          ui: { icon: { trailing: { pointer: "" } } }
        }, {
          trailing: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center"${_scopeId}>`);
              if (!unref(searchQuery)) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-magnifying-glass-20-solid",
                  class: "w-4 h-4 text-gray-400"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => searchQuery.value = "",
                  variant: "ghost",
                  color: "gray",
                  size: "2xs",
                  icon: "i-heroicons-x-mark-20-solid",
                  class: "-mr-1"
                }, null, _parent2, _scopeId));
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center" }, [
                  !unref(searchQuery) ? (openBlock(), createBlock(_component_UIcon, {
                    key: 0,
                    name: "i-heroicons-magnifying-glass-20-solid",
                    class: "w-4 h-4 text-gray-400"
                  })) : (openBlock(), createBlock(_component_UButton, {
                    key: 1,
                    onClick: ($event) => searchQuery.value = "",
                    variant: "ghost",
                    color: "gray",
                    size: "2xs",
                    icon: "i-heroicons-x-mark-20-solid",
                    class: "-mr-1"
                  }, null, 8, ["onClick"]))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_USelectMenu, {
          modelValue: unref(sortBy),
          "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
          options: sortOptions,
          "value-attribute": "id",
          "option-attribute": "label",
          size: "sm",
          class: "w-40 shrink-0"
        }, {
          label: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b;
            if (_push2) {
              _push2(`<div class="flex items-center gap-1.5 text-xs"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrows-up-down",
                class: "w-3.5 h-3.5 text-gray-400"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(((_a2 = sortOptions.find((o) => o.id === unref(sortBy))) == null ? void 0 : _a2.label) || "Sort")}</span></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-1.5 text-xs" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-arrows-up-down",
                    class: "w-3.5 h-3.5 text-gray-400"
                  }),
                  createVNode("span", null, toDisplayString(((_b = sortOptions.find((o) => o.id === unref(sortBy))) == null ? void 0 : _b.label) || "Sort"), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(hasTransactions)) {
          _push(`<div class="flex gap-2 items-center"><div class="flex items-center gap-1.5 flex-grow">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-calendar-days",
            class: "w-4 h-4 text-gray-400 shrink-0"
          }, null, _parent));
          _push(ssrRenderComponent(_component_UInput, {
            modelValue: unref(startDate),
            "onUpdate:modelValue": ($event) => isRef(startDate) ? startDate.value = $event : null,
            type: "date",
            size: "sm",
            class: "flex-grow min-w-0",
            placeholder: "From",
            ui: { base: "block w-full" }
          }, null, _parent));
          _push(`<span class="text-xs text-gray-400 shrink-0">\u2014</span>`);
          _push(ssrRenderComponent(_component_UInput, {
            modelValue: unref(endDate),
            "onUpdate:modelValue": ($event) => isRef(endDate) ? endDate.value = $event : null,
            type: "date",
            size: "sm",
            class: "flex-grow min-w-0",
            placeholder: "To",
            ui: { base: "block w-full" }
          }, null, _parent));
          _push(`</div>`);
          if (unref(startDate) || unref(endDate)) {
            _push(ssrRenderComponent(_component_UButton, {
              onClick: ($event) => {
                startDate.value = "";
                endDate.value = "";
              },
              variant: "ghost",
              color: "gray",
              size: "xs",
              icon: "i-heroicons-x-mark",
              class: "shrink-0"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(hasTransactions)) {
          _push(`<div class="flex gap-1.5 overflow-x-auto pb-1" style="${ssrRenderStyle({ "-ms-overflow-style": "none", "scrollbar-width": "none" })}">`);
          _push(ssrRenderComponent(_component_UBadge, {
            onClick: ($event) => activeCategory.value = null,
            variant: unref(activeCategory) === null ? "solid" : "soft",
            color: unref(activeCategory) === null ? "primary" : "gray",
            size: "sm",
            class: "cursor-pointer shrink-0 transition-all duration-200"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` All `);
              } else {
                return [
                  createTextVNode(" All ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<!--[-->`);
          ssrRenderList(unref(EXPENSE_CATEGORIES), (cat) => {
            _push(ssrRenderComponent(_component_UBadge, {
              key: cat.id,
              onClick: ($event) => activeCategory.value = unref(activeCategory) === cat.id ? null : cat.id,
              color: unref(activeCategory) === cat.id ? cat.color : "gray",
              variant: unref(activeCategory) === cat.id ? "solid" : "soft",
              size: "sm",
              class: "cursor-pointer shrink-0 transition-all duration-200 flex items-center gap-1"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="w-1.5 h-1.5 rounded-full" style="${ssrRenderStyle({ backgroundColor: CATEGORY_DOT_HEX[cat.color] || "#6b7280" })}"${_scopeId}></span> ${ssrInterpolate(cat.label)}`);
                } else {
                  return [
                    createVNode("span", {
                      class: "w-1.5 h-1.5 rounded-full",
                      style: { backgroundColor: CATEGORY_DOT_HEX[cat.color] || "#6b7280" }
                    }, null, 4),
                    createTextVNode(" " + toDisplayString(cat.label), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(sortedFilteredTransactions).length > 0) {
          _push(`<div class="space-y-3"><!--[-->`);
          ssrRenderList(unref(sortedFilteredTransactions), (txGroup) => {
            _push(ssrRenderComponent(_component_ExpenseGroup, {
              onEdit: edit,
              group: txGroup
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else if (!unref(loading)) {
          _push(`<div class="flex flex-col items-center justify-center py-16 text-center"><div class="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-receipt-percent",
            class: "w-8 h-8 text-primary-400 dark:text-primary-500"
          }, null, _parent));
          _push(`</div><p class="text-gray-500 dark:text-gray-400 font-medium">${ssrInterpolate(unref(emptyStateTitle))}</p><p class="text-sm text-gray-400 dark:text-gray-500 mt-1">${ssrInterpolate(unref(emptyStateDescription))}</p>`);
          if (!unref(hasActiveFilters)) {
            _push(ssrRenderComponent(_component_UButton, {
              onClick: ($event) => showExpenseEditor.value = true,
              variant: "soft",
              color: "primary",
              class: "mt-4",
              icon: "i-heroicons-plus"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Add First Expense `);
                } else {
                  return [
                    createTextVNode(" Add First Expense ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UModal, {
        ui: {
          transition: { enter: "transition-all duration-300", leave: "transition-all duration-200" }
        },
        "prevent-close": "",
        modelValue: unref(showPaymentEditor),
        "onUpdate:modelValue": ($event) => isRef(showPaymentEditor) ? showPaymentEditor.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_PaymentEditor, {
              modelValue: unref(ugly),
              "onUpdate:modelValue": ($event) => isRef(ugly) ? ugly.value = $event : null,
              expenseItem: unref(expense),
              onUpdate: update,
              onRecord: add,
              onClose: clearEditors,
              onDelete: requestDel
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_PaymentEditor, {
                modelValue: unref(ugly),
                "onUpdate:modelValue": ($event) => isRef(ugly) ? ugly.value = $event : null,
                expenseItem: unref(expense),
                onUpdate: update,
                onRecord: add,
                onClose: clearEditors,
                onDelete: requestDel
              }, null, 8, ["modelValue", "onUpdate:modelValue", "expenseItem"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        ui: { transition: { enter: "transition-all duration-300", leave: "transition-all duration-200" } },
        "prevent-close": "",
        modelValue: unref(showExpenseEditor),
        "onUpdate:modelValue": ($event) => isRef(showExpenseEditor) ? showExpenseEditor.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ExpenseEditor, {
              expenseItem: unref(expense),
              onUpdate: update,
              onAdd: add,
              onClose: clearEditors,
              onDelete: requestDel
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ExpenseEditor, {
                expenseItem: unref(expense),
                onUpdate: update,
                onAdd: add,
                onClose: clearEditors,
                onDelete: requestDel
              }, null, 8, ["expenseItem"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        ui: { transition: { enter: "transition-all duration-300", leave: "transition-all duration-200" } },
        modelValue: unref(showStats),
        "onUpdate:modelValue": ($event) => isRef(showStats) ? showStats.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Stats, {
                    onClose: ($event) => showStats.value = false
                  }, null, 8, ["onClose"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        ui: { transition: { enter: "transition-all duration-300", leave: "transition-all duration-200" } },
        modelValue: unref(showSettlements),
        "onUpdate:modelValue": ($event) => isRef(showSettlements) ? showSettlements.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Settlements, {
              groupID: unref(groupID),
              onClose: ($event) => showSettlements.value = false,
              onSettle: handleSettle
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Settlements, {
                groupID: unref(groupID),
                onClose: ($event) => showSettlements.value = false,
                onSettle: handleSettle
              }, null, 8, ["groupID", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        ui: { transition: { enter: "transition-all duration-300", leave: "transition-all duration-200" } },
        modelValue: unref(showGroupSettings),
        "onUpdate:modelValue": ($event) => isRef(showGroupSettings) ? showGroupSettings.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_GroupSettings, {
              onClose: ($event) => showGroupSettings.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_GroupSettings, {
                onClose: ($event) => showGroupSettings.value = false
              }, null, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        ui: { transition: { enter: "transition-all duration-300", leave: "transition-all duration-200" } },
        modelValue: unref(showDeleteConfirmation),
        "onUpdate:modelValue": ($event) => isRef(showDeleteConfirmation) ? showDeleteConfirmation.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-between items-center"${_scopeId2}><span class="font-medium"${_scopeId2}>Delete Expense</span>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    onClick: ($event) => showDeleteConfirmation.value = false,
                    variant: "ghost",
                    color: "gray",
                    icon: "i-heroicons-x-mark"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-between items-center" }, [
                      createVNode("span", { class: "font-medium" }, "Delete Expense"),
                      createVNode(_component_UButton, {
                        onClick: ($event) => showDeleteConfirmation.value = false,
                        variant: "ghost",
                        color: "gray",
                        icon: "i-heroicons-x-mark"
                      }, null, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    onClick: del,
                    color: "rose",
                    variant: "solid"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Yes, delete`);
                      } else {
                        return [
                          createTextVNode("Yes, delete")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    onClick: cancelDel,
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
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(_component_UButton, {
                        onClick: del,
                        color: "rose",
                        variant: "solid"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Yes, delete")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UButton, {
                        onClick: cancelDel,
                        variant: "ghost"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UAlert, {
                    color: "rose",
                    variant: "soft",
                    icon: "i-heroicons-exclamation-triangle",
                    description: "Are you sure you want to delete this expense? This action cannot be undone."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UAlert, {
                        color: "rose",
                        variant: "soft",
                        icon: "i-heroicons-exclamation-triangle",
                        description: "Are you sure you want to delete this expense? This action cannot be undone."
                      })
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
                    createVNode("span", { class: "font-medium" }, "Delete Expense"),
                    createVNode(_component_UButton, {
                      onClick: ($event) => showDeleteConfirmation.value = false,
                      variant: "ghost",
                      color: "gray",
                      icon: "i-heroicons-x-mark"
                    }, null, 8, ["onClick"])
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(_component_UButton, {
                      onClick: del,
                      color: "rose",
                      variant: "solid"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Yes, delete")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UButton, {
                      onClick: cancelDel,
                      variant: "ghost"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Cancel")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(_component_UAlert, {
                      color: "rose",
                      variant: "soft",
                      icon: "i-heroicons-exclamation-triangle",
                      description: "Are you sure you want to delete this expense? This action cannot be undone."
                    })
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Group.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "groups",
  __ssrInlineRender: true,
  setup(__props) {
    const { groupsList, loading } = storeToRefs(useGroups());
    const userName = computed(() => useName().value || "");
    const newGroupName = ref("");
    const newGroupCurrency = ref("\u20B9");
    const creating = ref(false);
    watch(groupsList, () => {
      autoSelectGroup();
    });
    function autoSelectGroup() {
      if (groupsList.value.length > 0) {
        useGroups().setCurrentGroup(groupsList.value[0].id);
      }
    }
    const selectedGroup = computed(() => {
      if (groupsList.value.length > 0) {
        return groupsList.value[0];
      }
      return null;
    });
    async function createFirstGroup() {
      if (!newGroupName.value.trim()) return;
      creating.value = true;
      try {
        const id = nanoid();
        await createEmptyGroup(id);
        await updateGroup(id);
        await useGroups().setGroupName(id, newGroupName.value.trim());
        if (newGroupCurrency.value && newGroupCurrency.value !== "\u20B9") {
          await useGroups().setGroupCurrency(id, newGroupCurrency.value);
        }
        const memberID = nanoid();
        await useGroups().addMember(id, { id: memberID, name: userName.value || "Me", siteID: null });
        await useGroups().assignMember(id, memberID);
      } catch (e) {
        console.error("Failed to create group:", e);
      } finally {
        creating.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_1;
      const _component_UCard = __nuxt_component_7;
      const _component_UFormGroup = __nuxt_component_2;
      const _component_UInput = __nuxt_component_1$1;
      const _component_UAlert = __nuxt_component_2$1;
      const _component_UButton = __nuxt_component_0;
      const _component_Group = _sfc_main$1;
      const _component_SpinLoader = _sfc_main$1$1;
      if (!unref(loading) && unref(groupsList).length === 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center h-full px-6 text-center" }, _attrs))}><div class="w-20 h-20 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-6">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-users",
          class: "w-10 h-10 text-primary-400 dark:text-primary-500"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create Your Group</h2><p class="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm"> Set up your group to start tracking and splitting expenses. </p>`);
        _push(ssrRenderComponent(_component_UCard, { class: "w-full max-w-sm" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UFormGroup, { label: "Group Name" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(newGroupName),
                      "onUpdate:modelValue": ($event) => isRef(newGroupName) ? newGroupName.value = $event : null,
                      placeholder: "e.g., Roommates, Trip to Paris"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(newGroupName),
                        "onUpdate:modelValue": ($event) => isRef(newGroupName) ? newGroupName.value = $event : null,
                        placeholder: "e.g., Roommates, Trip to Paris"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, { label: "Currency Symbol" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(newGroupCurrency),
                      "onUpdate:modelValue": ($event) => isRef(newGroupCurrency) ? newGroupCurrency.value = $event : null,
                      placeholder: "\u20B9",
                      maxlength: "3",
                      class: "w-20"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(newGroupCurrency),
                        "onUpdate:modelValue": ($event) => isRef(newGroupCurrency) ? newGroupCurrency.value = $event : null,
                        placeholder: "\u20B9",
                        maxlength: "3",
                        class: "w-20"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (!unref(userName)) {
                _push2(ssrRenderComponent(_component_UAlert, {
                  variant: "soft",
                  color: "primary",
                  icon: "i-heroicons-information-circle",
                  description: "You can set your name in Settings so group members can identify you."
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: createFirstGroup,
                disabled: !unref(newGroupName).trim(),
                loading: unref(creating),
                color: "primary",
                block: "",
                size: "lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Create Group `);
                  } else {
                    return [
                      createTextVNode(" Create Group ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-4" }, [
                  createVNode(_component_UFormGroup, { label: "Group Name" }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(newGroupName),
                        "onUpdate:modelValue": ($event) => isRef(newGroupName) ? newGroupName.value = $event : null,
                        placeholder: "e.g., Roommates, Trip to Paris"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, { label: "Currency Symbol" }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(newGroupCurrency),
                        "onUpdate:modelValue": ($event) => isRef(newGroupCurrency) ? newGroupCurrency.value = $event : null,
                        placeholder: "\u20B9",
                        maxlength: "3",
                        class: "w-20"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  !unref(userName) ? (openBlock(), createBlock(_component_UAlert, {
                    key: 0,
                    variant: "soft",
                    color: "primary",
                    icon: "i-heroicons-information-circle",
                    description: "You can set your name in Settings so group members can identify you."
                  })) : createCommentVNode("", true),
                  createVNode(_component_UButton, {
                    onClick: createFirstGroup,
                    disabled: !unref(newGroupName).trim(),
                    loading: unref(creating),
                    color: "primary",
                    block: "",
                    size: "lg"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Create Group ")
                    ]),
                    _: 1
                  }, 8, ["disabled", "loading"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (!unref(loading) && unref(selectedGroup)) {
        _push(ssrRenderComponent(_component_Group, _attrs, null, _parent));
      } else if (unref(loading)) {
        _push(ssrRenderComponent(_component_SpinLoader, mergeProps({ height: "h-full" }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/groups.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=groups-DPA4Bo0T.mjs.map
