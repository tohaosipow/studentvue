
export default {
    state: {
        lesson: null,
        moveAll: false
    },
    mutations: {
        setManagedLesson(state, lesson) {
            state.lesson = lesson;
        },

        setMoveAll(state, move_all){
            state.moveAll = move_all;
        }

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


