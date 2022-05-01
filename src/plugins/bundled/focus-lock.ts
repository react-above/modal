import focusLock from 'dom-focus-lock'
import './focus-lock.d'
import { createPlugin } from '../create-plugin'

export const FocusLockPlugin = createPlugin({
  build: () => ({
    onAfterMount: ({ modal }) => focusLock.on(modal),
    onBeforeUnmount: ({ modal }) => focusLock.off(modal),
  }),
})
