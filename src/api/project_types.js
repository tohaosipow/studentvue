import endpoint from "@/api/endpoint";

export default {
    all(){
        return window.axios.get(endpoint+'/api/project_types');
    },

}