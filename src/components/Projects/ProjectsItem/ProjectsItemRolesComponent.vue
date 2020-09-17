<template>
    <v-card :loading="loading" elevation="0">
        <v-card-title>Роли в проекте</v-card-title>
        <v-sheet elevation="1" :key="role.id" v-for="role in project.roles" color="gray" class="pa-4 mt-4">
            <v-row align="center">
                <v-col lg="6">
                    <v-text-field :disabled="role.name === 'Создатель проекта'"  v-model="role.name" dense label="Название роли" outlined/>
                    <v-text-field :disabled="role.name === 'Создатель проекта'" v-model="role.tasks" dense label="Задачи роли" outlined/>
                </v-col>
                <v-col lg="5">
                    <v-text-field  :disabled="role.name === 'Создатель проекта'"  v-model="role.quota" dense label="Квота" outlined suffix="чел." type="number"/>
                </v-col>
                <v-col lg="1">
                    <v-btn  @click="removeRole(role)" color="red" icon text>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <br>
                    <br>
                </v-col>

            </v-row>
            <v-btn :disabled="role.name === 'Создатель проекта'"  @click="updateRole(role)" color="blue darken-2"  text>
                Сохранить
            </v-btn>

        </v-sheet>
    </v-card>
</template>

<script>
    export default {
        name: "ProjectsItemRolesComponent",
        computed: {
            project() {
                return this.$store.state.projects.currentProject;
            },

            readOnly() {
                return true
            }
        },
        data(){
            return{
                loading: false
            }
        },
        methods: {
            removeRole(role){
                this.loading = true;
                this.$store.dispatch('removeProjectRole', role).then(() => {this.loading = false})
            },

            updateRole(role){
                this.loading = true;
                this.$store.dispatch('updateProjectRole', role).then(() => {this.loading = false})
            }
        }
    }
</script>

<style scoped>

</style>
