import endpoint from "@/api/endpoint";

export default {
    all(data) {
        return window.axios.get(endpoint + '/api/projects', {params: data});
    },

    byUserID(user_id) {
        return window.axios.get(endpoint + '/api/user/' + user_id + '/projects');
    },

    store(data) {
        return window.axios.post(endpoint + '/api/projects/store', data);
    },

    update(data){
        if(data.hasOwnProperty('form_data')) return  window.axios.post(endpoint+'/api/projects/'+data.id+'/update', data.form_data);
        else return  window.axios.post(endpoint+'/api/projects/'+data.id+'/update', data);
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

    status(data) {
        return window.axios.get(endpoint + '/api/projects/' + data.id + '/status');
    },

    enterToProject(data) {
        return window.axios.post(endpoint + '/api/projects/' + data.id + '/participants/enter', data);
    },

    changeParticipantPermission(data) {
        return window.axios.post(endpoint + '/api/projects/' + data.id + '/participants/' + data.user_id + '/permission', data);
    },

    getArchiveReasons() {
        return window.axios.get(endpoint + '/api/archive_reasons');
    },

    archiveProject(data) {
        return window.axios.post(endpoint + '/api/project/' + data.id + '/archive', data);
    },


}
