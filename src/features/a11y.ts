import { A11yAttributes, Aria } from '../types'

export function useA11yAttributes(aria?: Aria): A11yAttributes {
  return {
    'role': 'dialog',
    'aria-modal': true,
    'aria-labelledby': aria?.title,
    'aria-describedby': aria?.description,
  }
}
