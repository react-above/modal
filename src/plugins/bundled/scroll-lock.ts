import {
  BodyScrollOptions,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock'
import { createPlugin } from '../create-plugin'

export type ScrollLockOptions = BodyScrollOptions

export const ScrollLockPlugin = createPlugin<ScrollLockOptions | void>({
  build: (options) => ({
    onAfterMount: ({ screen }) => disableBodyScroll(screen, options),
    onBeforeUnmount: ({ screen }) => enableBodyScroll(screen),
  }),
})
