<template>
  <div>
    <bread-crumb></bread-crumb>
    <el-card class="mt">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="客户单号" prop="listnum">
          <el-input v-model="ruleForm.listnum"></el-input>
        </el-form-item>
        <el-form-item label="货物单位" prop="unit">
          <el-select v-model="ruleForm.unit" placeholder="请选择货物单位">
            <el-option label="吨" value="T"></el-option>
            <el-option label="千克" value="KG"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model="ruleForm.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="发货地址" prop="destination">
          <el-input v-model="ruleForm.destination"></el-input>
        </el-form-item>
        <el-form-item label="承运方式" prop="carryway">
          <el-radio-group v-model="ruleForm.carryway">
            <el-radio label="个人"></el-radio>
            <el-radio label="公司"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item class="tc">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "@/components/breadCrumb.vue";
export default {
  components: {
    breadCrumb,
  },
  data() {
    return {
      ruleForm: {
        name: "",
        listnum: "",
        unit: "",
        date1: "",
        date2: "",
        delivery: "",
        destination: "",
        carryway: "",
        desc: "",
      },
      rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          listnum:[ { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
          unit: [
            { required: true, message: '请选择配送单位', trigger: 'change' }
          ],
          delivery:[{required: true, message: '请选择配送单位', trigger: 'change'}],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
    };
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>

<style lang="less" scoped>
</style>