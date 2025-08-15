export const orderByCompareForType = (a: any, b: any, key: string | number | symbol): number => {
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


export const orderByAsc = <T>(array: T[], key: keyof T): T[] => {
    return [...array].sort((a, b) => orderByCompareForType(a, b, key));
};


export const orderByDesc = <T>(array: T[], key: keyof T): T[] => {
    return [...array].sort((a, b) => {
        const comparison = orderByCompareForType(a, b, key);
        if (comparison !== 0)
            return -comparison;
        return 0;
    });
};


export const orderBy = <T>(array: T[], key: keyof T, order: "asc" | "desc" = "asc"): T[] => {
    return order === "asc" ? orderByAsc(array, key) : orderByDesc(array, key);
};


