import endpoint from "@/api/endpoint";
import apiCredentials from "@/api/apiCredentials";

export default {
    getUser(){
        return window.axios.get(endpoint+'/api/user');
    },

    authUser(username, password){
        return window.axios.post(endpoint+'/oauth/token', {...apiCredentials, username, password})
    },

    signUp(name, email, password){
        return window.axios.post(endpoint+'/api/user/signup', {name, email, password});
    }
}