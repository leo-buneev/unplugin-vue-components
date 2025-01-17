import {
  unplugin_default
} from "./chunk-GOZFU6AO.mjs";
import "./chunk-LTPEKZZE.mjs";
import "./chunk-AKU6F3WT.mjs";
import "./chunk-WBQAMGXK.mjs";

// src/nuxt.ts
function nuxt_default(options) {
  this.extendBuild((config) => {
    config.plugins = config.plugins || [];
    config.plugins.unshift(unplugin_default.webpack(options));
  });
  this.nuxt.hook("vite:extend", async (vite) => {
    vite.config.plugins = vite.config.plugins || [];
    vite.config.plugins.push(unplugin_default.vite(options));
  });
}
export {
  nuxt_default as default
};
