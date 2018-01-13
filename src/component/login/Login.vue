<template>
    <div>
        <!-- <button @click="login">登录</button>
        <button @click="isLogin">登录验证</button> -->
        <div class="login">
            <el-form label-position="left" label-width="80px" :model="formLabelAlign" ref="ruleForm2" :rules="rules">
                <el-form-item label="账号" prop="uname">
                    <el-input v-model="formLabelAlign.uname"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="upwd">
                    <el-input v-model="formLabelAlign.upwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">立即创建</el-button>
                    <el-button >重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
                // user:{
                //     uname:"admin",
                //     upwd:"123456"
                // }
                function unameFn(rule,value,callback) {
                    if(value=""){
                        callback(new Error('账号不能为空'))
                    }else{
                        callback;
                    }
                }
                function upwdFn(rule,value,callback) {
                    if(value=""){
                        callback(new Error('密码不能为空'))
                    }else{
                        callback;
                    }
                }
                
            return{
                formLabelAlign: {
                    uname: '',
                    upwd: ''
                },
                rules:{
                    uname:[
                        {validator:unameFn,trigger:'blur'}
                    ],
                    upwd:[
                        {validator:upwdFn,trigger:'blur'}
                    ]
                }
            }
        },
        methods: {
            login(){
                this.$http.post(this.$api.login,this.formLabelAlign).then(rsp=>{
                    if(res.data.status==0){
                        this.$alert('登录成功，马上跳转到后台管理');
                    }else{
                        this.$alert(res.data.message);
                    }
                });
            },
            submitForm(formName){
                this.$refs[formName].validate(result=>{
                    if(result){
                        this.login();
                    }else{
                        this.$alert("账号密码有误！");
                    }
                });
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            }
            // isLogin(){
            //     this.$http.get(this.$api.islogin)
            //         .then(rsp => alert(rsp.data.code));
            // }
        },
    }
</script>

<style scoped leng="less">
    .login{
        width: 400px;
        height: 200px;
        margin: 0 auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid #fff;
        border-radius: 8px;
        padding: 20px;
        border: 1px solid #fff;
        border-radius: 6px;
    }
 
    h1 {
        position: absolute;
        top: -60px;
        width: 100%;
        text-align: center;
        font-size: 20px;
        color: #fff;
    }
</style>