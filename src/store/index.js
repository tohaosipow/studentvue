import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import axios from 'axios';
import events from "@/store/modules/events";
import dictionaries from "@/store/modules/dictionaries";



window.axios = axios;


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        user, events, dictionaries
    },
    strict: debug
})