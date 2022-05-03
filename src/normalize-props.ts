import { ModalProps } from './types'

export type NormalizedModalProps = ReturnType<typeof normalizeProps>

export function normalizeProps(raw: ModalProps) {
  return {
    ...raw,
    closeOnClickOutside: raw.closeOnClickOutside ?? true,
    closeOnEsc: raw.closeOnEsc ?? true,
    root: raw.root ?? (() => document.body),
  }
}
