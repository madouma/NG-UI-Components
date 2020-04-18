/**
 * Get object value given a path using dot notation
 * @param obj : object
 * @param path : property path (i.e. 'prop1.prop2.prop3'
 */
export function objGet(obj, path: string) {
  return path.split('.').reduce((object, key) => object[key], obj);
}

/**
 * Clamp a value between min and max
 * @param value : number to clamp
 * @param min
 * @param max
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

