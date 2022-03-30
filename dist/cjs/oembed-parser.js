// oembed-parser@3.0.0rc5, by @ndaidong - built with esbuild at 2022-03-02T07:07:04.790Z - published under MIT license
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/bind.js"(exports, module2) {
    "use strict";
    module2.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/utils.js"(exports, module2) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray2(val) {
      return Array.isArray(val);
    }
    function isUndefined2(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined2(val) && val.constructor !== null && !isUndefined2(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return toString.call(val) === "[object FormData]";
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString2(val) {
      return typeof val === "string";
    }
    function isNumber2(val) {
      return typeof val === "number";
    }
    function isObject2(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate2(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction2(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject2(val) && isFunction2(val.pipe);
    }
    function isURLSearchParams(val) {
      return toString.call(val) === "[object URLSearchParams]";
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray2(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray2(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module2.exports = {
      isArray: isArray2,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString: isString2,
      isNumber: isNumber2,
      isObject: isObject2,
      isPlainObject,
      isUndefined: isUndefined2,
      isDate: isDate2,
      isFile,
      isBlob,
      isFunction: isFunction2,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/buildURL.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module2.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/InterceptorManager.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module2.exports = InterceptorManager;
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/enhanceError.js"(exports, module2) {
    "use strict";
    module2.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      };
      return error;
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/createError.js"(exports, module2) {
    "use strict";
    var enhanceError = require_enhanceError();
    module2.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/settle.js"(exports, module2) {
    "use strict";
    var createError = require_createError();
    module2.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
      }
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/cookies.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module2) {
    "use strict";
    module2.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/combineURLs.js"(exports, module2) {
    "use strict";
    module2.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/buildFullPath.js"(exports, module2) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module2.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/parseHeaders.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module2.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/cancel/Cancel.js"(exports, module2) {
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module2.exports = Cancel;
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/adapters/xhr.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    module2.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || defaults.transitional;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/.pnpm/debug@4.3.3/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/debug@4.3.3/node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/.pnpm/debug@4.3.3/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/debug@4.3.3/node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/.pnpm/debug@4.3.3/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/debug@4.3.3/node_modules/debug/src/node.js"(exports, module2) {
    var tty = require("tty");
    var util = require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(() => {
    }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/.pnpm/debug@4.3.3/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/debug@4.3.3/node_modules/debug/src/index.js"(exports, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/.pnpm/follow-redirects@1.14.8/node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/.pnpm/follow-redirects@1.14.8/node_modules/follow-redirects/debug.js"(exports, module2) {
    var debug;
    module2.exports = function() {
      if (!debug) {
        try {
          debug = require_src()("follow-redirects");
        } catch (error) {
        }
        if (typeof debug !== "function") {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/.pnpm/follow-redirects@1.14.8/node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/.pnpm/follow-redirects@1.14.8/node_modules/follow-redirects/index.js"(exports, module2) {
    var url = require("url");
    var URL2 = url.URL;
    var http = require("http");
    var https = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug = require_debug();
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = /* @__PURE__ */ Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed");
    var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
    var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
    var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self = this;
      this._onNativeResponse = function(response) {
        self._processResponse(response);
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      abortRequest(this._currentRequest);
      this.emit("abort");
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (typeof data === "function") {
        callback = data;
        data = encoding = null;
      } else if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self._timeout) {
          clearTimeout(self._timeout);
        }
        self._timeout = setTimeout(function() {
          self.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self._timeout) {
          clearTimeout(self._timeout);
          self._timeout = null;
        }
        self.removeListener("abort", clearTimer);
        self.removeListener("error", clearTimer);
        self.removeListener("response", clearTimer);
        if (callback) {
          self.removeListener("timeout", callback);
        }
        if (!self.socket) {
          self._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (callback) {
        this.on("timeout", callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }
      if (this._options.agents) {
        var scheme = protocol.substr(0, protocol.length - 1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      this._currentUrl = url.format(this._options);
      request._redirectable = this;
      for (var e = 0; e < events.length; e++) {
        request.on(events[e], eventHandlers[events[e]]);
      }
      if (this._isRedirect) {
        var i = 0;
        var self = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          if (request === self._currentRequest) {
            if (error) {
              self.emit("error", error);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (location && this._options.followRedirects !== false && statusCode >= 300 && statusCode < 400) {
        abortRequest(this._currentRequest);
        response.destroy();
        if (++this._redirectCount > this._options.maxRedirects) {
          this.emit("error", new TooManyRedirectsError());
          return;
        }
        if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
          this._options.method = "GET";
          this._requestBodyBuffers = [];
          removeMatchingHeaders(/^content-/i, this._options.headers);
        }
        var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
        var currentUrlParts = url.parse(this._currentUrl);
        var currentHost = currentHostHeader || currentUrlParts.host;
        var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost }));
        var redirectUrl;
        try {
          redirectUrl = url.resolve(currentUrl, location);
        } catch (cause) {
          this.emit("error", new RedirectionError(cause));
          return;
        }
        debug("redirecting to", redirectUrl);
        this._isRedirect = true;
        var redirectUrlParts = url.parse(redirectUrl);
        Object.assign(this._options, redirectUrlParts);
        if (redirectUrlParts.protocol !== currentUrlParts.protocol || !isSameOrSubdomain(redirectUrlParts.host, currentHost)) {
          removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
        }
        if (typeof this._options.beforeRedirect === "function") {
          var responseDetails = { headers: response.headers };
          try {
            this._options.beforeRedirect.call(null, this._options, responseDetails);
          } catch (err) {
            this.emit("error", err);
            return;
          }
          this._sanitizeOptions(this._options);
        }
        try {
          this._performRequest();
        } catch (cause) {
          this.emit("error", new RedirectionError(cause));
        }
      } else {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
      }
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (typeof input === "string") {
            var urlStr = input;
            try {
              input = urlToOptions(new URL2(urlStr));
            } catch (err) {
              input = url.parse(urlStr);
            }
          } else if (URL2 && input instanceof URL2) {
            input = urlToOptions(input);
          } else {
            callback = options;
            options = input;
            input = { protocol };
          }
          if (typeof options === "function") {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get2(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get2, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports2;
    }
    function noop() {
    }
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href
      };
      if (urlObject.port !== "") {
        options.port = Number(urlObject.port);
      }
      return options;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, defaultMessage) {
      function CustomError(cause) {
        Error.captureStackTrace(this, this.constructor);
        if (!cause) {
          this.message = defaultMessage;
        } else {
          this.message = defaultMessage + ": " + cause.message;
          this.cause = cause;
        }
      }
      CustomError.prototype = new Error();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      CustomError.prototype.code = code;
      return CustomError;
    }
    function abortRequest(request) {
      for (var e = 0; e < events.length; e++) {
        request.removeListener(events[e], eventHandlers[events[e]]);
      }
      request.on("error", noop);
      request.abort();
    }
    function isSameOrSubdomain(subdomain, domain) {
      if (subdomain === domain) {
        return true;
      }
      const dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    module2.exports = wrap({ http, https });
    module2.exports.wrap = wrap;
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/env/data.js"(exports, module2) {
    module2.exports = {
      "version": "0.26.0"
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/adapters/http.js
var require_http = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/adapters/http.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var buildFullPath = require_buildFullPath();
    var buildURL = require_buildURL();
    var http = require("http");
    var https = require("https");
    var httpFollow = require_follow_redirects().http;
    var httpsFollow = require_follow_redirects().https;
    var url = require("url");
    var zlib = require("zlib");
    var VERSION = require_data().version;
    var createError = require_createError();
    var enhanceError = require_enhanceError();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    var isHttps = /https:?/;
    function setProxy(options, proxy, location) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.port = proxy.port;
      options.path = location;
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
      }
      options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }
    module2.exports = function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        var resolve = function resolve2(value) {
          done();
          resolvePromise(value);
        };
        var rejected = false;
        var reject = function reject2(value) {
          done();
          rejected = true;
          rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        var headerNames = {};
        Object.keys(headers).forEach(function storeLowerName(name) {
          headerNames[name.toLowerCase()] = name;
        });
        if ("user-agent" in headerNames) {
          if (!headers[headerNames["user-agent"]]) {
            delete headers[headerNames["user-agent"]];
          }
        } else {
          headers["User-Agent"] = "axios/" + VERSION;
        }
        if (data && !utils.isStream(data)) {
          if (Buffer.isBuffer(data)) {
          } else if (utils.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = Buffer.from(data, "utf-8");
          } else {
            return reject(createError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", config));
          }
          if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
            return reject(createError("Request body larger than maxBodyLength limit", config));
          }
          if (!headerNames["content-length"]) {
            headers["Content-Length"] = data.length;
          }
        }
        var auth = void 0;
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password || "";
          auth = username + ":" + password;
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || "http:";
        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(":");
          var urlUsername = urlAuth[0] || "";
          var urlPassword = urlAuth[1] || "";
          auth = urlUsername + ":" + urlPassword;
        }
        if (auth && headerNames.authorization) {
          delete headers[headerNames.authorization];
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        try {
          buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, "");
        } catch (err) {
          var customErr = new Error(err.message);
          customErr.config = config;
          customErr.url = config.url;
          customErr.exists = true;
          reject(customErr);
        }
        var options = {
          path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
          method: config.method.toUpperCase(),
          headers,
          agent,
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth
        };
        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + "_proxy";
          var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url.parse(proxyUrl);
            var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
            var shouldProxy = true;
            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(",").map(function trim(s) {
                return s.trim();
              });
              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === "*") {
                  return true;
                }
                if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }
                return parsed.hostname === proxyElement;
              });
            }
            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };
              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }
        if (proxy) {
          options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
          setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsProxy ? https : http;
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        }
        if (config.insecureHTTPParser) {
          options.insecureHTTPParser = config.insecureHTTPParser;
        }
        var req = transport.request(options, function handleResponse(res) {
          if (req.aborted)
            return;
          var stream = res;
          var lastRequest = res.req || req;
          if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
            switch (res.headers["content-encoding"]) {
              case "gzip":
              case "compress":
              case "deflate":
                stream = stream.pipe(zlib.createUnzip());
                delete res.headers["content-encoding"];
                break;
            }
          }
          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config,
            request: lastRequest
          };
          if (config.responseType === "stream") {
            response.data = stream;
            settle(resolve, reject, response);
          } else {
            var responseBuffer = [];
            var totalResponseBytes = 0;
            stream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;
              if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                rejected = true;
                stream.destroy();
                reject(createError("maxContentLength size of " + config.maxContentLength + " exceeded", config, null, lastRequest));
              }
            });
            stream.on("aborted", function handlerStreamAborted() {
              if (rejected) {
                return;
              }
              stream.destroy();
              reject(createError("error request aborted", config, "ERR_REQUEST_ABORTED", lastRequest));
            });
            stream.on("error", function handleStreamError(err) {
              if (req.aborted)
                return;
              reject(enhanceError(err, config, null, lastRequest));
            });
            stream.on("end", function handleStreamEnd() {
              try {
                var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
                if (config.responseType !== "arraybuffer") {
                  responseData = responseData.toString(config.responseEncoding);
                  if (!config.responseEncoding || config.responseEncoding === "utf8") {
                    responseData = utils.stripBOM(responseData);
                  }
                }
                response.data = responseData;
              } catch (err) {
                reject(enhanceError(err, config, err.code, response.request, response));
              }
              settle(resolve, reject, response);
            });
          }
        });
        req.on("error", function handleRequestError(err) {
          if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS")
            return;
          reject(enhanceError(err, config, null, req));
        });
        req.on("socket", function handleRequestSocket(socket) {
          socket.setKeepAlive(true, 1e3 * 60);
        });
        if (config.timeout) {
          var timeout = parseInt(config.timeout, 10);
          if (isNaN(timeout)) {
            reject(createError("error trying to parse `config.timeout` to int", config, "ERR_PARSE_TIMEOUT", req));
            return;
          }
          req.setTimeout(timeout, function handleRequestTimeout() {
            req.abort();
            var timeoutErrorMessage = "";
            if (config.timeoutErrorMessage) {
              timeoutErrorMessage = config.timeoutErrorMessage;
            } else {
              timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
            }
            var transitional = config.transitional || defaults.transitional;
            reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", req));
          });
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (req.aborted)
              return;
            req.abort();
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (utils.isStream(data)) {
          data.on("error", function handleStreamError(err) {
            reject(enhanceError(err, config, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/defaults.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var enhanceError = require_enhanceError();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_http();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw enhanceError(e, this, "E_JSON_PARSE");
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module2.exports = defaults;
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/transformData.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module2.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/cancel/isCancel.js"(exports, module2) {
    "use strict";
    module2.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/dispatchRequest.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new Cancel("canceled");
      }
    }
    module2.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/mergeConfig.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/validator.js"(exports, module2) {
    "use strict";
    var VERSION = require_data().version;
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, " has been removed" + (version ? " in " + version : "")));
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new TypeError("options must be an object");
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError("option " + opt + " must be " + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error("Unknown option " + opt);
        }
      }
    }
    module2.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/core/Axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module2.exports = Axios;
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/cancel/CancelToken.js"(exports, module2) {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module2.exports = CancelToken;
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/spread.js"(exports, module2) {
    "use strict";
    module2.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/helpers/isAxiosError.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/lib/axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios2 = createInstance(defaults);
    axios2.Axios = Axios;
    axios2.Cancel = require_Cancel();
    axios2.CancelToken = require_CancelToken();
    axios2.isCancel = require_isCancel();
    axios2.VERSION = require_data().version;
    axios2.all = function all(promises) {
      return Promise.all(promises);
    };
    axios2.spread = require_spread();
    axios2.isAxiosError = require_isAxiosError();
    module2.exports = axios2;
    module2.exports.default = axios2;
  }
});

// node_modules/.pnpm/axios@0.26.0/node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/.pnpm/axios@0.26.0/node_modules/axios/index.js"(exports, module2) {
    module2.exports = require_axios();
  }
});

// node_modules/.pnpm/bellajs@11.0.2/node_modules/bellajs/dist/cjs/bella.js
var require_bella = __commonJS({
  "node_modules/.pnpm/bellajs@11.0.2/node_modules/bellajs/dist/cjs/bella.js"(exports, module2) {
    var S = Object.defineProperty;
    var U = Object.getOwnPropertyDescriptor;
    var q = Object.getOwnPropertyNames;
    var F = Object.prototype.hasOwnProperty;
    var R = (t) => S(t, "__esModule", { value: true });
    var z = (t, e) => {
      for (var r in e)
        S(t, r, { get: e[r], enumerable: true });
    };
    var B = (t, e, r, n) => {
      if (e && typeof e == "object" || typeof e == "function")
        for (let o of q(e))
          !F.call(t, o) && (r || o !== "default") && S(t, o, { get: () => e[o], enumerable: !(n = U(e, o)) || n.enumerable });
      return t;
    };
    var H = ((t) => (e, r) => t && t.get(e) || (r = B(R({}), e, 1), t && t.set(e, r), r))(typeof WeakMap != "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
    var gt = {};
    z(gt, { clone: () => M, compose: () => it, copies: () => I, curry: () => ct, equals: () => A, escapeHTML: () => Z, formatDateString: () => ot, formatTimeAgo: () => st, genid: () => et, hasProperty: () => a, isArray: () => u, isBoolean: () => V, isDate: () => h, isElement: () => G, isEmail: () => Y, isEmpty: () => d, isFunction: () => X, isInteger: () => $, isLetter: () => W, isNil: () => _, isNull: () => E, isNumber: () => y, isObject: () => l, isString: () => p, isUndefined: () => N, maybe: () => b, pick: () => at, pipe: () => ut, randint: () => O, replaceAll: () => w, shuffle: () => P, slugify: () => rt, sort: () => L, sortBy: () => ft, stripAccent: () => D, stripTags: () => Q, truncate: () => K, ucfirst: () => T, ucwords: () => tt, unescapeHTML: () => v, unique: () => lt });
    var m = (t) => ({}).toString.call(t);
    var $ = (t) => Number.isInteger(t);
    var u = (t) => Array.isArray(t);
    var p = (t) => String(t) === t;
    var y = (t) => Number(t) === t;
    var V = (t) => Boolean(t) === t;
    var E = (t) => m(t) === "[object Null]";
    var N = (t) => m(t) === "[object Undefined]";
    var _ = (t) => N(t) || E(t);
    var X = (t) => m(t) === "[object Function]";
    var l = (t) => m(t) === "[object Object]" && !u(t);
    var h = (t) => t instanceof Date && !isNaN(t.valueOf());
    var G = (t) => m(t).match(/^\[object HTML\w*Element]$/) !== null;
    var W = (t) => {
      let e = /^[a-z]+$/i;
      return p(t) && e.test(t);
    };
    var Y = (t) => {
      let e = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return p(t) && e.test(t);
    };
    var d = (t) => !t || _(t) || p(t) && t === "" || u(t) && t.length === 0 || l(t) && Object.keys(t).length === 0;
    var a = (t, e) => !t || !e ? false : Object.prototype.hasOwnProperty.call(t, e);
    var A = (t, e) => {
      if (d(t) && d(e))
        return true;
      if (h(t) && h(e))
        return t.getTime() === e.getTime();
      if (u(t) && u(e)) {
        if (t.length !== e.length)
          return false;
        let r = true;
        for (let n = 0; n < t.length; n++)
          if (!A(t[n], e[n])) {
            r = false;
            break;
          }
        return r;
      }
      if (l(t) && l(e)) {
        if (Object.keys(t).length !== Object.keys(e).length)
          return false;
        let r = true;
        for (let n in t)
          if (!a(e, n) || !A(t[n], e[n])) {
            r = false;
            break;
          }
        return r;
      }
      return t === e;
    };
    var J = Number.MAX_SAFE_INTEGER;
    var O = (t, e) => {
      if ((!t || t < 0) && (t = 0), e || (e = J), t === e)
        return e;
      t > e && (t = Math.min(t, e), e = Math.max(t, e));
      let r = t, n = e - t + 1;
      return Math.floor(Math.random() * n) + r;
    };
    var g = (t) => {
      let e = y(t) ? String(t) : t;
      if (!p(e))
        throw new Error("InvalidInput: String required.");
      return e;
    };
    var K = (t, e) => {
      let r = g(t), n = e || 140;
      if (r.length <= n)
        return r;
      let o = r.substring(0, n), s = o.split(" "), i = s.length, c = "";
      return i > 1 ? (s.pop(), c += s.join(" "), c.length < r.length && (c += "...")) : (o = o.substring(0, n - 3), c = o + "..."), c;
    };
    var Q = (t) => g(t).replace(/<.*?>/gi, " ").replace(/\s\s+/g, " ").trim();
    var Z = (t) => g(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    var v = (t) => g(t).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    var T = (t) => {
      let e = g(t).toLowerCase();
      return e.length > 1 ? e.charAt(0).toUpperCase() + e.slice(1) : e.toUpperCase();
    };
    var tt = (t) => g(t).split(" ").map((e) => T(e)).join(" ");
    var w = (t, e, r) => {
      let n = g(t);
      if (y(e) && (e = String(e)), y(r) && (r = String(r)), p(e) && p(r))
        n = n.split(e).join(r);
      else if (u(e) && p(r))
        e.forEach((o) => {
          n = w(n, o, r);
        });
      else if (u(e) && u(r) && e.length === r.length) {
        let o = e.length;
        if (o > 0)
          for (let s = 0; s < o; s++) {
            let i = e[s], c = r[s];
            n = w(n, i, c);
          }
      }
      return n;
    };
    var D = (t) => {
      let e = g(t), r = { a: "á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ|ä", A: "Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Ä", c: "ç", C: "Ç", d: "đ", D: "Đ", e: "é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|ë", E: "É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ|Ë", i: "í|ì|ỉ|ĩ|ị|ï|î", I: "Í|Ì|Ỉ|Ĩ|Ị|Ï|Î", o: "ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ|ö", O: "Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ô|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ|Ö", u: "ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|û", U: "Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự|Û", y: "ý|ỳ|ỷ|ỹ|ỵ", Y: "Ý|Ỳ|Ỷ|Ỹ|Ỵ" }, n = (o, s) => {
        e = w(e, o, s);
      };
      for (let o in r)
        a(r, o) && r[o].split("|").forEach((i) => n(i, o));
      return e;
    };
    var et = (t, e = "") => {
      let r = "abcdefghijklmnopqrstuvwxyz", n = r.toUpperCase(), s = [r, n, "0123456789"].join("").split("").sort(() => Math.random() > 0.5).join(""), i = s.length, c = Math.max(t || 32, e.length), f = e;
      for (; f.length < c; ) {
        let C = O(0, i);
        f += s.charAt(C) || "";
      }
      return f;
    };
    var rt = (t, e = "-") => D(t).trim().toLowerCase().replace(/\W+/g, " ").replace(/\s+/g, " ").replace(/\s/g, e);
    var k = { dateStyle: "medium", timeStyle: "long" };
    var j = { second: 1e3, minute: 60, hour: 60, day: 24, week: 7, month: 4, year: 12 };
    var nt = (t) => {
      try {
        return new Intl.Locale(t).language !== "";
      } catch {
        return false;
      }
    };
    var ot = (...t) => {
      let e = t[0], r = nt(t[1]) ? t[1] : "en", n = t.length >= 3 ? t[2] : t.length === 1 ? k : l(t[1]) ? t[1] : k;
      return new Intl.DateTimeFormat(r, n).format(new Date(e));
    };
    var st = (t, e = "en", r = "just now") => {
      let n = new Date(t), o = Date.now() - n;
      if (o <= j.second)
        return r;
      let s = "second";
      for (let c in j) {
        if (o < j[c])
          break;
        s = c, o /= j[c];
      }
      return o = Math.floor(o), new Intl.RelativeTimeFormat(e).format(-o, s);
    };
    var ct = (t) => {
      let e = t.length, r = (n, o) => n > 0 ? (...s) => r(n - s.length, [...o, ...s]) : t(...o);
      return r(e, []);
    };
    var it = (...t) => t.reduce((e, r) => (n) => e(r(n)));
    var ut = (...t) => t.reduce((e, r) => (n) => r(e(n)));
    var x = (t, e, r, n = {}) => {
      let { writable: o = false, configurable: s = false, enumerable: i = false } = n;
      Object.defineProperty(t, e, { value: r, writable: o, configurable: s, enumerable: i });
    };
    var b = (t) => {
      let e = t, r = () => e == null, n = () => e, o = (f) => b(e || f()), s = (f) => b(f(e) === true ? e : null), i = (f) => b(r() ? null : f(e)), c = /* @__PURE__ */ Object.create({});
      return x(c, "__value__", e, { enumerable: true }), x(c, "__type__", "Maybe", { enumerable: true }), x(c, "isNil", r), x(c, "value", n), x(c, "map", i), x(c, "if", s), x(c, "else", o), c;
    };
    var M = (t, e = null) => {
      let r = e || /* @__PURE__ */ new Set();
      if (r.has(t))
        return t;
      if (r.add(t), h(t))
        return new Date(t.valueOf());
      let n = (s) => {
        let i = /* @__PURE__ */ Object.create({});
        for (let c in s)
          a(s, c) && (i[c] = M(s[c], r));
        return i;
      }, o = (s) => [...s].map((i) => u(i) ? o(i) : l(i) ? n(i) : M(i, r));
      return u(t) ? o(t) : l(t) ? n(t) : t;
    };
    var I = (t, e, r = false, n = []) => {
      for (let o in t)
        if (!(n.length > 0 && n.includes(o)) && (!r || r && a(e, o))) {
          let s = t[o], i = e[o];
          l(i) && l(s) || u(i) && u(s) ? e[o] = I(s, e[o], r, n) : e[o] = M(s);
        }
      return e;
    };
    var lt = (t = []) => [...new Set(t)];
    var pt = (t, e) => t > e ? 1 : t < e ? -1 : 0;
    var L = (t = [], e = null) => {
      let r = [...t], n = e || pt;
      return r.sort(n), r;
    };
    var ft = (t = [], e = 1, r = "") => !p(r) || !a(t[0], r) ? t : L(t, (n, o) => n[r] > o[r] ? e : n[r] < o[r] ? -1 * e : 0);
    var P = (t = []) => {
      let e = [...t], r = [], n = e.length;
      for (; n > 0; ) {
        let o = Math.floor(Math.random() * n);
        r.push(e.splice(o, 1)[0]), n--;
      }
      return r;
    };
    var at = (t = [], e = 1) => {
      let r = P(t), n = Math.max(1, e), o = Math.min(n, r.length - 1);
      return r.splice(0, o);
    };
    module2.exports = H(gt);
  }
});

// src/main.js
var main_exports = {};
__export(main_exports, {
  extract: () => extract,
  findProvider: () => find,
  hasProvider: () => has,
  setProviderList: () => set,
  setRequestOptions: () => setRequestOptions
});

// src/utils/isValidURL.js
var isValidURL_default = (url = "") => {
  try {
    const ourl = new URL(url);
    return ourl !== null && ourl.protocol.startsWith("http");
  } catch (err) {
    return false;
  }
};

// src/utils/retrieve.js
var import_axios = __toESM(require_axios2(), 1);

// src/config.js
var import_bellajs = __toESM(require_bella(), 1);
var requestOptions = {
  headers: {
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:95.0) Gecko/20100101 Firefox/95.0",
    accept: "application/json; charset=utf-8"
  },
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 6e4,
  maxRedirects: 3
};
var getRequestOptions = () => {
  return (0, import_bellajs.clone)(requestOptions);
};
var setRequestOptions = (opts) => {
  (0, import_bellajs.copies)(opts, requestOptions);
};

// src/utils/retrieve.js
var retrieve_default = async (url) => {
  try {
    const res = await import_axios.default.get(url, getRequestOptions());
    const contentType = res.headers["content-type"] || "";
    if (!contentType || !contentType.includes("application/json")) {
      return null;
    }
    return res.data;
  } catch (err) {
    return null;
  }
};

// src/utils/fetchEmbed.js
var isFacebookGraphDependent = (url) => {
  return url.includes("facebook.com") || url.includes("instagram.com");
};
var getFacebookGraphToken = () => {
  const env = process.env || {};
  const appId = env.FACEBOOK_APP_ID || "845078789498971";
  const clientToken = env.FACEBOOK_CLIENT_TOKEN || "8ff3ab4ddd45b8f018b35c4fb7edac62";
  return `${appId}|${clientToken}`;
};
var getRegularUrl = (query, basseUrl) => {
  return basseUrl.replace(/\{format\}/g, "json") + "?" + query;
};
var fetchEmbed_default = async (url, provider, params = {}) => {
  const query = __spreadValues({
    url,
    format: "json"
  }, params);
  if (query.maxwidth <= 0) {
    delete query.maxwidth;
  }
  if (query.maxheight <= 0) {
    delete query.maxheight;
  }
  if (isFacebookGraphDependent(provider.providerUrl)) {
    query.access_token = getFacebookGraphToken();
  }
  const queryParams = new URLSearchParams(query).toString();
  const link = getRegularUrl(queryParams, provider.fetchEndpoint);
  const body = retrieve_default(link);
  return body;
};

// src/utils/getDomain.js
var getDomain_default = (url = "") => {
  try {
    const { host } = new URL(url);
    return host;
  } catch (err) {
    return "";
  }
};

// src/utils/providers.latest.js
var providers = [
  {
    "provider_name": "23HQ",
    "provider_url": "http://www.23hq.com",
    "endpoints": [
      {
        "schemes": [
          "http://www.23hq.com/*/photo/*"
        ],
        "url": "http://www.23hq.com/23/oembed"
      }
    ]
  },
  {
    "provider_name": "Abraia",
    "provider_url": "https://abraia.me",
    "endpoints": [
      {
        "schemes": [
          "https://store.abraia.me/*"
        ],
        "url": "https://api.abraia.me/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "ActBlue",
    "provider_url": "https://secure.actblue.com",
    "endpoints": [
      {
        "schemes": [
          "https://secure.actblue.com/donate/*"
        ],
        "url": "https://secure.actblue.com/cf/oembed"
      }
    ]
  },
  {
    "provider_name": "Adways",
    "provider_url": "http://www.adways.com",
    "endpoints": [
      {
        "schemes": [
          "http://play.adpaths.com/experience/*"
        ],
        "url": "http://play.adpaths.com/oembed/*"
      }
    ]
  },
  {
    "provider_name": "afreecaTV",
    "provider_url": "https://www.afreecatv.com",
    "endpoints": [
      {
        "schemes": [
          "https://v.afree.ca/ST/",
          "https://vod.afreecatv.com/ST/",
          "https://vod.afreecatv.com/PLAYER/STATION/",
          "https://play.afreecatv.com/"
        ],
        "url": "https://openapi.afreecatv.com/oembed/embedinfo",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Altium LLC",
    "provider_url": "https://altium.com",
    "endpoints": [
      {
        "schemes": [
          "https://altium.com/viewer/*"
        ],
        "url": "https://viewer.altium.com/shell/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Altru",
    "provider_url": "https://www.altrulabs.com",
    "endpoints": [
      {
        "schemes": [
          "https://app.altrulabs.com/*/*?answer_id=*",
          "https://app.altrulabs.com/player/*"
        ],
        "url": "https://api.altrulabs.com/api/v1/social/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "amCharts Live Editor",
    "provider_url": "https://live.amcharts.com/",
    "endpoints": [
      {
        "schemes": [
          "http://live.amcharts.com/*",
          "https://live.amcharts.com/*"
        ],
        "url": "https://live.amcharts.com/oembed"
      }
    ]
  },
  {
    "provider_name": "Amtraker",
    "provider_url": "https://amtraker.com",
    "endpoints": [
      {
        "schemes": [
          "https://amtraker.com/view.html*",
          "https://www.amtraker.com/view.html*",
          "https://beta.amtraker.com/view.html*",
          "https://whereismytrain.us/view.html*",
          "https://www.whereismytrain.us/view.html*",
          "https://whereismyfuckingtrain.com/view.html*",
          "https://www.whereismyfuckingtrain.com/view.html*",
          "https://amtrak.cc/view.html*",
          "https://www.amtrak.cc/view.html*"
        ],
        "url": "https://api.amtrak.cc/v2/oembed",
        "discovery": false
      }
    ]
  },
  {
    "provider_name": "Animatron",
    "provider_url": "https://www.animatron.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.animatron.com/project/*",
          "https://animatron.com/project/*"
        ],
        "url": "https://animatron.com/oembed/json",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Animoto",
    "provider_url": "http://animoto.com/",
    "endpoints": [
      {
        "schemes": [
          "http://animoto.com/play/*"
        ],
        "url": "http://animoto.com/oembeds/create"
      }
    ]
  },
  {
    "provider_name": "AnnieMusic",
    "provider_url": "https://anniemusic.app",
    "endpoints": [
      {
        "schemes": [
          "https://anniemusic.app/t/*",
          "https://anniemusic.app/p/*"
        ],
        "url": "https://api.anniemusic.app/api/v1/oembed"
      }
    ]
  },
  {
    "provider_name": "Apester",
    "provider_url": "https://www.apester.com",
    "endpoints": [
      {
        "schemes": [
          "https://renderer.apester.com/v2/*?preview=true&iframe_preview=true"
        ],
        "url": "https://display.apester.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "ArcGIS StoryMaps",
    "provider_url": "https://storymaps.arcgis.com",
    "endpoints": [
      {
        "schemes": [
          "https://storymaps.arcgis.com/stories/*"
        ],
        "url": "https://storymaps.arcgis.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Archivos",
    "provider_url": "https://app.archivos.digital",
    "endpoints": [
      {
        "schemes": [
          "https://app.archivos.digital/app/view/*"
        ],
        "url": "https://app.archivos.digital/oembed/"
      }
    ]
  },
  {
    "provider_name": "Audioboom",
    "provider_url": "https://audioboom.com",
    "endpoints": [
      {
        "schemes": [
          "https://audioboom.com/channels/*",
          "https://audioboom.com/channel/*",
          "https://audioboom.com/posts/*"
        ],
        "url": "https://audioboom.com/publishing/oembed/v4.{format}",
        "formats": [
          "json",
          "xml"
        ]
      }
    ]
  },
  {
    "provider_name": "AudioClip",
    "provider_url": "https://audioclip.naver.com",
    "endpoints": [
      {
        "schemes": [
          "https://audioclip.naver.com/channels/*/clips/*",
          "https://audioclip.naver.com/audiobooks/*"
        ],
        "url": "https://audioclip.naver.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Audiomack",
    "provider_url": "https://audiomack.com",
    "endpoints": [
      {
        "schemes": [
          "https://audiomack.com/*/song/*",
          "https://audiomack.com/*/album/*",
          "https://audiomack.com/*/playlist/*"
        ],
        "url": "https://audiomack.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Audiomeans",
    "provider_url": "https://audiomeans.fr",
    "endpoints": [
      {
        "schemes": [
          "https://podcasts.audiomeans.fr/*"
        ],
        "url": "https://podcasts.audiomeans.fr/services/oembed",
        "discovery": false,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Avocode",
    "provider_url": "https://www.avocode.com/",
    "endpoints": [
      {
        "schemes": [
          "https://app.avocode.com/view/*"
        ],
        "url": "https://stage-embed.avocode.com/api/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Backtracks",
    "provider_url": "https://backtracks.fm",
    "endpoints": [
      {
        "schemes": [
          "https://backtracks.fm/*/*/e/*",
          "https://backtracks.fm/*/s/*/*",
          "https://backtracks.fm/*/*/*/*/e/*/*",
          "https://backtracks.fm/*",
          "http://backtracks.fm/*"
        ],
        "url": "https://backtracks.fm/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Beautiful.AI",
    "provider_url": "https://www.beautiful.ai/",
    "endpoints": [
      {
        "url": "https://www.beautiful.ai/api/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Blackfire.io",
    "provider_url": "https://blackfire.io",
    "endpoints": [
      {
        "schemes": [
          "https://blackfire.io/profiles/*/graph",
          "https://blackfire.io/profiles/compare/*/graph"
        ],
        "url": "https://blackfire.io/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Blogcast",
    "provider_url": "https://blogcast.host/",
    "endpoints": [
      {
        "schemes": [
          "https://blogcast.host/embed/*",
          "https://blogcast.host/embedly/*"
        ],
        "url": "https://blogcast.host/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Box Office Buz",
    "provider_url": "http://boxofficebuz.com",
    "endpoints": [
      {
        "url": "http://boxofficebuz.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "BrioVR",
    "provider_url": "https://view.briovr.com/",
    "endpoints": [
      {
        "schemes": [
          "https://view.briovr.com/api/v1/worlds/oembed/*"
        ],
        "url": "https://view.briovr.com/api/v1/worlds/oembed/"
      }
    ]
  },
  {
    "provider_name": "Buttondown",
    "provider_url": "https://buttondown.email/",
    "endpoints": [
      {
        "schemes": [
          "https://buttondown.email/*"
        ],
        "url": "https://buttondown.email/embed",
        "formats": [
          "json"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Byzart Project",
    "provider_url": "https://cmc.byzart.eu",
    "endpoints": [
      {
        "schemes": [
          "https://cmc.byzart.eu/files/*"
        ],
        "url": "https://cmc.byzart.eu/oembed/",
        "discovery": false
      }
    ]
  },
  {
    "provider_name": "Cacoo",
    "provider_url": "https://cacoo.com",
    "endpoints": [
      {
        "schemes": [
          "https://cacoo.com/diagrams/*"
        ],
        "url": "http://cacoo.com/oembed.{format}"
      }
    ]
  },
  {
    "provider_name": "Catapult",
    "provider_url": "https://www.catapult.app/",
    "endpoints": [
      {
        "schemes": [
          "https://www-catapult-app.sandbox.hs-sites.com/video-page*",
          "https://www-catapult.app/video-page*"
        ],
        "url": "https://www.catapult.app/_hcms/api/video/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "CatBoat",
    "provider_url": "http://img.catbo.at/",
    "endpoints": [
      {
        "schemes": [
          "http://img.catbo.at/*"
        ],
        "url": "http://img.catbo.at/oembed.json",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Ceros",
    "provider_url": "http://www.ceros.com/",
    "endpoints": [
      {
        "schemes": [
          "http://view.ceros.com/*"
        ],
        "url": "http://view.ceros.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Chainflix",
    "provider_url": "https://chainflix.net",
    "endpoints": [
      {
        "schemes": [
          "https://chainflix.net/video/*",
          "https://chainflix.net/video/embed/*",
          "https://*.chainflix.net/video/*",
          "https://*.chainflix.net/video/embed/*"
        ],
        "url": "https://www.chainflix.net/video/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "ChartBlocks",
    "provider_url": "http://www.chartblocks.com/",
    "endpoints": [
      {
        "schemes": [
          "http://public.chartblocks.com/c/*"
        ],
        "url": "http://embed.chartblocks.com/1.0/oembed"
      }
    ]
  },
  {
    "provider_name": "chirbit.com",
    "provider_url": "http://www.chirbit.com/",
    "endpoints": [
      {
        "schemes": [
          "http://chirb.it/*"
        ],
        "url": "http://chirb.it/oembed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "CHROCO",
    "provider_url": "https://chroco.ooo/",
    "endpoints": [
      {
        "schemes": [
          "https://chroco.ooo/mypage/*",
          "https://chroco.ooo/story/*"
        ],
        "url": "https://chroco.ooo/embed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "CircuitLab",
    "provider_url": "https://www.circuitlab.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.circuitlab.com/circuit/*"
        ],
        "url": "https://www.circuitlab.com/circuit/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Clipland",
    "provider_url": "http://www.clipland.com/",
    "endpoints": [
      {
        "schemes": [
          "http://www.clipland.com/v/*",
          "https://www.clipland.com/v/*"
        ],
        "url": "https://www.clipland.com/api/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Clyp",
    "provider_url": "http://clyp.it/",
    "endpoints": [
      {
        "schemes": [
          "http://clyp.it/*",
          "http://clyp.it/playlist/*"
        ],
        "url": "http://api.clyp.it/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "CoCo Corp",
    "provider_url": "https://ilovecoco.video",
    "endpoints": [
      {
        "schemes": [
          "https://app.ilovecoco.video/*/embed"
        ],
        "url": "https://app.ilovecoco.video/api/oembed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "CodeHS",
    "provider_url": "http://www.codehs.com",
    "endpoints": [
      {
        "schemes": [
          "https://codehs.com/editor/share_abacus/*"
        ],
        "url": "https://codehs.com/api/sharedprogram/*/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "CodePen",
    "provider_url": "https://codepen.io",
    "endpoints": [
      {
        "schemes": [
          "http://codepen.io/*",
          "https://codepen.io/*"
        ],
        "url": "https://codepen.io/api/oembed"
      }
    ]
  },
  {
    "provider_name": "Codepoints",
    "provider_url": "https://codepoints.net",
    "endpoints": [
      {
        "schemes": [
          "http://codepoints.net/*",
          "https://codepoints.net/*",
          "http://www.codepoints.net/*",
          "https://www.codepoints.net/*"
        ],
        "url": "https://codepoints.net/api/v1/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "CodeSandbox",
    "provider_url": "https://codesandbox.io",
    "endpoints": [
      {
        "schemes": [
          "https://codesandbox.io/s/*",
          "https://codesandbox.io/embed/*"
        ],
        "url": "https://codesandbox.io/oembed"
      }
    ]
  },
  {
    "provider_name": "CollegeHumor",
    "provider_url": "http://www.collegehumor.com/",
    "endpoints": [
      {
        "schemes": [
          "http://www.collegehumor.com/video/*"
        ],
        "url": "http://www.collegehumor.com/oembed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Commaful",
    "provider_url": "https://commaful.com",
    "endpoints": [
      {
        "schemes": [
          "https://commaful.com/play/*"
        ],
        "url": "https://commaful.com/api/oembed/"
      }
    ]
  },
  {
    "provider_name": "Coub",
    "provider_url": "http://coub.com/",
    "endpoints": [
      {
        "schemes": [
          "http://coub.com/view/*",
          "http://coub.com/embed/*"
        ],
        "url": "http://coub.com/api/oembed.{format}"
      }
    ]
  },
  {
    "provider_name": "Crowd Ranking",
    "provider_url": "http://crowdranking.com",
    "endpoints": [
      {
        "schemes": [
          "http://crowdranking.com/*/*"
        ],
        "url": "http://crowdranking.com/api/oembed.{format}"
      }
    ]
  },
  {
    "provider_name": "Crumb.sh",
    "provider_url": "https://crumb.sh",
    "endpoints": [
      {
        "schemes": [
          "https://crumb.sh/*"
        ],
        "url": "https://crumb.sh/oembed/"
      }
    ]
  },
  {
    "provider_name": "Cueup DJ Booking",
    "provider_url": "https://cueup.io",
    "endpoints": [
      {
        "schemes": [
          "https://cueup.io/user/*/sounds/*"
        ],
        "url": "https://gql.cueup.io/oembed"
      }
    ]
  },
  {
    "provider_name": "Curated",
    "provider_url": "https://curated.co/",
    "endpoints": [
      {
        "schemes": [
          "https://*.curated.co/*"
        ],
        "url": "https://api.curated.co/oembed",
        "formats": [
          "json"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "CustomerDB",
    "provider_url": "http://customerdb.com/",
    "endpoints": [
      {
        "schemes": [
          "https://app.customerdb.com/share/*"
        ],
        "url": "https://app.customerdb.com/embed"
      }
    ]
  },
  {
    "provider_name": "dadan",
    "provider_url": "https://www.dadan.io",
    "endpoints": [
      {
        "schemes": [
          "https://app.dadan.io/*",
          "https://stage.dadan.io/*"
        ],
        "url": "https://app.dadan.io/api/video/oembed",
        "discovery": true,
        "formats": [
          "json",
          "xml"
        ]
      }
    ]
  },
  {
    "provider_name": "Dailymotion",
    "provider_url": "https://www.dailymotion.com",
    "endpoints": [
      {
        "schemes": [
          "https://www.dailymotion.com/video/*"
        ],
        "url": "https://www.dailymotion.com/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "DALEXNI",
    "provider_url": "https://dalexni.com/",
    "endpoints": [
      {
        "schemes": [
          "https://dalexni.com/i/*"
        ],
        "url": "https://dalexni.com/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Datawrapper",
    "provider_url": "http://www.datawrapper.de",
    "endpoints": [
      {
        "schemes": [
          "https://datawrapper.dwcdn.net/*"
        ],
        "url": "https://api.datawrapper.de/v3/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Deseret News",
    "provider_url": "https://www.deseret.com",
    "endpoints": [
      {
        "schemes": [
          "https://*.deseret.com/*"
        ],
        "url": "https://embed.deseret.com/"
      }
    ]
  },
  {
    "provider_name": "Deviantart.com",
    "provider_url": "http://www.deviantart.com",
    "endpoints": [
      {
        "schemes": [
          "http://*.deviantart.com/art/*",
          "http://*.deviantart.com/*#/d*",
          "http://fav.me/*",
          "http://sta.sh/*",
          "https://*.deviantart.com/art/*",
          "https://*.deviantart.com/*/art/*",
          'https://sta.sh/*",',
          'https://*.deviantart.com/*#/d*"'
        ],
        "url": "http://backend.deviantart.com/oembed"
      }
    ]
  },
  {
    "provider_name": "Didacte",
    "provider_url": "https://www.didacte.com/",
    "endpoints": [
      {
        "schemes": [
          "https://*.didacte.com/a/course/*"
        ],
        "url": "https://*.didacte.com/cards/oembed",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Digiteka",
    "provider_url": "https://www.ultimedia.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.ultimedia.com/central/video/edit/id/*/topic_id/*/",
          "https://www.ultimedia.com/default/index/videogeneric/id/*/showtitle/1/viewnc/1",
          "https://www.ultimedia.com/default/index/videogeneric/id/*"
        ],
        "url": "https://www.ultimedia.com/api/search/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "DocDroid",
    "provider_url": "https://www.docdroid.net/",
    "endpoints": [
      {
        "schemes": [
          "https://*.docdroid.net/*",
          "http://*.docdroid.net/*",
          "https://docdro.id/*",
          "http://docdro.id/*",
          "https://*.docdroid.com/*",
          "http://*.docdroid.com/*"
        ],
        "url": "https://www.docdroid.net/api/oembed",
        "formats": [
          "json"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Dotsub",
    "provider_url": "http://dotsub.com/",
    "endpoints": [
      {
        "schemes": [
          "http://dotsub.com/view/*"
        ],
        "url": "http://dotsub.com/services/oembed"
      }
    ]
  },
  {
    "provider_name": "DTube",
    "provider_url": "https://d.tube/",
    "endpoints": [
      {
        "schemes": [
          "https://d.tube/v/*"
        ],
        "url": "https://api.d.tube/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "eduMedia",
    "provider_url": "https://www.edumedia-sciences.com/",
    "endpoints": [
      {
        "url": "https://www.edumedia-sciences.com/oembed.json",
        "discovery": true
      },
      {
        "url": "https://www.edumedia-sciences.com/oembed.xml",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "EgliseInfo",
    "provider_url": "http://egliseinfo.catholique.fr/",
    "endpoints": [
      {
        "schemes": [
          "http://egliseinfo.catholique.fr/*"
        ],
        "url": "http://egliseinfo.catholique.fr/api/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Embedery",
    "provider_url": "https://embedery.com/",
    "endpoints": [
      {
        "schemes": [
          "https://embedery.com/widget/*"
        ],
        "url": "https://embedery.com/api/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Embedly",
    "provider_url": "http://api.embed.ly/",
    "endpoints": [
      {
        "url": "http://api.embed.ly/1/oembed"
      }
    ]
  },
  {
    "provider_name": "Enystre Music",
    "provider_url": "https://music.enystre.com",
    "endpoints": [
      {
        "schemes": [
          "https://music.enystre.com/lyrics/*"
        ],
        "url": "https://music.enystre.com/oembed",
        "formats": [
          "json",
          "xml"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Ethfiddle",
    "provider_url": "https://www.ethfiddle.com/",
    "endpoints": [
      {
        "schemes": [
          "https://ethfiddle.com/*"
        ],
        "url": "https://ethfiddle.com/services/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "EventLive",
    "provider_url": "https://eventlive.pro",
    "endpoints": [
      {
        "schemes": [
          "https://evt.live/*",
          "https://evt.live/*/*",
          "https://live.eventlive.pro/*",
          "https://live.eventlive.pro/*/*"
        ],
        "url": "https://evt.live/api/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Ex.Co",
    "provider_url": "https://ex.co",
    "endpoints": [
      {
        "schemes": [
          "https://app.ex.co/stories/*",
          "https://www.playbuzz.com/*"
        ],
        "url": "https://oembed.ex.co/item",
        "discovery": false
      }
    ]
  },
  {
    "provider_name": "Eyrie",
    "provider_url": "https://eyrie.io/",
    "endpoints": [
      {
        "schemes": [
          "https://eyrie.io/board/*",
          "https://eyrie.io/sparkfun/*"
        ],
        "url": "https://eyrie.io/v1/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Facebook",
    "provider_url": "https://www.facebook.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.facebook.com/*/posts/*",
          "https://www.facebook.com/*/activity/*",
          "https://www.facebook.com/*/photos/*",
          "https://www.facebook.com/photo.php?fbid=*",
          "https://www.facebook.com/photos/*",
          "https://www.facebook.com/permalink.php?story_fbid=*",
          "https://www.facebook.com/media/set?set=*",
          "https://www.facebook.com/questions/*",
          "https://www.facebook.com/notes/*/*/*"
        ],
        "url": "https://graph.facebook.com/v10.0/oembed_post",
        "discovery": false
      },
      {
        "schemes": [
          "https://www.facebook.com/*/videos/*",
          "https://www.facebook.com/video.php?id=*",
          "https://www.facebook.com/video.php?v=*"
        ],
        "url": "https://graph.facebook.com/v10.0/oembed_video",
        "discovery": false
      },
      {
        "schemes": [
          "https://www.facebook.com/*"
        ],
        "url": "https://graph.facebook.com/v10.0/oembed_page",
        "discovery": false
      }
    ]
  },
  {
    "provider_name": "Fader",
    "provider_url": "https://app.getfader.com",
    "endpoints": [
      {
        "schemes": [
          "https://app.getfader.com/projects/*/publish"
        ],
        "url": "https://app.getfader.com/api/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Faithlife TV",
    "provider_url": "https://faithlifetv.com",
    "endpoints": [
      {
        "schemes": [
          "https://faithlifetv.com/items/*",
          "https://faithlifetv.com/items/resource/*/*",
          "https://faithlifetv.com/media/*",
          "https://faithlifetv.com/media/assets/*",
          "https://faithlifetv.com/media/resource/*/*"
        ],
        "url": "https://faithlifetv.com/api/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Firework",
    "provider_url": "https://fireworktv.com/",
    "endpoints": [
      {
        "schemes": [
          "https://*.fireworktv.com/*",
          "https://*.fireworktv.com/embed/*/v/*"
        ],
        "url": "https://www.fireworktv.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "FITE",
    "provider_url": "https://www.fite.tv/",
    "endpoints": [
      {
        "schemes": [
          "https://www.fite.tv/watch/*"
        ],
        "url": "https://www.fite.tv/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Flat",
    "provider_url": "https://flat.io",
    "endpoints": [
      {
        "schemes": [
          "https://flat.io/score/*",
          "https://*.flat.io/score/*"
        ],
        "url": "https://flat.io/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Flickr",
    "provider_url": "https://www.flickr.com/",
    "endpoints": [
      {
        "schemes": [
          "http://*.flickr.com/photos/*",
          "http://flic.kr/p/*",
          "https://*.flickr.com/photos/*",
          "https://flic.kr/p/*",
          "https://*.*.flickr.com/*/*",
          "http://*.*.flickr.com/*/*"
        ],
        "url": "https://www.flickr.com/services/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Flourish",
    "provider_url": "https://flourish.studio/",
    "endpoints": [
      {
        "schemes": [
          "https://public.flourish.studio/visualisation/*",
          "https://public.flourish.studio/story/*"
        ],
        "url": "https://app.flourish.studio/api/v1/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "FOX SPORTS Australia",
    "provider_url": "http://www.foxsports.com.au",
    "endpoints": [
      {
        "schemes": [
          "http://fiso.foxsports.com.au/isomorphic-widget/*",
          "https://fiso.foxsports.com.au/isomorphic-widget/*"
        ],
        "url": "https://fiso.foxsports.com.au/oembed"
      }
    ]
  },
  {
    "provider_name": "FrameBuzz",
    "provider_url": "https://framebuzz.com/",
    "endpoints": [
      {
        "schemes": [
          "http://framebuzz.com/v/*",
          "https://framebuzz.com/v/*"
        ],
        "url": "https://framebuzz.com/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Framer",
    "provider_url": "https://www.framer.com",
    "endpoints": [
      {
        "schemes": [
          "https://framer.com/share/*",
          "https://framer.com/embed/*"
        ],
        "url": "https://api.framer.com/web/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Geograph Britain and Ireland",
    "provider_url": "https://www.geograph.org.uk/",
    "endpoints": [
      {
        "schemes": [
          "http://*.geograph.org.uk/*",
          "http://*.geograph.co.uk/*",
          "http://*.geograph.ie/*",
          "http://*.wikimedia.org/*_geograph.org.uk_*"
        ],
        "url": "http://api.geograph.org.uk/api/oembed"
      }
    ]
  },
  {
    "provider_name": "Geograph Channel Islands",
    "provider_url": "http://channel-islands.geograph.org/",
    "endpoints": [
      {
        "schemes": [
          "http://*.geograph.org.gg/*",
          "http://*.geograph.org.je/*",
          "http://channel-islands.geograph.org/*",
          "http://channel-islands.geographs.org/*",
          "http://*.channel.geographs.org/*"
        ],
        "url": "http://www.geograph.org.gg/api/oembed"
      }
    ]
  },
  {
    "provider_name": "Geograph Germany",
    "provider_url": "http://geo-en.hlipp.de/",
    "endpoints": [
      {
        "schemes": [
          "http://geo-en.hlipp.de/*",
          "http://geo.hlipp.de/*",
          "http://germany.geograph.org/*"
        ],
        "url": "http://geo.hlipp.de/restapi.php/api/oembed"
      }
    ]
  },
  {
    "provider_name": "Getty Images",
    "provider_url": "http://www.gettyimages.com/",
    "endpoints": [
      {
        "schemes": [
          "http://gty.im/*"
        ],
        "url": "http://embed.gettyimages.com/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Gfycat",
    "provider_url": "https://gfycat.com/",
    "endpoints": [
      {
        "schemes": [
          "http://gfycat.com/*",
          "http://www.gfycat.com/*",
          "https://gfycat.com/*",
          "https://www.gfycat.com/*"
        ],
        "url": "https://api.gfycat.com/v1/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Gifnote",
    "provider_url": "https://www.gifnote.com/",
    "endpoints": [
      {
        "url": "https://www.gifnote.com/services/oembed",
        "schemes": [
          "https://www.gifnote.com/play/*"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "GIPHY",
    "provider_url": "https://giphy.com",
    "endpoints": [
      {
        "schemes": [
          "https://giphy.com/gifs/*",
          "https://giphy.com/clips/*",
          "http://gph.is/*",
          "https://media.giphy.com/media/*/giphy.gif"
        ],
        "url": "https://giphy.com/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "GloriaTV",
    "provider_url": "https://gloria.tv/",
    "endpoints": [
      {
        "url": "https://gloria.tv/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "GMetri",
    "provider_url": "https://www.gmetri.com/",
    "endpoints": [
      {
        "schemes": [
          "https://view.gmetri.com/*"
        ],
        "url": "https://z5-viewer-socket.in.gmetri.com/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Gong",
    "provider_url": "https://www.gong.io/",
    "endpoints": [
      {
        "schemes": [
          "https://app.gong.io/call?id=*"
        ],
        "url": "https://app.gong.io/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Grain",
    "provider_url": "https://grain.co",
    "endpoints": [
      {
        "schemes": [
          "https://grain.co/highlight/*"
        ],
        "url": "http://api.grain.co/_/api/oembed"
      }
    ]
  },
  {
    "provider_name": "GT Channel",
    "provider_url": "https://gtchannel.com",
    "endpoints": [
      {
        "schemes": [
          "https://gtchannel.com/watch/*"
        ],
        "url": "https://api.luminery.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Gyazo",
    "provider_url": "https://gyazo.com",
    "endpoints": [
      {
        "schemes": [
          "https://gyazo.com/*"
        ],
        "url": "https://api.gyazo.com/api/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "hearthis.at",
    "provider_url": "https://hearthis.at/",
    "endpoints": [
      {
        "schemes": [
          "https://hearthis.at/*/*/",
          "https://hearthis.at/*/set/*/"
        ],
        "url": "https://hearthis.at/oembed/?format=json",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "hihaho",
    "provider_url": "https://www.hihaho.com",
    "endpoints": [
      {
        "schemes": [
          "https://player.hihaho.com/*"
        ],
        "url": "https://player.hihaho.com/services/oembed",
        "formats": [
          "json",
          "xml"
        ]
      }
    ]
  },
  {
    "provider_name": "HippoVideo",
    "provider_url": "https://hippovideo.io",
    "endpoints": [
      {
        "schemes": [
          "http://*.hippovideo.io/*",
          "https://*.hippovideo.io/*"
        ],
        "url": "https://www.hippovideo.io/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Homey",
    "provider_url": "https://homey.app",
    "endpoints": [
      {
        "schemes": [
          "https://homey.app/f/*",
          "https://homey.app/*/flow/*"
        ],
        "url": "https://homey.app/api/oembed/flow",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "HuffDuffer",
    "provider_url": "http://huffduffer.com",
    "endpoints": [
      {
        "schemes": [
          "http://huffduffer.com/*/*"
        ],
        "url": "http://huffduffer.com/oembed"
      }
    ]
  },
  {
    "provider_name": "Hulu",
    "provider_url": "http://www.hulu.com/",
    "endpoints": [
      {
        "schemes": [
          "http://www.hulu.com/watch/*"
        ],
        "url": "http://www.hulu.com/api/oembed.{format}"
      }
    ]
  },
  {
    "provider_name": "Idomoo",
    "provider_url": "https://idomoo.com/",
    "endpoints": [
      {
        "schemes": [
          "https://*.idomoo.com/*"
        ],
        "url": "https://oembed.idomoo.com/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "iFixit",
    "provider_url": "http://www.iFixit.com",
    "endpoints": [
      {
        "schemes": [
          "http://www.ifixit.com/Guide/View/*"
        ],
        "url": "http://www.ifixit.com/Embed"
      }
    ]
  },
  {
    "provider_name": "IFTTT",
    "provider_url": "http://www.ifttt.com/",
    "endpoints": [
      {
        "schemes": [
          "http://ifttt.com/recipes/*"
        ],
        "url": "http://www.ifttt.com/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "iHeartRadio",
    "provider_url": "https://www.iheart.com",
    "endpoints": [
      {
        "schemes": [
          "https://www.iheart.com/podcast/*/*"
        ],
        "url": "https://www.iheart.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Indaco",
    "provider_url": "https://player.indacolive.com/",
    "endpoints": [
      {
        "schemes": [
          "https://player.indacolive.com/player/jwp/clients/*"
        ],
        "url": "https://player.indacolive.com/services/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Infogram",
    "provider_url": "https://infogram.com/",
    "endpoints": [
      {
        "schemes": [
          "https://infogram.com/*"
        ],
        "url": "https://infogram.com/oembed"
      }
    ]
  },
  {
    "provider_name": "Infoveave",
    "provider_url": "https://infoveave.net/",
    "endpoints": [
      {
        "schemes": [
          "https://*.infoveave.net/E/*",
          "https://*.infoveave.net/P/*"
        ],
        "url": "https://infoveave.net/services/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Injurymap",
    "provider_url": "https://www.injurymap.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.injurymap.com/exercises/*"
        ],
        "url": "https://www.injurymap.com/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Inoreader",
    "provider_url": "https://www.inoreader.com",
    "endpoints": [
      {
        "schemes": [
          "https://www.inoreader.com/oembed/"
        ],
        "url": "https://www.inoreader.com/oembed/api/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "inphood",
    "provider_url": "http://inphood.com/",
    "endpoints": [
      {
        "schemes": [
          "http://*.inphood.com/*"
        ],
        "url": "http://api.inphood.com/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Instagram",
    "provider_url": "https://instagram.com",
    "endpoints": [
      {
        "schemes": [
          "http://instagram.com/*/p/*,",
          "http://www.instagram.com/*/p/*,",
          "https://instagram.com/*/p/*,",
          "https://www.instagram.com/*/p/*,",
          "http://instagram.com/p/*",
          "http://instagr.am/p/*",
          "http://www.instagram.com/p/*",
          "http://www.instagr.am/p/*",
          "https://instagram.com/p/*",
          "https://instagr.am/p/*",
          "https://www.instagram.com/p/*",
          "https://www.instagr.am/p/*",
          "http://instagram.com/tv/*",
          "http://instagr.am/tv/*",
          "http://www.instagram.com/tv/*",
          "http://www.instagr.am/tv/*",
          "https://instagram.com/tv/*",
          "https://instagr.am/tv/*",
          "https://www.instagram.com/tv/*",
          "https://www.instagr.am/tv/*",
          "http://www.instagram.com/reel/*",
          "https://www.instagram.com/reel/*",
          "http://instagram.com/reel/*",
          "https://instagram.com/reel/*",
          "http://instagr.am/reel/*",
          "https://instagr.am/reel/*"
        ],
        "url": "https://graph.facebook.com/v10.0/instagram_oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Insticator Inc",
    "provider_url": "https://www.insticator.com/",
    "endpoints": [
      {
        "schemes": [
          "https://ppa.insticator.com/embed-unit/*"
        ],
        "url": "https://www.insticator.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Issuu",
    "provider_url": "https://issuu.com/",
    "endpoints": [
      {
        "schemes": [
          "https://issuu.com/*/docs/*"
        ],
        "url": "https://issuu.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Jovian",
    "provider_url": "https://jovian.ai/",
    "endpoints": [
      {
        "schemes": [
          "https://jovian.ml/*",
          "https://jovian.ml/viewer*",
          "https://*.jovian.ml/*",
          "https://jovian.ai/*",
          "https://jovian.ai/viewer*",
          "https://*.jovian.ai/*"
        ],
        "url": "https://api.jovian.ai/oembed.json",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "KakaoTv",
    "provider_url": "https://tv.kakao.com/",
    "endpoints": [
      {
        "schemes": [
          "https://tv.kakao.com/channel/*/cliplink/*",
          "https://tv.kakao.com/m/channel/*/cliplink/*",
          "https://tv.kakao.com/channel/v/*",
          "https://tv.kakao.com/channel/*/livelink/*",
          "https://tv.kakao.com/m/channel/*/livelink/*",
          "https://tv.kakao.com/channel/l/*"
        ],
        "url": "https://tv.kakao.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Kickstarter",
    "provider_url": "http://www.kickstarter.com",
    "endpoints": [
      {
        "schemes": [
          "http://www.kickstarter.com/projects/*"
        ],
        "url": "http://www.kickstarter.com/services/oembed"
      }
    ]
  },
  {
    "provider_name": "Kidoju",
    "provider_url": "https://www.kidoju.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.kidoju.com/en/x/*/*",
          "https://www.kidoju.com/fr/x/*/*"
        ],
        "url": "https://www.kidoju.com/api/oembed"
      }
    ]
  },
  {
    "provider_name": "Kirim.Email",
    "provider_url": "https://kirim.email/",
    "endpoints": [
      {
        "schemes": [
          "https://halaman.email/form/*",
          "https://aplikasi.kirim.email/form/*"
        ],
        "url": "https://halaman.email/service/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Kit",
    "provider_url": "https://kit.co/",
    "endpoints": [
      {
        "schemes": [
          "http://kit.co/*/*",
          "https://kit.co/*/*"
        ],
        "url": "https://embed.kit.co/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Kitchenbowl",
    "provider_url": "http://www.kitchenbowl.com",
    "endpoints": [
      {
        "schemes": [
          "http://www.kitchenbowl.com/recipe/*"
        ],
        "url": "http://www.kitchenbowl.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "kmdr",
    "provider_url": "https://kmdr.sh",
    "endpoints": [
      {
        "schemes": [
          "https://app.kmdr.sh/h/*",
          "https://app.kmdr.sh/history/*"
        ],
        "url": "https://api.kmdr.sh/services/oembed"
      }
    ]
  },
  {
    "provider_name": "Knacki",
    "provider_url": "http://jdr.knacki.info",
    "endpoints": [
      {
        "schemes": [
          "http://jdr.knacki.info/meuh/*",
          "https://jdr.knacki.info/meuh/*"
        ],
        "url": "https://jdr.knacki.info/oembed"
      }
    ]
  },
  {
    "provider_name": "Knowledge Pad",
    "provider_url": "https://knowledgepad.co/",
    "endpoints": [
      {
        "schemes": [
          "https://knowledgepad.co/#/knowledge/*"
        ],
        "url": "https://api.spoonacular.com/knowledge/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Kooapp",
    "provider_url": "https://kooapp.com",
    "endpoints": [
      {
        "schemes": [
          "https://*.kooapp.com/koo/*",
          "http://*.kooapp.com/koo/*"
        ],
        "url": "https://embed-stage.kooapp.com/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "LearningApps.org",
    "provider_url": "http://learningapps.org/",
    "endpoints": [
      {
        "schemes": [
          "http://learningapps.org/*"
        ],
        "url": "http://learningapps.org/oembed.php",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "LeMans.Pod",
    "provider_url": "https://umotion-test.univ-lemans.fr/",
    "endpoints": [
      {
        "schemes": [
          "https://umotion-test.univ-lemans.fr/video/*"
        ],
        "url": "https://umotion-test.univ-lemans.fr/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Lille.Pod",
    "provider_url": "https://pod.univ-lille.fr/",
    "endpoints": [
      {
        "schemes": [
          "https://pod.univ-lille.fr/video/*"
        ],
        "url": "https://pod.univ-lille.fr/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Livestream",
    "provider_url": "https://livestream.com/",
    "endpoints": [
      {
        "schemes": [
          "https://livestream.com/accounts/*/events/*",
          "https://livestream.com/accounts/*/events/*/videos/*",
          "https://livestream.com/*/events/*",
          "https://livestream.com/*/events/*/videos/*",
          "https://livestream.com/*/*",
          "https://livestream.com/*/*/videos/*"
        ],
        "url": "https://livestream.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "LottieFiles",
    "provider_url": "https://lottiefiles.com/",
    "endpoints": [
      {
        "schemes": [
          "https://lottiefiles.com/*",
          "https://*.lottiefiles.com/*"
        ],
        "url": "https://embed.lottiefiles.com/oembed",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Ludus",
    "provider_url": "https://ludus.one",
    "endpoints": [
      {
        "schemes": [
          "https://app.ludus.one/*"
        ],
        "url": "https://app.ludus.one/oembed",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Lumiere",
    "provider_url": "https://latd.com",
    "endpoints": [
      {
        "schemes": [
          "https://*.lumiere.is/v/*"
        ],
        "url": "https://admin.lumiere.is/api/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "MathEmbed",
    "provider_url": "http://mathembed.com",
    "endpoints": [
      {
        "schemes": [
          "http://mathembed.com/latex?inputText=*",
          "http://mathembed.com/latex?inputText=*"
        ],
        "url": "http://mathembed.com/oembed"
      }
    ]
  },
  {
    "provider_name": "Matterport",
    "provider_url": "https://matterport.com/",
    "endpoints": [
      {
        "url": "https://my.matterport.com/api/v1/models/oembed/",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "me.me",
    "provider_url": "https://me.me/",
    "endpoints": [
      {
        "schemes": [
          "https://me.me/i/*"
        ],
        "url": "https://me.me/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "MediaLab",
    "provider_url": "https://www.medialab.co/",
    "endpoints": [
      {
        "schemes": [
          "https://*.medialab.app/share/watch/*",
          "https://*.medialab.co/share/watch/*",
          "https://*.medialab.app/share/social/*",
          "https://*.medialab.co/share/social/*",
          "https://*.medialab.app/share/embed/*",
          "https://*.medialab.co/share/embed/*"
        ],
        "url": "https://*.medialab.(co|app)/api/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Medienarchiv der Künste - Zürcher Hochschule der Künste",
    "provider_url": "https://medienarchiv.zhdk.ch/",
    "endpoints": [
      {
        "schemes": [
          "https://medienarchiv.zhdk.ch/entries/*"
        ],
        "url": "https://medienarchiv.zhdk.ch/oembed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Mermaid Ink",
    "provider_url": "https://mermaid.ink",
    "endpoints": [
      {
        "schemes": [
          "https://mermaid.ink/img/*",
          "https://mermaid.ink/svg/*"
        ],
        "url": "https://mermaid.ink/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Microsoft Stream",
    "provider_url": "https://stream.microsoft.com",
    "endpoints": [
      {
        "schemes": [
          "https://*.microsoftstream.com/video/*",
          "https://*.microsoftstream.com/channel/*"
        ],
        "url": "https://web.microsoftstream.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Minerva",
    "provider_url": "https://www.minervaknows.com",
    "endpoints": [
      {
        "schemes": [
          "https://www.minervaknows.com/featured-recipes/*",
          "https://www.minervaknows.com/themes/*",
          "https://www.minervaknows.com/themes/*/recipes/*",
          "https://app.minervaknows.com/recipes/*",
          "https://app.minervaknows.com/recipes/*/follow"
        ],
        "url": "https://oembed.minervaknows.com",
        "formats": [
          "json"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "MixCloud",
    "provider_url": "https://mixcloud.com/",
    "endpoints": [
      {
        "schemes": [
          "http://www.mixcloud.com/*/*/",
          "https://www.mixcloud.com/*/*/"
        ],
        "url": "https://www.mixcloud.com/oembed/"
      }
    ]
  },
  {
    "provider_name": "Moby Picture",
    "provider_url": "http://www.mobypicture.com",
    "endpoints": [
      {
        "schemes": [
          "http://www.mobypicture.com/user/*/view/*",
          "http://moby.to/*"
        ],
        "url": "http://api.mobypicture.com/oEmbed"
      }
    ]
  },
  {
    "provider_name": "Music Box Maniacs",
    "provider_url": "https://musicboxmaniacs.com/",
    "endpoints": [
      {
        "schemes": [
          "https://musicboxmaniacs.com/explore/melody/*"
        ],
        "url": "https://musicboxmaniacs.com/embed/",
        "formats": [
          "json"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "myBeweeg",
    "provider_url": "https://mybeweeg.com",
    "endpoints": [
      {
        "schemes": [
          "https://mybeweeg.com/w/*"
        ],
        "url": "https://mybeweeg.com/services/oembed"
      }
    ]
  },
  {
    "provider_name": "Namchey",
    "provider_url": "https://namchey.com",
    "endpoints": [
      {
        "schemes": [
          "https://namchey.com/embeds/*"
        ],
        "url": "https://namchey.com/api/oembed",
        "formats": [
          "json",
          "xml"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "nanoo.tv",
    "provider_url": "https://www.nanoo.tv/",
    "endpoints": [
      {
        "schemes": [
          "http://*.nanoo.tv/link/*",
          "http://nanoo.tv/link/*",
          "http://*.nanoo.pro/link/*",
          "http://nanoo.pro/link/*",
          "https://*.nanoo.tv/link/*",
          "https://nanoo.tv/link/*",
          "https://*.nanoo.pro/link/*",
          "https://nanoo.pro/link/*",
          "http://media.zhdk.ch/signatur/*",
          "http://new.media.zhdk.ch/signatur/*",
          "https://media.zhdk.ch/signatur/*",
          "https://new.media.zhdk.ch/signatur/*"
        ],
        "url": "https://www.nanoo.tv/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Nasjonalbiblioteket",
    "provider_url": "https://www.nb.no/",
    "endpoints": [
      {
        "schemes": [
          "https://www.nb.no/items/*"
        ],
        "url": "https://api.nb.no/catalog/v1/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Natural Atlas",
    "provider_url": "https://naturalatlas.com/",
    "endpoints": [
      {
        "schemes": [
          "https://naturalatlas.com/*",
          "https://naturalatlas.com/*/*",
          "https://naturalatlas.com/*/*/*",
          "https://naturalatlas.com/*/*/*/*"
        ],
        "url": "https://naturalatlas.com/oembed.{format}",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "nfb.ca",
    "provider_url": "http://www.nfb.ca/",
    "endpoints": [
      {
        "schemes": [
          "http://*.nfb.ca/film/*"
        ],
        "url": "http://www.nfb.ca/remote/services/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "NFTNDX.IO",
    "provider_url": "https://www.nftndx.io/",
    "endpoints": [
      {
        "url": "https://www.nftndx.io/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "NoPaste",
    "provider_url": "https://nopaste.ml",
    "endpoints": [
      {
        "schemes": [
          "https://nopaste.ml/*"
        ],
        "url": "https://oembed.nopaste.ml",
        "discovery": false
      }
    ]
  },
  {
    "provider_name": "Observable",
    "provider_url": "https://observablehq.com",
    "endpoints": [
      {
        "schemes": [
          "https://observablehq.com/@*/*",
          "https://observablehq.com/d/*",
          "https://observablehq.com/embed/*"
        ],
        "url": "https://api.observablehq.com/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Odds.com.au",
    "provider_url": "https://www.odds.com.au",
    "endpoints": [
      {
        "schemes": [
          "https://www.odds.com.au/*",
          "https://odds.com.au/*"
        ],
        "url": "https://www.odds.com.au/api/oembed/"
      }
    ]
  },
  {
    "provider_name": "Odesli (formerly Songlink)",
    "provider_url": "https://odesli.co",
    "endpoints": [
      {
        "schemes": [
          "https://song.link/*",
          "https://album.link/*",
          "https://artist.link/*",
          "https://playlist.link/*",
          "https://pods.link/*",
          "https://mylink.page/*",
          "https://odesli.co/*"
        ],
        "url": "https://song.link/oembed",
        "formats": [
          "json"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Odysee",
    "provider_url": "https://odysee.com",
    "endpoints": [
      {
        "schemes": [
          "https://odysee.com/*/*",
          "https://odysee.com/*"
        ],
        "url": "https://odysee.com/$/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Official FM",
    "provider_url": "http://official.fm",
    "endpoints": [
      {
        "schemes": [
          "http://official.fm/tracks/*",
          "http://official.fm/playlists/*"
        ],
        "url": "http://official.fm/services/oembed.{format}"
      }
    ]
  },
  {
    "provider_name": "Omniscope",
    "provider_url": "https://omniscope.me/",
    "endpoints": [
      {
        "schemes": [
          "https://omniscope.me/*"
        ],
        "url": "https://omniscope.me/_global_/oembed/json",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Omny Studio",
    "provider_url": "https://omnystudio.com",
    "endpoints": [
      {
        "schemes": [
          "https://omny.fm/shows/*"
        ],
        "url": "https://omny.fm/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Ora TV",
    "provider_url": "http://www.ora.tv/",
    "endpoints": [
      {
        "discovery": true,
        "url": "https://www.ora.tv/oembed/*?format={format}"
      }
    ]
  },
  {
    "provider_name": "Orbitvu",
    "provider_url": "https://orbitvu.co",
    "endpoints": [
      {
        "schemes": [
          "https://orbitvu.co/001/*/ov3601/view",
          "https://orbitvu.co/001/*/ov3601/*/view",
          "https://orbitvu.co/001/*/ov3602/*/view",
          "https://orbitvu.co/001/*/2/orbittour/*/view",
          "https://orbitvu.co/001/*/1/2/orbittour/*/view",
          "http://orbitvu.co/001/*/ov3601/view",
          "http://orbitvu.co/001/*/ov3601/*/view",
          "http://orbitvu.co/001/*/ov3602/*/view",
          "http://orbitvu.co/001/*/2/orbittour/*/view",
          "http://orbitvu.co/001/*/1/2/orbittour/*/view"
        ],
        "url": "http://orbitvu.co/service/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Outplayed.tv",
    "provider_url": "https://outplayed.tv/",
    "endpoints": [
      {
        "schemes": [
          "https://outplayed.tv/media/*"
        ],
        "url": "https://outplayed.tv/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Overflow",
    "provider_url": "https://overflow.io",
    "endpoints": [
      {
        "schemes": [
          "https://overflow.io/s/*",
          "https://overflow.io/embed/*"
        ],
        "url": "https://overflow.io/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "OZ",
    "provider_url": "https://www.oz.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.oz.com/*/video/*"
        ],
        "url": "https://core.oz.com/oembed",
        "formats": [
          "json",
          "xml"
        ]
      }
    ]
  },
  {
    "provider_name": "Padlet",
    "provider_url": "https://padlet.com/",
    "endpoints": [
      {
        "schemes": [
          "https://padlet.com/*"
        ],
        "url": "https://padlet.com/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Pastery",
    "provider_url": "https://www.pastery.net",
    "endpoints": [
      {
        "schemes": [
          "http://pastery.net/*",
          "https://pastery.net/*",
          "http://www.pastery.net/*",
          "https://www.pastery.net/*"
        ],
        "url": "https://www.pastery.net/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "PingVP",
    "provider_url": "https://www.pingvp.com/",
    "endpoints": [
      {
        "url": "https://beta.pingvp.com.kpnis.nl/p/oembed.php",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Pinpoll",
    "provider_url": "https://www.pinpoll.com/products/tools",
    "endpoints": [
      {
        "schemes": [
          "https://tools.pinpoll.com/embed/*"
        ],
        "url": "https://tools.pinpoll.com/oembed",
        "discovery": true,
        "formats": [
          "json",
          "xml"
        ]
      }
    ]
  },
  {
    "provider_name": "Pinterest",
    "provider_url": "https://www.pinterest.com",
    "endpoints": [
      {
        "schemes": [
          "https://www.pinterest.com/*"
        ],
        "url": "https://www.pinterest.com/oembed.json",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "PitchHub",
    "provider_url": "https://www.pitchhub.com/",
    "endpoints": [
      {
        "schemes": [
          "https://*.pitchhub.com/en/public/player/*"
        ],
        "url": "https://*.pitchhub.com.com/en/public/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Pixdor",
    "provider_url": "http://www.pixdor.com/",
    "endpoints": [
      {
        "schemes": [
          "https://store.pixdor.com/place-marker-widget/*/show",
          "https://store.pixdor.com/map/*/show"
        ],
        "url": "https://store.pixdor.com/oembed",
        "formats": [
          "json",
          "xml"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Podbean",
    "provider_url": "http://podbean.com",
    "endpoints": [
      {
        "schemes": [
          "https://*.podbean.com/e/*",
          "http://*.podbean.com/e/*"
        ],
        "url": "https://api.podbean.com/v1/oembed"
      }
    ]
  },
  {
    "provider_name": "Poll Daddy",
    "provider_url": "http://polldaddy.com",
    "endpoints": [
      {
        "schemes": [
          "http://*.polldaddy.com/s/*",
          "http://*.polldaddy.com/poll/*",
          "http://*.polldaddy.com/ratings/*"
        ],
        "url": "http://polldaddy.com/oembed/"
      }
    ]
  },
  {
    "provider_name": "Portfolium",
    "provider_url": "https://portfolium.com",
    "endpoints": [
      {
        "schemes": [
          "https://portfolium.com/entry/*"
        ],
        "url": "https://api.portfolium.com/oembed"
      }
    ]
  },
  {
    "provider_name": "Present",
    "provider_url": "https://present.do",
    "endpoints": [
      {
        "schemes": [
          "https://present.do/decks/*"
        ],
        "url": "https://gateway.cobalt.run/present/decks/oembed",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Prezi Video",
    "provider_url": "https://prezi.com/",
    "endpoints": [
      {
        "schemes": [
          "https://prezi.com/v/*",
          "https://*.prezi.com/v/*"
        ],
        "url": "https://prezi.com/v/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Quiz.biz",
    "provider_url": "http://www.quiz.biz/",
    "endpoints": [
      {
        "schemes": [
          "http://www.quiz.biz/quizz-*.html"
        ],
        "url": "http://www.quiz.biz/api/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Quizz.biz",
    "provider_url": "http://www.quizz.biz/",
    "endpoints": [
      {
        "schemes": [
          "http://www.quizz.biz/quizz-*.html"
        ],
        "url": "http://www.quizz.biz/api/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "RadioPublic",
    "provider_url": "https://radiopublic.com",
    "endpoints": [
      {
        "schemes": [
          "https://play.radiopublic.com/*",
          "https://radiopublic.com/*",
          "https://www.radiopublic.com/*",
          "http://play.radiopublic.com/*",
          "http://radiopublic.com/*",
          "http://www.radiopublic.com/*",
          "https://*.radiopublic.com/*"
        ],
        "url": "https://oembed.radiopublic.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Raindrop",
    "provider_url": "https://raindrop.io",
    "endpoints": [
      {
        "schemes": [
          "https://raindrop.io/*",
          "https://raindrop.io/*/*",
          "https://raindrop.io/*/*/*",
          "https://raindrop.io/*/*/*/*"
        ],
        "url": "https://pub.raindrop.io/api/oembed",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "rcvis",
    "provider_url": "https://www.rcvis.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.rcvis.com/v/*",
          "https://www.rcvis.com/visualize=*",
          "https://www.rcvis.com/ve/*",
          "https://www.rcvis.com/visualizeEmbedded=*"
        ],
        "url": "https://animatron.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Reddit",
    "provider_url": "https://reddit.com/",
    "endpoints": [
      {
        "schemes": [
          "https://reddit.com/r/*/comments/*/*",
          "https://www.reddit.com/r/*/comments/*/*"
        ],
        "url": "https://www.reddit.com/oembed"
      }
    ]
  },
  {
    "provider_name": "ReleaseWire",
    "provider_url": "http://www.releasewire.com/",
    "endpoints": [
      {
        "schemes": [
          "http://rwire.com/*"
        ],
        "url": "http://publisher.releasewire.com/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Replit",
    "provider_url": "https://replit.com/",
    "endpoints": [
      {
        "schemes": [
          "https://repl.it/@*/*",
          "https://replit.com/@*/*"
        ],
        "url": "https://replit.com/data/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "ReverbNation",
    "provider_url": "https://www.reverbnation.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.reverbnation.com/*",
          "https://www.reverbnation.com/*/songs/*"
        ],
        "url": "https://www.reverbnation.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Roomshare",
    "provider_url": "http://roomshare.jp",
    "endpoints": [
      {
        "schemes": [
          "http://roomshare.jp/post/*",
          "http://roomshare.jp/en/post/*"
        ],
        "url": "http://roomshare.jp/en/oembed.{format}"
      }
    ]
  },
  {
    "provider_name": "RoosterTeeth",
    "provider_url": "https://roosterteeth.com",
    "endpoints": [
      {
        "schemes": [
          "https://roosterteeth.com/*"
        ],
        "url": "https://roosterteeth.com/oembed",
        "formats": [
          "json"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Rumble",
    "provider_url": "https://rumble.com/",
    "endpoints": [
      {
        "url": "https://rumble.com/api/Media/oembed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Runkit",
    "provider_url": "https://runkit.com",
    "endpoints": [
      {
        "schemes": [
          "http://embed.runkit.com/*,",
          "https://embed.runkit.com/*,"
        ],
        "url": "https://embed.runkit.com/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Saooti",
    "provider_url": "https://octopus.saooti.com",
    "endpoints": [
      {
        "schemes": [
          "https://octopus.saooti.com/main/pub/podcast/*"
        ],
        "url": "https://octopus.saooti.com/oembed"
      }
    ]
  },
  {
    "provider_name": "Sapo Videos",
    "provider_url": "http://videos.sapo.pt",
    "endpoints": [
      {
        "schemes": [
          "http://videos.sapo.pt/*"
        ],
        "url": "http://videos.sapo.pt/oembed"
      }
    ]
  },
  {
    "provider_name": "Screen9",
    "provider_url": "http://www.screen9.com/",
    "endpoints": [
      {
        "schemes": [
          "https://console.screen9.com/*",
          "https://*.screen9.tv/*"
        ],
        "url": "https://api.screen9.com/oembed"
      }
    ]
  },
  {
    "provider_name": "Screencast.com",
    "provider_url": "http://www.screencast.com/",
    "endpoints": [
      {
        "schemes": [
          "http://www.screencast.com/*"
        ],
        "url": "https://api.screencast.com/external/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Screenr",
    "provider_url": "http://www.screenr.com/",
    "endpoints": [
      {
        "schemes": [
          "http://www.screenr.com/*/"
        ],
        "url": "http://www.screenr.com/api/oembed.{format}"
      }
    ]
  },
  {
    "provider_name": "ScribbleMaps",
    "provider_url": "https://scribblemaps.com",
    "endpoints": [
      {
        "schemes": [
          "http://www.scribblemaps.com/maps/view/*",
          "https://www.scribblemaps.com/maps/view/*",
          "http://scribblemaps.com/maps/view/*",
          "https://scribblemaps.com/maps/view/*"
        ],
        "url": "https://scribblemaps.com/api/services/oembed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Scribd",
    "provider_url": "http://www.scribd.com/",
    "endpoints": [
      {
        "schemes": [
          "http://www.scribd.com/doc/*"
        ],
        "url": "http://www.scribd.com/services/oembed/"
      }
    ]
  },
  {
    "provider_name": "SendtoNews",
    "provider_url": "http://www.sendtonews.com/",
    "endpoints": [
      {
        "schemes": [
          "https://embed.sendtonews.com/oembed/*"
        ],
        "url": "https://embed.sendtonews.com/services/oembed",
        "discovery": true,
        "formats": [
          "json",
          "xml"
        ]
      }
    ]
  },
  {
    "provider_name": "ShortNote",
    "provider_url": "https://www.shortnote.jp/",
    "endpoints": [
      {
        "schemes": [
          "https://www.shortnote.jp/view/notes/*"
        ],
        "url": "https://www.shortnote.jp/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Shoudio",
    "provider_url": "http://shoudio.com",
    "endpoints": [
      {
        "schemes": [
          "http://shoudio.com/*",
          "http://shoud.io/*"
        ],
        "url": "http://shoudio.com/api/oembed"
      }
    ]
  },
  {
    "provider_name": "Show by Animaker",
    "provider_url": "https://getshow.io/",
    "endpoints": [
      {
        "schemes": [
          "https://app.getshow.io/iframe/*",
          "https://*.getshow.io/share/*"
        ],
        "url": "https://api.getshow.io/oembed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Show the Way, actionable location info",
    "provider_url": "https://showtheway.io",
    "endpoints": [
      {
        "schemes": [
          "https://showtheway.io/to/*"
        ],
        "url": "https://showtheway.io/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Simplecast",
    "provider_url": "https://simplecast.com",
    "endpoints": [
      {
        "schemes": [
          "https://simplecast.com/s/*"
        ],
        "url": "https://simplecast.com/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Sizzle",
    "provider_url": "https://onsizzle.com/",
    "endpoints": [
      {
        "schemes": [
          "https://onsizzle.com/i/*"
        ],
        "url": "https://onsizzle.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Sketchfab",
    "provider_url": "http://sketchfab.com",
    "endpoints": [
      {
        "schemes": [
          "http://sketchfab.com/*models/*",
          "https://sketchfab.com/*models/*",
          "https://sketchfab.com/*/folders/*"
        ],
        "url": "http://sketchfab.com/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "SlideShare",
    "provider_url": "http://www.slideshare.net/",
    "endpoints": [
      {
        "schemes": [
          "https://www.slideshare.net/*/*",
          "http://www.slideshare.net/*/*",
          "https://fr.slideshare.net/*/*",
          "http://fr.slideshare.net/*/*",
          "https://de.slideshare.net/*/*",
          "http://de.slideshare.net/*/*",
          "https://es.slideshare.net/*/*",
          "http://es.slideshare.net/*/*",
          "https://pt.slideshare.net/*/*",
          "http://pt.slideshare.net/*/*"
        ],
        "url": "https://www.slideshare.net/api/oembed/2",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "SmashNotes",
    "provider_url": "https://smashnotes.com",
    "endpoints": [
      {
        "schemes": [
          "https://smashnotes.com/p/*",
          "https://smashnotes.com/p/*/e/* - https://smashnotes.com/p/*/e/*/s/*"
        ],
        "url": "https://smashnotes.com/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Smrthi",
    "provider_url": "https://www.smrthi.com",
    "endpoints": [
      {
        "schemes": [
          "https://www.smrthi.com/book/*"
        ],
        "url": "https://www.smrthi.com/api/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "SmugMug",
    "provider_url": "https://www.smugmug.com/",
    "endpoints": [
      {
        "schemes": [
          "http://*.smugmug.com/*",
          "https://*.smugmug.com/*"
        ],
        "url": "https://api.smugmug.com/services/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "SocialExplorer",
    "provider_url": "https://www.socialexplorer.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.socialexplorer.com/*/explore",
          "https://www.socialexplorer.com/*/view",
          "https://www.socialexplorer.com/*/edit",
          "https://www.socialexplorer.com/*/embed"
        ],
        "url": "https://www.socialexplorer.com/services/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "SoundCloud",
    "provider_url": "http://soundcloud.com/",
    "endpoints": [
      {
        "schemes": [
          "http://soundcloud.com/*",
          "https://soundcloud.com/*",
          "https://soundcloud.app.goog.gl/*"
        ],
        "url": "https://soundcloud.com/oembed"
      }
    ]
  },
  {
    "provider_name": "SpeakerDeck",
    "provider_url": "https://speakerdeck.com",
    "endpoints": [
      {
        "schemes": [
          "http://speakerdeck.com/*/*",
          "https://speakerdeck.com/*/*"
        ],
        "url": "https://speakerdeck.com/oembed.json",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Spotify",
    "provider_url": "https://spotify.com/",
    "endpoints": [
      {
        "schemes": [
          "https://open.spotify.com/*",
          "spotify:*"
        ],
        "url": "https://open.spotify.com/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Spreaker",
    "provider_url": "https://www.spreaker.com/",
    "endpoints": [
      {
        "schemes": [
          "http://*.spreaker.com/*",
          "https://*.spreaker.com/*"
        ],
        "url": "https://api.spreaker.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "SproutVideo",
    "provider_url": "https://sproutvideo.com",
    "endpoints": [
      {
        "schemes": [
          "https://sproutvideo.com/videos/*",
          "https://*.vids.io/videos/*"
        ],
        "url": "http://sproutvideo.com/oembed.{format}",
        "formats": [
          "json",
          "xml"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Stanford Digital Repository",
    "provider_url": "https://purl.stanford.edu/",
    "endpoints": [
      {
        "schemes": [
          "https://purl.stanford.edu/*"
        ],
        "url": "https://purl.stanford.edu/embed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Streamable",
    "provider_url": "https://streamable.com/",
    "endpoints": [
      {
        "schemes": [
          "http://streamable.com/*",
          "https://streamable.com/*"
        ],
        "url": "https://api.streamable.com/oembed.json",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Streamio",
    "provider_url": "https://www.streamio.com",
    "endpoints": [
      {
        "schemes": [
          "https://s3m.io/*",
          "https://23m.io/*"
        ],
        "url": "https://streamio.com/api/v1/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Subscribi",
    "provider_url": "https://subscribi.io/",
    "endpoints": [
      {
        "schemes": [
          "https://subscribi.io/api/oembed*"
        ],
        "url": "https://subscribi.io/api/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Sudomemo",
    "provider_url": "https://www.sudomemo.net/",
    "endpoints": [
      {
        "schemes": [
          "https://www.sudomemo.net/watch/*",
          "http://www.sudomemo.net/watch/*",
          "https://flipnot.es/*",
          "http://flipnot.es/*"
        ],
        "url": "https://www.sudomemo.net/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Sutori",
    "provider_url": "https://www.sutori.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.sutori.com/story/*"
        ],
        "url": "https://www.sutori.com/api/oembed",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Sway",
    "provider_url": "https://www.sway.com",
    "endpoints": [
      {
        "schemes": [
          "https://sway.com/*",
          "https://www.sway.com/*",
          "https://sway.office.com/*"
        ],
        "url": "https://sway.com/api/v1.0/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Synthesia",
    "provider_url": "https://www.synthesia.io/",
    "endpoints": [
      {
        "schemes": [
          "https://share.synthesia.io/*"
        ],
        "url": "https://69jr5v75rc.execute-api.eu-west-1.amazonaws.com/prod/v2/oembed",
        "formats": [
          "json"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "TED",
    "provider_url": "https://www.ted.com",
    "endpoints": [
      {
        "schemes": [
          "http://ted.com/talks/*",
          "https://ted.com/talks/*",
          "https://www.ted.com/talks/*"
        ],
        "url": "https://www.ted.com/services/v1/oembed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "The New York Times",
    "provider_url": "https://www.nytimes.com",
    "endpoints": [
      {
        "schemes": [
          "https://www.nytimes.com/svc/oembed",
          "https://nytimes.com/*",
          "https://*.nytimes.com/*"
        ],
        "url": "https://www.nytimes.com/svc/oembed/json/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "They Said So",
    "provider_url": "https://theysaidso.com/",
    "endpoints": [
      {
        "schemes": [
          "https://theysaidso.com/image/*"
        ],
        "url": "https://theysaidso.com/extensions/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "TickCounter",
    "provider_url": "https://www.tickcounter.com",
    "endpoints": [
      {
        "schemes": [
          "http://www.tickcounter.com/countdown/*",
          "http://www.tickcounter.com/countup/*",
          "http://www.tickcounter.com/ticker/*",
          "http://www.tickcounter.com/worldclock/*",
          "https://www.tickcounter.com/countdown/*",
          "https://www.tickcounter.com/countup/*",
          "https://www.tickcounter.com/ticker/*",
          "https://www.tickcounter.com/worldclock/*"
        ],
        "url": "https://www.tickcounter.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "TikTok",
    "provider_url": "http://www.tiktok.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.tiktok.com/*/video/*"
        ],
        "url": "https://www.tiktok.com/oembed"
      }
    ]
  },
  {
    "provider_name": "Toornament",
    "provider_url": "https://www.toornament.com/",
    "endpoints": [
      {
        "schemes": [
          "https://www.toornament.com/tournaments/*/information",
          "https://www.toornament.com/tournaments/*/registration/",
          "https://www.toornament.com/tournaments/*/matches/schedule",
          "https://www.toornament.com/tournaments/*/stages/*/"
        ],
        "url": "https://widget.toornament.com/oembed",
        "discovery": true,
        "formats": [
          "json",
          "xml"
        ]
      }
    ]
  },
  {
    "provider_name": "Topy",
    "provider_url": "http://www.topy.se/",
    "endpoints": [
      {
        "schemes": [
          "http://www.topy.se/image/*"
        ],
        "url": "http://www.topy.se/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Totango",
    "provider_url": "https://totango.com",
    "endpoints": [
      {
        "schemes": [
          "https://app-test.totango.com/*"
        ],
        "url": "https://app-test.totango.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Trinity Audio",
    "provider_url": "https://trinityaudio.ai",
    "endpoints": [
      {
        "schemes": [
          "https://trinitymedia.ai/player/*",
          "http://trinitymedia.ai/player/*"
        ],
        "url": "https://trinitymedia.ai/player/trinity-oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Tumblr",
    "provider_url": "https://www.tumblr.com",
    "endpoints": [
      {
        "schemes": [
          "https://*.tumblr.com/post/*"
        ],
        "url": "https://www.tumblr.com/oembed/1.0"
      }
    ]
  },
  {
    "provider_name": "Tuxx",
    "provider_url": "https://www.tuxx.be/",
    "endpoints": [
      {
        "schemes": [
          "https://www.tuxx.be/*"
        ],
        "url": "https://www.tuxx.be/services/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "tvcf",
    "provider_url": "http://tvcf.co.kr",
    "endpoints": [
      {
        "schemes": [
          "https://play.tvcf.co.kr/*",
          "https://*.tvcf.co.kr/*"
        ],
        "url": "https://play.tvcf.co.kr/rest/oembed"
      }
    ]
  },
  {
    "provider_name": "Twitter",
    "provider_url": "http://www.twitter.com/",
    "endpoints": [
      {
        "schemes": [
          "https://twitter.com/*",
          "https://twitter.com/*/status/*",
          "https://*.twitter.com/*/status/*"
        ],
        "url": "https://publish.twitter.com/oembed"
      }
    ]
  },
  {
    "provider_name": "TypeCast",
    "provider_url": "https://typecast.ai",
    "endpoints": [
      {
        "schemes": [
          "https://play.typecast.ai/s/*",
          "https://play.typecast.ai/e/*",
          "https://play.typecast.ai/*"
        ],
        "url": "https://play.typecast.ai/oembed"
      }
    ]
  },
  {
    "provider_name": "Typlog",
    "provider_url": "https://typlog.com",
    "endpoints": [
      {
        "url": "https://typlog.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "UAPod",
    "provider_url": "https://uapod.univ-antilles.fr/",
    "endpoints": [
      {
        "schemes": [
          "https://uapod.univ-antilles.fr/video/*"
        ],
        "url": "https://uapod.univ-antilles.fr/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "University of Cambridge Map",
    "provider_url": "https://map.cam.ac.uk",
    "endpoints": [
      {
        "schemes": [
          "https://map.cam.ac.uk/*"
        ],
        "url": "https://map.cam.ac.uk/oembed/"
      }
    ]
  },
  {
    "provider_name": "UnivParis1.Pod",
    "provider_url": "https://mediatheque.univ-paris1.fr/",
    "endpoints": [
      {
        "schemes": [
          "https://mediatheque.univ-paris1.fr/video/*"
        ],
        "url": "https://mediatheque.univ-paris1.fr/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Upec.Pod",
    "provider_url": "https://pod.u-pec.fr/",
    "endpoints": [
      {
        "schemes": [
          "https://pod.u-pec.fr/video/*"
        ],
        "url": "https://pod.u-pec.fr/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Ustream",
    "provider_url": "http://www.ustream.tv",
    "endpoints": [
      {
        "schemes": [
          "http://*.ustream.tv/*",
          "http://*.ustream.com/*"
        ],
        "url": "http://www.ustream.tv/oembed",
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "uStudio, Inc.",
    "provider_url": "https://www.ustudio.com",
    "endpoints": [
      {
        "schemes": [
          "https://*.ustudio.com/embed/*",
          "https://*.ustudio.com/embed/*/*"
        ],
        "url": "https://app.ustudio.com/api/v2/oembed",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "VeeR VR",
    "provider_url": "http://veer.tv/",
    "endpoints": [
      {
        "schemes": [
          "http://veer.tv/videos/*"
        ],
        "url": "https://api.veer.tv/oembed",
        "discovery": true
      },
      {
        "schemes": [
          "http://veervr.tv/videos/*"
        ],
        "url": "https://api.veervr.tv/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Verse",
    "provider_url": "http://verse.com/",
    "endpoints": [
      {
        "url": "http://verse.com/services/oembed/"
      }
    ]
  },
  {
    "provider_name": "VEVO",
    "provider_url": "http://www.vevo.com/",
    "endpoints": [
      {
        "schemes": [
          "http://www.vevo.com/*",
          "https://www.vevo.com/*"
        ],
        "url": "https://www.vevo.com/oembed",
        "discovery": false
      }
    ]
  },
  {
    "provider_name": "Videfit",
    "provider_url": "https://videfit.com/",
    "endpoints": [
      {
        "schemes": [
          "https://videfit.com/videos/*"
        ],
        "url": "https://videfit.com/oembed",
        "discovery": false
      }
    ]
  },
  {
    "provider_name": "Vidyard",
    "provider_url": "https://vidyard.com",
    "endpoints": [
      {
        "schemes": [
          "http://*.vidyard.com/*",
          "https://*.vidyard.com/*",
          "http://*.hubs.vidyard.com/*",
          "https://*.hubs.vidyard.com/*"
        ],
        "url": "https://api.vidyard.com/dashboard/v1.1/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Vimeo",
    "provider_url": "https://vimeo.com/",
    "endpoints": [
      {
        "schemes": [
          "https://vimeo.com/*",
          "https://vimeo.com/album/*/video/*",
          "https://vimeo.com/channels/*/*",
          "https://vimeo.com/groups/*/videos/*",
          "https://vimeo.com/ondemand/*/*",
          "https://player.vimeo.com/video/*"
        ],
        "url": "https://vimeo.com/api/oembed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Viously",
    "provider_url": "https://www.viously.com",
    "endpoints": [
      {
        "schemes": [
          "https://www.viously.com/*/*"
        ],
        "url": "https://www.viously.com/oembed",
        "discovery": true,
        "formats": [
          "json",
          "xml"
        ]
      }
    ]
  },
  {
    "provider_name": "Vizydrop",
    "provider_url": "https://vizydrop.com",
    "endpoints": [
      {
        "schemes": [
          "https://vizydrop.com/shared/*"
        ],
        "url": "https://vizydrop.com/oembed"
      }
    ]
  },
  {
    "provider_name": "Vlipsy",
    "provider_url": "https://vlipsy.com/",
    "endpoints": [
      {
        "schemes": [
          "https://vlipsy.com/*"
        ],
        "url": "https://vlipsy.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "VLIVE",
    "provider_url": "https://www.vlive.tv",
    "endpoints": [
      {
        "url": "https://www.vlive.tv/oembed",
        "schemes": [
          "https://www.vlive.tv/video/*"
        ],
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "VoxSnap",
    "provider_url": "https://voxsnap.com/",
    "endpoints": [
      {
        "schemes": [
          "https://article.voxsnap.com/*/*"
        ],
        "url": "https://data.voxsnap.com/oembed",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Waltrack",
    "provider_url": "https://waltrack/net",
    "endpoints": [
      {
        "schemes": [
          "https://waltrack.net/product/*"
        ],
        "url": "https://waltrack.net/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Wave.video",
    "provider_url": "https://wave.video",
    "endpoints": [
      {
        "schemes": [
          "https://watch.wave.video/*",
          "https://embed.wave.video/*"
        ],
        "url": "https://embed.wave.video/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "wecandeo",
    "provider_url": "https://www.wecandeo.com/",
    "endpoints": [
      {
        "url": "https://play.wecandeo.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Wiredrive",
    "provider_url": "https://www.wiredrive.com/",
    "endpoints": [
      {
        "schemes": [
          "https://*.wiredrive.com/*"
        ],
        "url": "http://*.wiredrive.com/present-oembed/",
        "formats": [
          "json"
        ],
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Wistia, Inc.",
    "provider_url": "https://wistia.com/",
    "endpoints": [
      {
        "schemes": [
          "https://fast.wistia.com/embed/iframe/*",
          "https://fast.wistia.com/embed/playlists/*",
          "https://*.wistia.com/medias/*"
        ],
        "url": "https://fast.wistia.com/oembed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "wizer.me",
    "provider_url": "https://www.wizer.me/",
    "endpoints": [
      {
        "schemes": [
          "https://*.wizer.me/learn/*",
          "https://*.wizer.me/preview/*"
        ],
        "url": "https://app.wizer.me/api/oembed.{format}",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Wokwi",
    "provider_url": "https://wokwi.com",
    "endpoints": [
      {
        "schemes": [
          "https://wokwi.com/share/*"
        ],
        "url": "https://wokwi.com/api/oembed",
        "discovery": true,
        "formats": [
          "json"
        ]
      }
    ]
  },
  {
    "provider_name": "Wolfram Cloud",
    "provider_url": "https://www.wolframcloud.com",
    "endpoints": [
      {
        "schemes": [
          "https://*.wolframcloud.com/*"
        ],
        "url": "https://www.wolframcloud.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "WordPress.com",
    "provider_url": "https://wordpress.com/",
    "endpoints": [
      {
        "schemes": [
          "https://wordpress.com/*",
          "http://wordpress.com/*",
          "https://*.wordpress.com/*",
          "http://*.wordpress.com/*",
          "https://*.*.wordpress.com/*",
          "http://*.*.wordpress.com/*",
          "https://wp.me/*",
          "http://wp.me/*"
        ],
        "url": "http://public-api.wordpress.com/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "YouTube",
    "provider_url": "https://www.youtube.com/",
    "endpoints": [
      {
        "schemes": [
          "https://*.youtube.com/shorts*",
          "https://youtube.com/shorts*",
          "https://*.youtube.com/watch*",
          "https://*.youtube.com/v/*",
          "https://youtu.be/*",
          "https://*.youtube.com/playlist?list=*",
          "https://youtube.com/playlist?list=*"
        ],
        "url": "https://www.youtube.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Zeplin",
    "provider_url": "https://zeplin.io",
    "endpoints": [
      {
        "schemes": [
          "https://app.zeplin.io/project/*/screen/*",
          "https://app.zeplin.io/project/*/screen/*/version/*",
          "https://app.zeplin.io/project/*/styleguide/components?coid=*",
          "https://app.zeplin.io/styleguide/*/components?coid=*"
        ],
        "url": "https://app.zeplin.io/embed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "ZingSoft",
    "provider_url": "https://app.zingsoft.com",
    "endpoints": [
      {
        "schemes": [
          "https://app.zingsoft.com/embed/*",
          "https://app.zingsoft.com/view/*"
        ],
        "url": "https://app.zingsoft.com/oembed",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "ZnipeTV",
    "provider_url": "https://www.znipe.tv/",
    "endpoints": [
      {
        "schemes": [
          "https://*.znipe.tv/*"
        ],
        "url": "https://api.znipe.tv/v3/oembed/",
        "discovery": true
      }
    ]
  },
  {
    "provider_name": "Zoomable",
    "provider_url": "https://zoomable.ca/",
    "endpoints": [
      {
        "schemes": [
          "https://srv2.zoomable.ca/viewer.php*"
        ],
        "url": "https://srv2.zoomable.ca/oembed",
        "discovery": true
      }
    ]
  }
];

// src/utils/provider.js
var providersFromList = (providers2 = []) => {
  return providers2.map((provider) => {
    const { provider_url: url } = provider;
    provider.domain = getDomain_default(url);
    return provider;
  }).filter((provider) => {
    return provider.domain !== "";
  });
};
var store = {
  providers: providersFromList(providers)
};
var get = () => {
  return [...store.providers];
};
var set = (providers2 = []) => {
  store.providers = providersFromList(providers2);
  return store.providers.length;
};
var getEndpoint = (url, domain, endpoints) => {
  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i];
    const { schemes = [], url: endpointUrl } = endpoint;
    if (schemes.length === 0) {
      const endpointDomain = getDomain_default(endpointUrl);
      if (endpointDomain === domain) {
        return endpoint;
      }
    }
    const isMatchedScheme = schemes.some((scheme) => {
      const reg = new RegExp(scheme.replace(/\*/g, "(.*)").replace(/\?/g, "\\?").replace(/,$/g, ""), "i");
      return url.match(reg);
    });
    if (isMatchedScheme) {
      return endpoint;
    }
  }
  return null;
};
var find = (url = "") => {
  if (!isValidURL_default(url)) {
    return null;
  }
  const domain = getDomain_default(url);
  const providers2 = get();
  for (let i = 0; i < providers2.length; i++) {
    const prov = providers2[i];
    const {
      endpoints,
      provider_name: providerName,
      provider_url: providerUrl
    } = prov;
    const endpoint = getEndpoint(url, domain, endpoints);
    if (endpoint) {
      return {
        fetchEndpoint: endpoint.url,
        providerName,
        providerUrl
      };
    }
  }
  return null;
};
var has = (url = "") => {
  return find(url) !== null;
};

// src/main.js
var extract = async (url, params = {}) => {
  if (!isValidURL_default(url)) {
    throw new Error("Invalid input URL");
  }
  const p = find(url);
  if (!p) {
    throw new Error(`No provider found with given url "${url}"`);
  }
  const data = await fetchEmbed_default(url, p, params);
  return data;
};
module.exports = __toCommonJS(main_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extract,
  findProvider,
  hasProvider,
  setProviderList,
  setRequestOptions
});
