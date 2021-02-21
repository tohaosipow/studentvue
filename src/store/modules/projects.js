import project_types from "@/api/project_types";
import projects from "@/api/projects";
import project_roles from "@/api/project_roles";
import project_files from "@/api/project_files";
import chats from "@/api/chats.js";


export default {
    state: {
        project_types: [],
        projects: [],
        archiveReasons: [],
        userProjects: [],
        currentProject: null,
        currentProjectParticipants: [],
        currentUserStatusInProject: null,
        currentProjectFiles: [],
        currentProjectChat: null

    },
    mutations: {

        setArchiveReasons(state, reasons) {
            state.archiveReasons = reasons
        },

        setCurrentProjectChat(state, chat) {
            state.currentProjectChat = chat
        },
        setCurrentProjectFiles(state, files) {
            state.currentProjectFiles = files;
        },

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
            // eslint-disable-next-line no-console
            console.log(project);
            state.projects = [...state.projects.map((el) => {
                return parseInt(el.id) === parseInt(project.id) ? project : el
            })];
            if (parseInt(state.currentProject.id) === parseInt(project.id)) state.currentProject = project;
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

        isProjectAdmin(state, getters, g_state) {
            return (state.currentUserStatusInProject && state.currentUserStatusInProject.admin == 1 && state.currentUserStatusInProject.approved == 1) || g_state.user.currentUser.admin == 1 || state.currentProject.responsible_user.id == g_state.user.currentUser.id
        },

        isProjectParticipant(state) {
            return state.currentUserStatusInProject != null
        },

        canWriteToChat(state, getters) {
            return getters.isProjectAdmin || getters.isProjectParticipant;
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

        getArchiveReasons({commit}) {
            return projects.getArchiveReasons().then((response) => {
                commit('setArchiveReasons', response.data);
            })
        },

        getProjectChat({commit, state}) {
            return chats.getChatById({id: state.currentProject.chat_id}).then((response) => {
                commit('setCurrentProjectChat', response.data);
            })
        },

        getProjectFiles({commit}, {project_id}) {
            return project_files.all(project_id).then((response) => {
                commit('setCurrentProjectFiles', response.data);
            })
        },

        removeProjectFile({dispatch, state}, {project_file_id}) {
            return new Promise(((resolve, reject) => {
                project_files.remove(project_file_id).then(() => {
                    dispatch('getProjectFiles', {project_id: state.currentProject.id}).then(() => {
                        resolve();
                    });
                }).catch((e) => {
                    reject(e);
                })
            }))
        },


        storeProjectFile({dispatch, state}, {project_id, data}) {
            return new Promise(((resolve, reject) => {
                project_files.store(project_id, data).then(() => {
                    dispatch('getProjectFiles', {project_id: state.currentProject.id}).then(() => {
                        resolve();
                    });

                }).catch((e) => {
                    reject(e);
                })
            }))
        },

        getProjects({commit}, data) {
            return projects.all(data).then((response) => {
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

        archiveProject({commit}, data) {
            return projects.archiveProject(data).then((response) => {
                commit('updateProject', response.data);
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

        updateProject({commit}, data) {
            return projects.update(data).then((r) => {
                return commit('updateProject', r.data)
            });

        },

        updateProjectRole({dispatch, state}, data) {
            return project_roles.update(data).then(() => {
                return dispatch('getCurrentProject', {id: state.currentProject.id})
            });

        },



        storeProjectRole({dispatch, state}, data) {
            return new Promise((resolve, reject) => {
                project_roles.store(data).then((response) => {
                    resolve(response);
                    dispatch('getCurrentProject', {id: state.currentProject.id})
                }).catch((e) => {
                    reject(e)
                })
            });
        },


        removeProjectRole({dispatch, state}, data) {
            return new Promise((resolve, reject) => {
                project_roles.delete(data).then((response) => {
                    resolve(response);
                    dispatch('getCurrentProject', {id: state.currentProject.id})
                }).catch((e) => {
                    reject(e)
                })
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


