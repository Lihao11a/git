import router from ".";
import { getToken } from "@/utils/auth";
import asyncRouterMap from "./asyncRouterMap";
import store from "@/store";
router.beforeEach(async (to, from, next) => {
      
      const hastoken = getToken()
      if (hastoken){
        await store.dispatch('getrole')
          if(to.path == '/login'){
                next('/')
          }else{
               //动态添加路由
              if(to.name == null){
                   let f = asyncRouterMap.filter(item => item.meta.auth.includes(store.state.role))
                   for(let i = 0; i< f.length;i++){
                        router.addRoute(f[i])
                    }
                next({...to,replace:true})
              }
              else{
                  next()
              }
          }
      }else{
          if(to.path == '/login'){
               next()
          }else{
              next('/login')
          }
      }
})