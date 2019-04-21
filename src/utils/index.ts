export default class Utils {
  /**
   * Get the line and row number at the index of a string
   *
   * @param input - The input string
   * @param index - The index to get the line and row of
   */
  static lineRow(input: string, index: number) {
    const lines = input.slice(0, index).split('\n');

    const line = lines.length;
    const row = lines[lines.length - 1].length + 1;

    return { line, row };
  }

  /**
   * Get the amount of tabs at the start of a line
   *
   * @param input - The input string
   * @param line - The line to get the indentation level of
   */
  static getIndent(input: string, line: number): number {
    const match = input
      .split('\n')[line - 1]
      .match(/^\t+/);

    if (match) {
      return match[0].length;
    }

    return 0;
  }

  /**
   * Create an array with a specific length
   *
   * @param length - The length of the array
   */
  static createArray(length: number): any[] {
    const array: any[] = [];

    for (let i = 0; i < length; i += 1) {
      array.push(undefined);
    }

    return array;
  }

  /**
   * Pad the right side of a string with spaces
   *
   * @param input - The string to pad
   * @param length - The length that the string needs to be
   */
  static padRight(input: any, length: number): string {
    input = input.toString(); // eslint-disable-line no-param-reassign

    while (input.length < length) {
      input += ' '; // eslint-disable-line no-param-reassign
    }

    return input;
  }

  /**
   * Recusively remove props from an object or array
   *
   * @param obj - The object to remove the props from
   * @param keys - The keys of the props that need to be removed
   */
  static removeProps(obj, keys) {
    if (!obj) {
      return;
    }

    if (obj instanceof Array) {
      obj.forEach((item) => {
        Utils.removeProps(item, keys);
      });
    } else if (typeof obj === 'object') {
      Object.getOwnPropertyNames(obj).forEach((key) => {
        if (keys.indexOf(key) !== -1) {
          delete obj[key]; // eslint-disable-line no-param-reassign
        } else {
          Utils.removeProps(obj[key], keys);
        }
      });
    }
  }

  /**
   * Wrap any non-array item in an array
   *
   * @param obj - The item to arrify
   */
  static arrayify(obj: any): any[] {
    return Array.isArray(obj) ? obj : [obj];
  }

  /**
   * Find the very first element of an array, such that `[[1, 2], 3]` would return 1
   *
   * @param arrayOrElement - The array to find the first element of
   */
  static findFirstElement(arrayOrElement) {
    if (Array.isArray(arrayOrElement)) {
      let index = 0;

      while (index < arrayOrElement.length) {
        if (Array.isArray(arrayOrElement[index]) && !arrayOrElement[index].length) {
          index += 1;
        } else if (!arrayOrElement[index]) {
          index += 1;
        } else {
          break;
        }
      }

      return Utils.findFirstElement(arrayOrElement[index]);
    }

    return arrayOrElement;
  }

  /**
   * Find the very last element of an array, such that `[1, [2, 3]]` would return 3
   *
   * @param arrayOrElement - The array to find the last element of
   */
  static findLastElement(arrayOrElement) {
    if (Array.isArray(arrayOrElement)) {
      let index = arrayOrElement.length - 1;

      while (index >= 0) {
        if (Array.isArray(arrayOrElement[index]) && !arrayOrElement[index].length) {
          index -= 1;
        } else if (!arrayOrElement[index]) {
          index -= 1;
        } else {
          break;
        }
      }

      return Utils.findLastElement(arrayOrElement[index]);
    }

    return arrayOrElement;
  }

  /**
   * Flatten an array and it's sub arrays to a single array
   *
   * @param items - The array to flatten
   */
  static flatten(items: any): any[] {
    const flat: any[] = [];

    items.forEach((item) => {
      if (Array.isArray(item)) {
        flat.push(...Utils.flatten(item));
      } else {
        flat.push(item);
      }
    });

    return flat;
  }

  /**
   * Polyfill for `Object.values()`
   *
   * @param obj - The object to get the values from
   */
  static objectValues(obj: any): any[] {
    const values: any[] = [];

    for (const key of Object.keys(obj)) {
      values.push(obj[key]);
    }

    return values;
  }

  /**
   * Polyfill for `Object.entries()`
   *
   * @param obj - The object to get the entries from
   */
  static objectEntries(obj: any): [any, any][] {
    const entries: [any, any][] = [];

    for (const key of Object.keys(obj)) {
      entries.push([key, obj[key]]);
    }

    return entries;
  }
}
