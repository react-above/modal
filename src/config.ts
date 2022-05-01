import { Modal } from './modal'
import { PluginOutput, PluginsService } from './plugins'
import { FrameService, ThemeOptionsService } from './themes'
import { ThemeOutput } from './themes/types'

export interface Config {
  theme: ThemeOutput
  plugins?: PluginOutput[]
}

export function configure({ theme, plugins = [] }: Config) {
  FrameService.set(theme.frame)
  ThemeOptionsService.set(theme.options)
  theme.extend?.(Modal)

  plugins.forEach(PluginsService.add)
}
