<template>
  <div>
    <bread-crumb></bread-crumb>
    <el-card class="mt">
      <el-row :gutter="20">
        <el-col :span="12">
          <p class="pt">
            运单编号:YGC1145141919810 创建时间:2022-08-24 审核员:孙笑川
          </p>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" class="fr" @click="back">返回</el-button>
          <div class="clear"></div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-steps :active="2">
        <el-step
          title="未发货"
         ></el-step>
        <el-step
          title="运输中"
        ></el-step>
        <el-step 
        title="已收货"
        ></el-step>
        <el-step 
        title="已完成"
        ></el-step>
      </el-steps>
    </el-card>
  </div>
</template>

<script>
/*  */
import breadCrumb from "@/components/breadCrumb.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    breadCrumb,
  },
  beforeRouteLeave(to,from,next){
       if(to.path=="/waybill/list"){
          this.changeIsFromDetail(true)
       }else{
          this.changeIsFromDetail(false)
       }
       next()
  },
  methods: {
    ...mapMutations(['changeIsFromDetail']),
    back() {
      this.$router.push("/waybill/list");
    },
  },
};
</script>

<style lang="less" scoped>
</style>