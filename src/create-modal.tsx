import React, { FC } from 'react'
import { createPortal } from 'react-dom'
import { PluginOutput, PluginsProvider } from './plugins'
import { ModalFC, ModalProps } from './types'
import { ThemeOutput, ThemeProvider, useTheme } from './themes'
import { useMounting } from './features/mounting'
import { createChildren } from './features/children'
import { normalizeProps } from './normalize-props'
import { useCloseOnClickOutside } from './features/close-on-click-outside'
import { useCloseOnEsc } from './features/close-on-esc'
import { useA11yAttributes } from './features/a11y'

export interface CreateModal<TModal extends ModalFC, TOptions = void> {
  theme: ThemeOutput<TModal, TOptions>
  plugins?: PluginOutput[]
  root?: () => HTMLElement
}

export function createModal<TModal extends ModalFC, TOptions = void>({
  theme,
  plugins = [],
  root,
}: CreateModal<TModal, TOptions>): TModal {
  const WrappedModal: ModalFC = (props) => (
    <ThemeProvider value={theme}>
      <PluginsProvider value={plugins}>
        <Modal root={root} {...props} />
      </PluginsProvider>
    </ThemeProvider>
  )

  return theme.extend(WrappedModal)
}

const Modal: FC<ModalProps> = (rawProps) => {
  const props = normalizeProps(rawProps)

  const { aria, root } = props

  const { name: themeName, frame: Frame } = useTheme()

  const { isMounted, refs } = useMounting({ props })
  useCloseOnClickOutside({ isMounted, props, refs })
  useCloseOnEsc({ isMounted, props, refs })
  const a11yAttributes = useA11yAttributes(aria)

  if (typeof document === 'undefined') {
    return null
  }

  if (!isMounted) {
    return null
  }

  return createPortal(
    <div ref={refs.__root__} data-above-theme={themeName}>
      <Frame refs={refs} a11yAttibutes={a11yAttributes}>
        {createChildren(props)}
      </Frame>
    </div>,
    root()
  )
}
