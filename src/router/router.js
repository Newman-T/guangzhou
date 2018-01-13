import Login from '../component/login/Login.vue';
// import Register from '../component/register/Register.vue';
// import Home from '../component/home/Home.vue';
import Admin from '../component/admin/Admin.vue';

export default{
    routes:[
        { name: 'login', path: '/login', component: Login },
        // { name: 'register', path: '/register', component: Register },
        // { name: 'home', path: '/home', component: Home },
        { name: 'admin', path: '/admin', component: Admin },
    ]
};