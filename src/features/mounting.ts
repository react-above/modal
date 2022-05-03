import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LifecycleCallbackName, Refs } from '../types'
import { usePlugins } from '../plugins'
import { parallelizeCallbacks } from '../shared/lib/callbacks'
import { NormalizedModalProps } from '../normalize-props'
import { getRefElement } from '../shared/refs'

/**
 * Manage everything related to modal mounting state and mounting hooks
 *
 * Inside modal we use "isMounted" instead of "isOpen",
 * since the modal may have animation transitions that require it to be mounted
 */
export function useMounting(props: NormalizedModalProps) {
  const plugins = usePlugins()
  const [isMounted, setMounted] = useState(() => props.isOpen)

  const refs: Refs = {
    screen: useRef<HTMLDivElement | null>(null),
    overlay: useRef<HTMLDivElement | null>(null),
    modal: useRef<HTMLDivElement | null>(null),
  }

  const getElement = (element: keyof Refs) => getRefElement(refs, element)

  const runCallback = (name: LifecycleCallbackName) =>
    parallelizeCallbacks({
      fromUser: props[name],
      fromPlugins: plugins.map((plugin) => plugin[name]),
      params: {
        html: document.documentElement,
        body: document.body,
        screen: getElement('screen'),
        overlay: getElement('overlay'),
        modal: getElement('modal'),
      },
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
      runCallback('onBeforeUnmount').then(() => {
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

    runCallback('onAfterMountDOM')

    return () => {
      runCallback('onBeforeUnmountDOM')
    }
  }, [isMounted])

  /*
   * Call "onAfterMount" when modal is mounted and all DOM operations are performed
   */
  useEffect(() => {
    if (!isMounted) return

    runCallback('onAfterMount')
  }, [isMounted])

  return { isMounted, refs }
}
