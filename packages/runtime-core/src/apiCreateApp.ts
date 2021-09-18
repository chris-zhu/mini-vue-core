import { createVNode } from './vnode'

export interface App {}

export interface AppConfig {}

export interface AppContext {}

export type Plugin = {}

export type CreateAppFunction = {}

export type OptionMergeFunction = (to: unknown, from: unknown) => any

let uid = 0

export function createAppContext() {
  return {
    app: null as any,
    config: {},
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}

export function createAppAPI() {
  return function createApp(rootComponent, rootProps = null) {
    const context = createAppContext()

    let isMounted = false

    const app = (context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,

      get config() {
        return context.config
      },

      mount(rootContainer) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps)
          vnode.appContext = context

          isMounted = true
          app._container = rootContainer

          app._instance = vnode.component

          return vnode.component!.proxy
        }
      }
    })

    return app
  }
}
