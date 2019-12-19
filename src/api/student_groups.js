import endpoint from "@/api/endpoint";
export default {
    all(){
        return window.axios.get(endpoint+'/api/student_groups');
    }
}