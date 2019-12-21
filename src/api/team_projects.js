import endpoint from "@/api/endpoint";

export default {
    create(team_id, form_data){
        return window.axios.post(endpoint+'/api/teams/'+team_id+'/projects/create',  form_data, {headers: {'Content-Type': 'multipart/form-data'}});
    },

    all(team_id) {
        return window.axios.get(endpoint + '/api/teams/' + team_id + '/projects');
    },


    edit(team_project_id, form_data){
        return window.axios.post(endpoint+'/api/team_projects/'+team_project_id+'/edit', form_data, {headers: {'Content-Type': 'multipart/form-data'}});
    }


}