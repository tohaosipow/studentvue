import endpoint from "@/api/endpoint";

export default {

    all(){
        return window.axios.get(endpoint+'/api/criteria');
    },

    create(data){
        return window.axios.post(endpoint+'/api/criteria/create', data);
    },

    subgroups(data){
        return window.axios.get(endpoint+'/api/criteria/'+data.id+'/subgroups');
    },


}