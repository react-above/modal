import { ReplaceVoid } from '../types'
import { Theme, ThemeOutput } from './types'

interface Options<T> {
  build: (options: ReplaceVoid<T>) => Omit<ThemeOutput<T>, 'options'>
}

export function createTheme<T = void>({ build }: Options<T>): Theme<T> {
  return (options) => ({
    options: options as ReplaceVoid<T>,
    ...build(options as ReplaceVoid<T>),
  })
}
