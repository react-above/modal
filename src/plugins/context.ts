import { createContext, useContext } from 'react'
import { PluginOutput } from './types'

const PluginsContext = createContext<PluginOutput[]>([])

export const PluginsProvider = PluginsContext.Provider

export function usePlugins() {
  return useContext(PluginsContext)
}
