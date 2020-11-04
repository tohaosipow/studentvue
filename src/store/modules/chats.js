import chats from "@/api/chats.js";

export default {
    state: {
        chats: [],
        users: [],
        currentChatMessages: []

    },
    mutations: {
        setChats(state, chats) {
            state.chats = chats;
        },
        setUsers(state, users) {
            state.users = users;
        },
        addChat(state, chat) {
            state.chats = [...state.chats, chat]
        },
        setMessages(state, messages) {
            state.currentChatMessages = messages;
        },
        addMessage(state, message) {
            state.currentChatMessages = [...state.currentChatMessages, message];
        }
    },
    getters: {},
    actions: {
        getChats({commit}) {
            return chats.my().then((response) => {
                commit('setChats', response.data);
            })
        },
        getUsers({commit}) {
            return chats.users().then((response) => {
                commit('setUsers', response.data);
            })
        },
        createChat({commit}, data) {
            return chats.create(data).then((response) => {
                commit('addChat', response.data);
            })
        },
        getCurrentChatMessages({commit}, data) {
            return chats.messages(data).then((response) => {
                commit('setMessages', response.data);
            })
        },
        sendMessage({commit}, data) {
            return chats.sendMessage(data).then((response) => {
                commit('addMessage', response.data);
            })
        }
    }
}


