import { IRouterContext } from 'koa-router'
import * as auth from '../services/auth'

const authenticate = async (ctx: IRouterContext) => {
  const { email, password } = ctx.request.body
  const { accessToken, refreshToken, refreshTokenExpiration } = await auth.authenticate({ email, password })
  ctx.cookies.set('refreshToken', refreshToken, { httpOnly: true, expires: refreshTokenExpiration })
  ctx.body = {
    accessToken,
  }
}

const refreshToken = async (ctx: IRouterContext) => {
  const { accessToken, refreshToken, refreshTokenExpiration } = await auth.refreshToken(
    ctx.cookies.get('refreshToken')
  )
  ctx.cookies.set('refreshToken', refreshToken, { httpOnly: true, expires: refreshTokenExpiration })
  ctx.body = {
    accessToken,
  }
}

const logout = async (ctx: IRouterContext) => {
  const { allDevices } = ctx.request.body
  auth.logout({ refreshTokenValue: ctx.cookies.get('refreshToken'), allDevices })
  ctx.cookies.set('refreshToken', '')
  ctx.body = {}
}

export {
  authenticate,
  refreshToken,
  logout,
}
