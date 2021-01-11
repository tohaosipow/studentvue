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
import projects from "@/store/modules/projects";
import chats from "@/store/modules/chats.js";
import Echo from "laravel-echo"
import Pusher from "pusher-js"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    namespace: false,
    authEndpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/broadcasting/auth' : 'https://api.student.surgu.ru/broadcasting/auth',// 'http://localhost:8000/broadcasting/auth',
    host: process.env.NODE_ENV === 'development' ? 'http://localhost:6001' : 'http://api.student.surgu.ru:6001',// 'http://localhost:8000/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            Accept: 'application/json',
        },
    },
});

window.Pusher = Pusher;
/*

mport Echo from "laravel-echo"

window.io = require('socket.io-client');


if (typeof io !== 'undefined') {
    window.Echo = new Echo({
        broadcaster: 'socket.io',
        namespace: false,
        host: process.env.NODE_ENV === 'development'?'http://localhost:6001':'http://api.student.surgu.ru:6001',
        authEndpoint: process.env.NODE_ENV === 'development'?'http://localhost:8000/broadcasting/auth':'http://api.student.surgu.ru/broadcasting/auth',// 'http://localhost:8000/broadcasting/auth',
        auth: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                Accept: 'application/json',
            },
        },
    });
*/




window.axios = axios;


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        user, events, dictionaries, timetables, discreator, groupcreator, lessonmanager, projects, chats
    },
    strict: debug
})
