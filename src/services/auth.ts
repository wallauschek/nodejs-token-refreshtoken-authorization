import * as users from './user'
import * as crypto from './crypto'
import * as tokenService from './token'

// illustration purposes only
// for production-ready code, use error codes/types and a catalog (maps codes -> responses)

/* eslint-disable prefer-promise-reject-errors */
const authFailed = (email: String) => Promise.reject({
  status: 401,
  code: 'UNAUTHENTICATED',
  message: email ? `Failed to authenticate user ${email}` : 'Failed to authenticate user',
})

interface authenticateProps {
  email: String;
  password: Buffer;
}

const authenticate = async ({ email, password }: authenticateProps) => {
  const user = await users.findByEmail(email)
  if (!user) {
    return authFailed(email)
  }
  const isMatch = await crypto.compare(password, user.password)
  if (!isMatch) {
    return authFailed(email)
  }

  const { token: refreshToken, expiresAt: refreshTokenExpiration } = await tokenService.createRefreshToken(user.id)

  return {
    refreshToken,
    refreshTokenExpiration,
    accessToken: tokenService.sign({ id: user.id, permission: user.permission }),
  }
}

const isRefreshTokenValid = (refreshToken) => refreshToken &&
  refreshToken.valid &&
  refreshToken.expiresAt >= Date.now()

interface RefreshTokenProps {
  refreshToken: string;
  refreshTokenExpiration: Date;
  accessToken: any;
}

const refreshToken = async (tokenValue: String) => {
  const refreshTokenObject = await tokenService.getRefreshToken(tokenValue)

  if (isRefreshTokenValid(refreshTokenObject)) {
    await tokenService.invalidateRefreshToken(tokenValue)

    const user = await users.findById(refreshTokenObject.user_id)

    const { token: refreshToken, expiresAt: refreshTokenExpiration } = await tokenService.createRefreshToken(user.id)

    return {
      refreshToken,
      refreshTokenExpiration,
      accessToken: tokenService.sign({ id: user.id, permission: user.permission }),
    }
  }

  return authFailed
}

interface LogoutProps {
  refreshTokenValue: String;
  allDevices: Boolean;
}

const logout = ({ refreshTokenValue, allDevices }: LogoutProps): Boolean => {
  if (allDevices) {
    return tokenService.invalidateAllUserRefreshTokens(refreshTokenValue)
  }
  return tokenService.invalidateRefreshToken(refreshTokenValue)
}

export {
  authenticate,
  refreshToken,
  logout,
}
