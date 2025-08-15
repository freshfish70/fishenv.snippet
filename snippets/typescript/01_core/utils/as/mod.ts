interface NumberOptions {
  decimals?: number;
}

export const as = {
  numeric(input: any, options?: NumberOptions): number {
    const num = Number(input);
    if (isNaN(num)) {
      throw new Error(`Cannot convert "${input}" to number`);
    }
    
    if (options?.decimals !== undefined) {
      return Number(num.toFixed(options.decimals));
    }
    
    return num;
  },

  float(input: any, options?: NumberOptions): number {
    const num = parseFloat(input);
    if (isNaN(num)) {
      throw new Error(`Cannot convert "${input}" to float`);
    }
    
    if (options?.decimals !== undefined) {
      return Number(num.toFixed(options.decimals));
    }
    
    return num;
  },

  int(input: any): number {
    const num = parseInt(input, 10);
    if (isNaN(num)) {
      throw new Error(`Cannot convert "${input}" to integer`);
    }
    return num;
  },

  string(input: any): string {
    if (input === null || input === undefined) {
      throw new Error(`Cannot convert null or undefined to string`);
    }
    return String(input);
  },

  bool(input: any): boolean {
    if (typeof input === 'boolean') {
      return input;
    }
    if (typeof input === 'string') {
      const lower = input.toLowerCase();
      if (lower === 'true' || lower === '1') return true;
      if (lower === 'false' || lower === '0') return false;
    }
    if (typeof input === 'number') {
      return input !== 0;
    }
    return Boolean(input);
  },

  type<TType>(input: any): TType {
    return input as TType;
  }
};

