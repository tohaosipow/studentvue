<template>
    <v-container fluid>
        <v-row v-if="project">
            <v-col lg="3">
                <v-row justify="center">
                <v-dialog v-model="applicationDialog" persistent max-width="500">
                    <template v-slot:activator="{ on }">
                        <v-btn :loading="application.loading" v-if="$store.state.projects.currentUserStatusInProject === undefined"  class="ma-2" color="green" dark  v-on="on">Вступить в проект</v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline">Кем бы вы хотели стать в проекте?</v-card-title>
                        <v-card-text>
                            <v-autocomplete :item-disabled="isFullRole" no-data-text="Такие нам не нужны" autocomplete="off" v-model="application.project_role_id" auto-select-first label="Роль в проекте" :items="project.roles" item-text="name" item-value="id"/>
                            <v-switch v-model="application.admin" auto-select-first label="Хочу стать администратором" color="green"/>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue" text @click="applicationDialog = false">Отменить</v-btn>
                            <v-btn  color="blue darken-2" text @click="enterToProject">Подать заявку</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                    <v-btn v-if="$store.state.projects.currentUserStatusInProject && $store.state.projects.currentUserStatusInProject.approved == 0"  class="ma-2" color="orange"  @click="$store.dispatch('declineUserOnProject', {id: project.id, user_id: $store.state.user.currentUser.id})">Отменить заявку</v-btn>
                    <v-btn color="red" dark v-if="$store.state.projects.currentUserStatusInProject && $store.state.projects.currentUserStatusInProject.approved == 1" class="ma-2"  @click="$store.dispatch('declineUserOnProject', {id: project.id, user_id: $store.state.user.currentUser.id})">Выйти из проекта</v-btn>

                </v-row>
                <v-card >
                    <v-img
                            :src="project.logotype_url"
                            class="white--text align-end"
                            height="200px"
                    >
                        <v-card-title style="z-index: 2; position:relative;">{{project.title}}</v-card-title>
                        <v-overlay :value="true" absolute z-index="1">
                        </v-overlay>

                        <LogotypeUpdateComponent :project="project"/>

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
                    <v-list class="transparent">
                        <v-subheader>Вакансии</v-subheader>
                        <v-list-item :key="role.id" v-for="role in project.roles">
                            <v-list-item-title>
                                {{role.name}}
                            </v-list-item-title>

                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>

                            <v-list-item-subtitle class="text-right">
                                {{$store.getters.getParticipantsByProjectRole(role.id).length}} /
                                {{role.quota}} чел
                            </v-list-item-subtitle>
                            <v-list-item-action>
                                <v-progress-linear :value="$store.getters.getParticipantsByProjectRole(role.id).length/role.quota*100"></v-progress-linear>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>

                </v-card>
            </v-col>
            <v-col v-if="project" lg="9">
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

    import LogotypeUpdateComponent from "@/components/Projects/ProjectsItem/LogotypeUpdateComponent";

    export default {
        name: "ProjectsItemComponent",
        computed: {
            project() {
                return this.$store.state.projects.currentProject;
            }
        },
        components:{
            LogotypeUpdateComponent
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
            },

            isFullRole(role){
                return this.$store.getters.getParticipantsByProjectRole(role.id).length >= parseInt(role.quota)
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
