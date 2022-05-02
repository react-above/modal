import { ModalFC, ReplaceVoid } from '../types'
import { Theme, ThemeOutput } from './types'

interface Options<TModal extends ModalFC, TOptions = void> {
  theme: Theme<TModal, TOptions>
  override: (
    options: ReplaceVoid<TOptions>
  ) => Partial<Omit<ThemeOutput<TModal, TOptions>, 'options'>>
}

export function overrideTheme<TModal extends ModalFC, TOptions = void>({
  theme,
  override,
}: Options<TModal, TOptions>): Theme<TModal, TOptions> {
  return (options) => ({
    ...theme(options),
    ...override(options as ReplaceVoid<TOptions>),
  })
}
