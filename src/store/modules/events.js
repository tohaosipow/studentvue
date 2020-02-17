import events from "@/api/events";
import rubrics from "@/api/rubrics";
import event_checks from "@/api/event_checks";
import teams from "@/api/teams";
import team_projects from "@/api/team_projects";
import user_roles from "@/api/user_roles";

export default {
    state: {
        events: [],
        currentEvent: null,
        participants: [],
        admins: [],
        userPoints: [],
        teamPoints: [],
        userStatus: {},
        teams: [],
        userTeam: [],
        teamProjects: [],
        currentTeam: null,
        event_types: [],
        user_roles: [],
    },
    mutations: {
        setCurrentTeam(state, team){
          state.currentTeam = team;
        },
        setEvents(state, events) {
            state.events = events
        },

        addEvent(state, event) {
            state.events.push(event)
        },

        setUserRoles(state, user_roles) {
            state.user_roles = user_roles
        },

        setEventTypes(state, event_types) {
            state.event_types = event_types
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

        setEventTeamPoints(state, team_points) {
            state.teamPoints = team_points;
        },


        setUserStatus(state, user_status) {
            state.userStatus = user_status;
        },
        setTeams(state, teams) {
            state.teams = teams;
        },

        setTeamProjects(state, team_projects) {
            state.teamProjects = team_projects;
        },


        addTeamProject(state, team_project) {
            state.teamProjects.push(team_project);
        },

        addTeam(state, team) {
            state.teams.push(team);
        },

        updateTeam(state, team) {
            let teams = state.teams.slice(0);
            teams.forEach((t, index) => {
                if (t.id === team.id) {
                    teams[index] = team;
                }
            });
            state.teams = teams;

        },
        updateTeamMembers(state, {team_id, members}) {
            let teams = state.teams.slice(0);
            teams.forEach((t, index) => {
                if (t.id === team_id) {
                    teams[index].members = members;
                }
            });
            state.teams = teams;
        },

        setUserTeam(state, team) {
            state.userTeam = team;
        }

    },
    getters: {

        getTeamsSortByPoints(state) {
            let teams = state.teams.slice(0);
            teams.sort((a, b) => {
                return parseInt(b.points) - parseInt(a.points)
            });
            return teams;
        },

        getEventUserPointsByParticipantIdAndAdminIDAndRubricID(state) {
            return (participant_id, admin_id, rubric_id) => {
                return state.userPoints.filter((point) => {
                    return parseInt(point.user_id) === parseInt(participant_id)
                        && parseInt(point.evaluated_by) === parseInt(admin_id)
                        && parseInt(point.rubric_id) === parseInt(rubric_id)
                })
            }
        },

        getEventTeamPointsByTeamIdAndAdminIDAndRubricID(state) {
            return (team_id, admin_id, rubric_id) => {
                return state.teamPoints.filter((point) => {
                    return parseInt(point.team_id) === parseInt(team_id)
                        && parseInt(point.evaluated_by) === parseInt(admin_id)
                        && parseInt(point.rubric_id) === parseInt(rubric_id)
                })
            }
        },

        getTotalTeamPointsByTeamIdAndAdminID(state) {
            return (team_id, admin_id) => {
                let points = 0;
                state.teamPoints.forEach((point) => {
                    if (parseInt(point.team_id) === parseInt(team_id) && parseInt(point.evaluated_by) === parseInt(admin_id)) points += point.points_earned;
                });
                return points;
            }
        },
        jury: function (state) {
            return state.participants.filter((user) => {
                if (parseInt(user.admin) === 1) return true;
                let can = false;
                user.roles.forEach((role) => {
                    if (role.event_role.can_set_points === 1) can = true;
                    if (role.event_role.admin === 1) can = true;
                });
                return can;

            })
        },

        isEventAdmin: function (state) {
            return (user_id) => {
                let can = false;
                state.participants.forEach((user) => {
                    if (user.id === user_id) {
                        if (parseInt(user.admin) === 1) can = true;
                        else {
                            user.roles.forEach((role) => {
                                if (role.event_role.admin === 1) can = true;
                            });
                        }
                    }
                });
                return can;
            }
        },

        checkCanSetPoints: function (state) {
            return (user_id) => {
                let can = false;
                state.participants.forEach((user) => {
                    if (user.id === user_id) {
                        if (parseInt(user.admin) === 1) can = true;
                        else {
                            user.roles.forEach((role) => {
                                if (role.event_role.can_set_points === 1) can = true;
                                if (role.event_role.admin === 1) can = true;
                            });
                        }
                    }
                });
                return can;
            }
        }
    },
    actions: {

        changeParticipantRole({commit}, data){
            return events.changeParticipantRole(data).then((r) => {
                commit('setEventParticipants', r.data);
                return true;
            })
        },
        storeEvent({commit}, data) {
            return events.store(data).then((r) => {
                commit('addEvent', r.data);
                return true;
            })
        },

        getEvents({commit}) {
            return events.getEvents().then((r) => {
                commit('setEvents', r.data);
            })
        },

        getUserRoles({commit}) {
            return user_roles.all().then((r) => {
                commit('setUserRoles', r.data);
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

        getEventTeamPoints({commit}, {id}) {
            return events.getEventTeamPoints(id).then((r) => {
                commit('setEventTeamPoints', r.data);
            })
        },

        updateEventUserPoint({state, dispatch}, {participant_id, admin_id, rubric_id, points_earned}) {
            return events.updateUserEventPoints(participant_id, admin_id, rubric_id, points_earned).then(() => {
                dispatch('getEventUserPoints', {id: state.currentEvent.id});
            })
        },

        updateEventTeamPoint({state, dispatch}, {team_id, admin_id, rubric_id, points_earned}) {
            return events.updateTeamEventPoints(team_id, admin_id, rubric_id, points_earned).then(() => {
                dispatch('getEventTeamPoints', {id: state.currentEvent.id});
            })
        },

        getUserStatus({commit}, {id}) {
            return events.getUserStatus(id).then((response) => {
                commit('setUserStatus', response.data);
            });
        },

        getUserTeam({commit}, {event_id}) {
            return teams.userTeam(event_id).then((response) => {
                commit('setUserTeam', response.data);
            });
        },


        checkIn({commit}, {event_id, event_role_id}) {
            return event_checks.create(event_id, event_role_id).then((response) => {
                commit('setUserStatus', response.data);
            });
        },

        getTeams({commit}, {event_id}) {
            return teams.getAll(event_id).then((response) => {
                commit('setTeams', response.data);
            })
        },

        createTeam({commit}, {event_id, form_data}) {
            return teams.create(event_id, form_data).then((r) => {
                commit('addTeam', r.data);
            });
        },

        joinTeam({commit}, {team_id}) {
            return teams.join(team_id).then((response) => {
                commit('updateTeam', response.data);
            });
        },

        acceptMember({commit}, {team_id, user_id}) {
            return teams.acceptMember(team_id, user_id).then((response) => {
                commit('updateTeamMembers', {team_id: team_id, members: response.data});
            });
        },

        declineMember({commit}, {team_id, user_id}) {
            return teams.declineMember(team_id, user_id).then((response) => {
                commit('updateTeamMembers', {team_id: team_id, members: response.data});
            });
        },

        getTeamProjects({commit}, {team_id}) {
            return team_projects.all(team_id).then((r) => {
                commit('setTeamProjects', r.data);
            })
        },

        createTeamProject({dispatch}, {team_id, form_data}) {
            return team_projects.create(team_id, form_data).then(() => {
                dispatch('getTeamProjects', {team_id})
            })
        },

        getCurrentTeam({commit}, {team_id}){
            return teams.item(team_id).then(response => {
                commit('setCurrentTeam', response.data);
            })
        },

        getEventTypes({commit}){
            return events.getEventTypes().then(response => {
                commit('setEventTypes', response.data);
            })
        }
    }
}


