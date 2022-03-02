import { recordEffectScope } from './effectScope'
import type { EffectScope } from './effectScope'

let activeEffect: ReactiveEffect | undefined
export class ReactiveEffect {
  active: true
  dep: []
  parent: ReactiveEffect | undefined = undefined

  // 将当前的effect 收集到 effectScope 中
  constructor(public fn: () => void, schedeler: any, scope?: EffectScope) {
    recordEffectScope(this, scope)
  }

  stop() {

  }

  run() {
    if (!this.active)
      return this.fn()

    let parent: ReactiveEffect | undefined = activeEffect

    while (parent) {
      if (parent === this)
        return
      parent = parent.parent
    }
  }
}

export interface ReactiveEffectRunner<T = any> {
  (): T
  effect: ReactiveEffect
}

export function effect<T=any>(fn: () => T, options): ReactiveEffectRunner {

}
