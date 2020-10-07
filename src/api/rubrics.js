import endpoint from "@/api/endpoint";

export default {
    storeRubric(title, description, points_max, event_id){
        return window.axios.post(endpoint+'/api/rubrics/store', {title, description, points_max, event_id});
    },

    removeRubric(data){
        return window.axios.post(endpoint+'/api/rubrics/'+data.id+'/delete');
    },

    getEvent(id){
        return window.axios.get(endpoint+'/api/event/'+id);
    },

    getEventParticipants(id){
        return window.axios.get(endpoint+'/api/event/'+id+'/participants');
    },

    userEventCheck(user_id, event_id){
        return window.axios.get(endpoint+'/api/event/'+event_id+'/participants/'+user_id+'/check');
    },

}
