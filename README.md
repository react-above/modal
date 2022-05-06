# @react-above/modal

A flexible headless modal library for your React app.

- All commonly used features (`closeOnClickOutside`, `closeOnEsc`, Scroll and Focus locks as plugins)
- Completely customizable and extendable (actually, it doesn't have an UI out of the box)
- Lightweight
- Plugin system (you can even do animations inside)
- A11y attributes and convenient API for specifying them
- 2 methods of rendering: `children` and render-prop
- A lot of lifecycle methods available
- **Warning**: [**NO** full support for multiple/nested modals](#a-few-words-about-multiplenested-modals)

## Roadmap

- [x] Core modal features
- [x] Theme support
- [x] Plugin system
- [x] Close on ESC and click outside
- [ ] Move plugins to separate repos
- [ ] Theme-level lifecycle callbacks
- [ ] Animation plugin
- [ ] Plugin and theme repo templates
- [ ] Better default theme
- [ ] Test cases for everything
- [ ] A small documentation and API reference in READMEs
- [ ] Release v1.0.0
- [ ] Logo and banner for `react-above`
- [ ] A good comprehensive documentation on a separate website
- [ ] Theme catalog with demos
- [ ] Plugin catalog with demos
- [ ] More themes

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

type Elements = {
  html: HTMLElement
  body: HTMLElement
  screen: HTMLElement
  overlay: HTMLElement
  modal: HTMLElement
}

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

  /*
   * The Modal will wait for Promise to be resolved
   * You can use this behavior to implement animation delays
   */
  onAfterMount?: (elements: Elements) => Promise<void> | void
  onBeforeUnmount?: (elements: Elements) => Promise<void> | void

  /*
   * The DOM-postfixed callbacks are called inside useLayoutEffect
   * If you want to work with HTML nodes - this is the perfect place
   */
  onAfterMountDOM?: (elements: Elements) => void
  onBeforeUnmountDOM?: (elements: Elements) => void
}
```

## Creating plugins

```tsx
/*
 * Accepts Options type as a generic parameter
 * It defaults to "void"
 * 
 * In "build" callback, "void" transforms to "undefined",
 * to emulate "optional" parameter for better DX
 */
export const MyPlugin = createPlugin<MyPluginOptions | void>({
  build: (options: MyPluginOptions | undefined) => ({
    /*
     * The lifecycle callbacks is optional
     */
    onAfterMount: (elements: Elements) => { /* ... */ },
    onBeforeUnmount: (elements: Elements) => { /* ... */ },
    onAfterMountDOM: (elements: Elements) => { /* ... */ },
    onBeforeUnmountDOM: (elements: Elements) => { /* ... */ }
  }),
})

```

## A few words about multiple/nested modals

The main reasons why it's not implemented:

- In most cases, [the nested modals is an anti-pattern](https://uxplanet.org/removing-nested-modals-from-digital-products-6762351cf6de)
- It can cause inconvenient public API - most likely you would have to render something like `ModalRoot`
- The `Overlay` shouldn't overlap, so it requires an additional work to be done. We would need a new type of lifecycle callbacks, and the more complicated `Theme` API
- It's hard to implement and the resulting code won't look good

The current behavior:

- You can open multiple Modals at once
- The `Overlay` components will overlap - the background will become darker (in case of black transparent `Overlay`)
- On **click outside**: the **upper one** Modal will be closed
- On **ESC press**: **ALL** Modals will be closed
