# @react-above/modal

## Installation

```sh
$ yarn add @react-above/modal
```

## Usage

### 1. Set up

```tsx
/*
 * index.tsx / App.tsx
 */

import { configure, ScrollLockPlugin, FocusLockPlugin } from '@react-above/modal'

// you can use any theme instead of the default one
import { ThemeDefault } from '@react-above/modal-theme-default'

configure({
  theme: ThemeDefault(),
  // plugins is optional
  plugins: [ScrollLockPlugin(), FocusLockPlugin()]
})
```

### 2. Use anywhere

```tsx
import { Modal } from '@react-above/modal'

<Modal isOpen={isOpen} close={close}>
  <Modal.Surface>
    <Modal.Header title="My modal" close={close} />
    <Modal.Body>My modal text</Modal.Body>
  </Modal.Surface>
</Modal>
```