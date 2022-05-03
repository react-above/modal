import React, { ReactNode } from 'react'
import { NormalizedModalProps } from '../normalize-props'
import { NoRenderException, OnlyOneRenderException } from '../errors'

/**
 * Validate render-like props:
 * 1. User should pass at least one of them
 * 2. User should not pass both of them at the same time
 * 3. User should not pass multiple elements as "children"
 */
export function createChildren({
  children,
  render,
  close,
}: NormalizedModalProps): ReactNode {
  if (!children && !render) throw new NoRenderException()
  if (children && render) throw new OnlyOneRenderException()
  if (children) return children
  const Renderer = render!
  return <Renderer close={close} />
}
