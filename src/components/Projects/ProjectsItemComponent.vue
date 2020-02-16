<template>
    <v-container fluid>
        <v-row>
            <v-col lg="3">
                <v-card>
                    <v-img
                            :src="project.logotype_url"
                            class="white--text align-end"
                            height="200px"
                    >
                        <v-card-title style="z-index: 2; position:relative;">{{project.title}}</v-card-title>
                        <v-overlay :value="true" absolute z-index="1">
                        </v-overlay>
                        <v-dialog v-model="applicationDialog" persistent max-width="500">
                            <template v-slot:activator="{ on }">
                                <v-btn :loading="application.loading" v-if="$store.state.projects.currentUserStatusInProject === undefined" style="z-index: 2; position:relative;" class="ma-2"  x-small v-on="on" outlined color="white">Вступить в проект</v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="headline">Кем бы вы хотели стать в проекте?</v-card-title>
                                <v-card-text>
                                    <v-autocomplete no-data-text="Такие нам не нужны" autocomplete="off" v-model="application.project_role_id" auto-select-first label="Роль в проекте" :items="project.roles" item-text="name" item-value="id"/>
                                    <v-switch v-model="application.admin" auto-select-first label="Хочу возглавить проект" color="green"/>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue" text @click="applicationDialog = false">Отменить</v-btn>
                                    <v-btn  color="blue darken-2" text @click="enterToProject">Подать заявку</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-btn v-if="$store.state.projects.currentUserStatusInProject && $store.state.projects.currentUserStatusInProject.approved == 0" style="z-index: 2; position:relative;" class="ma-2"  x-small @click="$store.dispatch('declineUserOnProject', {id: project.id, user_id: $store.state.user.currentUser.id})" outlined color="white">Отменить заявку</v-btn>
                        <v-btn v-if="$store.state.projects.currentUserStatusInProject && $store.state.projects.currentUserStatusInProject.approved == 1" style="z-index: 2; position:relative;" class="ma-2"  x-small @click="$store.dispatch('declineUserOnProject', {id: project.id, user_id: $store.state.user.currentUser.id})"  outlined color="white">Выйти из проекта</v-btn>

                    </v-img>
                    <v-card-subtitle>{{project.type.name}} проект</v-card-subtitle>
                    <v-card-text>
                        <div> {{project.task}}</div>
                    </v-card-text>
                    <v-divider/>
                    <v-overlay :value="true" absolute v-if="project.approved == 0" z-index="1">
                        <v-alert>
                            На модерации
                        </v-alert>
                    </v-overlay>

                    <v-list-item color="blue">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="project.responsible_user.name+' '"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col lg="9">
                <v-card class="mb-2" elevation="0">
                    <v-tabs
                            background-color="white"
                            color="blue"
                            right
                    >
                        <v-tab :to="{name: 'project.info'}">Информация</v-tab>
                        <v-tab v-if="$store.state.user.currentUser.admin == 1 || $store.getters.canEditProject" :to="{name: 'project.roles'}">Роли в проекте</v-tab>
                        <v-tab :to="{name: 'project.participants'}">Участники</v-tab>
                    </v-tabs>
                </v-card>
                <router-view/>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: "ProjectsItemComponent",
        computed: {
            project() {
                return this.$store.state.projects.currentProject;
            }
        },
        data(){
            return{
                applicationDialog: false,
                application:{
                    project_role_id: null,
                    admin: false,
                    loading: false
                }
            }
        },
        methods: {
            enterToProject(){
                this.application.loading = true
                this.$store.dispatch('enterToProject', {id: this.project.id, ...this.application}).then(() => {
                    this.application.loading = false
                    this.applicationDialog = false
                })
            }
        },
        mounted() {
            if(!this.$store.state.user.currentUser.id) return this.$router.push('/auth')
            Promise.all([
                this.$store.dispatch('getEmployees'),
                this.$store.dispatch('getProjectTypes'),
                this.$store.dispatch('getProjects'),
                this.$store.dispatch('getCurrentUserStatusInProject', {id: this.$route.params.project_id}),
                this.$store.dispatch('getProjectParticipants', {id: this.$route.params.project_id}),
                this.$store.dispatch('getCurrentProject', {id: this.$route.params.project_id})]).then(() => {
                this.loading = false;
                this.$emit('changeTitle', this.$store.state.projects.currentProject.title)
            })
        }
    }
</script>

<style scoped>

</style>