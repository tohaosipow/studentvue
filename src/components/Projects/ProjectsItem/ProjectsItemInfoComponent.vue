<template>
    <v-card>
        <v-card-title>Информация о проекте</v-card-title>
        <v-card-text>
            <v-text-field :readonly="readOnly" autocomplete="off" label="Заказчик" outlined
                          placeholder="Сургутский государственный университет"
                          v-model="project.customer"/>
            <v-autocomplete :readonly="readOnly" :items="$store.state.projects.project_types" auto-select-first
                            autocomplete="off"
                            item-text="name" item-value="id" label="Тип проекта" outlined
                            v-model="project.project_type_id"/>
            <label>Цель проекта</label>

            <v-textarea outlined :readonly="readOnly" v-model="project.participation_purpose"/>
            <v-text-field :readonly="readOnly" label="Название проекта" outlined v-model="project.title"/>
            <v-textarea :readonly="readOnly" label="Задача" outlined  v-model="project.task"/>
            <v-textarea :readonly="readOnly" label="Проблема, которую решает проект"
                        outlined
                        v-model="project.problem"/>
            <v-textarea :readonly="readOnly" label="Планируемый результат" outlined v-model="project.result"/>
            <v-textarea :readonly="readOnly"  label="Требуемые материальные ресурсы ресурсы" outlined
                        v-model="project.resources"/>

            <v-btn :loading="saveLoading" @click="save" v-if="!readOnly" color="blue darken-2" dark>Сохранить</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "ProjectsItemInfoComponent",
        computed: {
            project() {
                return this.$store.state.projects.currentProject;
            },

            readOnly(){
                return !(this.$store.state.user.currentUser.admin === 1 || this.$store.getters.canEditProject)
            }
        },
        data(){
            return {
                saveLoading: false
            }
        },
        methods:{

            save(){
                this.saveLoading = true;
                this.$store.dispatch('updateProject', this.$store.state.projects.currentProject).then(() => {this.saveLoading  = false});
            }
        }

    }
</script>

<style scoped>

</style>
