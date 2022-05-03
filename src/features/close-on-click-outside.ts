import { useLayoutEffect } from 'react'
import { Refs } from '../types'
import { NormalizedModalProps } from '../normalize-props'
import { getRefElement } from '../shared/refs'

interface Params {
  isMounted: boolean
  props: NormalizedModalProps
  refs: Refs
}

export function useCloseOnClickOutside({ isMounted, props, refs }: Params) {
  useLayoutEffect(() => {
    if (!isMounted) return
    if (!props.closeOnClickOutside) return

    const screen = getRefElement(refs, 'screen')

    const handler = (event: MouseEvent) => {
      if (event.target === screen) props.close()
    }

    screen.addEventListener('click', handler)
    return () => screen.removeEventListener('click', handler)
  }, [isMounted])
}
