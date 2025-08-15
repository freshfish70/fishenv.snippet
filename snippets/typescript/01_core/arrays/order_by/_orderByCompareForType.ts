export const orderByCompareForType = (
  a: any,
  b: any,
  key: string | number | symbol,
): number => {
  if (typeof a[key] === "string" && typeof b[key] === "string") {
    return a[key].localeCompare(b[key]);
  }

  if (typeof a[key] === "number" && typeof b[key] === "number") {
    return a[key] - b[key];
  }

  if (typeof a[key] === "boolean" && typeof b[key] === "boolean") {
    return Number(a[key]) - Number(b[key]);
  }

  if (a[key] instanceof Date && b[key] instanceof Date) {
    return a[key].getTime() - b[key].getTime();
  }

  return 0;
};

