
export default {
    state: {
        lesson: null
    },
    mutations: {
        setManagedLessons(state, lesson) {
            state.lesson = lesson;
        },

    },
    actions: {
        /*removeUserFromSubgroup({commit}, data) {
            subgroups.leftUser({id: data.subgroup.id, user_id: data.user.id}).then(() => {
                commit('removeUserFromSubgroup', data)
            })

        }, */
    },
    getters: {}

}


