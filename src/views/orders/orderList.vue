<template>
  <div>
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }" v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb> -->
    <bread-crumb></bread-crumb>
    <el-card class="mt">
      <el-row>
        <el-col :span="6">
          <el-input
            placeholder="请输入订单号或者客户名称"
            v-model="param.keyword"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="7" :offset="11" class="operate">
          <el-button type="primary" @click="visible=true">新建订单</el-button>
          <el-button :disabled="!select.length" @click="operate(1)"
            >审核</el-button
          >
          <el-button :disabled="!select.length" @click="operate(2)"
            >修改</el-button
          >
          <el-button :disabled="!select.length" @click="operate(3)"
            >作废</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="请稍后,哼哼啊啊啊啊啊啊啊啊"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column
          prop="id"
          label="订单号"
          width="80"
          fixed="left"
        ></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">待审核</span>
            <span v-else-if="scope.row.status == 2">已审核</span>
            <span v-else-if="scope.row.status == 3">审核通过</span>
            <span v-else-if="scope.row.status == 4">审核拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="下单时间" width="120">
        </el-table-column>
        <el-table-column prop="name" label="客户名称" width="120">
        </el-table-column>
        <el-table-column prop="start" label="起始城市" width="120">
        </el-table-column>
        <el-table-column prop="end" label="目的城市" width="120">
        </el-table-column>
        <el-table-column prop="cargo" label="货物名称" width="100">
        </el-table-column>
        <el-table-column prop="count" label="件数" width="50">
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="50"> </el-table-column>
        <el-table-column prop="price" label="运费" width="120">
        </el-table-column>
        <el-table-column
          prop="from"
          label="订单来源"
          width="120"
        ></el-table-column>
        <el-table-column prop="pay" label="是否支付" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.pay == 1">已支付</span>
            <span v-else-if="scope.row.pay == 2">未支付</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deletes(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="param.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="param.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data"
        class="mt fr mb"
      >
      </el-pagination>
    </el-card>
    <orders-modal :visible="visible" @hide="visible=false" @reload="getdata"></orders-modal>
  </div>
</template>

<script>
// import bread from '@/mixins/bread'
import breadCrumb from "@/components/breadCrumb.vue";
import { post } from "@/utils/http";
import ordersModal from "./ordersModal.vue";
import { mapMutations } from "vuex";
export default {
  //  mixins:[bread]
  data() {
    return {
      tableData: [],
      param: {
        page: 1,
        pageSize: 10,
        keyword: "",
      },
      loading: true,
      data: 0,
      select: [],
      visible:false,
      
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    async getdata() {
      const res = await post("/orderList", this.param);
      console.log(res);
      this.loading = false;
      this.tableData = res.data.list;
      this.data = res.data.total;
    },
    handleSizeChange(Pagesize) {
      this.param.pageSize = Pagesize;
      this.getdata();
    },
    handleCurrentChange(Page) {
      this.param.page = Page;
      this.getdata();
    },
    handleSelectionChange(selection) {
      console.log(selection);
      this.select = selection;
    },
    operate(n) {
      console.log(n);
      let no = this.select.map((item) => item.id);
      this.$notify({
        title: "成功",
        message: no + "你成功了,哼哼啊啊啊啊啊啊",
        type: "success",
      });
    },
    async deletes(id) {
      await post("/delete", { id }).then(
        this.$message({
          message: "删除成功",
          type: "success",
        })
      );
      this.getdata();
    },
    ...mapMutations(['changerow']),
    edit(row){
      this.changerow(row)
      this.visible = true
    }
  },
  components: {
    breadCrumb,
    ordersModal,
  },
};
</script>

<style lang="less" scoped>
.operate {
  text-align: right;
}
</style>