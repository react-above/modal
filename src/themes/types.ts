import { FC, ReactNode } from 'react'
import { A11yAttributes, ModalFC, Refs, ReplaceVoid } from '../types'

export interface FrameProps {
  refs: Refs
  a11yAttibutes?: A11yAttributes
  children: ReactNode
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
