import endpoint from "@/api/endpoint";

export default {

    all(data){
        return window.axios.post(endpoint+'/api/lessons', data);
    },

    move(data){
        return window.axios.post(endpoint+'/api/lessons/'+data.id+'/move', data);
    }
}