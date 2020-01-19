export default {
    state: {
        discipline: null,
        schedules: []
    },
    mutations: {
        setCreationDiscipline(state, discipline) {
            state.discipline = Object.assign({}, discipline);
        },
        addSchedule(state, schedule) {
            if (!state.discipline.schedules) {
                state.discipline = {...state.discipline, schedules: []}
            }
            state.discipline.schedules.push(schedule);
        },
        updateScheduleByIndex(state, {index, schedule}) {
            let schedules = [...state.discipline.schedules]
            // eslint-disable-next-line no-console
            schedules[index] = {...schedule}
            state.discipline.schedules = schedules
        },

        updateScheduleTeacher(state, {index, teacher}) {
            state.discipline.schedules[index].teacher = teacher
        }
    },
    getters: {},

}


