import { warn } from '@vue/shared'
import type { ReactiveEffect } from './effect'

let activeEffectScope: EffectScope | undefined

export class EffectScope {
    active = true
    effects: ReactiveEffect[] = []
    cleanups: (() => void)[] = []
    parent: EffectScope | undefined
    scopes: EffectScope[] | undefined

    private index: number | undefined

    // detached 是否独立，当存在嵌套的scope时，决定是否挂到父节点下
    constructor(detached = false) {
      if (!detached && activeEffectScope) {
        this.parent = activeEffectScope
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1
      }
    }

    // 执行 作用域函数
    run<T>(fn: () => T): T | void {
      if (this.active) {
        try {
          activeEffectScope = this
          return fn()
        } finally {
          activeEffectScope = this.parent
        }
      } else {
        warn('cannot run an inactive effect scope.')
      }
    }

    // 成为最新的activeEffectScope
    on() {
      activeEffectScope = this
    }

    // activeEffectScope设为自己的父级作用域
    off() {
      activeEffectScope = this.parent
    }

    // 停止 并且清除 子集的监听
    stop(fromParent = false) {
      if (this.active) {
        let i, l
        // 清楚作用域内收集effect的监听
        for (i = 0, l = this.effects.length; i < l; i++)
          this.effects[i].stop()
        //  cleanups 的清理
        for (i = 0, l = this.cleanups.length; i < l; i++)
          this.cleanups[i]()
        // scope的stop
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++)
            this.scopes[i].stop(true)
        }

        // fromParent = false(默认) 则会从 this.parent.scopes 移除当前的 scope， 并且释放他的内存
        // fromParent = true 不会从 this.parent.scopes 断开父子关系的引用关系
        if (this.parent && !fromParent) {
          const last = this.parent.scopes!.pop()
          if (last && last !== this) {
            this.parent.scopes![this.index!] = last
            last.index = this.index!
          }
        }

        this.active = false
      }
    }
}

export function effectScope(detached?: boolean) {
  return new EffectScope(detached)
}

// 将 effect 收集到对应的 scope中
export function recordEffectScope(effect: ReactiveEffect, scope: EffectScope | undefined = activeEffectScope) {
  if (scope && scope.active)
    scope.effects.push(effect)
}

// 获取当前的scope
export function getCurrentScope() {
  return activeEffectScope
}

// scope 在停止前的回调
export function onScopeDispose(fn: () => void) {
  if (activeEffectScope)
    activeEffectScope.cleanups.push(fn)
  else
    warn('onScopeDispose() is called when there is no active effect scope' + ' to be associated with.')
}
