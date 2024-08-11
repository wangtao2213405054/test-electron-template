/** 统一处理 sessionStorage */

import CacheKey from "@/constants/cache-key"

/** 获取 Token */
export const getToken = () => {
  return sessionStorage.getItem(CacheKey.TOKEN)
}

/** 设置 Token */
export const setToken = (token: string) => {
  sessionStorage.setItem(CacheKey.TOKEN, token)
}

/** 删除 Token */
export const removeToken = () => {
  sessionStorage.removeItem(CacheKey.TOKEN)
}

/** 获取 Token */
export const getRefreshToken = () => {
  return sessionStorage.getItem(CacheKey.REFRESH_TOKEN)
}

/** 设置 Token */
export const setRefreshToken = (token: string) => {
  sessionStorage.setItem(CacheKey.REFRESH_TOKEN, token)
}

/** 删除 Token */
export const removeRefreshToken = () => {
  sessionStorage.removeItem(CacheKey.REFRESH_TOKEN)
}
