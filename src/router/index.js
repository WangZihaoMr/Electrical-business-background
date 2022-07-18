import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../layout'
import Index from '../views/index'
import Login from '../views/login'
import NotFound from '../views/404/list'
import GoodList from '../views/goods/list'
import CategoryList from '../views/category/list'
import UserList from '../views/user/list'
import OrderList from '../views/order/list'
import CommentList from '../views/comment/list'
import ImageList from '../views/image/list'
import NoticeList from '../views/notice/list'
import SettingBase from '../views/setting/list'
import CouponList from '../views/coupon/list'
import ManagerList from '../views/manager/list'
import AccessList from '../views/access/list'
import RoleList from '../views/role/list'
import SkusList from '../views/skus/list'
import LevelList from '../views/level/list'

Vue.use(VueRouter)

// 默认路由，所有用户共享
const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: []
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: Index,
    meta: {
      title: '后台首页'
    }
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: GoodList,
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/category/list',
    name: '/category/list',
    component: CategoryList,
    meta: {
      title: '分类列表'
    }
  },
  {
    path: '/user/list',
    name: '/user/list',
    component: UserList,
    meta: {
      title: '用户列表'
    }
  },
  {
    path: '/order/list',
    name: '/order/list',
    component: OrderList,
    meta: {
      title: '订单列表'
    }
  },
  {
    path: '/comment/list',
    name: '/comment/list',
    component: CommentList,
    meta: {
      title: '评价列表'
    }
  },
  {
    path: '/image/list',
    name: '/image/list',
    component: ImageList,
    meta: {
      title: '图库列表'
    }
  },
  {
    path: '/notice/list',
    name: '/notice/list',
    component: NoticeList,
    meta: {
      title: '公告列表'
    }
  },
  {
    path: '/setting/base',
    name: '/setting/base',
    component: SettingBase,
    meta: {
      title: '配置'
    }
  },
  {
    path: '/coupon/list',
    name: '/coupon/list',
    component: CouponList,
    meta: {
      title: '优惠券列表'
    }
  },
  {
    path: '/manager/list',
    name: '/manager/list',
    component: ManagerList,
    meta: {
      title: '管理员管理'
    }
  },
  {
    path: '/access/list',
    name: '/access/list',
    component: AccessList,
    meta: {
      title: '菜单权限管理'
    }
  },
  {
    path: '/role/list',
    name: '/role/list',
    component: RoleList,
    meta: {
      title: '角色管理'
    }
  },
  {
    path: '/skus/list',
    name: '/skus/list',
    component: SkusList,
    meta: {
      title: '规格管理'
    }
  },
  {
    path: '/level/list',
    name: '/level/list',
    component: LevelList,
    meta: {
      title: '会员等级'
    }
  }
]

const router = new VueRouter({
  routes
})

// 动态添加路由的方法
export function addRoutes(menus) {
  console.log('111', menus)
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach((e) => {
      const item = asyncRoutes.find((o) => o.path === e.frontpath)
      if (item) {
        router.addRoute('layout', item)
        hasNewRoutes = true
      }
      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child)
      }
    })
  }

  findAndAddRoutesByMenus(menus)

  return hasNewRoutes
}

export default router
