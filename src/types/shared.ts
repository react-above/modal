import { FC, MutableRefObject, ReactNode } from 'react'
import { ChildfreeFC } from './util'

export interface MountingParams {
  html: HTMLElement
  body: HTMLElement
  screen: HTMLElement
  overlay: HTMLElement
  modal: HTMLElement
}

export type MountingCallback = (params: MountingParams) => Promise<void> | void
export type MountingCallbackSync = (params: MountingParams) => void

export interface LifecycleCallbacks {
  onAfterMount?: MountingCallback
  onAfterMountDOM?: MountingCallbackSync
  onBeforeUnmount?: MountingCallback
  onBeforeUnmountDOM?: MountingCallbackSync
}

export type LifecycleCallbackName = keyof LifecycleCallbacks
export type LifecycleCallback = LifecycleCallbacks[LifecycleCallbackName]

export type ModalRenderer = ChildfreeFC<{ close: () => void }>

export interface Refs {
  screen: MutableRefObject<HTMLDivElement | null>
  overlay: MutableRefObject<HTMLDivElement | null>
  modal: MutableRefObject<HTMLDivElement | null>
}

export interface Aria {
  title: string
  description: string
}

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
