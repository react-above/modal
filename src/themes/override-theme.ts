import { ReplaceVoid } from '../types'
import { Theme, ThemeOutput } from './types'

interface Options<T> {
  theme: Theme<T>
  override: (
    options: ReplaceVoid<T>
  ) => Partial<Omit<ThemeOutput<T>, 'options'>>
}

export function overrideTheme<T = void>({
  theme,
  override,
}: Options<T>): Theme<T> {
  return (options) => ({
    ...theme(options),
    ...override(options),
  })
}
