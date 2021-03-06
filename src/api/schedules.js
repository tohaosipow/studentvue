import endpoint from "@/api/endpoint";

export default {

    create(data){
        return window.axios.post(endpoint+'/api/schedules/create', data);
    },

    remove(data){
        return window.axios.post(endpoint+'/api/schedules/'+data.id+'/remove');
    },
}