import { SimpleObject } from "../../types/General";

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  if (typeof value === 'number') return true;
  //TODO: making number of an empty string should not give us a Zero(0) number!
  else if (typeof value === 'string') return !isNaN(Number(value));
  return false;
}

export function isObject<T>(val: unknown): val is SimpleObject<T> {
  return (
    val !== null &&
    typeof val === 'object' &&
    Array.isArray(val) === false &&
    Object.prototype.toString.call(val) === '[object Object]'
  );
}
