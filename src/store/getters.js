const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  isIconStatus: (state) => state.user.isIconStatus
}

export default getters
