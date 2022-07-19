const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  isIconStatus: (state) => state.user.isIconStatus,
  tags: (state) => state.tagsview.tags
}

export default getters
