import focusLock from 'dom-focus-lock'
import { createPlugin } from '../create-plugin'

export const FocusLockPlugin = createPlugin({
  build: () => ({
    onAfterMountDOM: ({ container }) => focusLock.on(container),
    onBeforeUnmountDOM: ({ container }) => focusLock.off(container),
  }),
})
