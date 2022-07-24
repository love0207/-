import { getToken, setToken, removeToken, setTime } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken()
}
const mutations = {
  setToken (state, token) {
    state.token = token
  },
  removeToken (state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  async login (context, data) {
    const res = await login(data)
    console.log(res)
    context.commit('setToken', res.data.data.token)
    setToken(res.data.data.token)
    setTime(Date.now())
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
