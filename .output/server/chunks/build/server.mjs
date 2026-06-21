import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineComponent, ref, inject, h, Suspense, hasInjectionContext, shallowRef, getCurrentInstance, provide, cloneVNode, createElementBlock, toRaw, computed, isRef, isReactive, toRef, Fragment, shallowReactive, reactive, effectScope, getCurrentScope, onScopeDispose, watch, nextTick, toRefs, markRaw, defineAsyncComponent, unref, createApp, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, mergeProps, withCtx, isReadonly, useSSRContext, isShallow } from 'vue';
import { l as parseURL, e as encodePath, m as decodePath, w as withQuery, n as klona, h as createError$1, o as defuFn, q as defu, r as hasProtocol, v as isScriptProtocol, x as joinURL, y as createDefu, z as sanitizeStatusCode, A as getContext, $ as $fetch$1, B as baseURL, C as createHooks, D as executeAsync } from '../_/nitro.mjs';
import { RouterView, useRoute as useRoute$1, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { createSharedComposable } from '@vueuse/core';
import { extendTailwindMerge } from 'tailwind-merge';
import { _api, addAPIProvider, setCustomIconsLoader } from '@iconify/vue';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { createClient } from '@supabase/supabase-js';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import { u as useHead$1, h as headSymbol, a as useSeoMeta$1 } from '../routes/renderer.mjs';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.21.8";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config2) {
  return config2;
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
const HTML_ATTR_ENCODE_MAP = {
  "&": "%26",
  '"': "%22",
  "'": "%27",
  "<": "%3C",
  ">": "%3E"
};
function encodeForHtmlAttr(value) {
  return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedHeader = encodeURL(location2, isExternalHost);
        const encodedLoc = encodeForHtmlAttr(encodedHeader);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
  return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    const pathname = url.pathname.replace(/^\/{2,}/, "/");
    return pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
function encodeRoutePath(url) {
  const parsed = parseURL(url);
  return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  Object.defineProperty(nuxtError, "status", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusCode,
    configurable: true
  });
  Object.defineProperty(nuxtError, "statusText", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusMessage,
    configurable: true
  });
  return nuxtError;
};
function freezeHead(head) {
  const realPush = head.push;
  head.push = () => ({ dispose: () => {
  }, patch: () => {
  }, _poll: () => {
  } });
  return () => {
    head.push = realPush;
  };
}
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    if (nuxtApp.ssrContext.islandContext) {
      const unfreeze = freezeHead(head);
      nuxtApp.hooks.hookOnce("app:created", unfreeze);
    }
    nuxtApp.vueApp.use(head);
  }
});
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
const matcher = /* @__PURE__ */ (() => {
  const $0 = { redirect: "/app/groups" }, $1 = {};
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    if (p === "/") {
      r.unshift({ data: $0 });
    } else if (p === "/sw.js") {
      r.unshift({ data: $1 });
    } else if (p === "/manifest.webmanifest") {
      r.unshift({ data: $1 });
    }
    return r;
  };
})();
const _routeRulesMatcher = (path) => defu({}, ...matcher("", typeof path === "string" ? path.toLowerCase() : path).map((r) => r.data).reverse());
const routeRulesMatcher$1 = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher$1(path.toLowerCase());
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
const __nuxt_page_meta = { colorMode: "dark" };
const _routes = [
  {
    name: "app",
    path: "/app",
    component: () => import('./app-DExwiOhy.mjs'),
    children: [
      {
        name: "app-groups",
        path: "groups",
        component: () => import('./groups-BcuuHjBR.mjs'),
        children: [
          {
            name: "app-groups-group-group_id",
            path: "group/:group_id?",
            component: () => import('./_group_id_-35UCCmyk.mjs')
          }
        ]
      },
      {
        name: "app-activity",
        path: "activity",
        component: () => import('./activity-BpADPpuY.mjs')
      },
      {
        name: "app-settings",
        path: "settings",
        component: () => import('./settings-BMDH9Qe9.mjs')
      },
      {
        name: "app-settlements",
        path: "settlements",
        component: () => import('./settlements-QzAmzEH6.mjs')
      }
    ]
  },
  {
    name: "index",
    path: "/",
    meta: __nuxt_page_meta || {},
    component: () => import('./index-qqSgo1Fb.mjs')
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => children.default?.() };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function _mergeTransitionProps(routeProps) {
  const _props = [];
  for (const prop of routeProps) {
    if (!prop) {
      continue;
    }
    _props.push({
      ...prop,
      onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0,
      onBeforeLeave: prop.onBeforeLeave ? toArray(prop.onBeforeLeave) : void 0
    });
  }
  return defu(..._props);
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    if (from === START_LOCATION) {
      return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
    }
    return new Promise((resolve) => {
      const doScroll = () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      };
      nuxtApp.hooks.hookOnce("page:loading:end", () => {
        const transitionPromise = nuxtApp["~transitionPromise"];
        if (transitionPromise) {
          transitionPromise.then(doScroll);
        } else {
          doScroll();
        }
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    status: result && (result.status || result.statusCode) || 404,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
Object.assign(/* @__PURE__ */ Object.create(null), {});
const pageIslandRoutes = Object.assign(/* @__PURE__ */ Object.create(null), {});
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      const lastTo = to.matched.at(-1)?.components?.default;
      const lastFrom = from.matched.at(-1)?.components?.default;
      if (lastTo === lastFrom) {
        syncCurrentRoute();
        return;
      }
      if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    const error = /* @__PURE__ */ useError();
    const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
    if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    const hasDeferredRoute = false;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext && !isServerPage) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$1(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        const routeRules = getRouteRules({ path: to.path });
        if (routeRules.appMiddleware) {
          for (const key in routeRules.appMiddleware) {
            if (routeRules.appMiddleware[key]) {
              middlewareEntries.add(key);
            } else {
              middlewareEntries.delete(key);
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    if (isServerPage) {
      router.beforeResolve((to) => {
        const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
        const actual = to.matched.find((m) => m.components?.default?.__nuxt_island)?.components?.default;
        if (!expected || expected !== actual?.__nuxt_island) {
          nuxtApp.ssrContext["~renderResponse"] = {
            statusCode: 400,
            statusMessage: "Invalid island request path"
          };
          return false;
        }
      });
    }
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0 && !error.value) {
        return nuxtApp.runWithContext(() => showError(createError({
          status: 404,
          fatal: false,
          statusText: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        if (hasDeferredRoute) ;
        else {
          await router.replace({
            ...resolvedInitialRoute,
            force: true
          });
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || tryUseNuxtApp();
  return nuxt?.ssrContext?.head || nuxt?.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  });
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useHead$1(input, { head, ...options });
  }
}
function useSeoMeta(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useSeoMeta$1(input, { head, ...options });
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && true) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = /* @__PURE__ */ Symbol();
const ACTION_NAME = /* @__PURE__ */ Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (true)) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = { deep: true };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (true)) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = /* @__PURE__ */ Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = action(prop, key);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
// @__NO_SIDE_EFFECTS__
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function storeToRefs(store) {
  {
    const rawStore = toRaw(store);
    const refs = {};
    for (const key in rawStore) {
      const value = rawStore[key];
      if (value.effect) {
        refs[key] = // ...
        computed({
          get: () => store[key],
          set(value2) {
            store[key] = value2;
          }
        });
      } else if (isRef(value) || isReactive(value)) {
        refs[key] = // ---
        toRef(store, key);
      }
    }
    return refs;
  }
}
const __nuxt_component_9 = defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_8 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const cfg0 = defineAppConfig({
  ui: {
    primary: "hawkes-blue",
    gray: "stone"
  }
});
const inlineConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "fern",
      "space",
      "hawkes-blue",
      "primary"
    ],
    "strategy": "merge"
  }
};
const appConfig = /* @__PURE__ */ defuFn(cfg0, inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  nuxtApp._appConfig ||= klona(appConfig);
  return nuxtApp._appConfig;
}
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    setActivePinia(pinia);
    {
      nuxtApp.payload.pinia = pinia.state.value;
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const LazyIcon = defineAsyncComponent(() => import('./index-CkXSRQJd.mjs').then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["Icon", LazyIcon]
];
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const pwa_icons_plugin_C24GcIKjcI2zsa8A86om0L2LZjx1chWtzYxD11T7Txg = /* @__PURE__ */ defineNuxtPlugin(() => {
  return {
    provide: {
      pwaIcons: {
        transparent: {},
        maskable: {},
        favicon: {},
        apple: {},
        appleSplashScreen: {}
      }
    }
  };
});
const slidOverInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.slideover");
function _useSlideover() {
  const slideoverState = inject(slidOverInjectionKey);
  const isOpen = ref(false);
  function open(component, props) {
    if (!slideoverState) {
      throw new Error("useSlideover() is called without provider");
    }
    slideoverState.value = {
      component,
      props: props ?? {}
    };
    isOpen.value = true;
  }
  async function close() {
    if (!slideoverState) return;
    isOpen.value = false;
  }
  function reset() {
    slideoverState.value = {
      component: "div",
      props: {}
    };
  }
  function patch(props) {
    if (!slideoverState) return;
    slideoverState.value = {
      ...slideoverState.value,
      props: {
        ...slideoverState.value.props,
        ...props
      }
    };
  }
  return {
    open,
    close,
    reset,
    patch,
    isOpen
  };
}
createSharedComposable(_useSlideover);
const slideovers_g1RyjnFCC2XCqS3NLpv7yngCZ5AzjpmT7UJr_dW3BbY = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const slideoverState = shallowRef({
    component: "div",
    props: {}
  });
  nuxtApp.vueApp.provide(slidOverInjectionKey, slideoverState);
});
const modalInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.modal");
function _useModal() {
  const modalState = inject(modalInjectionKey);
  const isOpen = ref(false);
  function open(component, props) {
    if (!modalState) {
      throw new Error("useModal() is called without provider");
    }
    modalState.value = {
      component,
      props: props ?? {}
    };
    isOpen.value = true;
  }
  async function close() {
    if (!modalState) return;
    isOpen.value = false;
  }
  function reset() {
    modalState.value = {
      component: "div",
      props: {}
    };
  }
  function patch(props) {
    if (!modalState) return;
    modalState.value = {
      ...modalState.value,
      props: {
        ...modalState.value.props,
        ...props
      }
    };
  }
  return {
    open,
    close,
    reset,
    patch,
    isOpen
  };
}
createSharedComposable(_useModal);
const modals_JhH8M1KzF3pQyhcHsoNTBLd8tKGet6zo2zTBVDe7nK4 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const modalState = shallowRef({
    component: "div",
    props: {}
  });
  nuxtApp.vueApp.provide(modalInjectionKey, modalState);
});
function omit(object, keysToOmit) {
  const result = { ...object };
  for (const key of keysToOmit) {
    delete result[key];
  }
  return result;
}
function get(object, path, defaultValue) {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }
  let result = object;
  for (const key of path) {
    if (result === void 0 || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== void 0 ? result : defaultValue;
}
const twMerge = extendTailwindMerge(defu({
  extend: {
    classGroups: {
      icons: [(classPart) => classPart.startsWith("i-")]
    }
  }
}, appConfig.ui?.tailwindMerge));
const defuTwMerge = createDefu((obj, key, value, namespace) => {
  if (namespace === "default" || namespace.startsWith("default.")) {
    return false;
  }
  if (namespace === "popper" || namespace.startsWith("popper.")) {
    return false;
  }
  if (namespace.endsWith("avatar") && key === "size") {
    return false;
  }
  if (namespace.endsWith("chip") && key === "size") {
    return false;
  }
  if (namespace.endsWith("badge") && key === "size" || key === "color" || key === "variant") {
    return false;
  }
  if (typeof obj[key] === "string" && typeof value === "string" && obj[key] && value) {
    obj[key] = twMerge(obj[key], value);
    return true;
  }
});
function mergeConfig(strategy, ...configs) {
  if (strategy === "override") {
    return defu({}, ...configs);
  }
  return defuTwMerge({}, ...configs);
}
const rxHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
function parseConfigValue(value) {
  return rxHex.test(value) ? hexToRgb(value) : value;
}
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(_, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = rxHex.exec(hex);
  return result ? `${Number.parseInt(result[1], 16)} ${Number.parseInt(result[2], 16)} ${Number.parseInt(result[3], 16)}` : null;
}
function looseToNumber(val) {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
}
const _inherit = "inherit";
const _current = "currentColor";
const _transparent = "transparent";
const _black = "#000";
const _white = "#fff";
const _slate = { "50": "#f8fafc", "100": "#f1f5f9", "200": "#e2e8f0", "300": "#cbd5e1", "400": "#94a3b8", "500": "#64748b", "600": "#475569", "700": "#334155", "800": "#1e293b", "900": "#0f172a", "950": "#020617" };
const _gray = { "50": "rgb(var(--color-gray-50) / <alpha-value>)", "100": "rgb(var(--color-gray-100) / <alpha-value>)", "200": "rgb(var(--color-gray-200) / <alpha-value>)", "300": "rgb(var(--color-gray-300) / <alpha-value>)", "400": "rgb(var(--color-gray-400) / <alpha-value>)", "500": "rgb(var(--color-gray-500) / <alpha-value>)", "600": "rgb(var(--color-gray-600) / <alpha-value>)", "700": "rgb(var(--color-gray-700) / <alpha-value>)", "800": "rgb(var(--color-gray-800) / <alpha-value>)", "900": "rgb(var(--color-gray-900) / <alpha-value>)", "950": "rgb(var(--color-gray-950) / <alpha-value>)" };
const _zinc = { "50": "#fafafa", "100": "#f4f4f5", "200": "#e4e4e7", "300": "#d4d4d8", "400": "#a1a1aa", "500": "#71717a", "600": "#52525b", "700": "#3f3f46", "800": "#27272a", "900": "#18181b", "950": "#09090b" };
const _neutral = { "50": "#fafafa", "100": "#f5f5f5", "200": "#e5e5e5", "300": "#d4d4d4", "400": "#a3a3a3", "500": "#737373", "600": "#525252", "700": "#404040", "800": "#262626", "900": "#171717", "950": "#0a0a0a" };
const _stone = { "50": "#fafaf9", "100": "#f5f5f4", "200": "#e7e5e4", "300": "#d6d3d1", "400": "#a8a29e", "500": "#78716c", "600": "#57534e", "700": "#44403c", "800": "#292524", "900": "#1c1917", "950": "#0c0a09" };
const _red = { "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5", "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c", "800": "#991b1b", "900": "#7f1d1d", "950": "#450a0a" };
const _orange = { "50": "#fff7ed", "100": "#ffedd5", "200": "#fed7aa", "300": "#fdba74", "400": "#fb923c", "500": "#f97316", "600": "#ea580c", "700": "#c2410c", "800": "#9a3412", "900": "#7c2d12", "950": "#431407" };
const _amber = { "50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d", "400": "#fbbf24", "500": "#f59e0b", "600": "#d97706", "700": "#b45309", "800": "#92400e", "900": "#78350f", "950": "#451a03" };
const _yellow = { "50": "#fefce8", "100": "#fef9c3", "200": "#fef08a", "300": "#fde047", "400": "#facc15", "500": "#eab308", "600": "#ca8a04", "700": "#a16207", "800": "#854d0e", "900": "#713f12", "950": "#422006" };
const _lime = { "50": "#f7fee7", "100": "#ecfccb", "200": "#d9f99d", "300": "#bef264", "400": "#a3e635", "500": "#84cc16", "600": "#65a30d", "700": "#4d7c0f", "800": "#3f6212", "900": "#365314", "950": "#1a2e05" };
const _green = { "50": "#f0fdf4", "100": "#dcfce7", "200": "#bbf7d0", "300": "#86efac", "400": "#4ade80", "500": "#22c55e", "600": "#16a34a", "700": "#15803d", "800": "#166534", "900": "#14532d", "950": "#052e16" };
const _emerald = { "50": "#ecfdf5", "100": "#d1fae5", "200": "#a7f3d0", "300": "#6ee7b7", "400": "#34d399", "500": "#10b981", "600": "#059669", "700": "#047857", "800": "#065f46", "900": "#064e3b", "950": "#022c22" };
const _teal = { "50": "#f0fdfa", "100": "#ccfbf1", "200": "#99f6e4", "300": "#5eead4", "400": "#2dd4bf", "500": "#14b8a6", "600": "#0d9488", "700": "#0f766e", "800": "#115e59", "900": "#134e4a", "950": "#042f2e" };
const _cyan = { "50": "#ecfeff", "100": "#cffafe", "200": "#a5f3fc", "300": "#67e8f9", "400": "#22d3ee", "500": "#06b6d4", "600": "#0891b2", "700": "#0e7490", "800": "#155e75", "900": "#164e63", "950": "#083344" };
const _sky = { "50": "#f0f9ff", "100": "#e0f2fe", "200": "#bae6fd", "300": "#7dd3fc", "400": "#38bdf8", "500": "#0ea5e9", "600": "#0284c7", "700": "#0369a1", "800": "#075985", "900": "#0c4a6e", "950": "#082f49" };
const _blue = { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" };
const _indigo = { "50": "#eef2ff", "100": "#e0e7ff", "200": "#c7d2fe", "300": "#a5b4fc", "400": "#818cf8", "500": "#6366f1", "600": "#4f46e5", "700": "#4338ca", "800": "#3730a3", "900": "#312e81", "950": "#1e1b4b" };
const _violet = { "50": "#f5f3ff", "100": "#ede9fe", "200": "#ddd6fe", "300": "#c4b5fd", "400": "#a78bfa", "500": "#8b5cf6", "600": "#7c3aed", "700": "#6d28d9", "800": "#5b21b6", "900": "#4c1d95", "950": "#2e1065" };
const _purple = { "50": "#faf5ff", "100": "#f3e8ff", "200": "#e9d5ff", "300": "#d8b4fe", "400": "#c084fc", "500": "#a855f7", "600": "#9333ea", "700": "#7e22ce", "800": "#6b21a8", "900": "#581c87", "950": "#3b0764" };
const _fuchsia = { "50": "#fdf4ff", "100": "#fae8ff", "200": "#f5d0fe", "300": "#f0abfc", "400": "#e879f9", "500": "#d946ef", "600": "#c026d3", "700": "#a21caf", "800": "#86198f", "900": "#701a75", "950": "#4a044e" };
const _pink = { "50": "#fdf2f8", "100": "#fce7f3", "200": "#fbcfe8", "300": "#f9a8d4", "400": "#f472b6", "500": "#ec4899", "600": "#db2777", "700": "#be185d", "800": "#9d174d", "900": "#831843", "950": "#500724" };
const _rose = { "50": "#fff1f2", "100": "#ffe4e6", "200": "#fecdd3", "300": "#fda4af", "400": "#fb7185", "500": "#f43f5e", "600": "#e11d48", "700": "#be123c", "800": "#9f1239", "900": "#881337", "950": "#4c0519" };
const _fern = { "50": "#f3faf3", "100": "#e3f5e4", "200": "#c9e9cb", "300": "#9ed7a3", "400": "#72bf78", "500": "#47a04e", "600": "#36833c", "700": "#2d6832", "800": "#28532c", "900": "#224526", "950": "#0e2511" };
const _space = { "50": "#f4f7f7", "100": "#e2eaeb", "200": "#c8d6d9", "300": "#a1babf", "400": "#73969d", "500": "#587b82", "600": "#4c676e", "700": "#42555c", "800": "#3b494f", "900": "#2c3539", "950": "#20292c" };
const _primary = { "50": "rgb(var(--color-primary-50) / <alpha-value>)", "100": "rgb(var(--color-primary-100) / <alpha-value>)", "200": "rgb(var(--color-primary-200) / <alpha-value>)", "300": "rgb(var(--color-primary-300) / <alpha-value>)", "400": "rgb(var(--color-primary-400) / <alpha-value>)", "500": "rgb(var(--color-primary-500) / <alpha-value>)", "600": "rgb(var(--color-primary-600) / <alpha-value>)", "700": "rgb(var(--color-primary-700) / <alpha-value>)", "800": "rgb(var(--color-primary-800) / <alpha-value>)", "900": "rgb(var(--color-primary-900) / <alpha-value>)", "950": "rgb(var(--color-primary-950) / <alpha-value>)", "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)" };
const _cool = { "50": "#f9fafb", "100": "#f3f4f6", "200": "#e5e7eb", "300": "#d1d5db", "400": "#9ca3af", "500": "#6b7280", "600": "#4b5563", "700": "#374151", "800": "#1f2937", "900": "#111827", "950": "#030712" };
const config = { "inherit": _inherit, "current": _current, "transparent": _transparent, "black": _black, "white": _white, "slate": _slate, "gray": _gray, "zinc": _zinc, "neutral": _neutral, "stone": _stone, "red": _red, "orange": _orange, "amber": _amber, "yellow": _yellow, "lime": _lime, "green": _green, "emerald": _emerald, "teal": _teal, "cyan": _cyan, "sky": _sky, "blue": _blue, "indigo": _indigo, "violet": _violet, "purple": _purple, "fuchsia": _fuchsia, "pink": _pink, "rose": _rose, "fern": _fern, "space": _space, "primary": _primary, "cool": _cool, "hawkes-blue": { "50": "#eff5fe", "100": "#e2ecfd", "200": "#d2e0fb", "300": "#abc3f6", "400": "#89a1f0", "500": "#6c81e8", "600": "#515dda", "700": "#424bc0", "800": "#38409b", "900": "#343c7b", "950": "#1e2148" } };
const colors_E7kSti5pGZ28QhUUurq6gGRU3l65WuXO_KJC3GQgzFo = /* @__PURE__ */ defineNuxtPlugin(() => {
  const appConfig2 = useAppConfig();
  useNuxtApp();
  const root = computed(() => {
    const primary = get(config, appConfig2.ui.primary);
    const gray = get(config, appConfig2.ui.gray);
    if (!primary) {
      console.warn(`[@nuxt/ui] Primary color '${appConfig2.ui.primary}' not found in Tailwind config`);
    }
    if (!gray) {
      console.warn(`[@nuxt/ui] Gray color '${appConfig2.ui.gray}' not found in Tailwind config`);
    }
    return `:root {
${Object.entries(primary || config.green).map(([key, value]) => `--color-primary-${key}: ${parseConfigValue(value)};`).join("\n")}
--color-primary-DEFAULT: var(--color-primary-500);

${Object.entries(gray || config.cool).map(([key, value]) => `--color-gray-${key}: ${parseConfigValue(value)};`).join("\n")}
}

.dark {
  --color-primary-DEFAULT: var(--color-primary-400);
}
`;
  });
  const headData = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: "nuxt-ui-colors"
    }]
  };
  useHead(headData);
});
const preference = "system";
const plugin_server_9Ca9_HhnjAGwBWpwAydRauMHxWoxTDY60BrArRnXN_A = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const colorMode = nuxtApp.ssrContext?.islandContext ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const plugin_MeUvTuoKUi51yb_kBguab6hdcExVXeTtZtTg9TZZBB8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "@nuxt/icon",
  setup() {
    const configs = /* @__PURE__ */ useRuntimeConfig();
    const options = useAppConfig().icon;
    _api.setFetch($fetch.native);
    const resources = [];
    if (options.provider === "server") {
      const baseURL2 = configs.app?.baseURL?.replace(/\/$/, "") ?? "";
      resources.push(baseURL2 + (options.localApiEndpoint || "/api/_nuxt_icon"));
      if (options.fallbackToApi === true || options.fallbackToApi === "client-only") {
        resources.push(options.iconifyApiEndpoint);
      }
    } else if (options.provider === "none") {
      _api.setFetch(() => Promise.resolve(new Response()));
    } else {
      resources.push(options.iconifyApiEndpoint);
    }
    async function customIconLoader(icons, prefix) {
      try {
        const data = await $fetch(resources[0] + "/" + prefix + ".json", {
          query: {
            icons: icons.join(",")
          }
        });
        if (!data || data.prefix !== prefix || !data.icons)
          throw new Error("Invalid data" + JSON.stringify(data));
        return data;
      } catch (e) {
        console.error("Failed to load custom icons", e);
        return null;
      }
    }
    addAPIProvider("", { resources });
    for (const prefix of options.customCollections || []) {
      if (prefix)
        setCustomIconsLoader(customIconLoader, prefix);
    }
  }
  // For type portability
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});
const supabaseUrl = "https://exywmwjsqlotgxwtwvum.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4eXdtd2pzcWxvdGd4d3R3dnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MzMyODksImV4cCI6MjA3OTMwOTI4OX0.RF2I4cTH0tfn4AAMYF0-dC5OnlHF__4F5NJ018kC6VY";
let client = null;
const getSupabase = () => {
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
};
const getDeviceId = () => {
  let id = localStorage.getItem("peersplit.device_id");
  if (!id) {
    id = nanoid(16);
    localStorage.setItem("peersplit.device_id", id);
  }
  return id;
};
const dbInit = async () => {
  const { error } = await getSupabase().from("groups").select("id", { count: "exact", head: true });
  if (error) {
    console.error("Supabase connection failed:", error);
    throw error;
  }
};
const wipeData = async () => {
  localStorage.removeItem("peersplit.device_id");
  localStorage.removeItem("peersplit.name");
};
const tryParseJSON = (str) => {
  if (!str || typeof str !== "string") return str;
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
};
const buildNameToId = (members) => {
  const map = {};
  for (const m of Object.values(members)) {
    if (m.name) map[m.name.toLowerCase()] = m.id;
  }
  return map;
};
const buildIdToName = (members) => {
  const map = {};
  for (const m of Object.values(members)) {
    map[m.id] = m.name;
  }
  return map;
};
const expenseToTransaction = (exp, nameToId) => {
  const payerId = nameToId[exp.paid_by?.toLowerCase()] || `unknown:${exp.paid_by || "?"}`;
  const involvedIds = (exp.involved || []).map((n) => nameToId[n.toLowerCase()] || `unknown:${n}`);
  const total = Number(exp.amount) || 0;
  const payers = { [payerId]: total };
  const splitters = {};
  if (exp.split_details && typeof exp.split_details === "object" && !Array.isArray(exp.split_details)) {
    for (const [name, amount] of Object.entries(exp.split_details)) {
      const id = nameToId[name.toLowerCase()] || `unknown:${name}`;
      splitters[id] = Number(amount);
    }
  } else {
    const each = total / (involvedIds.length || 1);
    for (const id of involvedIds) {
      splitters[id] = id ? each : 0;
    }
  }
  return {
    id: exp.id,
    type: "expense",
    description: exp.description || "",
    splitType: 1,
    payers,
    splitters,
    category: exp.category || null,
    created_at: exp.created_at || exp.date,
    updated_at: exp.updated_at,
    created_by: exp.paid_by || ""
  };
};
const paymentToTransaction = (pay, nameToId) => {
  const fromId = nameToId[pay.from_user?.toLowerCase()] || `unknown:${pay.from_user || "?"}`;
  const toId = nameToId[pay.to_user?.toLowerCase()] || `unknown:${pay.to_user || "?"}`;
  const amount = Number(pay.amount) || 0;
  return {
    id: pay.id,
    type: "payment",
    description: pay.note || `${pay.from_user || "?"} → ${pay.to_user || "?"}`,
    splitType: 1,
    payers: { [fromId]: amount },
    splitters: { [toId]: amount },
    category: pay.category || null,
    created_at: pay.created_at || pay.date,
    updated_at: pay.updated_at,
    created_by: ""
  };
};
const buildGroupObject = (groupRow, members, expenses, payments, activityRows, deviceId) => {
  const membersMap = {};
  let myID = null;
  for (const m of members) {
    membersMap[m.id] = { id: m.id, name: m.name || "Unnamed User", siteID: m.site_id || "" };
    if (m.site_id === deviceId) {
      myID = m.id;
    }
  }
  const nameToId = buildNameToId(membersMap);
  const transactions = {};
  const transactionOrder = [];
  for (const exp of expenses) {
    const tx = expenseToTransaction(exp, nameToId);
    transactions[tx.id] = tx;
    transactionOrder.push(tx.id);
  }
  for (const pay of payments) {
    const tx = paymentToTransaction(pay, nameToId);
    transactions[tx.id] = tx;
    transactionOrder.push(tx.id);
  }
  transactionOrder.sort((a, b) => {
    const aDate = transactions[a]?.created_at || "";
    const bDate = transactions[b]?.created_at || "";
    return String(aDate).localeCompare(String(bDate));
  });
  const activityList = (activityRows || []).map((a) => ({
    ...a,
    data: tryParseJSON(a.data)
  }));
  return {
    id: groupRow.id,
    myID,
    mySiteID: deviceId,
    name: groupRow.name || "Unnamed Group",
    currency: groupRow.currency || "₹",
    transactions,
    transactionOrder,
    activityList,
    members: membersMap
  };
};
const updateGroup = async (id) => {
  const group = await getGroup(id);
  if (group) {
    useGroups().setGroup(group);
  }
  return group;
};
const getGroup = async (id) => {
  const supabase = getSupabase();
  const deviceId = getDeviceId();
  const [{ data: groupRow }, { data: members }, { data: expenses }, { data: payments }, { data: activityRows }] = await Promise.all([
    supabase.from("groups").select("*").eq("id", id).single(),
    supabase.from("members").select("*").eq("group_id", id),
    supabase.from("expenses").select("*").eq("group_id", id).order("created_at", { ascending: true }),
    supabase.from("payments").select("*").eq("group_id", id).order("created_at", { ascending: true }),
    supabase.from("activity").select("*").eq("group_id", id).order("created_at", { ascending: true })
  ]);
  if (!groupRow) return null;
  return buildGroupObject(groupRow, members || [], expenses || [], payments || [], activityRows || [], deviceId);
};
const getGroups = async () => {
  const { data: groupRows } = await getSupabase().from("groups").select("*");
  const result = {};
  if (groupRows) {
    await Promise.all(
      groupRows.map(async (g) => {
        const group = await getGroup(g.id);
        if (group) result[group.id] = group;
      })
    );
  }
  return result;
};
const createGroup = async (name, currency) => {
  const id = nanoid(32);
  const deviceId = getDeviceId();
  await getSupabase().from("groups").insert({ id, name, currency });
  const userName = typeof useName !== "undefined" ? useName().value : "Me";
  const memberId = nanoid();
  await getSupabase().from("members").insert({
    id: memberId,
    group_id: id,
    name: userName || "Me",
    site_id: deviceId
  });
  await updateGroup(id);
  return id;
};
const createEmptyGroup = async (id) => {
  await getSupabase().from("groups").insert({ id, name: "New Group", currency: "₹" });
};
const setGroupName = async (id, name, by) => {
  const supabase = getSupabase();
  const { data: groupRow } = await supabase.from("groups").select("name").eq("id", id).single();
  const prev = groupRow?.name || "";
  await supabase.from("groups").update({ name }).eq("id", id);
  const activityId = nanoid();
  await supabase.from("activity").insert({
    id: activityId,
    group_id: id,
    data: { type: "update_name", prev, cur: name },
    by: by || ""
  });
  await updateGroup(id);
  return await getActivityById(activityId);
};
const setGroupCurrency = async (id, currency, by) => {
  const supabase = getSupabase();
  const { data: groupRow } = await supabase.from("groups").select("currency").eq("id", id).single();
  const prev = groupRow?.currency || "";
  await supabase.from("groups").update({ currency }).eq("id", id);
  const activityId = nanoid();
  await supabase.from("activity").insert({
    id: activityId,
    group_id: id,
    data: { type: "update_currency", prev, cur: currency },
    by: by || ""
  });
  await updateGroup(id);
  return await getActivityById(activityId);
};
const addMemberToGroup = async (groupID, member) => {
  await getSupabase().from("members").insert({
    id: member.id,
    group_id: groupID,
    name: member.name
  });
};
const updateMemberInGroup = async (groupID, id, data) => {
  await getSupabase().from("members").update(data).eq("id", id).eq("group_id", groupID);
};
const deleteMemberFromGroup = async (groupID, id) => {
  await getSupabase().from("members").delete().eq("id", id).eq("group_id", groupID);
};
const addTransactionToGroup = async (groupID, transaction, by) => {
  const supabase = getSupabase();
  const group = await getGroup(groupID);
  if (!group) return null;
  const idToName = buildIdToName(group.members);
  const activityId = nanoid();
  if (transaction.type === "expense") {
    const paidByName = idToName[Object.keys(transaction.payers)[0]] || "";
    const involvedNames = Object.keys(transaction.splitters).map((id) => idToName[id]).filter(Boolean);
    await supabase.from("expenses").insert({
      id: transaction.id,
      group_id: groupID,
      description: transaction.description || "",
      amount: Object.values(transaction.payers).reduce((a, b) => a + Number(b), 0),
      paid_by: paidByName,
      date: transaction.created_at || moment().utc().format("YYYY-MM-DDTHH:mm:ss"),
      involved: involvedNames,
      split_type: transaction.splitType === 1 ? "equal" : "custom",
      category: transaction.category || null
    });
  } else {
    const fromName = idToName[Object.keys(transaction.payers)[0]] || "";
    const toName = idToName[Object.keys(transaction.splitters)[0]] || "";
    const amountVal = Object.values(transaction.payers)[0] || 0;
    await supabase.from("payments").insert({
      id: transaction.id,
      group_id: groupID,
      from_user: fromName,
      to_user: toName,
      amount: Number(amountVal),
      date: transaction.created_at || moment().utc().format("YYYY-MM-DDTHH:mm:ss"),
      note: transaction.description || ""
    });
  }
  await supabase.from("activity").insert({
    id: activityId,
    group_id: groupID,
    data: { type: "create_transaction", cur: { ...transaction } },
    by: by || ""
  });
  await updateGroup(groupID);
  return await getActivityById(activityId);
};
const updateTransactionInGroup = async (groupID, transaction, by) => {
  const supabase = getSupabase();
  const group = await getGroup(groupID);
  if (!group) return null;
  const idToName = buildIdToName(group.members);
  const activityId = nanoid();
  if (transaction.type === "expense") {
    const paidByName = idToName[Object.keys(transaction.payers)[0]] || "";
    const involvedNames = Object.keys(transaction.splitters).map((id) => idToName[id]).filter(Boolean);
    await supabase.from("expenses").update({
      description: transaction.description || "",
      amount: Object.values(transaction.payers).reduce((a, b) => a + Number(b), 0),
      paid_by: paidByName,
      involved: involvedNames,
      split_type: transaction.splitType === 1 ? "equal" : "custom",
      category: transaction.category || null
    }).eq("id", transaction.id).eq("group_id", groupID);
  } else {
    const fromName = idToName[Object.keys(transaction.payers)[0]] || "";
    const toName = idToName[Object.keys(transaction.splitters)[0]] || "";
    const amountVal = Object.values(transaction.payers)[0] || 0;
    await supabase.from("payments").update({
      from_user: fromName,
      to_user: toName,
      amount: Number(amountVal),
      note: transaction.description || ""
    }).eq("id", transaction.id).eq("group_id", groupID);
  }
  await supabase.from("activity").insert({
    id: activityId,
    group_id: groupID,
    data: { type: "update_transaction", cur: { ...transaction } },
    by: by || ""
  });
  await updateGroup(groupID);
  return await getActivityById(activityId);
};
const deleteTransactionFromGroup = async (groupID, transactionId, by) => {
  const supabase = getSupabase();
  const activityId = nanoid();
  const { data: expense } = await supabase.from("expenses").select("id").eq("id", transactionId).eq("group_id", groupID).single();
  if (expense) {
    await supabase.from("expenses").delete().eq("id", transactionId).eq("group_id", groupID);
  } else {
    await supabase.from("payments").delete().eq("id", transactionId).eq("group_id", groupID);
  }
  await supabase.from("activity").insert({
    id: activityId,
    group_id: groupID,
    data: { type: "delete_transaction", prev: { id: transactionId } },
    by: by || ""
  });
  await updateGroup(groupID);
  return await getActivityById(activityId);
};
const getActivityById = async (id) => {
  const { data } = await getSupabase().from("activity").select("*").eq("id", id).single();
  if (!data) return null;
  return { ...data, data: tryParseJSON(data.data) };
};
const importSupabase = async (groupID, myID, supabaseMembers, supabaseExpenses, supabasePayments) => {
  const db = getSupabase();
  const memberIdMap = {};
  for (const member of supabaseMembers) {
    const id = nanoid();
    memberIdMap[member.name] = id;
    await db.from("members").insert({ id, group_id: groupID, name: member.name });
  }
  for (const expense of supabaseExpenses) {
    const payerId = memberIdMap[expense.paid_by];
    if (!payerId) continue;
    ({ [payerId]: expense.amount });
    if (expense.split_type === "equal") {
      for (const name of expense.involved || []) {
      }
    } else if (expense.split_details) {
      for (const [name, amount] of Object.entries(expense.split_details)) {
      }
    }
    const createdAt = expense.date ? moment(expense.date).utc().format("YYYY-MM-DD HH:mm:ss") : moment().utc().format("YYYY-MM-DD HH:mm:ss");
    await db.from("expenses").insert({
      id: nanoid(),
      group_id: groupID,
      description: expense.description,
      amount: expense.amount,
      paid_by: expense.paid_by,
      date: createdAt,
      involved: expense.involved || [],
      split_type: expense.split_type || "equal",
      category: expense.category || null
    });
  }
  for (const payment of supabasePayments) {
    const fromId = memberIdMap[payment.from_user];
    const toId = memberIdMap[payment.to_user];
    if (!fromId || !toId) continue;
    const createdAt = payment.date ? moment(payment.date).utc().format("YYYY-MM-DD HH:mm:ss") : moment().utc().format("YYYY-MM-DD HH:mm:ss");
    await db.from("payments").insert({
      id: nanoid(),
      group_id: groupID,
      from_user: payment.from_user,
      to_user: payment.to_user,
      amount: payment.amount,
      date: createdAt,
      note: payment.note || ""
    });
  }
  await db.from("activity").insert({
    id: nanoid(),
    group_id: groupID,
    data: {
      type: "import_supabase",
      members: supabaseMembers.length,
      expenses: supabaseExpenses.length,
      payments: supabasePayments.length
    },
    by: myID || ""
  });
  await updateGroup(groupID);
};
const importSplitwise = async (groupID, myID, members, transactions) => {
  const db = getSupabase();
  const memberIds = [];
  await db.from("members").insert(
    members.map((name) => ({ id: nanoid(), group_id: groupID, name }))
  );
  const { data: insertedMembers } = await db.from("members").select("id, name").eq("group_id", groupID);
  const nameToId = {};
  for (const m of insertedMembers || []) {
    nameToId[m.name] = m.id;
    if (!memberIds.includes(m.id)) memberIds.push(m.id);
  }
  for (const txn of transactions) {
    txn.slice(5).forEach((v, index) => {
    });
    const [date, description] = txn;
    const isPayment = description.includes("paid") && txn.slice(5).map((v) => Number(v)).filter((v) => v !== 0).length === 2;
    const createdAt = moment(date).utc().format("YYYY-MM-DD HH:mm:ss");
    if (isPayment) {
      const fromName = members[txn.slice(5).findIndex((v) => Number(v) > 0)];
      const toName = members[txn.slice(5).findIndex((v) => Number(v) < 0)];
      await db.from("payments").insert({
        id: nanoid(),
        group_id: groupID,
        from_user: fromName || "",
        to_user: toName || "",
        amount: Math.abs(Number(txn.slice(5).find((v) => Number(v) > 0) || 0)),
        date: createdAt,
        note: description || ""
      });
    } else {
      const paidByName = members[txn.slice(5).findIndex((v) => Number(v) > 0)] || "";
      const involvedNames = txn.slice(5).map((_, i) => members[i]).filter(Boolean);
      await db.from("expenses").insert({
        id: nanoid(),
        group_id: groupID,
        description: description || "",
        amount: txn.slice(5).reduce((sum, v) => sum + Math.max(0, Number(v)), 0),
        paid_by: paidByName,
        date: createdAt,
        involved: involvedNames,
        split_type: "custom"
      });
    }
  }
  await db.from("activity").insert({
    id: nanoid(),
    group_id: groupID,
    data: { type: "import_splitwise", members: members.length, transactions: transactions.length },
    by: myID || ""
  });
  await updateGroup(groupID);
};
const round = (val) => Math.round((Number(val) + Number.EPSILON) * 100) / 100;
const computeTransaction = (transaction) => {
  for (const [payer, val] of Object.entries(transaction.payers)) {
    transaction.payers[payer] = round(val);
  }
  for (const [splitter, val] of Object.entries(transaction.splitters)) {
    transaction.splitters[splitter] = round(val);
  }
  const totalCost = Object.values(transaction.payers).reduce(
    (a, b) => round(Number(a) + Number(b)),
    0
  );
  const totalSplit = Object.values(transaction.splitters).reduce(
    (a, b) => round(Number(a) + Number(b)),
    0
  );
  const splits = { ...transaction.splitters };
  const members = Object.keys(splits);
  members.sort();
  for (const split of Object.keys(splits)) {
    if (transaction.splitType === 1) {
      splits[split] = totalCost / members.length;
    } else {
      splits[split] = totalCost * splits[split];
      splits[split] /= totalSplit;
    }
    splits[split] = round(splits[split]);
  }
  const newTotalSplit = Object.values(splits).reduce(
    (a, b) => round(Number(a) + Number(b)),
    0
  );
  if (members[0]) {
    const diff = totalCost - newTotalSplit;
    if (diff > 0) {
      splits[members[0]] = round(splits[members[0]] + diff);
    }
  }
  return {
    ...transaction,
    totalCost,
    splits
  };
};
const groupGetBalances = (group) => {
  const balances = {};
  for (const member of Object.keys(group.members || {})) {
    balances[member] = 0;
  }
  for (const transaction of Object.values(group.transactions || {})) {
    const computedTransaction = computeTransaction(transaction);
    for (const [payer, value] of Object.entries(computedTransaction.payers)) {
      balances[payer] ||= 0;
      balances[payer] = round(balances[payer] + Number(value));
    }
    for (const [splitter, value] of Object.entries(
      computedTransaction.splits
    )) {
      balances[splitter] ||= 0;
      balances[splitter] = round(balances[splitter] - Number(value));
    }
  }
  return balances;
};
const groupGetPayments = (group) => {
  const payments = [];
  const balances = Object.entries(groupGetBalances(group)).map(([a, b]) => [
    b,
    a
  ]);
  balances.sort();
  let i = 0, j = balances.length - 1;
  while (i < j) {
    if (balances[i][0] === 0) {
      i++;
    } else if (balances[j][0] === 0) {
      j--;
    } else if (-balances[i][0] > balances[j][0]) {
      payments.push({
        from: balances[i][1],
        to: balances[j][1],
        value: round(balances[j][0])
      });
      balances[i][0] += balances[j][0];
      balances[j][0] = 0;
    } else {
      payments.push({
        from: balances[i][1],
        to: balances[j][1],
        value: round(-balances[i][0])
      });
      balances[j][0] += balances[i][0];
      balances[i][0] = 0;
    }
  }
  return payments;
};
const useGroups = /* @__PURE__ */ defineStore("groups", {
  state: () => ({
    loading: true,
    groups: {},
    currentGroup: null,
    currentTransaction: null
  }),
  actions: {
    setCurrentGroup(id) {
      this.currentGroup = id;
    },
    setCurrentTransaction(id) {
      this.currentTransaction = id;
    },
    setGroups(groups) {
      this.groups = groups;
      this.loading = false;
    },
    setGroup(group) {
      this.groups ||= {};
      this.groups[group.id] = group;
    },
    async setGroupName(groupID, name) {
      const group = this.groups[groupID];
      group.name = name;
      const activity = await setGroupName(groupID, name, group.myID);
      this.addActivity(groupID, activity);
    },
    async setGroupCurrency(groupID, currency) {
      const group = this.groups[groupID];
      group.currency = currency;
      const activity = await setGroupCurrency(groupID, currency, group.myID);
      this.addActivity(groupID, activity);
    },
    async addTransaction(groupID, transaction) {
      const activity = await addTransactionToGroup(groupID, transaction, this.groups[groupID]?.myID);
      if (activity) this.addActivity(groupID, activity);
    },
    async updateTransaction(groupID, transaction) {
      const activity = await updateTransactionInGroup(groupID, transaction, this.groups[groupID]?.myID);
      if (activity) this.addActivity(groupID, activity);
    },
    async deleteTransaction(groupID, transactionID) {
      const activity = await deleteTransactionFromGroup(groupID, transactionID, this.groups[groupID]?.myID);
      if (activity) this.addActivity(groupID, activity);
    },
    async addMember(groupID, member) {
      const group = this.groups[groupID];
      if (!group.members) group.members = {};
      group.members[member.id] = member;
      await addMemberToGroup(groupID, member);
    },
    async updateMember(groupID, member) {
      const group = this.groups[groupID];
      group.members[member.id] = member;
      member.name ||= "Unnamed User";
      await updateMemberInGroup(groupID, member.id, { name: member.name, site_id: member.siteID });
    },
    async deleteMember(groupID, id) {
      const group = this.groups[groupID];
      if (group.members) delete group.members[id];
      await deleteMemberFromGroup(groupID, id);
    },
    async assignMember(groupID, id) {
      const group = this.groups[groupID];
      const old = group.myID;
      group.myID = id;
      if (old) {
        this.updateMember(groupID, {
          ...group.members[old],
          siteID: null
        });
      }
      this.updateMember(groupID, {
        ...group.members[id],
        siteID: group.mySiteID
      });
    },
    async addActivity(groupID, activity) {
      const group = this.groups[groupID];
      group.activityList ||= [];
      group.activityList.push(activity);
    }
  },
  getters: {
    getGroupedTransactionsByGroupID(state) {
      return (groupID) => {
        const monthMap = {};
        const transactionOrder = [
          ...state.groups[groupID]?.transactionOrder || []
        ].reverse();
        for (const transactionID of transactionOrder) {
          const transaction = state.groups[groupID]?.transactions?.[transactionID];
          if (transaction) {
            const month = moment(transaction.created_at).format("MMMM YYYY");
            if (!monthMap[month]) {
              monthMap[month] = { month, expenses: [], payments: [] };
            }
            if (transaction.type === "payment") {
              monthMap[month].payments.push(transaction);
            } else {
              monthMap[month].expenses.push(transaction);
            }
          }
        }
        return Object.values(monthMap);
      };
    },
    groupsList(state) {
      return Object.values(state.groups);
    },
    getGroupByID(state) {
      return (id) => state.groups[id];
    },
    getBalancesByGroupID() {
      return (id) => {
        return groupGetBalances(this.getGroupByID(id));
      };
    },
    getPaymentsByGroupID() {
      return (id) => groupGetPayments(this.getGroupByID(id));
    },
    getMembersList(state) {
      return (id) => Object.values(state.groups[id]?.members || {});
    },
    getMemberName(state) {
      return (groupID, memberID, lowercase) => {
        const group = state.groups[groupID];
        const name = memberID === group.myID ? lowercase ? "you" : "You" : group.members[memberID]?.name;
        return name || "Unnamed User";
      };
    },
    getGroupCurrency(state) {
      return (id) => state.groups[id]?.currency || "₹";
    },
    getAllActivity(state) {
      const activity = [];
      for (const group of Object.values(state.groups)) {
        activity.push(
          group.activityList.map((a) => ({
            ...a,
            groupID: group.id,
            myID: group.myID
          }))
        );
      }
      const activityFlat = activity.flat();
      activityFlat.sort((a, b) => b.created_at.localeCompare(a.created_at));
      return activityFlat;
    }
  }
});
const updateGroups = async () => {
  useGroups().setGroups(await getGroups());
};
const useGroupID = () => useGroups().currentGroup;
const useName = () => useState("name", () => "");
const setName = (name) => {
  useName().value = name;
  localStorage.setItem("peersplit.name", name);
  for (const group of Object.values(useGroups().groups)) {
    const member = group.members[group.myID];
    if (member) useGroups().updateMember(group.id, { ...member, name });
  }
};
const init_OlIVM6w_hEauvmnEqhRrWl85lkjql8dTYfaeOXeSLHQ = /* @__PURE__ */ defineNuxtPlugin({
  hooks: {
    async "app:beforeMount"() {
      try {
        useName().value = localStorage.getItem("peersplit.name");
        await dbInit();
        await updateGroups();
        const groupsStore = useGroups();
        const groupIDs = Object.keys(groupsStore.groups);
        if (groupIDs.length === 0) {
          const id = await createGroup("Data Scientist", "₹");
          groupsStore.setCurrentGroup(id);
        } else if (!groupsStore.currentGroup) {
          groupsStore.setCurrentGroup(groupIDs[0]);
        }
      } catch (err) {
        console.error("Failed to initialize:", err);
      }
    }
  }
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin$1,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  plugin,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  pwa_icons_plugin_C24GcIKjcI2zsa8A86om0L2LZjx1chWtzYxD11T7Txg,
  slideovers_g1RyjnFCC2XCqS3NLpv7yngCZ5AzjpmT7UJr_dW3BbY,
  modals_JhH8M1KzF3pQyhcHsoNTBLd8tKGet6zo2zTBVDe7nK4,
  colors_E7kSti5pGZ28QhUUurq6gGRU3l65WuXO_KJC3GQgzFo,
  plugin_server_9Ca9_HhnjAGwBWpwAydRauMHxWoxTDY60BrArRnXN_A,
  plugin_MeUvTuoKUi51yb_kBguab6hdcExVXeTtZtTg9TZZBB8,
  init_OlIVM6w_hEauvmnEqhRrWl85lkjql8dTYfaeOXeSLHQ
];
const pwaInfo = { "webManifest": { "href": "/manifest.webmanifest" } };
const __nuxt_component_0$1 = defineComponent({
  async setup() {
    if (pwaInfo) {
      const meta = ref({ link: [] });
      useHead(meta);
      const { webManifest } = pwaInfo;
      if (webManifest) {
        const { href } = webManifest;
        {
          meta.value.link.push({
            rel: "manifest",
            href
          });
        }
      }
    }
    return () => null;
  }
});
const layouts = {};
const routeRulesMatcher = _routeRulesMatcher;
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route?.meta.layout ?? routeRulesMatcher(route?.path).appLayout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = !!layout.value && layout.value in layouts;
      const hasTransition = hasLayout && !!(route?.meta.layoutTransition ?? appLayoutTransition);
      const transitionProps = hasTransition && _mergeTransitionProps([
        route?.meta.layoutTransition,
        appLayoutTransition,
        {
          onBeforeLeave() {
            nuxtApp["~transitionPromise"] = new Promise((resolve) => {
              nuxtApp["~transitionFinish"] = resolve;
            });
          },
          onAfterLeave() {
            nuxtApp["~transitionFinish"]?.();
            delete nuxtApp["~transitionFinish"];
            delete nuxtApp["~transitionPromise"];
          }
        }
      ]);
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(transitionProps, {
        default: () => h(
          Suspense,
          {
            suspensible: true,
            onResolve: async () => {
              await nextTick(done);
            }
          },
          {
            default: () => h(
              LayoutProvider,
              {
                layoutProps: mergeProps(context.attrs, route.meta.layoutProps ?? {}, { ref: layoutRef }),
                key: layout.value || void 0,
                name: layout.value,
                shouldProvide: !props.name,
                isRenderingNewLayout: (name) => {
                  return name !== previouslyRenderedLayout && name === layout.value;
                },
                hasTransition
              },
              context.slots
            )
          }
        )
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        // When name=false, always return true so NuxtPage doesn't skip rendering
        isCurrent: (route) => name === false || name === (route.meta.layout ?? routeRulesMatcher(route.path).appLayout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_0 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
      title: "PeerSplit | Track and split group expenses. 100% free, 100% private.",
      description: "Track and split group expenses. 100% free, 100% private. Peer-to-peer expense tracking that works offline.",
      ogTitle: "PeerSplit - Free & Private Expense Splitting",
      ogDescription: "Track and split group expenses with friends. 100% free, peer-to-peer, and completely private.",
      ogImage: "/pwa-512x512.png",
      ogType: "website",
      twitterCard: "summary_large_image",
      twitterTitle: "PeerSplit - Free & Private Expense Splitting",
      twitterDescription: "Track and split group expenses with friends. 100% free, peer-to-peer, and completely private.",
      twitterImage: "/pwa-512x512.png",
      themeColor: "#89a1f0"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPwaManifest = __nuxt_component_0$1;
      const _component_NuxtLayout = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_NuxtPwaManifest, null, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    const status = Number(_error.statusCode || 500);
    const is404 = status === 404;
    const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-DKlJPVvG.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-BhPSwHVf.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ status: unref(status), statusText: unref(statusText), statusCode: unref(status), statusMessage: unref(statusText), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    function invokeAppErrorHandler(err, target, info) {
      const errorHandler = nuxtApp.vueApp.config.errorHandler;
      if (errorHandler && !errorHandler.__nuxt_default) {
        try {
          errorHandler(err, target, info);
        } catch (handlerError) {
          console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
        }
      }
    }
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        invokeAppErrorHandler(err, target, info);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));

export { useRouter as A, encodeRoutePath as B, resolveRouteObject as C, useNuxtApp as D, useRuntimeConfig as E, nuxtLinkDefaults as F, useAppConfig as G, asyncDataDefaults as H, createError as I, __nuxt_component_0 as _, useRoute as a, useGroups as b, __nuxt_component_8 as c, __nuxt_component_9 as d, entry_default as default, useName as e, createEmptyGroup as f, updateGroup as g, useGroupID as h, appConfig as i, computeTransaction as j, importSplitwise as k, importSupabase as l, mergeConfig as m, navigateTo as n, groupGetBalances as o, groupGetPayments as p, setName as q, round as r, storeToRefs as s, twMerge as t, useHead as u, useState as v, wipeData as w, looseToNumber as x, get as y, omit as z };
//# sourceMappingURL=server.mjs.map
