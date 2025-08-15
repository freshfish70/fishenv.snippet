import { orderByCompareForType } from "./_orderByCompareForType.ts";

export const orderByDesc = <T>(array: T[], key: keyof T): T[] => {
  return [...array].sort((a, b) => {
    const comparison = orderByCompareForType(a, b, key);
    if (comparison !== 0) return -comparison;
    return 0;
  });
};

