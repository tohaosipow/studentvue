import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import axios from 'axios';
import events from "@/store/modules/events";
import dictionaries from "@/store/modules/dictionaries";
import timetables from "@/store/modules/timetables";
import discreator from "@/store/modules/discreator";
import groupcreator from "@/store/modules/groupcreator";
import lessonmanager from "@/store/modules/lessonmanager";



window.axios = axios;


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        user, events, dictionaries, timetables, discreator, groupcreator, lessonmanager
    },
    strict: debug
})