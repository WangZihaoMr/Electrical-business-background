// import router from '@/router'

// export const filterMenus = (menus) => {
//   console.log('menus', menus)
//   const firstMenus = []
//   // 拿到所有的一级菜单
//   menus.forEach((item) => {
//     if (item.child && item.child.length > 0) {
//       firstMenus.push(item)
//     }
//   })
//   console.log('firstMenus===>', firstMenus)

//   // 对一级菜单数据里面的字段进行处理
//   const twoMenus = []
//   firstMenus.forEach((item, index) => {
//     twoMenus.push({
//       icon: item.icon,
//       title: item.name,
//       path: item.frontpath,
//       desc: item.desc,
//       children: []
//     })
//   })
//   // console.log('处理字段后的一级路由twoMenus===>', twoMenus)

//   // 将所有的二级菜单数据放进一级路由里面
//   twoMenus.forEach((item, index) => {
//     item.children.push(...menus[index].child)
//   })

//   console.log('twoMenus===>', twoMenus)

//   // 将菜单数据动态添加进路由表中
//   twoMenus.forEach((item) => {
//     router.addRoute(item)
//   })

//   console.log('路由表所有数据', router.getRoutes())

//   return twoMenus
// }
