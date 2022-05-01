import { ReplaceVoid } from '../types'
import { Plugin, PluginOutput } from './types'

interface Options<T> {
  // emulate default TS optional parameters for better DX
  build: (options: ReplaceVoid<T>) => PluginOutput
}

/*
 * This function provides more high-level API for creating Plugins
 * Also, it helps us in fixing some type issues
 */
export function createPlugin<T = void>({ build }: Options<T>): Plugin<T> {
  return (options) => build(options)
}
