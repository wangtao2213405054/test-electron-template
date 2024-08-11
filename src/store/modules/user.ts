import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { useTagsViewStore } from "./tags-view"
import { useSettingsStore } from "./settings"
import {
  getToken,
  removeToken,
  setToken,
  getRefreshToken,
  removeRefreshToken,
  setRefreshToken
} from "@/utils/cache/session-storage"
import { resetRouter } from "@/router"
import { loginApi, getUserInfoApi, getPublicKey, refreshTokenApi } from "@/api/login"
import { type LoginRequestData } from "@/api/login/types/login"
import routeSettings from "@/config/route"
import JSEncrypt from "jsencrypt"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const refreshToken = ref<string>(getRefreshToken() || "")
  const roles = ref<string[]>([])
  const username = ref<string>("")

  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 登录 */
  const login = async ({ username, password }: LoginRequestData) => {
    /** 对密码进行 RSA 加密 */
    const publicKey = await getPublicKey()
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey.data)

    const { data } = await loginApi({
      username,
      password: encryptor.encrypt(password) || ""
    })
    setToken(data.accessToken)
    setRefreshToken(data.refreshToken)
    token.value = data.accessToken
    refreshToken.value = data.refreshToken
  }

  /** 获取用户详情 */
  const getInfo = async () => {
    const { data } = await getUserInfoApi()
    username.value = data.name
    /** 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环 */
    roles.value = data.isAdmin ? ["admin"] : data.roles?.length > 0 ? data.roles : routeSettings.defaultRoles
  }

  /** 模拟角色变化 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    // 用刷新页面代替重新登录
    window.location.reload()
  }

  /** 登出 */
  const logout = () => {
    removeToken()
    removeRefreshToken()
    token.value = ""
    refreshToken.value = ""
    roles.value = []
    resetRouter()
    _resetTagsView()
  }

  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    removeRefreshToken()
    token.value = ""
    refreshToken.value = ""
    roles.value = []
  }

  /** 刷新 Token */
  const updateToken = async () => {
    const { data } = await refreshTokenApi({ refreshToken: refreshToken.value })

    setToken(data.accessToken)
    setRefreshToken(data.refreshToken)
    token.value = data.accessToken
    refreshToken.value = data.refreshToken
  }

  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return {
    token,
    refreshToken,
    roles,
    username,
    login,
    getInfo,
    changeRoles,
    logout,
    resetToken,
    updateToken
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
