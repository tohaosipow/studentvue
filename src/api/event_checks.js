import endpoint from "@/api/endpoint";

export default {
    approve(id){
        return window.axios.get(endpoint+'/api/event_check/'+id+'/approve');
    },

    decline(id){
        return window.axios.get(endpoint+'/api/event_check/'+id+'/decline');
    },

    visit(id){
        return window.axios.get(endpoint+'/api/event_check/'+id+'/visit');
    },

    create(event_id, event_role_id){
        return window.axios.post(endpoint+'/api/event/'+event_id+'/event_check/create', {event_role_id});
    },

    qrVisit(event_id, code){
        return window.axios.post(endpoint+'/api/event/'+event_id+'/visit', {code});
    },

    all(event_id){
        return window.axios.get(endpoint+'/api/event/'+event_id+'/checks');
    }

}
