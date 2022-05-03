import { RefNotPassedException } from '../errors'
import { Refs } from '../types'

export function getRefElement(refs: Refs, element: keyof Refs): HTMLDivElement {
  const { current } = refs[element]
  if (!current) throw new RefNotPassedException(element)
  return current
}
