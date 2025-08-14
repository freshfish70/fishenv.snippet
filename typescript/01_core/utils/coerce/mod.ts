export const coerce = {
  bool(input: any): boolean {
    if (typeof input === 'boolean') {
      return input;
    }
    
    if (typeof input === 'string') {
      const lower = input.toLowerCase().trim();
      if (lower === 'true' || lower === '1') return true;
      if (lower === 'false' || lower === '0') return false;
    }
    
    if (typeof input === 'number') {
      if (input === 1) return true;
      if (input === 0) return false;
    }
    
    // Default coercion for other values
    return Boolean(input);
  },

  number(input: any, options?: NumberOptions): number {
    let num: number;
    
    if (typeof input === 'number') {
      num = input;
    } else if (typeof input === 'string') {
      num = Number(input.trim());
    } else {
      num = Number(input);
    }
    
    // If conversion fails, return 0 as fallback
    if (isNaN(num)) {
      num = 0;
    }
    
    if (options?.decimals !== undefined) {
      return Number(num.toFixed(options.decimals));
    }
    
    return num;
  }
};
