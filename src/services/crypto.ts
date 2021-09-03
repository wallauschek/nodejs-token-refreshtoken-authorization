import bcrypt from 'bcrypt'
import { crypto as config } from '../../config/crypto'

const hash = (value: Buffer) =>
  bcrypt
    .hash(value, config.hashSaltRounds)

const compare = (value: Buffer, hash: string) =>
  bcrypt.compare(value, hash)

export {
  hash,
  compare,
}
