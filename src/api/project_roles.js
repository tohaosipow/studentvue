import endpoint from "@/api/endpoint";

export default {
    update(data){
        return window.axios.post(endpoint+'/api/project_roles/'+data.id+'/update', data);
    },

    delete(data){
        return window.axios.post(endpoint+'/api/project_roles/'+data.id+'/delete');
    },
    store(data){
        return window.axios.post(endpoint+'/api/project/'+ data.project_id + '/roles/store', data);
    },


}
