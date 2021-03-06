import departments from "@/api/departments";
import student_groups from "@/api/student_groups";

export default {
    state: {
        departments: [],
        studentGroups: [],
    },
    mutations: {
        setDepartments(state, departments) {
            state.departments = departments
        },
        setStudentGroups(state, student_groups) {
            state.studentGroups = student_groups;
        },
        addStudentGroup(state, student_group) {
            state.studentGroups.push(student_group);
        }

    },
    getters: {
        getStudentsDepartments(state) {
            return state.departments.filter(department => {
                return department.for_students === 1;
            })
        },

        getDepartmentByID(state) {
            return (id) => {
                return state.departments.filter(department => {
                    return parseInt(department.id) === parseInt(id);
                })[0];
            }
        }
    },
    actions: {
        getDepartments({commit}) {
            return departments.all().then((response) => {
                commit('setDepartments', response.data);
            })
        },

        getStudentGroups({commit}) {
            return student_groups.all().then((response) => {
                commit('setStudentGroups', response.data);
            })
        },

        createStudentGroup({commit}, data) {
            return new Promise((resolve, reject) => {
                student_groups.create(data).then((response) => {
                    resolve(response.data);
                    commit('addStudentGroup', response.data);
                }).catch(error => {
                    reject(error);
                })
            });
        }
    }
}


