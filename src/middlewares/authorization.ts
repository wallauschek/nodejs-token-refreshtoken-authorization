import { BaseContext } from 'koa'

import { validatePermission } from '../services/authorization'
import { decode } from '../services/token'

const extractToken = (ctx: BaseContext) => {
  const authorization = ctx.headers.authorization || ''
  return authorization.replace('Bearer ', '')
}

export async function requiredPermission (ctx: BaseContext, next: () => Promise<any>) {
    const token = extractToken(ctx)

    const { permission } = decode(token)

    if (!validatePermission(permission, requiredPermission)) {
      /* eslint-disable prefer-promise-reject-errors */
      return Promise.reject({
        status: 403,
        message: 'Insufficient permission',
        code: 'FORBIDDEN',
      })
    }
    await next()
  }
