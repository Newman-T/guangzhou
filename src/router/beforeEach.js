import axios from 'axios';
import api from '../js/api-config.js';

export default function(to,from,next){
    var toPageName = to.name;

    axios.get(api.isLogin).then(res=>{
        let isLogin=false;
        
        if(res.data.code=="logined"){
            isLogin=true;
        }
        if(toPageName == 'login' && isLogin){
            next('admin');
        }else if(toPageName !== 'login' && !isLogin){
            next({name:'login',query:{nextPage:to.fullPath}});
        }else{
            next();
        }
    });
}