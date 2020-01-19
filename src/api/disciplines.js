import endpoint from "@/api/endpoint";

export default {

    all(){
        return window.axios.get(endpoint+'/api/disciplines');
    },

    create(discipline){
        return window.axios.post(endpoint+'/api/disciplines/create', discipline);
    },
}