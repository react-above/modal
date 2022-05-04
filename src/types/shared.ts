import { AriaAttributes, FC, MutableRefObject, ReactNode } from 'react'
import { ChildfreeFC } from './util'

export interface Elements {
  screen: HTMLDivElement
  overlay: HTMLDivElement
  modal: HTMLDivElement
}

export type Refs = {
  [Name in keyof Elements]: MutableRefObject<Elements[Name] | null>
}

export type MountingCallback = (params: Elements) => Promise<void> | void
export type MountingCallbackSync = (params: Elements) => void

export interface LifecycleCallbacks {
  onAfterMount?: MountingCallback
  onAfterMountDOM?: MountingCallbackSync
  onBeforeUnmount?: MountingCallback
  onBeforeUnmountDOM?: MountingCallbackSync
}

export type LifecycleCallbackName = keyof LifecycleCallbacks
export type LifecycleCallback = LifecycleCallbacks[LifecycleCallbackName]

export type ModalRenderer = ChildfreeFC<{ close: () => void }>

export interface Aria {
  title: string
  description: string
}

export type A11yAttributes = { role: 'dialog' } & AriaAttributes

export type ModalProps = {
  isOpen: boolean
  close: () => void
  children?: ReactNode
  render?: ModalRenderer
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  aria?: Aria
  root?: () => HTMLElement
} & LifecycleCallbacks

export type ModalFC = FC<ModalProps>
