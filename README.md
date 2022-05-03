# @react-above/modal

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

  /* Optional */
  plugins: [ScrollLockPlugin(), FocusLockPlugin()],
  root: () => document.body
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