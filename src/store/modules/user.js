import user from "@/api/user";

export default {
    state: {
        currentUser: {},
        currentUserEvents: [],
        error: {},
        fluid: false
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
        },
        setFluid(state, fluid){
            state.fluid = fluid;
        }
    }
    ,
    actions: {
        async getUser({commit}){
            try {
                let {data} = await user.getUser();
                commit('setUser', data);
            } catch (err) {
                localStorage.removeItem('token');
                commit('setAuthError', err);
            }

        },

        // eslint-disable-next-line no-unused-vars
        authUser({commit, dispatch}, {username, password}){
            return new Promise((resolve, reject) => {
                user.authUser(username, password).then((response) => {
                    localStorage.setItem('access_token', response.data.access_token);
                    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                    dispatch('getUser').then(() => {
                        resolve()
                    });

                }).catch((error) => {
                    reject(error);
                    localStorage.removeItem('token');
                    commit('setAuthError', error);
                });
            })

            /*
            then(response => {

            }, error => {


            });
             */

        },

        signUp({commit}, user_object){
            return user.signUp(user_object).then((response) =>{
                commit('setUser', response.data);
            })
        },

        logout({commit}){
            localStorage.removeItem('access_token');
            commit('setUser', {});
        },

        getUserEvents({commit}){
            return user.events().then((response) => {
               commit('setCurrentUserEvents', response.data);
            });
        },



    }
}


