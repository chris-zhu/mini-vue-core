'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isArray = Array.isArray;
const isDate = (val) => val instanceof Date;
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
const isSymbol = (val) => typeof val === 'symbol';
const isObject = (val) => val !== null && typeof val === 'object';
const extend = Object.assign;
const isIntegerKey = (key) => isString(key) &&
    key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
const isMap = (val) => toTypeString(val) === '[object Map]';
const isSet = (val) => toTypeString(val) === '[object Set]';
const toTypeString = (value) => objectToString.call(value);
const objectToString = Object.prototype.toString;
const NOOP = () => { };

exports.NOOP = NOOP;
exports.extend = extend;
exports.hasChanged = hasChanged;
exports.hasOwn = hasOwn;
exports.isArray = isArray;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.isIntegerKey = isIntegerKey;
exports.isMap = isMap;
exports.isObject = isObject;
exports.isSet = isSet;
exports.isString = isString;
exports.isSymbol = isSymbol;
exports.objectToString = objectToString;
exports.toTypeString = toTypeString;
//# sourceMappingURL=shared.cjs.js.map
