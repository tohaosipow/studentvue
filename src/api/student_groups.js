import endpoint from "@/api/endpoint";
export default {
    all(){
        return window.axios.get(endpoint+'/api/student_groups');
    },
    create(data){
        return window.axios.post(endpoint+'/api/student_groups/create', data);
    },
    users(data){
        return window.axios.get(endpoint+'/api/student_groups/'+data.id+'/users');
    },

    criteria(data){
        return window.axios.get(endpoint+'/api/student_groups/'+data.id+'/criteria');
    }
}