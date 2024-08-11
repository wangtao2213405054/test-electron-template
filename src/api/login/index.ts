import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 获取加密公钥 */
export function getPublicKey() {
  return request<Login.PublicKeyResponseData>({
    url: "auth/public/key",
    method: "GET"
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "auth/user/login",
    method: "POST",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: "auth/user/info",
    method: "GET"
  })
}

/** 刷新用户 Token */
export function refreshTokenApi(data: Login.RefreshTokenRequestData) {
  return request<Login.LoginResponseData>({
    url: "auth/refresh/token",
    method: "POST",
    data
  })
}
