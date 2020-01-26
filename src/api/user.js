import endpoint from "@/api/endpoint";
import apiCredentials from "@/api/apiCredentials";

export default {
    getUser(){
        return window.axios.get(endpoint+'/api/user');
    },

    authUser(username, password){
        return window.axios.post(endpoint+'/oauth/token', {...apiCredentials, username, password})
    },

    signUp(user){
        return window.axios.post(endpoint+'/api/user/signup', user);
    },

    events(){
        return window.axios.get(endpoint+'/api/user/events');
    },

    employees(){
        return window.axios.get(endpoint+'/api/users/employees');
    },
    createTeacher(data){
        return window.axios.post(endpoint+'/api/employees/fastCreate', data);
    },

    item(data){
        return window.axios.post(endpoint+'/api/users/'+data.id);
    }


}