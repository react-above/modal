/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, MutableRefObject, ReactNode } from 'react'
import { NoFrameException } from '../errors'

export interface FrameProps {
  screenRef: MutableRefObject<HTMLDivElement | null>
  overlayRef: MutableRefObject<HTMLDivElement | null>
  containerRef: MutableRefObject<HTMLDivElement | null>
  children?: ReactNode | undefined
}

export type FrameFC = FC<FrameProps>
export type Frame = FrameFC | null

let current: Frame = null

function get() {
  return current
}

function set(frame: Frame) {
  current = frame
}

function isComponent(frame: Frame): frame is FrameFC {
  return frame !== null
}

function isEmpty(frame: Frame): frame is null {
  return frame === null
}

export const FrameService = {
  get,
  set,
  isComponent,
  isEmpty,
}

export function useFrame(): FrameFC {
  const Frame = FrameService.get()

  if (FrameService.isEmpty(Frame)) {
    throw new NoFrameException()
  }

  return Frame
}
