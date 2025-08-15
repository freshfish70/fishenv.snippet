import { orderByCompareForType } from "./_orderByCompareForType.ts";

export const orderByAsc = <T>(array: T[], key: keyof T): T[] => {
  return [...array].sort((a, b) => orderByCompareForType(a, b, key));
};

