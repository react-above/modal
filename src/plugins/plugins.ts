import { PluginOutput } from './types'

const plugins: PluginOutput[] = []

function get() {
  return plugins
}

function add(plugin: PluginOutput) {
  plugins.push(plugin)
}

export const PluginsService = {
  get,
  add,
}

export function usePlugins() {
  return plugins
}
