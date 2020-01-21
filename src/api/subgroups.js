import endpoint from "@/api/endpoint";

export default {

    all(){
        return window.axios.get(endpoint+'/api/subgroups');
    },

    create(data){
        return window.axios.post(endpoint+'/api/subgroups', data);
    },

    leftUser(data){
        return window.axios.post(endpoint+'/api/subgroups/'+data.id+'/leftUser/'+data.user_id);
    },

    joinUser(data){
        return window.axios.post(endpoint+'/api/subgroups/'+data.id+'/joinUser/'+data.user_id);
    }
}