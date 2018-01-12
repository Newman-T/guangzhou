import Login from '../component/login/Login.vue';
import Register from '../component/register/Register.vue';

export default{
    routes:[
        { name: 'login', path: '/login', component: Login },
        { name: 'register', path: '/register', component: Register },
    ]
};