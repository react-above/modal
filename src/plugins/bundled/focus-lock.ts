import focusLock from 'dom-focus-lock'
import { createPlugin } from '../create-plugin'

export const FocusLockPlugin = createPlugin({
  build: () => ({
    onAfterMountDOM: ({ modal }) => focusLock.on(modal),
    onBeforeUnmountDOM: ({ modal }) => focusLock.off(modal),
  }),
})
