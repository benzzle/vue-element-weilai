import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {
    username: ""
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: ( state, info) => {
    state.userInfo = info
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password },res => {
        const { data } = res;
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }, err => {
        reject(err);
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    if(state.userInfo.username){
      return new Promise((resolve, reject) => {
        resolve(state.userInfo)
      })
    }else{
      return new Promise((resolve, reject) => {
        getInfo({},res => {
          const { data } = res
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          commit('SET_USERINFO', data)
          resolve(data)
        },err => {
          reject(err)
        })
      })
    }
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

