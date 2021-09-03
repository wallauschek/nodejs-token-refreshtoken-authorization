import * as Router from 'koa-router'

import { authorization as authorizationConfig } from '../config'

// middlewares
import error from './middlewares/error'
import authenticated from './middlewares/auth'
import authorized from './middlewares/authorization'

// handlers
import * as users from './handlers/users'
import * as auth from './handlers/auth'

const { permissions } = authorizationConfig

const router = new Router()

router.use(error)

router.get('/users', authenticated, authorized(permissions.manageUsers), users.getAllUsers)
router.post('/users', authenticated, users.createUser)

router.post('/auth', auth.authenticate)
router.post('/auth/refreshToken', auth.refreshToken)
router.post('/auth/logout', auth.logout)

export default router
