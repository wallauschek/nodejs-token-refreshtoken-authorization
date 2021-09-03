import { IRouterContext } from 'koa-router'

import * as userService from '../services/user'

const getAllUsers = async (ctx: IRouterContext) => {
  ctx.body = await userService.getUsers()
}

const createUser = async (ctx: IRouterContext) => {
  ctx.body = await userService.createUser(ctx.request.body)
}

export {
  getAllUsers,
  createUser,
}
