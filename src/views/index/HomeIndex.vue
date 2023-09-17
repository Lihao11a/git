<template>
  <div>
    <el-row :gutter="24" style="margin-bottom: 20px">
      <el-col :span="6">
        <el-card class="box-card">
          <div class="fl text">
            <p class="head mb">本月进件</p>
            <div class="mb head">6588</div>
            <div class="mb head">
              +20.12% <span class="compare">与上月相比</span>
            </div>
          </div>
          <div class="fr image">
            <i class="el-icon-tickets img"></i>
          </div>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="fl text">
            <p class="head mb">本月放款（元）</p>
            <div class="mb head">121000000</div>
            <div class="mb head">
              +20.12% <span class="compare">与上月相比</span>
            </div>
          </div>
          <div class="fr image">
            <i class="el-icon-money img"></i>
          </div>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="fl text">
            <p class="head mb">本月进件</p>
            <div class="mb head">6588</div>
            <div class="mb head">
              +20.12% <span class="compare">与上月相比</span>
            </div>
          </div>
          <div class="fr image">
            <i class="el-icon-date img"></i>
          </div>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="fl text">
            <p class="head mb">本月进件</p>
            <div class="mb head">6588</div>
            <div class="mb head">
              +20.12% <span class="compare">与上月相比</span>
            </div>
          </div>
          <div class="fr image">
            <i class="el-icon-coin img"></i>
          </div>
          <div class="clear"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="18">
        <el-card class="card">
          <div slot="header">进件统计分析</div>
          <div style="height: 240px" ref="analysis">内容</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">进价产品占比</div>
          <div style="height: 240px" ref="analysispie">内容</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="mt">
      <el-col :span="12">
        <el-card>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>李田所 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>孙笑川 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>丁真 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>何同学 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-calendar v-model="value"></el-calendar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { get } from "@/utils/http";
//数据可视化
/*
   1.写容器
   2.捕获
   3.写配置项
   4.传入配置项
*/
export default {
  data(){
     return{
        value:new Date()
     }
  },
  mounted() {
    this.drawline();
    this.drawpie();
  },
  methods: {
    async drawline() {
      var myChart = echarts.init(this.$refs.analysis);
      const { data } = await get("/line");
      let keys = [];
      let values = [];
      for (let key in data) {
        keys.push(key);
        values.push(data[key]);
      }
      let option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: keys,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: values,
            type: "line", //决定是什么图
            smooth: true, //决定平滑度
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#4f88ff", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "white", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            }, //区域样式
          },
        ],
      };
      myChart.setOption(option);
    },
    async drawpie() {
      var myChart = echarts.init(this.$refs.analysispie);
      var { data } = await get("/pie");
      let option = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "进价产品占比",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 10,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  
};
</script>

<style lang="less" scoped>
.box-card {
  background-color: #5696ff;
}
.img {
  font-size: 80px;
  color: antiquewhite;
}
.head {
  color: white;
}
.compare {
  font-size: 10px;
}
</style>