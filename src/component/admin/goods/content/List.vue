<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>购物商城</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 按钮组 -->
        <div>
            <el-button size="mini" plain icon="el-icon-plus">
                <router-link :to="{name:'goodsCtAdd'}">新增</router-link>
            </el-button>
            <el-button size="mini" plain icon="el-icon-check" @click="selectAll">全选</el-button>
            <el-button size="mini" plain icon="el-icon-delete" @click="selectDel">删除</el-button>
            <el-input style="width: 200px; float: right;" size="mini" 
            placeholder="请输入内容" prefix-icon="el-icon-search"
            v-model="gsListQuery.searchvalue" @blur="getGoodsList"></el-input>
        </div>
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="selectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="标题">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">
                            <img style="width: 200px" :src="scope.row.imgurl" alt="商品预览">
                        </div>
                        <router-link :to="{ name: 'goodsCtEdit', params: { id: scope.row.id } }">
                            {{ scope.row.title }}
                        </router-link>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="categoryname" label="所属类别" width="120"></el-table-column>
            <el-table-column prop="stock_quantity" label="库存" width="120"></el-table-column>
            <el-table-column prop="market_price" label="市场价" width="120"></el-table-column>
            <el-table-column prop="sell_price" label="销售价" width="120"></el-table-column>
            <el-table-column label="状态" width="120">
                <template slot-scope="scope">
                    <i :class="['el-icon-picture',scope.row.is_slide==1?'active':'']" 
                    @click="modifyStatus(scope.row.id,'is_slide',scope.row.is_slide==1?false:true)">
                    </i>
                    <i :class="['el-icon-upload2',scope.row.is_top==1?'active':'']" 
                    @click="modifyStatus(scope.row.id,'is_top',scope.row.is_top==1?false:true)">
                    </i>
                    <i :class="['el-icon-star-on',scope.row.is_hot==1?'active':'']" 
                    @click="modifyStatus(scope.row.id,'is_hot',scope.row.is_hot==1?false:true)">
                    </i>
                </template>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <router-link :to="{name:'goodsCtEdit',params:{id:scope.row.id}}">修改</router-link>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            @size-change="sizeChange" @current-change="currentChange"
            :current-page="gsListQuery.pageIndex" :page-sizes="page.pageSizes" 
            :page-size="gsListQuery.pageSize" :total="page.total"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData3: [
                    // {
                    //     id: 103,
                    //     title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
                    //     is_top: 1,
                    //     is_hot: 1,
                    //     is_slide: 1,
                    //     categoryname: "男装",
                    //     img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
                    //     imgurl:"http://139.199.192.48:6060/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
                    //     goods_no: "NZ0000000002",
                    //     stock_quantity: 200,
                    //     market_price: 1000,
                    //     sell_price: 800
                    // },
                    // {
                    //     id: 103,
                    //     title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
                    //     is_top: 1,
                    //     is_hot: 1,
                    //     is_slide: 1,
                    //     categoryname: "男装",
                    //     img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
                    //     imgurl:"http://139.199.192.48:6060/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
                    //     goods_no: "NZ0000000002",
                    //     stock_quantity: 200,
                    //     market_price: 1000,
                    //     sell_price: 800
                    // }
                ],
                gsListQuery: {
                    pageIndex: 1,
                    pageSize: 10,
                    searchvalue: ''
                },

                page:{
                    pageSizes:[10,20,30,40],
                    total:100
                },
                selection:[
                    
                ],
            }
        },

        methods: {
            getGoodsList(){
                this.$http.get(this.$api.gsList,{params:this.gsListQuery}).then(res=>{
                    this.tableData3=res.data.message;
                    this.page.total=res.data.totalcount;
                    res.data.totalcount;
                    res.data.pageIndex;
                    res.data.pageSize;
                });
            },
            modifyStatus(id,type,newStatus){
                this.tableData3.filter(goods=>goods.id==id)[0][type]=newStatus?1:0;
            },
            sizeChange(pageSize){
                this.gsListQuery.pageSize=pageSize;
                this.getGoodsList();
            },
            currentChange(pageIndex){
                this.gsListQuery.pageIndex=pageIndex;
                this.getGoodsList();
            },
            selectAll(){
                document.querySelector(".el-checkbox__inner").click();
            },
            del(){
                let ids = this.selection.map(v => v.id).join(',');
                this.$http.get(this.$api.gsDel + ids).then(res=>{
                    if(res.data.status==0){
                        // 重新加载列表
                        this.getGoodsList();
                        // 清空获取项
                        this.selection=[];
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                });
            },
            selectDel(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            selectionChange(selection){
                this.selection = selection;
            }
        },
        created(){
            this.getGoodsList();
        }
    }
</script>

<style scoped lang="less">
    [class^=el-icon]{
        color:rgba(0,0,0,0.3);
        &.active{
            color: black;
        }
    }
</style>