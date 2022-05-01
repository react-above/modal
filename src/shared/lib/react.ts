import { CSSProperties } from 'react'

export function mergeStyle(a?: CSSProperties, b?: CSSProperties) {
  if (!a) return b
  if (!b) return a
  return { ...a, ...b }
}
