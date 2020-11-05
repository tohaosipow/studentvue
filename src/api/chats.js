import endpoint from "@/api/endpoint";

export default {
    my(){
        return window.axios.get(endpoint+'/api/chats');
    },

    users(){
        return window.axios.get(endpoint+'/api/chats/users');
    },

    create(data){
        return window.axios.post(endpoint+'/api/chats/create', data);
    },

    messages(data){
        return window.axios.get(endpoint+'/api/chats/'+data.id+'/messages');
    },

    sendMessage(data){
        return window.axios.post(endpoint+'/api/chats/'+data.id+'/send', data);
    },


    getChatById(data){
        return window.axios.post(endpoint+'/api/chats/'+data.id);
    },

    markAsRead(data){
        return window.axios.post(endpoint+'/api/messages/'+data.id+'/markAsRead');
    },



}
