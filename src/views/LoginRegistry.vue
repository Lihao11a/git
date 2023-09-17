<template>
    <div>
        <el-row type="flex" justify="center" >
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2 style="text-align: center">下北泽物流管理系统</h2>
                </div>
                <div>
                    <el-form :model="ruleForm" 
                    :rules="rules" 
                    ref="ruleForm" 
                    label-width="80px" 
                    class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model.trim="ruleForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model.trim="ruleForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="width: 100%;" @click="login" :loading="loading">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    import { post } from '@/utils/http'
    import {setToken} from '@/utils/auth'
    import { mapMutations } from 'vuex'
    export default {
        data(){
            return{
                loading:false,
                ruleForm:{
                    username:'',
                    password:''
                },
                rules:{
                    username:[
                        {required: true, message: '用户名不能为空！', trigger: 'blur'},
                        {pattern:/^\w{4,8}$/,message:'要求4-8位数字字母组合!',trigger:'blur'}
                    ],
                    password:[
                        {required: true, message: '密码不能为空！', trigger: 'blur'},
                        {pattern:/^\d{6}$/,message:'要求6位纯数字,不能包含其他怪异字符!',trigger:'blur'}
                    ]
                },
            }
        },
        methods: {
            ...mapMutations(['setrole']),
            login(){
                this.$refs.ruleForm.validate((valid)=>{
                    if(valid){
                        this.loading = true
                        post('/login',this.ruleForm).then((res)=>{
                            //动态添加路由刷新就消失
                            this.loading = false
                            setToken(res.token);
                            this.setrole(res.role)
                            sessionStorage.setItem("nickname",res.nickname)
                            this.$router.push('/')
                        }).catch((err)=>{
                            this.loading = false
                            console.log(err)
                        })
                    }
                 })
            }
        },
    }
</script>

<style lang="less" scoped>
       .large{
            font-size: 50px;
            color: pink;
       }
       @bgcolor:#5696ff;
       @width:500px;
       .box-card{
           width: @width;
           margin-top: 200px;
           h2{
              text-align: center;
           }
       }
</style>