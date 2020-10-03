<template>
    <v-card :loading="loading" elevation="0">
        <v-card-title>Роли в проекте</v-card-title>
        <v-card-actions>
            <v-btn @click="addRoleDialog = true" class="mt-2" color="green" outlined right>
                <v-icon left>mdi-plus</v-icon>
                Добавить роль
            </v-btn>
            <ProjectAddRoleDialogComponent @close="addRoleDialog = false" :is-open="addRoleDialog"/>

        </v-card-actions>
        <v-sheet :key="role.id" class="pa-4 mt-4" color="gray" elevation="1" v-for="role in project.roles">
            <v-row align="center">
                <v-col lg="6">
                    <v-text-field :disabled="role.name === NAME_DEFAULT_ROLE" dense label="Название роли"
                                  outlined v-model="role.name"/>
                    <v-text-field :disabled="role.name === NAME_DEFAULT_ROLE" dense label="Задачи роли"
                                  outlined v-model="role.tasks"/>
                </v-col>
                <v-col lg="5">
                    <v-text-field :disabled="role.name === NAME_DEFAULT_ROLE" dense label="Квота" outlined
                                  suffix="чел." type="number" v-model="role.quota"/>
                </v-col>
                <v-col lg="1">
                    <v-btn @click="removeRole(role)" color="red" icon text>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <br>
                    <br>
                </v-col>

            </v-row>
            <v-btn :disabled="role.name === NAME_DEFAULT_ROLE" @click="updateRole(role)" color="blue darken-2" text>
                Сохранить
            </v-btn>

        </v-sheet>

    </v-card>
</template>

<script>


    import ProjectAddRoleDialogComponent from "@/components/Projects/ProjectsItem/ProjectAddRoleDialogComponent";

    export default {
        name: "ProjectsItemRolesComponent",
        components: {
            ProjectAddRoleDialogComponent
        },
        computed: {
            project() {
                return this.$store.state.projects.currentProject;
            },

            readOnly() {
                return true
            }
        },
        data() {
            return {
                loading: false,
                NAME_DEFAULT_ROLE: 'Создатель проекта',
                addRoleDialog: false
            }
        },
        methods: {
            removeRole(role) {
                this.loading = true;
                this.$store.dispatch('removeProjectRole', role).then(() => {
                    this.loading = false
                })
            },

            updateRole(role) {
                this.loading = true;
                this.$store.dispatch('updateProjectRole', role).then(() => {
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>
