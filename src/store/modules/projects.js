import project_types from "@/api/project_types";
import projects from "@/api/projects";


export default {
    state: {
        project_types: [],
        projects: [],
        userProjects: [],
        currentProject: null,
        currentProjectParticipants: [],
        currentUserStatusInProject: null

    },
    mutations: {
        setCurrentUserStatusInProject(state, status) {
            state.currentUserStatusInProject = status;
        },
        setProjectTypes(state, project_types) {
            state.project_types = project_types
        },

        updateParticipant(state, participant) {
            state.currentProjectParticipants = state.currentProjectParticipants.map((el) => {
                if (el.id == participant.id) return participant
                else return el
            });
            return true;
        },

        removeParticipant(state, participant) {
            state.currentProjectParticipants = state.currentProjectParticipants.filter((el) => {
                return el.id != participant.id
            });
            return true;
        },

        addProject(state, project) {
            state.projects.push(project)
        },

        setProjects(state, projects) {
            state.projects = projects;
        },

        setUserProjects(state, projects) {
            state.userProjects = projects;
        },

        removeProject(state, project) {
            state.projects = state.projects.filter((el) => {
                return parseInt(el.id) !== parseInt(project.id)
            })
        },

        updateProject(state, project) {
            state.projects = [...state.projects.map((el) => {
                return parseInt(el.id) === parseInt(project.id) ? project : el
            })]
        },

        setCurrentProject(state, project) {
            state.currentProject = project;
        },
        setCurrentProjectParticipants(state, participants) {
            state.currentProjectParticipants = participants;
        },

    },
    getters: {
        canEditProject(state) {
            return state.currentUserStatusInProject && state.currentUserStatusInProject.admin == 1 && state.currentUserStatusInProject.approved == 1
        },

        getParticipantsByProjectRole: (state) => (project_role_id) => {
            return state.currentProjectParticipants.filter((p) => {
                return parseInt(p.pivot.project_role_id) === parseInt(project_role_id)
            })
        }
    },
    actions: {
        getProjectTypes({commit}) {
            return project_types.all().then((response) => {
                commit('setProjectTypes', response.data);
            })
        },

        getProjects({commit}) {
            return projects.all().then((response) => {
                commit('setProjects', response.data);
                return true;
            })
        },
        getProjectsByUser({commit}, data) {
            return projects.byUserID(data.user_id).then((response) => {
                commit('setUserProjects', response.data);
                return true;
            })
        },

        getProjectParticipants({commit}, data) {
            return projects.participants(data).then((r) => {
                commit('setCurrentProjectParticipants', r.data)
                return true
            })
        },

        removeProject({commit}, data) {
            return projects.remove(data).then(() => {
                commit('removeProject', data);
                return true;
            })
        },

        approveProject({commit}, data) {
            return projects.approve(data).then((r) => {
                commit('updateProject', r.data);
                return true;
            })
        },

        storeProject({commit}, data) {
            return projects.store(data).then((r) => {
                commit('addProject', r.data)
            });

        },

        getCurrentProject({commit}, data) {
            return projects.item(data).then((r) => {
                commit('setCurrentProject', r.data);
                return true
            })
        },

        approveUserOnProject({commit, dispatch}, data) {
            return projects.approveParticipant(data).then((r) => {
                commit('updateParticipant', r.data)
                dispatch('getCurrentUserStatusInProject', data)
            });
        },

        declineUserOnProject({commit, dispatch}, data) {
            return projects.declineParticipant(data).then((r) => {
                commit('removeParticipant', r.data);
                dispatch('getCurrentUserStatusInProject', data)
            });
        },

        getCurrentUserStatusInProject({commit}, data) {
            return projects.status(data).then((r) => {
                commit('setCurrentUserStatusInProject', r.data.pivot);
            })
        },

        enterToProject({commit, dispatch}, data) {
            return projects.enterToProject(data).then((r) => {
                commit('setCurrentUserStatusInProject', r.data.pivot);
                dispatch('getProjectParticipants', data)
                return true
            })
        },
        changeParticipantPermission({commit}, data) {
            return projects.changeParticipantPermission(data).then((r) => {
                commit('updateParticipant', r.data)
            })
        }
    }
}


