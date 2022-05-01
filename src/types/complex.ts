export type ReplaceVoid<T> = T extends void
  ? Exclude<T | undefined, void> extends never
    ? undefined
    : Exclude<T | undefined, void>
  : T
