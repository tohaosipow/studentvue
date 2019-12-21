<template>
    <v-card>
        <v-card-title class="headline">Создание проекта</v-card-title>
        <v-container>
            <v-row>
                <v-col lg="12">
                    <v-text-field v-model="team_project.name" counter dense prepend-icon="mdi-account" outlined label="Название проекта"></v-text-field>
                    <v-text-field v-model="team_project.description" counter dense prepend-icon="mdi-text" outlined label="Описание проекта"></v-text-field>
                    <v-text-field v-model="team_project.objective" counter dense prepend-icon="mdi-text" outlined label="Цель проекта"></v-text-field>
                    <v-text-field v-model="team_project.tasks" counter dense prepend-icon="mdi-text" outlined label="Задачи проекта"></v-text-field>
                    <v-text-field v-model="team_project.roles" counter dense prepend-icon="mdi-text" outlined label="Роли в проекте"></v-text-field>
                    <v-file-input v-model="team_project.presentation" outlined prepend-icon="mdi-camera" dense  label="Презентация проекта"></v-file-input>
                </v-col>

            </v-row>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$emit('close')">Закрыть</v-btn>
            <v-btn color="blue darken-3" text @click="save">Создать</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "TeamCreateEditComponent",
        data(){
            return{
                team_project:{
                    name: '',
                    description: '',
                    objective: '',
                    tasks: '',
                    roles: '',
                    presentation: null
                }
            }
        },
        methods:{
            save(){
                let formData = new FormData();
                formData.append('presentation', this.team_project.presentation);
                formData.append('description', this.team_project.description);
                formData.append('name', this.team_project.name);
                formData.append('objective', this.team_project.objective);
                formData.append('roles', this.team_project.roles);
                formData.append('tasks', this.team_project.tasks);

                this.$store.dispatch('createTeamProject', {team_id: this.$store.state.events.currentTeam.id, form_data: formData}).then(() => {
                   this.$emit('close');
                });

            }
        }
    }
</script>

<style scoped>

</style>