import { isString } from '@chris-zhu/utils'

export {
  isMap, isSet, isArray, toTypeString, hasOwn, isDate, isFunction,
  isString, isSymbol, isObject, extend, noop as NOOP
} from '@chris-zhu/utils'

export const isIntegerKey = (key: unknown) =>
  isString(key)
  && key !== 'NaN'
  && key[0] !== '-'
  && `${parseInt(key, 10)}` === key

export const hasChanged = (value: any, oldValue: any): boolean =>
  value !== oldValue

export const objectToString = Object.prototype.toString

export const warn = console.warn
