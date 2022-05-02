import React, {
  cloneElement,
  FC,
  isValidElement,
  MutableRefObject,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { PluginOutput, PluginsProvider, usePlugins } from './plugins'
import {
  NoRenderException,
  NotValidElementException,
  OnlyOneRenderException,
  RefNotPassedException,
} from './errors'
import { parallelizeCallbacks } from './shared/lib/callbacks'
import { ModalFC, ModalProps, MountingParams } from './types'
import { ThemeOutput, ThemeProvider, useTheme } from './themes'

export interface CreateModal<TModal extends ModalFC, TOptions = void> {
  theme: ThemeOutput<TModal, TOptions>
  plugins: PluginOutput[]
}

export function createModal<TModal extends ModalFC, TOptions = void>(
  options: CreateModal<TModal, TOptions>
): FC<ModalProps> {
  return (props) => (
    <ThemeProvider value={options.theme}>
      <PluginsProvider value={options.plugins}>
        <Modal {...props} />
      </PluginsProvider>
    </ThemeProvider>
  )
}

const Modal: FC<ModalProps> = (props) => {
  const { close, children, render } = props

  const { frame: Frame } = useTheme()

  const {
    isMounted,
    screenRef,
    overlayRef,
    containerRef,
    modalRef,
  } = useMounting(props)

  if (!isMounted) {
    return null
  }

  return createPortal(
    <Frame
      screenRef={screenRef}
      overlayRef={overlayRef}
      containerRef={containerRef}
    >
      {createChildren({ modalRef, children, render, close })}
    </Frame>,
    document.body
  )
}

type CreateChildrenParams = {
  modalRef: MutableRefObject<HTMLElement | null>
} & Pick<ModalProps, 'children' | 'render' | 'close'>

/**
 * Validate render-like props:
 * 1. User should pass at least one of them
 * 2. User should not pass both of them at the same time
 * 3. User should not pass multiple elements as "children"
 *
 * Clone resulting element and pass our Ref inside
 * We should not override the user's Ref, so we're using mergeRefs function
 */
function createChildren({
  modalRef,
  children,
  render,
  close,
}: CreateChildrenParams): ReactNode {
  if (!children && !render) throw new NoRenderException()
  if (children && render) throw new OnlyOneRenderException()
  const Renderer = render!
  const jsx = children || <Renderer close={close} />
  React.Children.only(jsx)
  const [modal] = React.Children.toArray(jsx)
  if (!isValidElement(modal)) throw new NotValidElementException()
  const mergedRefs = mergeRefs([modalRef, modal.props.ref])
  return cloneElement(modal, { ref: mergedRefs })
}

type OptionalRef = MutableRefObject<HTMLElement | null> | undefined

/**
 * Combines multiple Refs into the one
 */
function mergeRefs(refs: OptionalRef[]) {
  return (node: HTMLElement) => {
    for (const ref of refs) {
      if (!ref) continue
      ref.current = node
    }
  }
}

/**
 * Manage everything related to modal mounting state and mounting hooks
 *
 * Inside modal we use "isMounted" instead of "isOpen",
 * since the modal may have animation transitions that require it to be mounted
 */
function useMounting(props: ModalProps) {
  const plugins = usePlugins()
  const [isMounted, setMounted] = useState(() => props.isOpen)
  const screenRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  type ElementRef = MutableRefObject<HTMLDivElement | null>
  const getElement = (element: string, ref: ElementRef): HTMLDivElement => {
    if (!ref.current) throw new RefNotPassedException(element)
    return ref.current
  }

  const createMountingParams = (): MountingParams => ({
    html: document.documentElement,
    body: document.body,
    screen: getElement('screen', screenRef),
    overlay: getElement('overlay', overlayRef),
    container: getElement('container', containerRef),
    modal: getElement('modal', modalRef),
  })

  /*
   * Immediately mount modal when isOpen becomes "true"
   *
   * Call "onBeforeUnmount" when isOpen becomes "false"
   *
   * Usually "onBeforeUnmount" contains animation timeout,
   * so we should wait these callbacks to finish before unmounting
   *
   * We don't call "onAfterMount" here,
   * because HTML elements have not been created yet
   */
  useEffect(() => {
    if (!props.isOpen) return

    setMounted(true)

    return () => {
      parallelizeCallbacks({
        fromUser: props.onBeforeUnmount,
        fromPlugins: plugins.map((plugin) => plugin.onBeforeUnmount),
        params: createMountingParams(),
      }).then(() => {
        setMounted(false)
      })
    }
  }, [props.isOpen])

  /*
   * Call "onAfterMountDOM" when modal is mounted
   * And "onBeforeUnmountDOM" when modal is unmounted
   *
   * The callbacks with "DOM" postfix are intended to make DOM operations,
   * that's why we're calling them inside "useLayoutEffect"
   */
  useLayoutEffect(() => {
    if (!isMounted) return

    const params = createMountingParams()

    parallelizeCallbacks({
      fromUser: props.onAfterMountDOM,
      fromPlugins: plugins.map((plugin) => plugin.onAfterMountDOM),
      params,
    })

    return () => {
      parallelizeCallbacks({
        fromUser: props.onBeforeUnmountDOM,
        fromPlugins: plugins.map((plugin) => plugin.onBeforeUnmountDOM),
        params,
      })
    }
  }, [isMounted])

  /*
   * Call "onAfterMount" when modal is mounted and all DOM operations are performed
   */
  useEffect(() => {
    if (!isMounted) return

    parallelizeCallbacks({
      fromUser: props.onAfterMount,
      fromPlugins: plugins.map((plugin) => plugin.onAfterMount),
      params: createMountingParams(),
    })
  }, [isMounted])

  return { isMounted, screenRef, overlayRef, containerRef, modalRef }
}
