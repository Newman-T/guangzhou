<template>
    <div>
        <!-- <button @click="login">登录</button>
        <button @click="isLogin">登录验证</button> -->
        <div class="login"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                // user:{
                //     uname:"admin",
                //     upwd:"123456"
                // }
            }
        },
        methods: {
            login(){
                this.$http.post(this.$api.login,this.user)
                    .then(rsp=>alert(rsp.data.message.realname));
            },
            isLogin(){
                this.$http.get(this.$api.islogin)
                    .then(rsp => alert(rsp.data.code));
            }
        }
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
    }
</style>