import { useLayoutEffect } from 'react'
import { Refs } from '../types'
import { NormalizedModalProps } from '../normalize-props'
import { getRefElement } from '../shared/refs'

interface Params {
  isMounted: boolean
  props: NormalizedModalProps
  refs: Refs
}

export function useCloseOnEsc({ isMounted, props, refs }: Params) {
  useLayoutEffect(() => {
    if (!isMounted) return
    if (!props.closeOnEsc) return

    const root = getRefElement(refs, '__root__')

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') props.close()
    }

    root.addEventListener('keydown', handler)
    return () => root.removeEventListener('keydown', handler)
  }, [isMounted])
}
