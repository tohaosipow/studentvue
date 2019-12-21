<template>
    <v-container>
        <v-card class="mt-5" :key="team_project.id" v-for="team_project in team_projects">
            <v-card-title>
                {{team_project.name}}
            </v-card-title>
            <v-list>
                <v-list-item>
                    <v-list-item-content>Описание:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ team_project.description }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>Цель проекта:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ team_project.objective }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>Задачи проекта:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ team_project.tasks }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>Роли команды в проекте:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ team_project.roles }}</v-list-item-content>
                </v-list-item>
            </v-list>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn target="_blank" outlined color="blue" :href="team_project.presentation_url">Презентация</v-btn>

            </v-card-actions>
        </v-card>

        <v-dialog max-width="600" v-model="createProjectDialog">
            <template v-slot:activator="{ on }">
                <v-btn absolute
                       bottom
                       color="blue"
                       dark
                       fab
                       right
                       v-on="on"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <TeamProjectCreateEditComponent @close="createProjectDialog = false"></TeamProjectCreateEditComponent>
        </v-dialog>
    </v-container>
</template>

<script>
    import TeamProjectCreateEditComponent from "@/components/Events/TeamProjectCreateEditComponent";

    export default {
        name: "EventTeamsComponent",
        components:{
            TeamProjectCreateEditComponent
        },
        props: {
            team: {}
        },
        data() {
            return {
                loading: false,
                createProjectDialog: false,
                currentTeam: null
            }
        },
        computed: {
            team_projects() {
                return this.$store.state.events.teamProjects
            }
        },
        mounted() {
            this.loading = true;
            this.$store.dispatch('getTeamProjects', {team_id: this.team.id})
        }
    }
</script>

<style scoped>

</style>