export class NoFrameException extends Error {
  constructor() {
    super(`Modal's Frame component is not defined. Forgot to set up a theme?`)
  }
}

export class NoRenderException extends Error {
  constructor() {
    super(`Modal requires either "render" or "children" prop to be used`)
  }
}

export class OnlyOneRenderException extends Error {
  constructor() {
    super(`You cannot use both "render" and "children" props at the same time`)
  }
}

export class NotValidElementException extends Error {
  constructor() {
    super(`Modal Renderer output should be a valid React element`)
  }
}
