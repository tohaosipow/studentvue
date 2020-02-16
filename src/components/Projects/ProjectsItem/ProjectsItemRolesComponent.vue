<template>
    <v-card elevation="0">
        <v-alert type="warning">
            Функционал по редактированию ролей будет доступен с 20 февраля 2020 г.
        </v-alert>
        <v-card-title>Роли в проекте</v-card-title>
        <v-sheet elevation="1" :key="role.id" v-for="role in project.roles" color="gray" class="pa-4 mt-4">
            <v-row align="center">
                <v-col lg="6">
                    <v-text-field disabled :value="role.name" dense label="Название роли" outlined/>
                    <v-text-field disabled :value="role.tasks" dense label="Задачи роли" outlined/>
                </v-col>
                <v-col lg="5">
                    <v-text-field disabled :value="role.quota" dense label="Квота" outlined suffix="чел." type="number"/>
                </v-col>
                <v-col lg="1">
                    <v-btn disabled @click="removeRole(index)" color="red" icon text>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <br>
                    <br>
                </v-col>

            </v-row>
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
    }
</script>

<style scoped>

</style>