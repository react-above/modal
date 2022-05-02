import { createContext, useContext } from 'react'
import { ModalFC } from '../types'
import { ThemeOutput } from './types'

type AnyTheme = ThemeOutput<ModalFC, unknown>
const ThemeContext = createContext<AnyTheme>({} as AnyTheme)

export const ThemeProvider = ThemeContext.Provider

export function useTheme() {
  return useContext(ThemeContext)
}

export function useThemeOptions<T>() {
  const { options } = useTheme()
  return options as T
}
