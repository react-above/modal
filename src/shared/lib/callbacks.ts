import { LifecycleCallback } from '../../types'

interface ParallelizeParams<T extends LifecycleCallback> {
  fromUser: T
  fromPlugins: T[]
  params: Parameters<Exclude<T, undefined>>[0] | null
}

export function parallelizeCallbacks<T extends LifecycleCallback>({
  fromUser,
  fromPlugins,
  params,
}: ParallelizeParams<T>) {
  if (!params) return Promise.resolve()

  return Promise.all(
    fromPlugins.map((callback) => callback?.(params)).concat(fromUser?.(params))
  )
}
