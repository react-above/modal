import {
  BodyScrollOptions,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock'
import { createPlugin } from '../create-plugin'

export const ScrollLockPlugin = createPlugin<BodyScrollOptions | void>({
  build: (options) => ({
    onAfterMountDOM: ({ screen }) => disableBodyScroll(screen, options),
    onBeforeUnmountDOM: ({ screen }) => enableBodyScroll(screen),
  }),
})
