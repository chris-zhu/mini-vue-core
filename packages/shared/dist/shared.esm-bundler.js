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

export { NOOP, extend, hasChanged, hasOwn, isArray, isDate, isFunction, isIntegerKey, isMap, isObject, isSet, isString, isSymbol, objectToString, toTypeString };
//# sourceMappingURL=shared.esm-bundler.js.map
