import { RefNotPassedException } from '../errors'
import { Elements, Refs } from '../types'

export function getRefElement<T extends keyof Refs>(
  refs: Refs,
  name: T
): Elements[T] {
  const { current } = refs[name]
  if (!current) throw new RefNotPassedException(name)
  return current
}

export function getRefElements(refs: Refs): Elements {
  const elements = {} as Elements
  let name: keyof Refs
  for (name in refs) {
    elements[name] = getRefElement(refs, name)
  }
  return elements
}
