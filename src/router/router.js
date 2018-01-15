import Login from '../component/login/Login.vue';
// import Register from '../component/register/Register.vue';
// import Home from '../component/home/Home.vue';
import Admin from '../component/admin/Admin.vue';

import GoodsCtList from '../component/admin/goods/content/List.vue';
import GoodsCtEdit from '../component/admin/goods/content/Edit.vue';
import GoodsCgList from '../component/admin/goods/category/List.vue';
import GoodsCgEdit   from '../component/admin/goods/category/Edit.vue';
let adminChildren=[
    // 商品模块 => 内容管理
    { name: 'goodsCtList', path: 'goods/content/list', component: GoodsCtList },
    { name: 'goodsCtEdit', path: 'goods/content/edit/:id', component: GoodsCtEdit },
    { name: 'goodsCtAdd', path: 'goods/content/add', component: GoodsCtEdit },
    // 商品模块 => 商品分类
    { name: 'goodsCgList', path: 'goods/category/list', component: GoodsCgList },
    { name: 'goodsCgEdit', path: 'goods/category/edit/:id', component: GoodsCgEdit },
    { name: 'goodsCgAdd', path: 'goods/category/add', component: GoodsCgEdit },
];

export default{
    routes:[
        { name: 'login', path: '/login', component: Login },
        // { name: 'register', path: '/register', component: Register },
        // { name: 'home', path: '/home', component: Home },
        { name: 'admin', path: '/admin', component: Admin },
        { path: '/', redirect: '/admin' },
        { name: 'admin', path: '/admin', component: Admin,children:adminChildren },

    ]
};