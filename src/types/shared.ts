import { FC, MutableRefObject, ReactNode } from 'react'
import { ChildlessFC } from './util'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: ChildlessFC<{
    modalRef: MutableRefObject<HTMLDivElement | null>
    close: () => void
  }>
  root?: () => HTMLElement
} & LifecycleCallbacks

export type ModalFC = FC<ModalProps>
