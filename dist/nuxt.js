"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkMUZYYAAQjs = require('./chunk-MUZYYAAQ.js');
require('./chunk-2VBGH4A4.js');
require('./chunk-EZUCZHGV.js');
require('./chunk-6F4PWJZI.js');

// src/nuxt.ts
function nuxt_default(options) {
  this.extendBuild((config) => {
    config.plugins = config.plugins || [];
    config.plugins.unshift(_chunkMUZYYAAQjs.unplugin_default.webpack(options));
  });
  this.nuxt.hook("vite:extend", async (vite) => {
    vite.config.plugins = vite.config.plugins || [];
    vite.config.plugins.push(_chunkMUZYYAAQjs.unplugin_default.vite(options));
  });
}


module.exports = nuxt_default;
exports.default = module.exports;