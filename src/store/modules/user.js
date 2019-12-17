import user from "@/api/user";

export default {
    state: {
        currentUser: {},
        error: {}
    },
    mutations: {
        setUser(state, user){
            state.currentUser = user
        },
        setAuthError(state, error){
            state.error = error;
        }
    }
    ,
    actions: {
        async getUser({commit}){
            try {
                let {data} = await user.getUser();
                commit('setUser', data);
            } catch (err) {
                commit('setAuthError', err);
            }

        },

        // eslint-disable-next-line no-unused-vars
        async authUser({commit, dispatch}, {username, password}){
            try {
                let {data} = await user.authUser(username, password);
                localStorage.setItem('access_token', data.access_token);
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
                dispatch('getUser');
            } catch (err) {
                commit('setAuthError', err);

            }

        },

        signUp({commit}, {name, email, password}){
            return user.signUp(name, email, password).then((response) =>{
                commit('setUser', response.data);
            })
        },

    }
}


