import endpoint from "@/api/endpoint";

export default {
    getEvents(){
        return window.axios.get(endpoint+'/api/events');
    },

    getEvent(id){
        return window.axios.get(endpoint+'/api/event/'+id);
    },

    getEventParticipants(id){
        return window.axios.get(endpoint+'/api/event/'+id+'/participants');
    },

    getEventAdmins(id){
        return window.axios.get(endpoint+'/api/event/'+id+'/admins');
    },

    getEventPoints(id){
        return window.axios.get(endpoint+'/api/event/'+id+'/user_points');
    },

    updateUserEventPoints(participant_id, admin_id, rubric_id, points_earned){
        return window.axios.get(endpoint+'/api/user_points/update', {params: {participant_id, admin_id, rubric_id, points_earned}});
    },

    userEventCheck(user_id, event_id){
        return window.axios.get(endpoint+'/api/event/'+event_id+'/participants/'+user_id+'/check');
    },

    getUserStatus(event_id){
        return window.axios.get(endpoint+'/api/event/'+event_id+'/status');
    }

}