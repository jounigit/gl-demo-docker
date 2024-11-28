"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOwnProperty = exports.isNotNull = void 0;
/* eslint-disable no-prototype-builtins */
function isNotNull(value) {
    return value !== null;
}
exports.isNotNull = isNotNull;
function 
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
hasOwnProperty(obj, prop) {
    // eslint-disable-next-line no-prototype-builtins
    // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
    return obj.hasOwnProperty(prop);
}
exports.hasOwnProperty = hasOwnProperty;
