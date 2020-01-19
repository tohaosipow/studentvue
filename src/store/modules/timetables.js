import lessons from "@/api/lessons";
import disciplines from "@/api/disciplines";
import periods from "@/api/periods";
import user from "@/api/user";
import places from "@/api/places";
import lesson_nums from "@/api/lesson_nums";

export default {
    state: {
        lessons: [],
        disciplines: [],
        periods: [],
        employees: [],
        places: [],
        lesson_nums: []
    },
    mutations: {
        setLessons(state, lessons) {
            state.lessons = lessons;
        },
        setDisciplines(state, disciplines) {
            state.disciplines = disciplines;
        },
        addDiscipline(state, discipline) {
            state.disciplines.push(discipline);
        },
        setPeriods(state, periods) {
            state.periods = periods;
        },
        setEmployees(state, employees) {
            state.employees = employees;
        },
        setPlaces(state, places) {
            state.places = places;
        },
        setLessonNums(state, lesson_nums) {
            state.lesson_nums = lesson_nums;
        },


    },
    getters: {
        getDisciplineByID(state) {
            return (id) => {
                return state.disciplines.filter((el) => {
                    return parseInt(el.id) === parseInt(id)
                })[0]
            }
        },
        getLessonNumByID(state) {
            return (id) => {
                return state.lesson_nums.filter((el) => {
                    return parseInt(el.id) === parseInt(id)
                })[0]
            }
        }
    },
    actions: {
        getLessons({commit}, {user_id}) {
            return lessons.all(user_id).then((response) => {
                commit('setLessons', response.data);
            })
        },

        getDisciplines({commit}) {
            return disciplines.all().then((response) => {
                commit('setDisciplines', response.data);
            })
        },
        getPeriods({commit}) {
            return periods.all().then((response) => {
                commit('setPeriods', response.data);
            })
        },

        getEmployees({commit}) {
            return user.employees().then((response) => {
                commit('setEmployees', response.data);
            })
        },

        getPlaces({commit}) {
            return places.all().then((response) => {
                commit('setPlaces', response.data);
            })
        },

        getLessonNums({commit}) {
            return lesson_nums.all().then((response) => {
                commit('setLessonNums', response.data);
            })
        },

        createDiscipline({commit}, discipline) {
            return disciplines.create(discipline).then((response) => {
                commit('addDiscipline', response.data);
                return response.data;
            })
        }
    }
}


