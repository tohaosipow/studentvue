<template>
    <v-container fluid>
        <div v-if="project">
                <v-breadcrumbs :items="[{
          text: 'Главная',
          disabled: true,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Проекты',
          disabled: false,
          href: '/#/projects',
        },
        {
          text: this.project.title,
          disabled: true,
          href: 'breadcrumbs_link_2',
        }]"></v-breadcrumbs>

        </div>
        <v-row v-if="project">
            <v-col lg="4">
                <v-card>
                    <div style=" background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  font-family: sans-serif;
  text-align: center;
  line-height: 1;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
align-items: center;
justify-content: center;
 position: absolute; width: 100%; height: 100%; z-index: 2"
                         v-if="$store.state.projects.currentProject.project_archive_reasons_id > 0">
                        <img style="height: 32px"
                             src="https://www.flaticon.com/svg/vstatic/svg/3160/3160299.svg?token=exp=1611422332~hmac=1ac9fd51096de924f09163f145aa3eba"
                             alt="">
                        <div class="pa-4">
                            Проект в архиве
                        </div>

                    </div>
                    <v-img
                            :style="$store.state.projects.currentProject.project_archive_reasons_id > 0?'filter: grayscale(100%)':''"
                            :src="project.logotype_url"
                            class="white--text align-end"
                            height="200px"
                    >
                        <v-card-title style="z-index: 2; position:relative;  word-break: break-word;">
                            {{project.title}}
                        </v-card-title>
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
                                <v-progress-linear
                                        :value="$store.getters.getParticipantsByProjectRole(role.id).length/role.quota*100"></v-progress-linear>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>

                </v-card>
                <v-card>

                       <v-list>
                           <v-subheader>Действия с проектом</v-subheader>
                           <v-list-item-group color="primary">
                               <v-list-item  v-if="$store.state.projects.currentUserStatusInProject && $store.state.projects.currentUserStatusInProject.approved == 1"  @click="$store.dispatch('declineUserOnProject', {id: project.id, user_id: $store.state.user.currentUser.id})">
                                   <v-list-item-content>
                                       <v-list-item-title>Выйти из проекта</v-list-item-title>
                                   </v-list-item-content>
                                   <v-list-item-icon>
                                       <v-icon color="red">mdi-exit-to-app</v-icon>
                                   </v-list-item-icon>
                               </v-list-item>

                               <v-dialog max-width="500" persistent v-model="applicationDialog">
                                   <template v-slot:activator="{ on }">
                                       <v-list-item v-if="$store.state.projects.currentUserStatusInProject === undefined" v-on="on">
                                           <v-list-item-content>
                                               <v-list-item-title>Вступить в проект</v-list-item-title>
                                           </v-list-item-content>
                                           <v-list-item-icon>
                                               <v-icon color="green">mdi-login-variant</v-icon>
                                           </v-list-item-icon>
                                       </v-list-item>
                                   </template>
                                   <v-card>
                                       <v-card-title class="headline">Кем бы вы хотели стать в проекте?</v-card-title>
                                       <v-card-text>
                                           <v-autocomplete :item-disabled="isFullRole" :items="project.roles"
                                                           auto-select-first autocomplete="off"
                                                           item-text="name" item-value="id" label="Роль в проекте"
                                                           no-data-text="Такие нам не нужны" v-model="application.project_role_id"/>
                                           <v-switch auto-select-first color="green"
                                                     label="Хочу стать администратором" v-model="application.admin"/>
                                       </v-card-text>
                                       <v-card-actions>
                                           <v-spacer></v-spacer>
                                           <v-btn @click="applicationDialog = false" color="blue" text>Отменить</v-btn>
                                           <v-btn @click="enterToProject" color="blue darken-2" text>Подать заявку</v-btn>
                                       </v-card-actions>
                                   </v-card>
                               </v-dialog>

                               <v-list-item  v-if="$store.state.projects.currentUserStatusInProject && $store.state.projects.currentUserStatusInProject.approved == 0"  @click="$store.dispatch('declineUserOnProject', {id: project.id, user_id: $store.state.user.currentUser.id})" >
                                   <v-list-item-content>
                                       <v-list-item-title>Отменить заявку</v-list-item-title>
                                   </v-list-item-content>
                                   <v-list-item-icon>
                                       <v-icon>mdi-exit-to-app</v-icon>
                                   </v-list-item-icon>
                               </v-list-item>

                               <v-subheader>Администрирование</v-subheader>

                               <v-list-item @click="approve(project)" v-if="$store.state.user.currentUser.admin == 1 && $store.state.projects.currentProject.approved == 0">
                                   <v-list-item-content>
                                       <v-list-item-title>Одобрить проект</v-list-item-title>
                                   </v-list-item-content>
                                   <v-list-item-icon>
                                       <v-icon color="green">mdi-exit-to-app</v-icon>
                                   </v-list-item-icon>
                               </v-list-item>


                               <v-list-item @click="remove(project)" v-if="$store.state.user.currentUser.admin == 1">
                                   <v-list-item-content>
                                       <v-list-item-title>Удалить</v-list-item-title>
                                   </v-list-item-content>
                                   <v-list-item-icon>
                                       <v-icon color="red">mdi-delete</v-icon>
                                   </v-list-item-icon>
                               </v-list-item>


                               <v-dialog
                                       v-if="$store.state.projects.currentProject.project_archive_reasons_id  === null"
                                       max-width="500" persistent v-model="archiveDialog">
                                   <template v-slot:activator="{ on }">
                                       <v-list-item
                                               :disabled="$store.state.projects.currentProject.project_archive_reasons_id > 0"
                                               v-on="on" v-if="$store.state.user.currentUser.admin == 1">
                                           <v-list-item-content>
                                               <v-list-item-title>В архив</v-list-item-title>
                                           </v-list-item-content>
                                           <v-list-item-icon>
                                               <v-icon color="grey">mdi-archive</v-icon>
                                           </v-list-item-icon>
                                       </v-list-item>
                                   </template>
                                   <v-card>
                                       <v-card-title class="headline">Почему вы хотите его архивировать?</v-card-title>
                                       <v-card-text>
                                           <v-autocomplete :items="$store.state.projects.archiveReasons"
                                                           auto-select-first autocomplete="off"

                                                           v-model="project_archive_reasons_id"
                                                           item-text="reason" item-value="id" label="Причина отклонения"
                                                           no-data-text="Такой причины нет"/>
                                       </v-card-text>
                                       <v-card-actions>
                                           <v-spacer></v-spacer>
                                           <v-btn @click="archiveDialog = false" color="blue" text>Отменить</v-btn>
                                           <v-btn :loading="loading" @click="archive" color="blue darken-2" text>
                                               Архивировать
                                           </v-btn>
                                       </v-card-actions>
                                   </v-card>
                               </v-dialog>

                           </v-list-item-group>

                       </v-list>



                </v-card>

            </v-col>
            <v-col lg="8" v-if="project">
                <v-card class="mb-2" elevation="0">
                    <v-tabs
                            background-color="white"
                            color="blue"
                    >
                        <v-tab :to="{name: 'project.info'}">Информация</v-tab>
                        <v-tab :to="{name: 'project.roles'}"
                               v-if="$store.state.user.currentUser.admin == 1 || $store.getters.canEditProject">Роли в проекте
                        </v-tab>
                        <v-tab :to="{name: 'project.participants'}">Участники</v-tab>
                        <v-tab :to="{name: 'project.files'}">Файлы</v-tab>
                        <v-tab :to="{name: 'project.trello'}">Доска задач</v-tab>
                        <v-tab v-if="$store.getters.canWriteToChat" :to="{name: 'project.chat'}">Чат</v-tab>
                    </v-tabs>
                </v-card>
                <router-view/>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col lg="12">
                <v-skeleton-loader
                        class="mx-auto mt-2"
                        type="heading"
                ></v-skeleton-loader>
            </v-col>

            <v-col lg="4">
                <v-skeleton-loader
                        class="mx-auto mt-2"
                        type="image, article, list-item, list-item, list-item,list-item"
                ></v-skeleton-loader>
            </v-col>

            <v-col lg="8">
                <v-skeleton-loader
                        class="mx-auto mt-2"
                        type="table-row"
                ></v-skeleton-loader>
                <v-skeleton-loader
                        class="mx-auto mt-2"
                        type="table-tbody"
                ></v-skeleton-loader>
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
        components: {
            LogotypeUpdateComponent
        },
        data() {
            return {
                loading: false,
                applicationDialog: false,
                archiveDialog: false,
                project_archive_reasons_id: null,
                application: {
                    project_role_id: null,
                    admin: false,
                    loading: false
                }
            }
        },
        methods: {
            enterToProject() {
                this.application.loading = true
                this.$store.dispatch('enterToProject', {id: this.project.id, ...this.application}).then(() => {
                    this.application.loading = false
                    this.applicationDialog = false
                })
            },

            isFullRole(role) {
                return this.$store.getters.getParticipantsByProjectRole(role.id).length >= parseInt(role.quota)
            },

            archive() {
                this.loading = true;
                this.$store.dispatch('archiveProject', {
                    id: this.$store.state.projects.currentProject.id,
                    project_archive_reasons_id: this.project_archive_reasons_id
                }).then(() => {
                    this.$store.dispatch('getCurrentProject', {id: this.$route.params.project_id}).then(() => {
                        this.archiveDialog = false;
                        this.loading = false;
                    });

                });
            },

            approve(project) {
                this.loading = true;
                if (confirm('Вы действительно хотите одобрить?')) {
                    this.$store.dispatch('approveProject', {id: project.id}).then(() => {
                        this.$store.dispatch('getProjects');
                        this.loading = false;
                        this.$store.dispatch('getProjectsByUser', {user_id: this.$store.state.user.currentUser.id})
                    })
                }
            },
            remove(project) {
                if (confirm('Вы действительно хотите удалить проект?')) {
                    this.loading = true;
                    this.$store.dispatch('removeProject', {id: project.id}).then(() => {
                        this.loading = false;
                        this.$store.dispatch('getProjects');
                        this.$store.dispatch('getProjectsByUser', {user_id: this.$store.state.user.currentUser.id})
                        this.$router.push('/projects/')
                    })

                }
            },
        },
        mounted() {
            if (!this.$store.state.user.currentUser.id) return this.$router.push('/auth')
            Promise.all([
                this.$store.dispatch('getEmployees'),
                this.$store.dispatch('getArchiveReasons'),
                this.$store.dispatch('getProjectTypes'),
                this.$store.dispatch('getProjects'),
                this.$store.dispatch('getCurrentUserStatusInProject', {id: this.$route.params.project_id}),
                this.$store.dispatch('getProjectParticipants', {id: this.$route.params.project_id}),
                this.$store.dispatch('getCurrentProject', {id: this.$route.params.project_id})]).then(() => {
                this.loading = false;
                // this.$emit('changeTitle', this.$store.state.projects.currentProject.title)
            })
        }
    }
</script>

<style scoped>

</style>
