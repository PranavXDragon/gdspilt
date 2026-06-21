import { _ as __nuxt_component_1 } from "./selectMenu-DqLlXyUS.js";
import { mergeProps, unref, useSSRContext, ref, useModel, computed, withCtx, isRef, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, createCommentVNode, mergeModels, nextTick } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as __nuxt_component_7, d as __nuxt_component_2, a as __nuxt_component_1$1, b as __nuxt_component_0 } from "./Modal-CpCVwxs4.js";
import { _ as __nuxt_component_0$1 } from "./Button-CIOzeTUV.js";
import moment from "moment";
import { nanoid } from "nanoid";
import { h as useGroupID, b as useGroups } from "../server.mjs";
const _sfc_main$1 = {
  __name: "SpinLoader",
  __ssrInlineRender: true,
  props: ["height", "text"],
  setup(__props) {
    const props = __props;
    const height = props.height === void 0 ? "h-32" : props.height;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [unref(height), "flex flex-col gap-2 items-center justify-center"]
      }, _attrs))}>`);
      if (props.text) {
        _push(`<span class="text-primary text-sm text-center max-w-[60%]">${ssrInterpolate(props.text)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UIcon, {
        class: "text-primary w-6 h-6 animate-spin",
        name: "i-heroicons-arrow-path-20-solid"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SpinLoader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "PaymentEditor",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels(["expenseItem"], {
    "modelValue": { default: { hello: "" } },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const adding = ref(false), paidBy = ref(Object.keys(__props.expenseItem?.payers || {})?.[0] || null), paidTo = ref(Object.keys(__props.expenseItem?.splitters || {})?.[0] || null);
    const paymentDate = ref(
      (__props.expenseItem?.created_at ? moment.utc(__props.expenseItem.created_at) : moment.utc()).format("YYYY-MM-DD")
    );
    const model = useModel(__props, "modelValue");
    model.value.hello = Object.values(__props.expenseItem?.payers || {})?.[0] || "";
    const groupID = useGroupID();
    const members = computed(() => useGroups().getMembersList(groupID));
    function fixValue(member) {
      nextTick(() => {
        const fixed = model.value[member].match(/\d+(\.\d?\d?)?/)?.[0] || "";
        if (model.value[member] !== fixed) model.value[member] = fixed;
      });
    }
    function getPaymentTransaction() {
      return {
        id: __props.expenseItem?.id || nanoid(),
        type: "payment",
        created_at: moment.utc(paymentDate.value).startOf("day").toISOString(),
        splitType: 1,
        // doesn't matter
        payers: { [paidBy.value]: model.value.hello },
        splitters: { [paidTo.value]: model.value.hello }
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_7;
      const _component_UButton = __nuxt_component_0$1;
      const _component_UFormGroup = __nuxt_component_2;
      const _component_UInput = __nuxt_component_1$1;
      const _component_USelectMenu = __nuxt_component_0;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><span class="font-medium"${_scopeId}>${ssrInterpolate(__props.expenseItem ? "Update" : "Record")} Payment</span>`);
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
                createVNode("span", { class: "font-medium" }, toDisplayString(__props.expenseItem ? "Update" : "Record") + " Payment", 1),
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
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: ($event) => _ctx.$emit(__props.expenseItem ? "update" : "record", getPaymentTransaction()),
              loading: unref(adding),
              variant: "outline",
              disabled: !unref(paidBy) || !unref(paidTo) || !model.value.hello || unref(paidBy) === unref(paidTo)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.expenseItem ? "Update" : "Record")} Payment`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.expenseItem ? "Update" : "Record") + " Payment", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.expenseItem) {
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => _ctx.$emit("delete", __props.expenseItem),
                variant: "ghost",
                color: "rose"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Delete`);
                  } else {
                    return [
                      createTextVNode("Delete")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-2" }, [
                createVNode(_component_UButton, {
                  onClick: ($event) => _ctx.$emit(__props.expenseItem ? "update" : "record", getPaymentTransaction()),
                  loading: unref(adding),
                  variant: "outline",
                  disabled: !unref(paidBy) || !unref(paidTo) || !model.value.hello || unref(paidBy) === unref(paidTo)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(__props.expenseItem ? "Update" : "Record") + " Payment", 1)
                  ]),
                  _: 1
                }, 8, ["onClick", "loading", "disabled"]),
                __props.expenseItem ? (openBlock(), createBlock(_component_UButton, {
                  key: 0,
                  onClick: ($event) => _ctx.$emit("delete", __props.expenseItem),
                  variant: "ghost",
                  color: "rose"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Delete")
                  ]),
                  _: 1
                }, 8, ["onClick"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Date" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(paymentDate),
                    "onUpdate:modelValue": ($event) => isRef(paymentDate) ? paymentDate.value = $event : null,
                    type: "date"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(paymentDate),
                      "onUpdate:modelValue": ($event) => isRef(paymentDate) ? paymentDate.value = $event : null,
                      type: "date"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Paid By" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelectMenu, {
                    modelValue: unref(paidBy),
                    "onUpdate:modelValue": ($event) => isRef(paidBy) ? paidBy.value = $event : null,
                    "value-attribute": "id",
                    "option-attribute": "name",
                    placeholder: "Select member",
                    options: unref(members)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelectMenu, {
                      modelValue: unref(paidBy),
                      "onUpdate:modelValue": ($event) => isRef(paidBy) ? paidBy.value = $event : null,
                      "value-attribute": "id",
                      "option-attribute": "name",
                      placeholder: "Select member",
                      options: unref(members)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Paid To" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelectMenu, {
                    modelValue: unref(paidTo),
                    "onUpdate:modelValue": ($event) => isRef(paidTo) ? paidTo.value = $event : null,
                    "value-attribute": "id",
                    "option-attribute": "name",
                    placeholder: "Select member",
                    options: unref(members)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelectMenu, {
                      modelValue: unref(paidTo),
                      "onUpdate:modelValue": ($event) => isRef(paidTo) ? paidTo.value = $event : null,
                      "value-attribute": "id",
                      "option-attribute": "name",
                      placeholder: "Select member",
                      options: unref(members)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(Object.keys(model.value || {}), (member) => {
              _push2(ssrRenderComponent(_component_UFormGroup, { label: "Amount" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      onInput: ($event) => fixValue(member),
                      modelValue: model.value[member],
                      "onUpdate:modelValue": ($event) => model.value[member] = $event,
                      placeholder: "ex: 340.5"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        onInput: ($event) => fixValue(member),
                        modelValue: model.value[member],
                        "onUpdate:modelValue": ($event) => model.value[member] = $event,
                        placeholder: "ex: 340.5"
                      }, null, 8, ["onInput", "modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-2" }, [
                createVNode(_component_UFormGroup, { label: "Date" }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(paymentDate),
                      "onUpdate:modelValue": ($event) => isRef(paymentDate) ? paymentDate.value = $event : null,
                      type: "date"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, { label: "Paid By" }, {
                  default: withCtx(() => [
                    createVNode(_component_USelectMenu, {
                      modelValue: unref(paidBy),
                      "onUpdate:modelValue": ($event) => isRef(paidBy) ? paidBy.value = $event : null,
                      "value-attribute": "id",
                      "option-attribute": "name",
                      placeholder: "Select member",
                      options: unref(members)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, { label: "Paid To" }, {
                  default: withCtx(() => [
                    createVNode(_component_USelectMenu, {
                      modelValue: unref(paidTo),
                      "onUpdate:modelValue": ($event) => isRef(paidTo) ? paidTo.value = $event : null,
                      "value-attribute": "id",
                      "option-attribute": "name",
                      placeholder: "Select member",
                      options: unref(members)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  _: 1
                }),
                (openBlock(true), createBlock(Fragment, null, renderList(Object.keys(model.value || {}), (member) => {
                  return openBlock(), createBlock(_component_UFormGroup, { label: "Amount" }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        onInput: ($event) => fixValue(member),
                        modelValue: model.value[member],
                        "onUpdate:modelValue": ($event) => model.value[member] = $event,
                        placeholder: "ex: 340.5"
                      }, null, 8, ["onInput", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1024);
                }), 256))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PaymentEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
//# sourceMappingURL=PaymentEditor-Bpw8D6nD.js.map
