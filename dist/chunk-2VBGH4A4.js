"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }// src/core/utils.ts
var _path = require('path');
var _minimatch = require('minimatch'); var _minimatch2 = _interopRequireDefault(_minimatch);
var _resolve = require('resolve'); var _resolve2 = _interopRequireDefault(_resolve);
var _utils = require('@antfu/utils');



var _localpkg = require('local-pkg');

// src/core/constants.ts
var DISABLE_COMMENT = "/* unplugin-vue-components disabled */";
var DIRECTIVE_IMPORT_PREFIX = "v";

// src/core/utils.ts
var isSSR = Boolean(process.env.SSR || process.env.SSG || process.env.VITE_SSR || process.env.VITE_SSG);
function pascalCase(str) {
  return capitalize(camelCase(str));
}
function camelCase(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : "");
}
function kebabCase(key) {
  const result = key.replace(/([A-Z])/g, " $1").trim();
  return result.split(" ").join("-").toLowerCase();
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function parseId(id) {
  const index = id.indexOf("?");
  if (index < 0) {
    return { path: id, query: {} };
  } else {
    const query = Object.fromEntries(new URLSearchParams(id.slice(index)));
    return {
      path: id.slice(0, index),
      query
    };
  }
}
function isEmpty(value) {
  if (!value || value === null || value === void 0 || Array.isArray(value) && Object.keys(value).length <= 0)
    return true;
  else
    return false;
}
function matchGlobs(filepath, globs) {
  for (const glob of globs) {
    if (_minimatch2.default.call(void 0, _utils.slash.call(void 0, filepath), glob))
      return true;
  }
  return false;
}
function getTransformedPath(path, importPathTransform) {
  if (importPathTransform) {
    const result = importPathTransform(path);
    if (result != null)
      path = result;
  }
  return path;
}
function stringifyImport(info) {
  if (typeof info === "string")
    return `import '${info}'`;
  if (!info.as)
    return `import '${info.from}'`;
  else if (info.name)
    return `import { ${info.name} as ${info.as} } from '${info.from}'`;
  else
    return `import ${info.as} from '${info.from}'`;
}
function normalizeComponetInfo(info) {
  if ("path" in info) {
    return {
      from: info.path,
      as: info.name,
      name: info.importName,
      sideEffects: info.sideEffects
    };
  }
  return info;
}
function stringifyComponentImport({ as: name, from: path, name: importName, sideEffects }, ctx) {
  path = getTransformedPath(path, ctx.options.importPathTransform);
  const imports = [
    stringifyImport({ as: name, from: path, name: importName })
  ];
  if (sideEffects)
    _utils.toArray.call(void 0, sideEffects).forEach((i) => imports.push(stringifyImport(i)));
  return imports.join(";");
}
function getNameFromFilePath(filePath, options) {
  const { resolvedDirs, directoryAsNamespace, globalNamespaces, collapseSamePrefixes } = options;
  const parsedFilePath = _path.parse.call(void 0, _utils.slash.call(void 0, filePath));
  let strippedPath = "";
  for (const dir of resolvedDirs) {
    if (parsedFilePath.dir.startsWith(dir)) {
      strippedPath = parsedFilePath.dir.slice(dir.length);
      break;
    }
  }
  let folders = strippedPath.slice(1).split("/").filter(Boolean);
  let filename = parsedFilePath.name;
  if (filename === "index" && !directoryAsNamespace) {
    filename = `${folders.slice(-1)[0]}`;
    return filename;
  }
  if (directoryAsNamespace) {
    if (globalNamespaces.some((name) => folders.includes(name)))
      folders = folders.filter((f) => !globalNamespaces.includes(f));
    folders = folders.map((f) => f.replace(/[^a-zA-Z0-9\-]/g, ""));
    if (filename.toLowerCase() === "index")
      filename = "";
    if (!isEmpty(folders)) {
      let namespaced = [...folders, filename];
      if (collapseSamePrefixes) {
        const collapsed = [];
        for (const fileOrFolderName of namespaced) {
          const collapsedFilename = collapsed.join("");
          if (collapsedFilename && fileOrFolderName.toLowerCase().startsWith(collapsedFilename.toLowerCase())) {
            const collapseSamePrefix = fileOrFolderName.slice(collapsedFilename.length);
            collapsed.push(collapseSamePrefix);
            continue;
          }
          collapsed.push(fileOrFolderName);
        }
        namespaced = collapsed;
      }
      filename = namespaced.filter(Boolean).join("-");
    }
    return filename;
  }
  return filename;
}
function resolveAlias(filepath, alias) {
  const result = filepath;
  if (Array.isArray(alias)) {
    for (const { find, replacement } of alias)
      result.replace(find, replacement);
  }
  return result;
}
async function getPkgVersion(pkgName, defaultVersion) {
  try {
    const isExist = _localpkg.isPackageExists.call(void 0, pkgName);
    if (isExist) {
      const pkg = await _localpkg.getPackageInfo.call(void 0, pkgName);
      return _nullishCoalesce((pkg == null ? void 0 : pkg.version), () => ( defaultVersion));
    } else {
      return defaultVersion;
    }
  } catch (err) {
    console.error(err);
    return defaultVersion;
  }
}
function shouldTransform(code) {
  if (code.includes(DISABLE_COMMENT))
    return false;
  return true;
}
function resolveImportPath(importName) {
  return _resolve2.default.sync(importName, {
    preserveSymlinks: false
  });
}


















exports.DISABLE_COMMENT = DISABLE_COMMENT; exports.DIRECTIVE_IMPORT_PREFIX = DIRECTIVE_IMPORT_PREFIX; exports.isSSR = isSSR; exports.pascalCase = pascalCase; exports.camelCase = camelCase; exports.kebabCase = kebabCase; exports.parseId = parseId; exports.matchGlobs = matchGlobs; exports.getTransformedPath = getTransformedPath; exports.normalizeComponetInfo = normalizeComponetInfo; exports.stringifyComponentImport = stringifyComponentImport; exports.getNameFromFilePath = getNameFromFilePath; exports.resolveAlias = resolveAlias; exports.getPkgVersion = getPkgVersion; exports.shouldTransform = shouldTransform; exports.resolveImportPath = resolveImportPath;
