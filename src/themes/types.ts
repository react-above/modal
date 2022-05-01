import { ReplaceVoid } from '../types'
import { ModalCompound } from '../modal'
import { FrameFC } from './frame'

export interface ThemeOutput<T = void> {
  options: ReplaceVoid<T>
  frame: FrameFC
  extend?: (Modal: ModalCompound) => void
}

export type Theme<T = void> = (options: ReplaceVoid<T>) => ThemeOutput<T>
