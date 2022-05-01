import { ThemeOptions } from '../types/overridable'
import { ReplaceVoid } from '../types'

let current: ThemeOptions

function get(): ReplaceVoid<ThemeOptions> {
  return current as ReplaceVoid<ThemeOptions>
}

function set(options: ThemeOptions) {
  current = options
}

export const ThemeOptionsService = {
  get,
  set,
}

export function useThemeOptions() {
  return ThemeOptionsService.get()
}
