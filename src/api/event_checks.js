import endpoint from "@/api/endpoint";

export default {
    approve(id){
        return window.axios.get(endpoint+'/api/event_check/'+id+'/change');
    },

    create(event_id, event_role_id){
        return window.axios.post(endpoint+'/api/event/'+event_id+'/event_check/create', {event_role_id});
    }

}