import { FC, ReactNode } from 'react'
import { Aria, ModalFC, Refs, ReplaceVoid } from '../types'

export interface FrameProps {
  refs: Refs
  aria?: Aria
  children?: ReactNode | undefined
}

export type FrameFC = FC<FrameProps>

export interface ThemeOutput<TModal extends ModalFC, TOptions = void> {
  options: ReplaceVoid<TOptions>
  frame: FrameFC
  extend: (modal: ModalFC) => TModal
}

export type Theme<TModal extends ModalFC, TOptions = void> = (
  options: TOptions
) => ThemeOutput<TModal, TOptions>
