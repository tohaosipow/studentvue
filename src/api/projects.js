import endpoint from "@/api/endpoint";

export default {
    all(){
        return window.axios.get(endpoint+'/api/projects');
    },

    store(data){
        return window.axios.post(endpoint+'/api/projects/store', data);
    },

    remove(data){
        return window.axios.post(endpoint+'/api/projects/'+data.id+'/remove');
    },

    approve(data){
        return window.axios.post(endpoint+'/api/projects/'+data.id+'/approve');
    }

}