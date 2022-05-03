/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react'

/**
 * Replace "void" with "undefined"
 * Useful for creating more convenient APIs
 *
 * void -> undefined
 * number | void -> number | undefined
 * number -> number
 * undefined -> undefined
 */
export type ReplaceVoid<T> = T extends void
  ? Exclude<T | undefined, void> extends never
    ? undefined
    : Exclude<T | undefined, void>
  : T

// eslint-disable-next-line @typescript-eslint/ban-types
export type ChildfreeFC<T = {}> = (props: T) => ReactElement<any, any> | null
