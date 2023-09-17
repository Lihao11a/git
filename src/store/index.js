import Vue from 'vue'
import Vuex from 'vuex'
import { get } from '@/utils/http'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      row:{},
      isFromDetail:false,
      role:""
  },
  getters: {
  },
  mutations: {
      changerow(state,payload){
          state.row = payload
      },
      clearrow(state){
          state.row={}
      },
      changeIsFromDetail(state,payload){
          state.isFromDetail=payload
      },
      setrole(state,payload){
           state.role = payload
      }
  },
  actions: {
      async getrole({commit}){
         let {role} = await get('/getname')
         commit('setrole',role)
       }
  },
  modules: {
  }
})
