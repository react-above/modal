import {
  BodyScrollOptions,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock'
import { createPlugin } from '../create-plugin'

export const ScrollLockPlugin = createPlugin<BodyScrollOptions | void>({
  build: (options) => ({
    onAfterMount: ({ screen }) => disableBodyScroll(screen, options),
    onBeforeUnmount: ({ screen }) => enableBodyScroll(screen),
  }),
})
