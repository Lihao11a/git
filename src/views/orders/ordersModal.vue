<template>
  <div>
    <el-dialog
      :title="title"
      width="55%"
      :visible="visible"
      :before-close="cancel"
    >
      <el-row :gutter="20">
        <el-form :model="ruleForm" :rules="rules" ref="rule">
          <el-col :span="12">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="起始城市" prop="start">
              <el-input v-model="ruleForm.start"></el-input>
            </el-form-item>
            <el-form-item label="目的城市" prop="end">
              <el-input v-model="ruleForm.end"></el-input>
            </el-form-item>
            <el-form-item label="货物名称" prop="cargo">
              <el-input v-model="ruleForm.cargo"></el-input>
            </el-form-item>
            <el-form-item label="件数" prop="count">
              <el-input v-model="ruleForm.count"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-input v-model="ruleForm.unit"></el-input>
            </el-form-item>
            <el-form-item label="运费" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="订单来源" prop="from">
              <el-radio-group v-model="ruleForm.from">
                <el-radio :label="'移动端'">移动端</el-radio>
                <el-radio :label="'pc端'">pc端</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="支付状态" prop="pay">
              <el-radio-group v-model="ruleForm.pay">
                <el-radio :label="1">已支付</el-radio>
                <el-radio :label="2">未支付</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { post } from "@/utils/http";
import { mapState,mapMutations } from "vuex";
export default {
  props: ["visible"],
  data() {
    return {
      ruleForm: {
        name: "",
        start: "",
        end: "",
        cargo: "",
        count: "",
        unit: "",
        price: "",
        from: "",
        pay: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "输入姓名哼哼啊啊啊啊啊",
            trigger: "blur",
          },
        ],
        start: [
          {
            required: true,
            message: "输入起始地哼哼啊啊啊啊啊",
            trigger: "blur",
          },
        ],
        end: [
          {
            required: true,
            message: "输入目的地哼哼啊啊啊啊啊",
            trigger: "blur",
          },
        ],
        cargo: [
          {
            required: true,
            message: "输入货物名哼哼啊啊啊啊啊",
            trigger: "blur",
          },
        ],
        count: [
          {
            required: true,
            message: "输入件数哼哼啊啊啊啊啊",
            trigger: "blur",
          },
          { pattern: /^\d+$/, message: "输入数字哼哼啊啊啊啊" },
        ],
        unit: [
          {
            required: true,
            message: "输入单位哼哼啊啊啊啊啊",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "输入运费哼哼啊啊啊啊啊",
            trigger: "blur",
          },
        ],
        from: [
          {
            required: true,
            message: "选择订单来源哼哼啊啊啊啊啊",
            trigger: "change",
          },
        ],
        pay: [
          {
            required: true,
            message: "选择支付状态哼哼啊啊啊啊啊",
            trigger: "change",
          },
        ],
      },
      title:'新建订单'
    };
  },
  computed:{
     ...mapState(['row'])
  },
  watch:{
      visible(){
          this.ruleForm = this.row
          this.title = this.ruleForm.name?  '编辑订单': '新建订单'
      }
  },
  methods: {
    ...mapMutations(['changerow']),
    cancel() {
      this.$refs.rule.resetFields()
      this.$emit("hide");
      this.changerow({})
    },
    submitForm() {
      this.$refs.rule.validate((valid) => {
        if (valid) {
          post("/addOrder", this.ruleForm).then(() => {
            this.$message({
              message: "操作成功,sodayou",
              type: "success",
            });
          });
          this.cancel()
          this.$emit('reload')
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>