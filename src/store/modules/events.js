import events from "@/api/events";
import rubrics from "@/api/rubrics";
import event_checks from "@/api/event_checks";
import teams from "@/api/teams";

export default {
    state: {
        events: [],
        currentEvent: null,
        participants: [],
        admins: [],
        userPoints: [],
        userStatus: {},
        teams: []
    },
    mutations: {
        setEvents(state, events) {
            state.events = events
        },

        setCurrentEvent(state, event) {
            state.currentEvent = event;
        },
        setEventParticipants(state, participants) {
            state.participants = participants;
        },

        setEventAdmins(state, admins) {
            state.admins = admins;
        },

        setCurrentEventRubrics(state, rubrics) {
            state.currentEvent.rubrics = rubrics;
        },

        addRubricToCurrentEvent(state, rubric) {
            state.currentEvent.rubrics = [...state.currentEvent.rubrics, rubric];
        },

        setEventUserPoints(state, user_points) {
            state.userPoints = user_points;
        },

        setUserStatus(state, user_status){
            state.userStatus = user_status;
        },
        setTeams(state, teams){
            state.teams = teams;
        },

        addTeam(state, team){
            state.teams.push(team);
        },

        updateTeam(state, team){
            let teams = state.teams.slice(0);
            teams.forEach((t, index) => {
                if(t.id === team.id){
                    teams[index] = team;
                }
            });
            state.teams = teams;

        }

    },
    getters: {
        getEventUserPointsByParticipantIdAndAdminIDAndRubricID(state) {
            return (participant_id, admin_id, rubric_id) => {
                return state.userPoints.filter((point) => {
                    return parseInt(point.user_id) === parseInt(participant_id)
                        && parseInt(point.evaluated_by) === parseInt(admin_id)
                        && parseInt(point.rubric_id) === parseInt(rubric_id)
                })
            }
        }
    },
    actions: {
        getEvents({commit}) {
            return events.getEvents().then((r) => {
                commit('setEvents', r.data);
            })
        },

        storeRubric({commit}, {title, description, points_max, event_id}) {
            return rubrics.storeRubric(title, description, points_max, event_id).then((r) => {
                commit('addRubricToCurrentEvent', r.data);
            })
        },

        getEvent({commit}, {id}) {
            return events.getEvent(id).then((r) => {
                commit('setCurrentEvent', r.data);
            })
        },
        getEventParticipants({commit}, {id}) {
            return events.getEventParticipants(id).then((r) => {
                commit('setEventParticipants', r.data);
            })
        },

        getEventAdmins({commit}, {id}) {
            return events.getEventAdmins(id).then((r) => {
                commit('setEventAdmins', r.data);
            })
        },

        getEventUserPoints({commit}, {id}) {
            return events.getEventPoints(id).then((r) => {
                commit('setEventUserPoints', r.data);
            })
        },

        updateEventUserPoint({state, dispatch}, {participant_id, admin_id, rubric_id, points_earned}){
            return events.updateUserEventPoints(participant_id, admin_id, rubric_id, points_earned).then(() => {
                dispatch('getEventUserPoints', {id: state.currentEvent.id});
            })
        },

        getUserStatus({commit}, {id}) {
            return events.getUserStatus(id).then((response) => {
                    commit('setUserStatus', response.data);
            });
        },

        checkIn({commit}, {event_id, event_role_id}){
            return event_checks.create(event_id, event_role_id).then((response) => {
                commit('setUserStatus', response.data);
            });
        },

        getTeams({commit}, {event_id}){
            return teams.getAll(event_id).then((response) => {
                commit('setTeams', response.data);
            })
        },

        createTeam({commit}, {event_id, form_data}){
            return teams.create(event_id, form_data).then((r) => {
                commit('addTeam', r.data);
            });
        },

        joinTeam({commit}, {team_id}){
            return teams.join(team_id).then((response) => {
                 commit('updateTeam', response.data);
            });
        }
    }
}


