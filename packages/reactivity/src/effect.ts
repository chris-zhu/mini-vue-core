import { extend } from '@vue/shared'
import { recordEffectScope } from './effectScope'
import type { TrackOpTypes, TriggerOpTypes } from './operations'
import type { EffectScope } from './effectScope'

export type EffectScheduler = (...args: any[]) => any

// let activeEffect: ReactiveEffect | undefined
export class ReactiveEffect {
  active: true
  dep: []
  parent: ReactiveEffect | undefined = undefined

  constructor(public fn: () => any,
    public schedeler: EffectScheduler | null = null,
    scope?: EffectScope) {
    recordEffectScope(this, scope)
  }

  stop() {

  }

  run() {
    // if (!this.active)
    //   return this.fn()

    // let parent: ReactiveEffect | undefined = activeEffect

    // while (parent) {
    //   if (parent === this)
    //     return
    //   parent = parent.parent
    // }
  }
}

export interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

export type DebuggerEvent = {
  effect: ReactiveEffect
} & DebuggerEventExtraInfo

export type DebuggerEventExtraInfo = {
  target: object
  type: TrackOpTypes | TriggerOpTypes
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}

export interface ReactiveEffectOptions extends DebuggerOptions {
  lazy?: boolean
  scheduler?: EffectScheduler
  scope?: EffectScope
  allowRecurse?: boolean
  onStop?: () => void
}

export interface ReactiveEffectRunner<T = any> {
  (): T
  effect: ReactiveEffect
}

export function effect<T=any>(fn: () => T, options?: ReactiveEffectOptions): ReactiveEffectRunner {
  // 如果 fn 已经是响应式的函数
  if ((fn as ReactiveEffectRunner).effect)
    fn = (fn as ReactiveEffectRunner).effect.fn

  const _effect = new ReactiveEffect(fn)

  if (options) {
    extend(_effect, options)
    if (options.scope) recordEffectScope(_effect, options.scope)
  }
  if (!options || !options.lazy)
    _effect.run()

  const runner = _effect.run.bind(_effect) as ReactiveEffectRunner
  runner.effect = _effect
  return runner
}

export function stop(runner: ReactiveEffectRunner) {
  runner.effect.stop()
}
