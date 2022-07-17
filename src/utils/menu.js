export const filterMenus = (menus) => {
  console.log(menus)
  const firstMenus = []
  // 拿到所有的一级菜单
  menus.forEach((item) => {
    if (item.child && item.child.length > 0) {
      // firstMenus.push(...item.child)
      firstMenus.push(item)
    }
  })
  console.log('firstMenus===>', firstMenus)

  // 对一级菜单数据里面的字段进行处理
  const twoMenus = []
  firstMenus.forEach((item) => {
    twoMenus.push({
      icon: item.icon,
      title: item.name,
      path: item.frontpath,
      desc: item.desc,
      children: []
    })
  })
  console.log('处理字段后的一级路由===>', twoMenus)

  // 将所有的二级菜单数据放进一级路由里面
  let temp = []
  menus.forEach((item) => {
    temp = item.child
  })

  // 将对应的二级路由存放到一级路由
  twoMenus.forEach((item) => {
    item.children.push(...temp)
  })
  console.log('twoMenus===>', twoMenus)

  return twoMenus
  // console.log(router.getRoutes())
}
