
import { Context } from './Context'


class UuidGeneratorApi2Error extends Error {

  isUuidGeneratorApi2Error = true

  sdk = 'UuidGeneratorApi2'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  UuidGeneratorApi2Error
}

