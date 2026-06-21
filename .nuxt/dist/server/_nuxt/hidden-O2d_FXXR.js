import { nextTick, defineComponent } from "vue";
import { o, u as u$1, A } from "./selectMenu-DqLlXyUS.js";
function t(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((o2) => setTimeout(() => {
    throw o2;
  }));
}
var i$1 = Object.defineProperty;
var d = (t2, e, r) => e in t2 ? i$1(t2, e, { enumerable: true, configurable: true, writable: true, value: r }) : t2[e] = r;
var n = (t2, e, r) => (d(t2, typeof e != "symbol" ? e + "" : e, r), r);
class s {
  constructor() {
    n(this, "current", this.detect());
    n(this, "currentId", 0);
  }
  set(e) {
    this.current !== e && (this.currentId = 0, this.current = e);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return "server";
  }
}
let c$1 = new s();
function i(r) {
  if (c$1.isServer) return null;
  if (r instanceof Node) return r.ownerDocument;
  if (r != null && r.hasOwnProperty("value")) {
    let n2 = o(r);
    if (n2) return n2.ownerDocument;
  }
  return void 0;
}
let c = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var N = ((n2) => (n2[n2.First = 1] = "First", n2[n2.Previous = 2] = "Previous", n2[n2.Next = 4] = "Next", n2[n2.Last = 8] = "Last", n2[n2.WrapAround = 16] = "WrapAround", n2[n2.NoScroll = 32] = "NoScroll", n2))(N || {}), T = ((o2) => (o2[o2.Error = 0] = "Error", o2[o2.Overflow = 1] = "Overflow", o2[o2.Success = 2] = "Success", o2[o2.Underflow = 3] = "Underflow", o2))(T || {}), F = ((t2) => (t2[t2.Previous = -1] = "Previous", t2[t2.Next = 1] = "Next", t2))(F || {});
function E(e = (void 0).body) {
  return e == null ? [] : Array.from(e.querySelectorAll(c)).sort((r, t2) => Math.sign((r.tabIndex || Number.MAX_SAFE_INTEGER) - (t2.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var h = ((t2) => (t2[t2.Strict = 0] = "Strict", t2[t2.Loose = 1] = "Loose", t2))(h || {});
function w(e, r = 0) {
  var t2;
  return e === ((t2 = i(e)) == null ? void 0 : t2.body) ? false : u$1(r, { [0]() {
    return e.matches(c);
  }, [1]() {
    let l = e;
    for (; l !== null; ) {
      if (l.matches(c)) return true;
      l = l.parentElement;
    }
    return false;
  } });
}
function _(e) {
  let r = i(e);
  nextTick(() => {
    r && !w(r.activeElement, 0) && S(e);
  });
}
var y = ((t2) => (t2[t2.Keyboard = 0] = "Keyboard", t2[t2.Mouse = 1] = "Mouse", t2))(y || {});
function S(e) {
  e == null || e.focus({ preventScroll: true });
}
let H = ["textarea", "input"].join(",");
function I(e) {
  var r, t2;
  return (t2 = (r = e == null ? void 0 : e.matches) == null ? void 0 : r.call(e, H)) != null ? t2 : false;
}
function O(e, r = (t2) => t2) {
  return e.slice().sort((t2, l) => {
    let o2 = r(t2), i2 = r(l);
    if (o2 === null || i2 === null) return 0;
    let n2 = o2.compareDocumentPosition(i2);
    return n2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function v(e, r) {
  return P(E(), r, { relativeTo: e });
}
function P(e, r, { sorted: t2 = true, relativeTo: l = null, skipElements: o2 = [] } = {}) {
  var m;
  let i2 = (m = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : void 0 : e == null ? void 0 : e.ownerDocument) != null ? m : void 0, n2 = Array.isArray(e) ? t2 ? O(e) : e : E(e);
  o2.length > 0 && n2.length > 1 && (n2 = n2.filter((s2) => !o2.includes(s2))), l = l != null ? l : i2.activeElement;
  let x = (() => {
    if (r & 5) return 1;
    if (r & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p = (() => {
    if (r & 1) return 0;
    if (r & 2) return Math.max(0, n2.indexOf(l)) - 1;
    if (r & 4) return Math.max(0, n2.indexOf(l)) + 1;
    if (r & 8) return n2.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), L = r & 32 ? { preventScroll: true } : {}, a = 0, d2 = n2.length, u2;
  do {
    if (a >= d2 || a + d2 <= 0) return 0;
    let s2 = p + a;
    if (r & 16) s2 = (s2 + d2) % d2;
    else {
      if (s2 < 0) return 3;
      if (s2 >= d2) return 1;
    }
    u2 = n2[s2], u2 == null || u2.focus(L), a += x;
  } while (u2 !== i2.activeElement);
  return r & 6 && I(u2) && u2.select(), 2;
}
var u = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(u || {});
let f = defineComponent({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(t2, { slots: n2, attrs: i2 }) {
  return () => {
    var r;
    let { features: e, ...d2 } = t2, o2 = { "aria-hidden": (e & 2) === 2 ? true : (r = d2["aria-hidden"]) != null ? r : void 0, hidden: (e & 4) === 4 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(e & 4) === 4 && (e & 2) !== 2 && { display: "none" } } };
    return A({ ourProps: o2, theirProps: d2, slot: {}, attrs: i2, slots: n2, name: "Hidden" });
  };
} });
export {
  N,
  O,
  P,
  S,
  T,
  _,
  c$1 as c,
  f,
  h,
  i,
  t,
  u,
  v,
  w
};
//# sourceMappingURL=hidden-O2d_FXXR.js.map
