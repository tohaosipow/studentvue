import endpoint from "@/api/endpoint";

export default {

    getAll(event_id){
        return window.axios.get(endpoint+'/api/event/'+event_id+'/teams');
    },

    create(event_id, form_data){
        return window.axios.post(endpoint+'/api/event/'+event_id+'/teams/create', form_data, {headers: {'Content-Type': 'multipart/form-data'}});
    },

    join(team_id){
        return window.axios.post(endpoint+'/api/teams/'+team_id+'/join')
    },

    acceptMember(team_id, user_id){
        return window.axios.post(endpoint+'/api/teams/'+team_id+'/participants/'+user_id+'/accept');
    },

    declineMember(team_id, user_id){
        return window.axios.post(endpoint+'/api/teams/'+team_id+'/participants/'+user_id+'/decline');
    },

    userTeam(event_id){
        return window.axios.get(endpoint+'/api/event/'+event_id+'/user_team');
    },

    item(team_id){
        return window.axios.get(endpoint+'/api/teams/'+team_id);
    }
}