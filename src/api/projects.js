import endpoint from "@/api/endpoint";

export default {
    all(){
        return window.axios.get(endpoint+'/api/projects');
    },

    store(data){
        return window.axios.post(endpoint+'/api/projects/store', data);
    },

    remove(data){
        return window.axios.post(endpoint+'/api/projects/'+data.id+'/remove');
    },

    approve(data){
        return window.axios.post(endpoint+'/api/projects/'+data.id+'/approve');
    },
    item(data){
        return window.axios.get(endpoint+'/api/projects/'+data.id);
    },

    participants(data){
        return window.axios.get(endpoint+'/api/projects/'+data.id+'/participants');
    },

    approveParticipant(data){
        return window.axios.post(endpoint+'/api/projects/'+data.id+'/participants/'+data.user_id+'/approve');
    },

    declineParticipant(data){
        return window.axios.post(endpoint+'/api/projects/'+data.id+'/participants/'+data.user_id+'/decline');
    },

    status(data){
        return window.axios.get(endpoint+'/api/projects/'+data.id+'/status');
    },

    enterToProject(data){
        return window.axios.post(endpoint+'/api/projects/'+data.id+'/participants/enter', data);
    },

    changeParticipantPermission(data){
        return window.axios.post(endpoint+'/api/projects/'+data.id+'/participants/'+data.user_id+'/permission', data);
    }

}