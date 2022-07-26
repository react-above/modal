import { createFocusTrap, FocusTrap } from 'focus-trap'
import { createPlugin } from '../create-plugin'

const focusTraps = new WeakMap<HTMLDivElement, FocusTrap>()

export const FocusLockPlugin = createPlugin({
  build: () => ({
    onAfterMountDOM: ({ modal }) => {
      const focusTrap = createFocusTrap(modal)
      focusTrap.activate()
      focusTraps.set(modal, focusTrap)
    },
    onBeforeUnmountDOM: ({ modal }) => {
      const focusTrap = focusTraps.get(modal)
      if (!focusTrap) return
      focusTrap.deactivate()
    },
  }),
})
