import { ModalCompound } from '../modal'
import { FrameFC } from './frame'
import { Theme } from './types'

interface Options {
  frame: FrameFC
  extend?: (Modal: ModalCompound) => void
}

export function createTheme({ frame, extend }: Options): Theme {
  return { frame, extend }
}
