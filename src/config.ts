import { PluginOutput, PluginsService } from './plugins'
import { FrameFC, FrameService } from './themes'

export interface Config {
  frame?: FrameFC
  plugins?: PluginOutput[]
}

export function configurate({ frame, plugins = [] }: Config) {
  plugins.forEach(PluginsService.add)
  if (frame) FrameService.set(frame)
}
