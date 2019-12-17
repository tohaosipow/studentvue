import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import VueRouter from 'vue-router'
import {router} from "@/routes";
import index from "@/store";
import Vuex from 'vuex'

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
    render: h => h(App),
    router: router,
    store: index,
    vuetify: new Vuetify({}),
    mounted(){
        let token = localStorage.getItem('access_token');
        if(token){
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            this.$store.dispatch('getUser');
        }

    }
}).$mount('#app')
