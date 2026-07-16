// UuidGeneratorApi2 Ts SDK

import { GuidEntity } from './entity/GuidEntity'
import { V1nEntity } from './entity/V1nEntity'
import { V1n2Entity } from './entity/V1n2Entity'
import { V3nEntity } from './entity/V3nEntity'
import { V3n2Entity } from './entity/V3n2Entity'
import { V4nEntity } from './entity/V4nEntity'
import { V4n2Entity } from './entity/V4n2Entity'
import { V5nEntity } from './entity/V5nEntity'
import { V5n2Entity } from './entity/V5n2Entity'
import { V6nEntity } from './entity/V6nEntity'
import { V6n2Entity } from './entity/V6n2Entity'
import { V7nEntity } from './entity/V7nEntity'
import { V7n2Entity } from './entity/V7n2Entity'

export type * from './UuidGeneratorApi2Types'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { UuidGeneratorApi2EntityBase } from './UuidGeneratorApi2EntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class UuidGeneratorApi2SDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  // Entity access: `client.Guid().list()` / `client.Guid().load({ id })`.
  Guid(data?: any) {
    const self = this
    return new GuidEntity(self,data)
  }


  // Entity access: `client.V1n().list()` / `client.V1n().load({ id })`.
  V1n(data?: any) {
    const self = this
    return new V1nEntity(self,data)
  }


  // Entity access: `client.V1n2().list()` / `client.V1n2().load({ id })`.
  V1n2(data?: any) {
    const self = this
    return new V1n2Entity(self,data)
  }


  // Entity access: `client.V3n().list()` / `client.V3n().load({ id })`.
  V3n(data?: any) {
    const self = this
    return new V3nEntity(self,data)
  }


  // Entity access: `client.V3n2().list()` / `client.V3n2().load({ id })`.
  V3n2(data?: any) {
    const self = this
    return new V3n2Entity(self,data)
  }


  // Entity access: `client.V4n().list()` / `client.V4n().load({ id })`.
  V4n(data?: any) {
    const self = this
    return new V4nEntity(self,data)
  }


  // Entity access: `client.V4n2().list()` / `client.V4n2().load({ id })`.
  V4n2(data?: any) {
    const self = this
    return new V4n2Entity(self,data)
  }


  // Entity access: `client.V5n().list()` / `client.V5n().load({ id })`.
  V5n(data?: any) {
    const self = this
    return new V5nEntity(self,data)
  }


  // Entity access: `client.V5n2().list()` / `client.V5n2().load({ id })`.
  V5n2(data?: any) {
    const self = this
    return new V5n2Entity(self,data)
  }


  // Entity access: `client.V6n().list()` / `client.V6n().load({ id })`.
  V6n(data?: any) {
    const self = this
    return new V6nEntity(self,data)
  }


  // Entity access: `client.V6n2().list()` / `client.V6n2().load({ id })`.
  V6n2(data?: any) {
    const self = this
    return new V6n2Entity(self,data)
  }


  // Entity access: `client.V7n().list()` / `client.V7n().load({ id })`.
  V7n(data?: any) {
    const self = this
    return new V7nEntity(self,data)
  }


  // Entity access: `client.V7n2().list()` / `client.V7n2().load({ id })`.
  V7n2(data?: any) {
    const self = this
    return new V7n2Entity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new UuidGeneratorApi2SDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return UuidGeneratorApi2SDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'UuidGeneratorApi2' }
  }

  toString() {
    return 'UuidGeneratorApi2 ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = UuidGeneratorApi2SDK


export {
  stdutil,
  config,

  BaseFeature,
  UuidGeneratorApi2EntityBase,

  UuidGeneratorApi2SDK,
  SDK,
}


