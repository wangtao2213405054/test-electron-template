import { RouteRecordRaw } from "vue-router"

const Homes = () => import("@/layouts/home.vue")

const power: RouteRecordRaw = {
  path: "/power",
  component: Homes,
  redirect: "/power/role",
  name: "Power",
  meta: {
    title: "权限管理",
    svgIcon: "lock",
    roles: ["Power"], // 可以在根路由中设置角色
    homepage: true
  },
  children: [
    {
      path: "role",
      component: () => import("@/views/role/index.vue"),
      name: "PowerRole",
      meta: {
        title: "角色管理",
        roles: ["PowerRole"],
        svgIcon: "user"
      }
    },
    {
      path: "menu",
      component: () => import("@/views/menu/index.vue"),
      name: "PowerMenu",
      meta: {
        title: "菜单管理",
        roles: ["PowerMenu"],
        svgIcon: "menu"
      }
    }
  ]
}

export default power
