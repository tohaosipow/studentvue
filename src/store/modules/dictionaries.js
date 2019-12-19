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
        setStudentGroups(state, student_groups){
            state.studentGroups = student_groups;
        }

    },
    getters: {
        getStudentsDepartments(state){
            return state.departments.filter(department => {
                return department.for_students === 1;
            })
        }
    },
    actions: {
        getDepartments({commit}){
            return departments.all().then((response) => {
                commit('setDepartments', response.data);
            })
        },

        getStudentGroups({commit}){
            return student_groups.all().then((response) => {
                commit('setStudentGroups', response.data);
            })
        }
    }
}


