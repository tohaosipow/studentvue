import endpoint from "@/api/endpoint";


export default {
    all(data){
        return window.axios.post(endpoint+'/api/users', data);
    },

    break_password(data){
        return window.axios.post(endpoint+'/api/users/'+data.id+'/break_password');
    },




}