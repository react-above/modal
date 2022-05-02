import { FC, ReactNode } from 'react'

export interface MountingParams {
  html: HTMLElement
  body: HTMLElement
  screen: HTMLElement
  overlay: HTMLElement
  container: HTMLElement
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

export type ModalProps = {
  isOpen: boolean
  close: () => void
  children?: ReactNode | undefined
  render?: React.FC<{ close: () => void }>
  root?: () => HTMLElement
} & LifecycleCallbacks

export type ModalFC = FC<ModalProps>
