import { ModalCompound } from '../modal'
import { FrameFC } from './frame'

export interface Theme {
  frame: FrameFC
  extend?: (Modal: ModalCompound) => void
}
