import { getItem, setItem } from '@/utils/storage'
// import router from '../../router'

const tags_key = 'tags'
export default {
  namespaced: true,
  state: {
    tags: getItem(tags_key) || []
  },
  mutations: {
    // 添加单个tag
    setTag(state, tag) {
      const tagStatus = state.tags.find((item) => item.path === tag.path)
      if (!tagStatus) {
        state.tags.push(tag)
      }
      setItem(tags_key, state.tags)
    },
    // 删除单个标签
    delTag(state, i) {
      state.tags.splice(i, 1)
      setItem(tags_key, state.tags)
    },
    // 关闭是其他tag
    closeOtherTag(state) {
      state.tags.splice(0)
      setItem(tags_key, state.tags)
    }
  },
  actions: {
    // 添加单个tag
    addTag({ commit }, tag) {
      commit('setTag', tag)
    },
    // 关闭单个tag
    delTag({ commit }, i) {
      commit('delTag', i)
    },
    // 关闭其他tag
    closeOtherTag({ commit }) {
      commit('closeOtherTag')
    }
  }
}
