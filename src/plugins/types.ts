import { LifecycleCallbacks, ReplaceVoid } from '../types'

export type PluginOutput = LifecycleCallbacks

export type Plugin<T = void> = (options: ReplaceVoid<T>) => PluginOutput
