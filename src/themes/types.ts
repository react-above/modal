import { FC, MutableRefObject, ReactNode } from 'react'
import { ModalFC, ReplaceVoid } from '../types'

export interface FrameProps {
  screenRef: MutableRefObject<HTMLDivElement | null>
  overlayRef: MutableRefObject<HTMLDivElement | null>
  containerRef: MutableRefObject<HTMLDivElement | null>
  children?: ReactNode | undefined
}

export type FrameFC = FC<FrameProps>

export interface ThemeOutput<TModal extends ModalFC, TOptions = void> {
  options: ReplaceVoid<TOptions>
  frame: FrameFC
  extend?: (modal: ModalFC) => TModal
}

export type Theme<TModal extends ModalFC, TOptions = void> = (
  options: TOptions
) => ThemeOutput<TModal, TOptions>
