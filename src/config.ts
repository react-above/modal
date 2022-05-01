import { Modal } from './modal'
import { PluginOutput, PluginsService } from './plugins'
import { FrameService, Theme } from './themes'

export interface Config {
  theme?: Theme
  plugins?: PluginOutput[]
}

export function configure({ theme, plugins = [] }: Config) {
  plugins.forEach(PluginsService.add)

  if (theme) {
    FrameService.set(theme.frame)
    theme.extend?.(Modal)
  }
}
