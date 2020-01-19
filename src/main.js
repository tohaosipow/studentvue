import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import VueRouter from 'vue-router'
import {router} from "@/routes";
import index from "@/store";
import Vuex from 'vuex'
import VueQrcodeReader from "vue-qrcode-reader";
import moment from "moment";

Vue.prototype.$moment = moment;

Vue.use(VueQrcodeReader);
Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
    render: h => h(App),
    router: router,
    store: index,
    vuetify: new Vuetify({}),
    mounted(){


    }
}).$mount('#app')
