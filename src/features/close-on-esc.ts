import { Refs } from '../types'
import { NormalizedModalProps } from '../normalize-props'
import { useIsomorphicLayoutEffect } from '../shared/lib/react'

interface Params {
  isMounted: boolean
  props: NormalizedModalProps
  refs: Refs
}

export function useCloseOnEsc({ isMounted, props }: Params) {
  useIsomorphicLayoutEffect(() => {
    if (!isMounted) return
    if (!props.closeOnEsc) return

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') props.close()
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isMounted])
}
