import { ModalFC, ReplaceVoid } from '../types'
import { Theme, ThemeOutput } from './types'

interface Options<TModal extends ModalFC, TOptions = void> {
  build: (
    options: ReplaceVoid<TOptions>
  ) => Omit<ThemeOutput<TModal, TOptions>, 'options'>
}

export function createTheme<TModal extends ModalFC, TOptions = void>({
  build,
}: Options<TModal, TOptions>): Theme<TModal, TOptions> {
  return (options) => ({
    options: options as ReplaceVoid<TOptions>,
    ...build(options as ReplaceVoid<TOptions>),
  })
}
