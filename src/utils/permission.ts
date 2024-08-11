import { useUserStoreHook } from "@/store/modules/user"

/** 全局权限判断函数，和权限指令 v-permission 功能类似 */
export const checkPermission = (permissionRoles: string[]): boolean => {
  if (Array.isArray(permissionRoles) && permissionRoles.length > 0) {
    const { roles } = useUserStoreHook()
    /** 如果为超管则永远返回 true */
    if (roles.includes("admin")) return true
    return roles.some((role) => permissionRoles.includes(role))
  } else return false
}
