import endpoint from "@/api/endpoint";

export default {
    transferLessonsMakeDoc(data){
        return window.axios.post(endpoint+'/api/docs/transfer_lessons_sz/make', data);
    },

}