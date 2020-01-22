import endpoint from "@/api/endpoint";

export default {

    all(){
        return window.axios.get(endpoint+'/api/places');
    },

    create(data){
        return window.axios.post(endpoint+'/api/places/create', data);
    },
}