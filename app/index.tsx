import React, { useState } from 'react'
import { render } from 'react-dom'
import { ThemeDefault } from '@react-above/modal-theme-default'
import {
  createModal,
  ScrollLockPlugin,
  FocusLockPlugin,
} from '@react-above/modal'
import '@react-above/modal-theme-default/dist/styles.css'

const Modal = createModal({
  theme: ThemeDefault(),
  plugins: [ScrollLockPlugin(), FocusLockPlugin()],
})

const ModalWithChildren = () => {
  const [isOpen, setOpen] = useState(false)
  const open = () => setOpen(true)
  const close = () => setOpen(false)

  return (
    <div>
      <button onClick={open}>Open modal with "children"</button>
      <Modal isOpen={isOpen} close={close}>
        <Modal.Surface>
          <Modal.Header title="My modal" close={close} />
          <Modal.Body>My modal description</Modal.Body>
        </Modal.Surface>
      </Modal>
    </div>
  )
}

const ModalWithRender = () => {
  const [isOpen, setOpen] = useState(false)
  const open = () => setOpen(true)
  const close = () => setOpen(false)

  return (
    <div>
      <button onClick={open}>Open modal with "render"</button>
      <Modal
        isOpen={isOpen}
        close={close}
        render={({ close }) => (
          <Modal.Surface>
            <Modal.Header title="My modal" close={close} />
            <Modal.Body>My modal description</Modal.Body>
          </Modal.Surface>
        )}
      />
    </div>
  )
}

const App = () => (
  <>
    <ModalWithChildren />
    <ModalWithRender />
  </>
)

render(<App />, document.querySelector('#root'))
