<template>
    <v-container :fluid="$store.state.user.fluid">
        <v-tooltip left :value="true">
            <template v-slot:activator="{ on }">
                <v-btn
                        color="blue darken-2"
                        dark
                        to="/projects/create"
                        v-on="on"
                        fab
                        fixed
                        right
                        bottom
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <span>Создайте проект</span>
        </v-tooltip>
        <v-tabs
                v-model="my"
                background-color="white"
                color="blue darken-2 accent-4"
                right
        >
            <v-tab>Все проекты</v-tab>
            <v-tab v-if="$store.state.user.currentUser.id > 0">Мои проекты</v-tab>
        </v-tabs>
        <v-row v-if="loading">
            <v-col :key="i" lg="3" v-for="i in 8">
                <v-skeleton-loader
                        class="mx-auto mt-2"
                        max-width="300"
                        type="image, article, list-item-avatar-three-line"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col :key="project.id" cols="12" lg="3" v-for="project in projects">
                <v-card :loading="loading" :to="'/projects/'+project.id">
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn @click.prevent.stop="remove(project)"
                               color="red"
                               icon
                               v-if="$store.state.user.currentUser.admin == 1 || project.responsible_user_id == $store.state.user.currentUser.id">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn @click.prevent.stop="approve(project)" color="green" icon
                               v-if="$store.state.user.currentUser.admin == 1 && project.approved == 0">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <div style="position: relative">
                        <v-img
                                :src="project.logotype_url"
                                class="white--text align-end"
                                height="200px"
                        >
                            <v-card-title style="z-index: 2; position:relative;">{{project.title}}</v-card-title>
                            <v-overlay :value="true" absolute z-index="1">
                            </v-overlay>

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
                                    {{role.quota}} чел
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                        <v-divider/>
                        <v-list-item color="blue">
                            <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="project.responsible_user.name+' '"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row align-content="center" v-if="projects.length === 0">
            <v-col>
                <v-card>
                    <v-alert v-if="my === 1"
                            prominent
                             text
                            type="info"
                    >
                        <v-row align="center">
                            <v-col class="grow">Проектов нет. Самое время их создать или вступить в чужой.</v-col>
                            <v-col class="shrink">
                                <v-btn  to="/projects/create"  color="green">Создать свой</v-btn>
                            </v-col>
                            <v-col class="shrink">
                                <v-btn @click="my = 0" color="blue">Смотреть все</v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "ProjectsListComponent",
        data() {
            return {
                loading: true,
                my: 1,
                userProject: []
            }
        },
        computed: {
            projects() {
                return this.my === 1?this.$store.state.projects.userProjects:this.$store.state.projects.projects.filter((project) => {return parseInt(project.approved) === 0 && parseInt(this.$store.state.user.currentUser.admin) === 1 || parseInt(project.approved) === 1});
            }
        },
        methods: {
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
                    })

                }
            }
        },
        mounted() {
            this.$emit('changeTitle', 'Проекты')
            // eslint-disable-next-line no-console
            console.log(this.$store.state.user.currentUser.id);
            if(this.$store.state.user.currentUser.id > 0) {
                Promise.all([
                    this.$store.dispatch('getEmployees'),
                    this.$store.dispatch('getProjectsByUser', {user_id: this.$store.state.user.currentUser.id}),
                    this.$store.dispatch('getProjects')]).then(() => {
                    this.loading = false;
                })
            }
            else{
                this.my = 0;
                Promise.all([
                    this.$store.dispatch('getEmployees'),
                    this.$store.dispatch('getProjects')]).then(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>
