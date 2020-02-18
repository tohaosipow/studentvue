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

    getEventTeamPoints(id){
        return window.axios.get(endpoint+'/api/event/'+id+'/team_points');
    },

    updateUserEventPoints(participant_id, admin_id, rubric_id, points_earned){
        return window.axios.get(endpoint+'/api/user_points/update', {params: {participant_id, admin_id, rubric_id, points_earned}});
    },

    updateTeamEventPoints(team_id, admin_id, rubric_id, points_earned){
        return window.axios.get(endpoint+'/api/team_points/update', {params: {team_id, admin_id, rubric_id, points_earned}});
    },

    userEventCheck(user_id, event_id){
        return window.axios.get(endpoint+'/api/event/'+event_id+'/participants/'+user_id+'/check');
    },

    rateEvent(data){
        return window.axios.post(endpoint+'/api/event/'+data.event_id+'/participants/'+data.user_id+'/rateEvent', data);
    },

    changeParticipantRole(data){
        return window.axios.post(endpoint+'/api/event/'+data.event_id+'/participants/'+data.user_id+'/changeParticipantRole', data);
    },

    getUserStatus(event_id){
        return window.axios.get(endpoint+'/api/event/'+event_id+'/status');
    },

    getEventTypes(){
        return window.axios.get(endpoint+'/api/event_types');
    },

    store(data){
        return window.axios.post(endpoint+'/api/events/store', data);
    }
}