<template>
  <div class="menu">
    <h1 class="title">下北泽国际物流平台</h1>
    <el-menu router 
    background-color="#001529"
    text-color="#fff">
        <menus-detail v-for="(item,index) in menudata" :key="index" :menu="item"></menus-detail>
    </el-menu>
  </div>
</template>

<script>
import { get } from '@/utils/http';
import MenusDetail from './MenusDetail.vue';
export default {
    data(){
        return{
            menudata:[],
        }
    },
    created(){
         this.getmenu()
    },
    methods:{
        //获取菜单
        async getmenu(){
           let {data} = await get('/menu')
           console.log(data)
           this.menudata = data
        }
    },
    components:{
        MenusDetail
    }
};
</script>

<style lang="less" scoped>
.menu{
    overflow: hidden;
}
.title{
    margin-top: 10px;
    color: #fff;
    text-align: center;
    font-size: 16px;
}
</style>