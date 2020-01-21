<template>
    <v-card>
        <v-card-title> Редактирование учебных групп</v-card-title>
        <v-card-subtitle>Только учебная подгруппа может быть участником занятий</v-card-subtitle>
        <v-card-text>
            <v-autocomplete :clearable="true"
                            :items="$store.state.dictionaries.studentGroups"
                            @input="$store.dispatch('getCriteriaAndUsers')"
                            aria-autocomplete="none"
                            item-text="name"
                            item-value="id"
                            label="Учебная группа"
                            no-data-text="Такой группы нет"
                            return-object
                            v-model="group"
            >
                <template v-slot:prepend-item>
                    <v-list-item @click="() => {createStudentGroupModalShow = true}"
                                 ripple
                    >
                        <v-list-item-action>
                            <v-icon color="green">mdi-plus</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Создать учебную группу</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"/>
                </template>
            </v-autocomplete>
            <v-autocomplete :clearable="true"
                            :items="$store.state.groupcreator.criteria" @change="updateSubgroups"
                            aria-autocomplete="none"
                            item-text="name"
                            item-value="id"
                            label="Способ деления"
                            no-data-text="Такого способа мы знаем :("
                            return-object
                            v-if="group"
                            v-model="criterion"
            >

                <template v-slot:prepend-item>
                    <v-list-item @click="() => {createCriteriaModal = true}"
                                 ripple
                    >
                        <v-list-item-action>
                            <v-icon color="green">mdi-plus</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Создать способ деления</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"/>
                </template>

            </v-autocomplete>

            <template v-if="$store.state.groupcreator.subgroups">
                <v-tabs background-color="blue darken-2"
                        dark
                        grow
                        show-arrows

                        v-model="subgroup_tab"

                >
                    <v-tabs-slider color="white lighten-3"></v-tabs-slider>

                    <v-tab
                            :key="index"
                            v-for="(item, index) in $store.state.groupcreator.subgroups"
                    >
                        {{ item.name}}
                    </v-tab>

                </v-tabs>
                <v-tabs-items v-model="subgroup_tab">
                    <v-tab-item
                            :key="index"
                            v-for="(item, index) in  $store.state.groupcreator.subgroups"
                    >
                        <StudentsInSubgroupList :students="$store.state.groupcreator.group_students" :subgroup="item"/>
                    </v-tab-item>
                </v-tabs-items>
            </template>
            <v-dialog max-width="500" v-model="createStudentGroupModalShow">
                <CreateStudentGroupModal
                        @close="createStudentGroupModalShow = false"
                        @create="subgroup.student_group_id = $event"/>
            </v-dialog>
            <v-dialog max-width="500" v-model="createCriteriaModal">
                <CreateCriteriaModal
                        :group="group"
                        @close="createCriteriaModal = false"
                        @create="() => {criterion = $event; updateSubgroups()}"/>
            </v-dialog>
        </v-card-text>
    </v-card>
</template>

<script>
    import CreateStudentGroupModal from "@/components/Timetables/DisplinesCreator/StudentGroupCreateModal";
    import CreateCriteriaModal from "@/components/Timetables/DisplinesCreator/CreateCriteriaModal";
    import StudentsInSubgroupList from "@/components/Timetables/DisplinesCreator/StudentsInSubgroupList";

    export default {
        name: "EditSubgroupsModal",
        components: {CreateCriteriaModal, CreateStudentGroupModal, StudentsInSubgroupList},
        computed: {
            group: {
                set(value) {
                    return this.$store.commit('setEditableGroup', value)
                },
                get() {
                    return this.$store.state.groupcreator.group;
                }
            },
            criterion: {
                set(value) {
                    return this.$store.commit('setCriterion', value)
                },
                get() {
                    return this.$store.state.groupcreator.criterion;
                }
            }
        },
        data() {
            return {
                createStudentGroupModalShow: false,
                createCriteriaModal: false,

                loading: false,
                subgroup: {
                    student_group: null,
                    criteria: null
                },
                subgroup_tab: 0
            }
        },
        methods:{
            updateSubgroups(){
                this.$store.dispatch('getCriterionSubgroups').then(() => {this.subgroup_tab = 0;})
            }
        }
    }
</script>

<style scoped>

</style>