import { _ as _sfc_main$1, a as _sfc_main$4 } from "./PaymentEditor-D71moaMy.js";
import { _ as __nuxt_component_0 } from "./Button-97Zr3Qqu.js";
import { _ as __nuxt_component_2 } from "./Accordion-DjD1tMCY.js";
import { _ as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$5, d as _sfc_main$6 } from "./GroupSettings-BIOBJ73E.js";
import { c as __nuxt_component_4, _ as __nuxt_component_7 } from "./Modal-JZzGCXgD.js";
import { s as storeToRefs, b as useGroups, h as useGroupID, n as navigateTo, c as __nuxt_component_8, d as __nuxt_component_9 } from "../server.mjs";
import { ref, computed, watch, unref, withCtx, createTextVNode, isRef, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import "P:/group/peersplit-main/peersplit-main/node_modules/hookable/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "P:/group/peersplit-main/peersplit-main/node_modules/defu/dist/defu.mjs";
import "./selectMenu-CAIBtITz.js";
import "./index-DMPXWIV5.js";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "P:/group/peersplit-main/peersplit-main/node_modules/perfect-debounce/dist/index.mjs";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "moment";
import "nanoid";
import "tailwind-merge";
import "./nuxt-link-By9b6QI-.js";
import "P:/group/peersplit-main/peersplit-main/node_modules/ufo/dist/index.mjs";
import "ohash/utils";
import "./hidden-CTntKjAB.js";
import "./Tabs-CH6Wi0un.js";
import "@vueuse/core";
import "csv-parse/browser/esm";
import "@tanstack/vue-virtual";
import "P:/group/peersplit-main/peersplit-main/node_modules/ofetch/dist/node.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/unctx/dist/index.mjs";
import "P:/group/peersplit-main/peersplit-main/node_modules/h3/dist/index.mjs";
import "vue-router";
import "P:/group/peersplit-main/peersplit-main/node_modules/@unhead/vue/dist/index.mjs";
import "@supabase/supabase-js";
const _sfc_main = {
  __name: "[[group_id]]",
  __ssrInlineRender: true,
  setup(__props) {
    const showExpenseEditor = ref(false), showPaymentEditor = ref(false), showGroupSettings = ref(false), showStats = ref(false), showDeleteConfirmation = ref(false), ugly = ref({ hello: "" }), expense = ref(null), deleteExpense = ref(null);
    const { getGroupByID, loading, getGroupedTransactionsByGroupID } = storeToRefs(
      useGroups()
    );
    const groupID = useGroupID();
    const group = computed(() => getGroupByID.value(groupID));
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
      const _component_SpinLoader = _sfc_main$1;
      const _component_UButton = __nuxt_component_0;
      const _component_UAlert = __nuxt_component_2;
      const _component_YourBalances = _sfc_main$2;
      const _component_ExpenseGroup = _sfc_main$3;
      const _component_UModal = __nuxt_component_4;
      const _component_PaymentEditor = _sfc_main$4;
      const _component_ExpenseEditor = _sfc_main$5;
      const _component_ClientOnly = __nuxt_component_8;
      const _component_Stats = __nuxt_component_9;
      const _component_GroupSettings = _sfc_main$6;
      const _component_UCard = __nuxt_component_7;
      _push(`<!--[-->`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_SpinLoader, { height: "h-full" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && unref(group)) {
        _push(`<div class="flex flex-col gap-2 h-full px-2"><div class="h-12 flex justify-between items-center gap-2"><span class="text-center font-medium text-lg flex-grow">${ssrInterpolate(unref(getGroupByID)(unref(groupID))?.name)}</span><div>`);
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
        _push(`</div></div><div class="py-1 overflow-y-scroll">`);
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
          block: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Add Expense`);
            } else {
              return [
                createTextVNode("Add Expense")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex-grow">`);
        _push(ssrRenderComponent(_component_UButton, {
          onClick: ($event) => showPaymentEditor.value = true,
          block: "",
          variant: "outline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Record Payment`);
            } else {
              return [
                createTextVNode("Record Payment")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="space-y-1 py-1"><!--[-->`);
        ssrRenderList(unref(getGroupedTransactionsByGroupID)(unref(groupID)), (group2) => {
          _push(ssrRenderComponent(_component_ExpenseGroup, {
            onEdit: edit,
            group: group2
          }, null, _parent));
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UModal, {
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
                    variant: "outline"
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
                        variant: "outline"
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
                  _push3(`<div class="space-y-2"${_scopeId2}>Are you sure you want to delete this expense?</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, "Are you sure you want to delete this expense?")
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
                      variant: "outline"
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
                  createVNode("div", { class: "space-y-2" }, "Are you sure you want to delete this expense?")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/groups/group/[[group_id]].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_group_id_-CoVjIeKT.js.map
