<template>
    <el-container class="admin">
        <!-- 页面左侧 -->
        <el-aside width="200px">
            <Aside></Aside>
        </el-aside>
        <!-- 页面右侧 -->
        <el-container>
            <!-- 右侧头部 -->
            <el-header>
                <Header></Header>
            </el-header>
            <!-- 右侧主体, 将来通过路由控制 -->
            <el-main class="mainHight">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import  Header from './common/Header.vue';
    import  Aside from './common/Aside.vue';

    export default {
        components: {
            Header,
            Aside
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
    }
    
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        min-height: 0;
    }
    .admin{
        height:100%;
    }
</style>