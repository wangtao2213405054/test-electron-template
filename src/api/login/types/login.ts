/** 获取公钥接口类型 */
export type PublicKeyResponseData = ApiResponseData<string>

/** 登录接口类型 */
export interface LoginRequestData {
  username: string
  /** 密码 */
  password: string
}

export interface GetTokenResponse {
  accessToken: string
  refreshToken: string
}

export type LoginResponseData = ApiResponseData<GetTokenResponse>

/** 用户信息接口类型 */
export interface UserInfoResponse {
  createTime: string
  updateTime: string
  name: string
  username: string
  email: string
  mobile: string
  avatarUrl?: string | null
  status: boolean
  isAdmin: boolean
  roleId: number
  roles: string[]
  affiliationId: number
  id: number
  resource: null
}

export type UserInfoResponseData = ApiResponseData<UserInfoResponse>

/** 刷新 Token 接口类型 */
export interface RefreshTokenRequestData {
  refreshToken: string
}
