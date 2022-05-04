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

    const overlay = getRefElement(refs, 'overlay')

    const handler = (event: MouseEvent) => {
      if (event.target === overlay) props.close()
    }

    overlay.addEventListener('click', handler)
    return () => overlay.removeEventListener('click', handler)
  }, [isMounted])
}
