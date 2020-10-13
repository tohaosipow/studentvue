import endpoint from "@/api/endpoint";

export default {

    all(project_id) {
        return window.axios.get(endpoint + '/api/projects/' + project_id + '/files');
    },

    store(project_id, data) {
        return window.axios.post(endpoint + '/api/projects/' + project_id + '/files', data);
    },

    remove(project_file_id) {
        return window.axios.post(endpoint + '/api/project_files/' + project_file_id + '/remove');
    },


}
