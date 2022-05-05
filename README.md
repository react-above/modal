# @react-above/modal

- Lightweight
- All commonly used features (`closeOnClickOutside`, `closeOnEsc`, Scroll and Focus locks as plugins)
- Completely customizable and extendable (actually, it doesn't have an UI out of the box)
- Plugin system (you can even do animations inside)
- A11y attributes and convenient API for specifying them
- 2 methods of rendering: `children` and render-prop
- A lot of lifecycle methods are available

## Installation

```sh
$ yarn add @react-above/modal
```

## Usage

### 1. Create Modal component

```tsx
/* Somewhere in your UI layer.. */

import { createModal, ScrollLockPlugin, FocusLockPlugin } from '@react-above/modal'

// you can use any theme instead of the default one
import { ThemeDefault } from '@react-above/modal-theme-default'

export const Modal = createModal({
  theme: ThemeDefault(),
  plugins: [ScrollLockPlugin(), FocusLockPlugin()],
})
```

### 2. Use anywhere

#### Children syntax

The most common usage method. The majority of modal libraries look like so.

```tsx
import { Modal } from '@app/ui'

<Modal isOpen={isOpen} close={close}>
  <Modal.Surface>
    <Modal.Header title="My modal" close={close} />
    <Modal.Body>My modal description</Modal.Body>
  </Modal.Surface>
</Modal>
```

#### Render syntax

Also, `react-above`'s Modal provides the `render` prop API for more flexibility.

It can be a simple inline-function, or a real React-component - you can freely use hooks inside.

```tsx
import { Modal } from '@app/ui'

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
```

## API Reference

### createModal

```tsx
type Parameters = {
  /*
   * Theme is used to set up modal's Frame (screen + overlay + modal)
   * Also, Theme can extend Modal component with its specific sub-components,
   * so you can use them like Modal.Surface, Modal.Header, Modal.Body and etc.
   */
  theme: ThemeOutput

  /*
   * Plugins are used to add specific functionality to Modal
   * They have an access to Modal's elements and lifecycle callbacks
   * 
   * Some lifecycle callbacks may be asynchronous,
   * so you can implement animation delay in there
   */
  plugins?: PluginOutput[]

  /*
   * The function returning Modal's render target node
   * It's done as a function for the SSR-compatibility reasons
   */
  root?: () => HTMLElement
}

type ReturnType = ModalFC & {
  // ... custom Theme components
}
```

### Modal

```tsx
type ModalFC = FC<ModalProps>

type ModalProps = {
  // no need to explain
  isOpen: boolean

  // "close" callback is used by inner functionality (like "closeOnClickOutside" and "closeOnEsc")
  close: () => void

  // the most common usage method - just pass content as a children
  children?: ReactNode

  /*
   * Render is useful for avoiding the execution of unwanted logic
   * It guarantees that your Renderer component will be called ONLY when modal is open
   * So, you can get rid of useless conditional rendering and hook calls
   * 
   * Also, ModalRenderer may be the common React component,
   * so you can safely use hooks inside
   */
  render?: ModalRenderer

  closeOnClickOutside?: boolean
  closeOnEsc?: boolean

  // title and description for a11y attributes
  aria?: Aria

  // custom root
  root?: () => HTMLElement
}
```