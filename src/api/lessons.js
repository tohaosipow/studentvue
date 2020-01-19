import endpoint from "@/api/endpoint";

export default {

    all(user_id){
        return window.axios.get(endpoint+'/api/lessons', {params: {user_id}});
    },
}