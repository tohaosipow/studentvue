import lessons from "@/api/lessons";

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
        moveLesson(_, data) {
            return new Promise((resolve => {
                lessons.move(data).then(() => {
                    resolve()
                })
            }))


        },

    },
    getters: {}

}


