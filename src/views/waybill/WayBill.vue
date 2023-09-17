<template>
  <div>
    <breadCrumb></breadCrumb>
    <el-card class="mt">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-input
            placeholder="请输入运单号"
            v-model="params.waybillNo"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入客户名称"
            v-model="params.name"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6" class="tr">
          <el-button type="primary" @click="getData">查询</el-button>
          <el-button type="primary">充值</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-radio-group v-model="params.radiovalue" @change="getData">
        <el-radio-button label="1">全部运单(300)</el-radio-button>
        <el-radio-button label="2">装货中(120)</el-radio-button>
        <el-radio-button label="3">运输中(70)</el-radio-button>
        <el-radio-button label="4">已完成(100)</el-radio-button>
        <el-radio-button label="5">运单异常(10)</el-radio-button>
      </el-radio-group>
    </el-card>
    <el-card class="mt">
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="请稍后,哼哼啊啊啊啊啊啊啊啊"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="no" label="订单号"></el-table-column>
        <el-table-column prop="date" label="下单时间"></el-table-column>
        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column prop="cargo" label="货物名称"></el-table-column>
        <el-table-column prop="count" label="件数"></el-table-column>
        <el-table-column prop="start" label="起始城市"></el-table-column>
        <el-table-column prop="end" label="目的城市"></el-table-column>
        <el-table-column prop="price" label="运费"></el-table-column>
        <el-table-column prop="needRecive" label="需要接货"></el-table-column>
        <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
        <el-table-column prop="driver" label="司机名"></el-table-column>
        <el-table-column prop="tel" label="司机电话"></el-table-column>
        <el-table-column prop="percent" label="运输进度">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.percent"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="" size="mini" @click="detail(scope.row.no)"
              >详情</el-button
            >
            <el-button type="danger" size="mini">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="mt fr mb"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
/* keep-alive 可以是组件，可以是路由*/
import breadCrumb from "@/components/breadCrumb.vue";
import { post } from "@/utils/http";
import moment from "moment";
import { mapState,mapMutations } from "vuex";
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      params: {
        waybillNo: "",
        name: "",
        radiovalue: 1,
      },
      date: [],
      pageData: {
        page: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  components: {
    breadCrumb,
  },
  created() {
    this.getData();
  },
  
  computed:mapState(['isFromDetail']),
  activated(){
      if(!this.isFromDetail){
        this.getData()
      }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/waybill/list/detail") {
      from.meta.keepAlive = true;
    } else {
      this.clearCache()
      this.changeIsFromDetail(false)
    }
    next();
  },
  methods: {
    ...mapMutations(['changeIsFromDetail']),
    async getData() {
      let startDate = this.date[0]
        ? moment(this.date[0]).format("YYYY-MM-DD")
        : "";
      let endDate = this.date[0]
        ? moment(this.date[1]).format("YYYY-MM-DD")
        : "";
      const res = await post("/waybillList", {
        ...this.params,
        ...this.pageData,
        startDate,
        endDate,
      });
      this.loading = false;
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    handleSizeChange(Pagesize) {
      this.pageData.pageSize = Pagesize;
      this.getData();
    },
    handleCurrentChange(Page) {
      this.pageData.page = Page;
      this.getData();
    },
    detail(no) {
      this.$router.push("/waybill/list/detail?no=" + no);
    },
    clearCache() {
      let vnode = this.$vnode;
      let parentVnode = vnode && vnode.parent;
      if (
        parentVnode &&
        parentVnode.componentInstance &&
        parentVnode.componentInstance.cache
      ) {
        var key =
          vnode.key == null
            ? vnode.componentOptions.Ctor.cid +
              (vnode.componentOptions.tag
                ? `::${vnode.componentOptions.tag}`
                : "")
            : vnode.key;
        var cache = parentVnode.componentInstance.cache;
        var keys = parentVnode.componentInstance.keys;
        if (cache[key]) {
          this.$destroy(); // remove key
          if (keys.length) {
            var index = keys.indexOf(key);
            if (index > -1) {
              keys.splice(index, 1);
            }
          }
          cache[key] = null;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>