import endpoint from "@/api/endpoint";

export default {

    all(){
        return window.axios.get(endpoint+'/api/subgroups');
    },

    create(data){
        return window.axios.post(endpoint+'/api/subgroups', data);
    },
}