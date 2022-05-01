export type ReplaceVoid<T> = T extends void ? Exclude<T, void> | undefined : T
