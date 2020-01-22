import lessons from "@/api/lessons";
import disciplines from "@/api/disciplines";
import periods from "@/api/periods";
import user from "@/api/user";
import places from "@/api/places";
import lesson_nums from "@/api/lesson_nums";
import subgroups from "@/api/subgroups";


export default {
    state: {
        lessons: [],
        disciplines: [],
        periods: [],
        employees: [],
        places: [],
        lesson_nums: [],
        subgroups: []
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

        addEmployee(state, employee) {
            state.employees.push(employee);
        },

        setPlaces(state, places) {
            state.places = places;
        },

        addPlace(state, place) {
            state.places.push(place);
        },
        setLessonNums(state, lesson_nums) {
            state.lesson_nums = lesson_nums;
        },

        setSubgroups(state, subgroups) {
            state.subgroups = subgroups
        },
        addSubgroup(state, subgroup) {
            state.subgroups.push(subgroup)
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

        createPlace({commit}, data){
            return new Promise(((resolve, reject) => {
                places.create(data).then((response) => {
                    resolve(response.data)
                    commit('addPlace', response.data)
                }).catch((error) => {
                    reject(error)
                })
            }))
        },
        createTeacher({commit}, data){
            return new Promise(((resolve, reject) => {
                user.createTeacher(data).then((response) => {
                    resolve(response.data)
                    commit('addEmployee', response.data)
                }).catch((error) => {
                    reject(error)
                })
            }))
        },
        createSubgroup({commit}, data) {
            return subgroups.create(data).then((response) => {
                commit('addSubgroup', response.data);
            })
        },

        getSubgroups({commit}) {
            return subgroups.all().then((response) => {
                commit('setSubgroups', response.data);
            })
        },


        getLessons({commit}, data) {
            return lessons.all(data).then((response) => {
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


