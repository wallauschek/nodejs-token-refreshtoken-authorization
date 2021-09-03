import R from 'ramda'

import * as crypto from './crypto'
import User from '../models'

const serializeUsers = users =>
  users
    .map(user => user.get({ plain: true }))
    .map(R.omit(['password']))

const getUsers = () =>
  User
    .findAll({})
    .then(serializeUsers)

const createUser = user =>
  crypto
    .hash(user.password)
    .then(hash => User.create({
      ...user,
      password: hash,
    }))

const findByEmail = email =>
  User.findOne({ where: { email } })

const findById = id =>
  User.findOne({ where: { id } })

export {
  getUsers,
  createUser,
  findByEmail,
  findById,
}
