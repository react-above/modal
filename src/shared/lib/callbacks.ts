import { LifecycleCallback } from '../../types'

interface ParallelizeParams<T extends LifecycleCallback> {
  fromUser: T
  fromPlugins: T[]
  params: Parameters<Exclude<T, undefined>>[0]
}

export const parallelizeCallbacks = <T extends LifecycleCallback>({
  fromUser,
  fromPlugins,
  params,
}: ParallelizeParams<T>) =>
  Promise.all([
    fromUser?.(params),
    ...fromPlugins.map((callback) => callback?.(params)),
  ])
