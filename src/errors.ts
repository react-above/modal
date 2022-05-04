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

export class RefNotPassedException extends Error {
  constructor(element: string) {
    super(
      `${element}'s Ref has not been passed to the appropriate element.` +
        ` Some library functions and plugins may not work`
    )
  }
}
