import user from "@/api/user";

export default {
    state: {
        currentUser: {},
        currentUserEvents: [],
        error: {},
        fluid: false,
        token: null
    },
    mutations: {
        setUser(state, user) {
            state.currentUser = user
        },
        setAuthError(state, error) {
            state.error = error;
            state.token = null
        },
        setCurrentUserEvents(state, events) {
            state.currentUserEvents = events;
        },
        setFluid(state, fluid) {
            state.fluid = fluid;
        },

        setToken(state, token) {
            // eslint-disable-next-line no-console
            console.log("SET TOKEN", token);
            localStorage.setItem('access_token', token);
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            state.token = token
        }
    }
    ,
    actions: {
        async getUser({commit}) {
            try {
                let {data} = await user.getUser();
                commit('setUser', data);
            } catch (err) {
                localStorage.removeItem('token');
                commit('setAuthError', err);
            }

        },

        // eslint-disable-next-line no-unused-vars
        authUser({commit, dispatch}, {username, password}) {
            return new Promise((resolve, reject) => {
                user.authUser(username, password).then((response) => {
                    // eslint-disable-next-line no-console
                    commit('setToken', response.data.access_token);
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

        signUp({commit}, user_object) {
            return user.signUp(user_object).then((response) => {
                commit('setUser', response.data);
            })
        },

        logout({commit}) {
            localStorage.removeItem('access_token');
            commit('setUser', {});

        },


        reset({commit, dispatch}, data) {
            return new Promise((resolve, reject) => {
                user.reset(data).then((r) => {
                    commit('setToken', r.data.token)
                    dispatch('getUser').then(() => {
                        resolve()
                    });
                }).catch((error) => {
                    reject(error);
                })
            })
        },

        getUserEvents({commit}) {
            return user.events().then((response) => {
                commit('setCurrentUserEvents', response.data);
            });
        },


    }
}


