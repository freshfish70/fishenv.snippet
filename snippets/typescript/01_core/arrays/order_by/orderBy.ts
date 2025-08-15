import { orderByAsc } from "./orderByAsc";
import { orderByDesc } from "./orderByDesc";

export const orderBy = <T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc",
): T[] => {
  return order === "asc" ? orderByAsc(array, key) : orderByDesc(array, key);
};

