// IS namespace - for type checking and validation
export const is = {
  typeof(input: any, types: string[]): boolean {
    return types.includes(typeof input);
  },

  nuun(input: any): boolean {
    return input === null || input === undefined;
  },

  null(input: any): boolean {
    return input === null;
  },

  undefined(input: any): boolean {
    return input === undefined;
  },

  string(input: any): boolean {
    return typeof input === 'string';
  },

  boolean(input: any): boolean {
    return typeof input === 'boolean';
  },

  array(input: any): boolean {
    return Array.isArray(input);
  },

  object(input: any): boolean {
    return typeof input === 'object' && input !== null && !Array.isArray(input);
  },

  function(input: any): boolean {
    return typeof input === 'function';
  },

  empty(input: any): boolean {
    if (input === null || input === undefined) return true;
    if (typeof input === 'string') return input.length === 0;
    if (Array.isArray(input)) return input.length === 0;
    if (typeof input === 'object') return Object.keys(input).length === 0;
    return false;
  },

  truthy(input: any): boolean {
    return Boolean(input);
  },

  falsy(input: any): boolean {
    return !Boolean(input);
  },

  number(input: any): NumberChecker {
    const num = Number(input);
    if (isNaN(num)) {
      throw new Error(`"${input}" is not a valid number`);
    }
    return new NumberCheckerImpl(num);
  },

  instanceOf<T>(input: any, constructor: new (...args: any[]) => T): input is T {
    return input instanceof constructor;
  }
};
