import React, { forwardRef } from 'react'
import { render } from 'react-dom'
import {
  configurate,
  Modal,
  FrameProps,
  ScrollLockPlugin,
  FocusLockPlugin,
} from '@react-above/modal'

configurate({
  frame: forwardRef<HTMLDivElement, FrameProps>(({ children }, ref) => (
    <div ref={ref}>{children}</div>
  )),
  plugins: [ScrollLockPlugin(), FocusLockPlugin()],
})

render(
  <div>
    <h1>@react-above/modal</h1>
    <Modal isOpen={true} close={() => {}}>
      <span>Some text</span>
    </Modal>
  </div>,
  document.querySelector('#root')
)
