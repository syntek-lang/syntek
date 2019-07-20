import { safeLoad } from 'js-yaml';

export class YamlHandler {
  readonly yaml: any;

  constructor(yaml: string) {
    this.yaml = safeLoad(yaml);
  }

  get(key: string): any {
    return key
      .split('.')
      .reduce((obj, prop) => {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          return obj[prop];
        }

        return undefined;
      }, this.yaml);
  }

  parse(key: string, params: Record<string, any>): string {
    const value = this.get(key);

    if (typeof value === 'string') {
      return value.replace(/{{ *(\w+) *}}/, (_, param) => params[param]);
    }

    throw new Error(`${key} must return a string, instead got ${value}`);
  }
}
