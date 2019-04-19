export default class Utils {
  static lineRow(input: string, index: number) {
    const lines = input.slice(0, index).split('\n');

    const line = lines.length;
    const row = lines[lines.length - 1].length + 1;

    return { line, row };
  }

  static getIndent(input: string, line:number): number {
    const match = input
      .split('\n')[line - 1]
      .match(/\t+/);

    if (match) {
      return match[0].length;
    }

    return 0;
  }

  static createArray(length: number): any[] {
    const array: any[] = [];

    for (let i = 0; i < length; i += 1) {
      array.push(undefined);
    }

    return array;
  }

  static padRight(input: any, length: number): string {
    input = input.toString(); // eslint-disable-line no-param-reassign

    while (input.length < length) {
      input += ' '; // eslint-disable-line no-param-reassign
    }

    return input;
  }

  static removeProps(obj, keys) {
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

  static arrayify(obj: any): any[] {
    return Array.isArray(obj) ? obj : [obj];
  }

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

  static findLastElement(arrayOrElement) {
    if (Array.isArray(arrayOrElement)) {
      let index = arrayOrElement.length;

      while (index >= 0) {
        if (Array.isArray(arrayOrElement[index]) && !arrayOrElement[index].length) {
          index -= 1;
        } else if (!arrayOrElement[index]) {
          index -= 1;
        } else {
          break;
        }
      }

      return Utils.findLastElement(arrayOrElement[arrayOrElement.length - 1]);
    }

    return arrayOrElement;
  }
}
