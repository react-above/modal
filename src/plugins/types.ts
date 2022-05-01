import { LifecycleCallbacks } from '../types'

export type PluginOutput = LifecycleCallbacks

export type Plugin<T = void> = (options: T) => PluginOutput
