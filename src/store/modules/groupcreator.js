import student_groups from "@/api/student_groups";
import criteria from "@/api/criteria";


export default {
    state: {
        group: null,
        criterion: null,
        group_students: [],
        criteria: [],
        subgroups: []
    },
    mutations: {
        setCriterionSubgroups(state, subgroups) {
            state.subgroups = subgroups;
        },

        setEditableGroup(state, group) {
            state.group = group
        },

        addCriteria(state, criteria) {
            state.criteria.push(criteria)
        },

        setCriteria(state, criteria) {
            state.criteria = criteria;
        },

        setCriterion(state, criterion) {
            state.criterion = criterion;
            state.subgroups = [];
        },

        setGroupStudents(state, students) {
            state.group_students = students;
        },

        removeUserFromSubgroup(state, data) {
            state.subgroups = state.subgroups.map((subgroup) => {
                if (parseInt(subgroup.id) === parseInt(data.subgroup.id)) {
                    return {
                        ...subgroup, users: subgroup.users.filter((user) => {
                            return parseInt(user.id) !== parseInt(data.user.id);
                        })
                    }
                } else return subgroup;
            })
        },

        addUserToSubgroup(state, data) {
            state.subgroups = state.subgroups.map((subgroup) => {
                if (parseInt(subgroup.id) === parseInt(data.subgroup.id)) {
                    return {
                        ...subgroup, users: [...subgroup.users, data.user]
                    }
                } else return subgroup;
            })
        },

    },
    actions: {
        removeUserFromSubgroup({commit}, data) {
            commit('removeUserFromSubgroup', data)
        },
        addUserToSubgroup({commit}, data) {
            commit('addUserToSubgroup', data)
        },

        getCriteriaAndUsers({dispatch}) {
            dispatch('getCriteria');
            dispatch('getGroupStudents');
        },

        getCriteria({commit, state}) {
            student_groups.criteria({id: state.group.id}).then((response) => {
                commit('setCriteria', response.data)
                commit('setCriterion', null)
            })
        },

        getGroupStudents({commit, state}) {
            student_groups.users({id: state.group.id}).then((response) => {
                commit('setGroupStudents', response.data)
            })
        },

        getCriterionSubgroups({commit, state}) {
            criteria.subgroups({id: state.criterion.id}).then((response) => {
                commit('setCriterionSubgroups', response.data)
            })
        },


        createCriterion({commit}, data) {
            return new Promise((resolve, reject) => {
                criteria.create(data).then((response) => {
                    resolve(response.data);
                    commit('addCriteria', response.data)
                }).catch((error) => {
                    reject(error)
                });

            });
        },
    },
    getters: {
        getStudentInSubgroup: () => (student, subgroup) => {
            return subgroup.users.filter(user => {
                return parseInt(user.id) === parseInt(student.id);
            }).length !== 0;
        },
        getStudentInOtherSubgroup: (state) => (student, subgroup) => {
            let flag = false;
            state.subgroups.forEach((s) => {
                if (parseInt(s.id) !== parseInt(subgroup.id)) {
                    if (s.users.filter(user => {
                        return parseInt(user.id) === parseInt(student.id);
                    }).length !== 0) {
                        flag = true;
                    }
                }

            });
            return flag;
        }
    },

}


