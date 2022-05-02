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

```tsx
import { Modal } from '@app/ui'

<Modal isOpen={isOpen} close={close}>
  <Modal.Surface>
    <Modal.Header title="My modal" close={close} />
    <Modal.Body>My modal text</Modal.Body>
  </Modal.Surface>
</Modal>
```