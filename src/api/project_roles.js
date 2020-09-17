import endpoint from "@/api/endpoint";

export default {
    update(data){
        return window.axios.post(endpoint+'/api/project_roles/'+data.id+'/update', data);
    },

}
