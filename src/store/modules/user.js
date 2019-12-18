import user from "@/api/user";

export default {
    state: {
        currentUser: {},
        currentUserEvents: [],
        error: {}
    },
    mutations: {
        setUser(state, user){
            state.currentUser = user
        },
        setAuthError(state, error){
            state.error = error;
        },
        setCurrentUserEvents(state, events){
            state.currentUserEvents = events;
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
        authUser({commit, dispatch}, {username, password}){
            return new Promise((resolve, reject) => {
                user.authUser(username, password).then((response) => {
                    localStorage.setItem('access_token', response.data.access_token);
                    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                    dispatch('getUser');
                    resolve()

                }).catch((error) => {
                    reject(error);
                    commit('setAuthError', error);
                });
            })

            /*
            then(response => {

            }, error => {


            });
             */

        },

        signUp({commit}, {name, email, password}){
            return user.signUp(name, email, password).then((response) =>{
                commit('setUser', response.data);
            })
        },

        logout({commit}){
            commit('setUser', {});
        },

        getUserEvents({commit}){
            return user.events().then((response) => {
               commit('setCurrentUserEvents', response.data);
            });
        }

    }
}


