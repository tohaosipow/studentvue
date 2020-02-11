import project_types from "@/api/project_types";
import projects from "@/api/projects";

export default {
    state: {
        project_types: [],
        projects: []
    },
    mutations: {
        setProjectTypes(state, project_types) {
            state.project_types = project_types
        },

        addProject(state, project){
            state.projects.push(project)
        },

        setProjects(state, projects){
            state.projects = projects;
        },

        removeProject(state, project){
            state.projects = state.projects.filter((el) => {return parseInt(el.id) !== parseInt(project.id)})
        },

        updateProject(state, project){
            state.projects  = [...state.projects.map((el) => {return parseInt(el.id) === parseInt(project.id)?project:el})]
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

        storeProject({commit}, data){
            return projects.store(data).then((r) => {
                commit('addProject', r.data)
            });

        }
    }
}


