import endpoint from "@/api/endpoint";

export default {

    all(){
        return window.axios.get(endpoint+'/api/user_roles');
    },

}