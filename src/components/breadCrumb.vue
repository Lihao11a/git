<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :to="{ path: '/' }"
        v-for="(item, index) in breadList"
        :key="index"
        >{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>

export default {
    data(){
        return {
             breadList:[]
        }
    },
    watch:{
        $route(){
            this.getBreadCrumb()
        }
    },
    created(){
         this.getBreadCrumb()
    },
    methods:{
        getBreadCrumb(){
            this.breadList = this.$route.meta.bread||[]
        }
    }
};
</script>

<style lang="less" scoped>
</style>