import React, { useState } from 'react'
import { render } from 'react-dom'
import { ThemeDefault } from '@react-above/modal-theme-default'
import {
  createModal,
  ScrollLockPlugin,
  FocusLockPlugin,
  ModalRenderer,
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

const Renderer: ModalRenderer = ({ close }) => {
  const [count, setCount] = useState(0)
  const increase = () => setCount((current) => current + 1)

  return (
    <Modal.Surface>
      <Modal.Header title="My modal" close={close} />
      <Modal.Body>
        <p>Count: {count}</p>
        <button onClick={increase}>Increase</button>
      </Modal.Body>
    </Modal.Surface>
  )
}

const ModalWithRender = () => {
  const [isOpen, setOpen] = useState(false)
  const open = () => setOpen(true)
  const close = () => setOpen(false)

  return (
    <div>
      <button onClick={open}>Open modal with "render"</button>
      <Modal isOpen={isOpen} close={close} render={Renderer} />
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
