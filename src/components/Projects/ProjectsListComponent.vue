<template>
    <v-container>
        <v-tooltip :value="true" left>
            <template v-slot:activator="{ on }">
                <v-btn
                        bottom
                        color="blue darken-2"
                        dark
                        fab
                        fixed
                        right
                        to="/projects/create"
                        v-on="on"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <span>Создайте проект</span>
        </v-tooltip>
        <h1 class="heading">Проекты</h1>
        <p>Студенческие проекты являются неотъемлимой частью студенческой жизни</p>
        <v-tabs
                background-color="white"
                color="blue darken-2 accent-4"
                right
                v-model="my"
        >
            <v-tab>Все проекты</v-tab>
            <v-tab v-if="$store.state.user.currentUser.id > 0">Мои проекты</v-tab>
        </v-tabs>
        <v-row v-if="loading">
            <v-col :key="i" cols="12" lg="6" v-for="i in 8">
                <v-skeleton-loader
                        class="mx-auto mt-2"
                        type="image, article, list-item-avatar-three-line"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row v-else>

            <v-col :key="project.id" cols="12" lg="6" v-for="project in projects">
                <v-card :to="'/projects/'+project.id"
                        class="mx-auto"
                        outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4">{{project.type.name}} проект</div>
                            <v-list-item-title class="headline mb-1" style="white-space: normal">{{project.title}}</v-list-item-title>
                            <v-list-item-subtitle>{{project.task}}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                                color="grey"
                                size="150"
                                tile
                        >
                            <v-img
                                    :src="project.logotype_url"
                                    dark
                            ></v-img>
                        </v-list-item-avatar>
                    </v-list-item>

                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4">Вакансии</div>
                            <v-chip-group>
                                <v-menu :key="role.id" bottom
                                        origin="top left"
                                        right
                                        transition="scale-transition"
                                        v-for="role in project.roles"
                                >
                                    <template v-slot:activator="{ on }">

                                        <v-chip v-on="on"
                                                class="ma-2"
                                                text-color="white"
                                                style="padding-left: 40px;"
                                        >

                                            <v-progress-circular color="green" style="position: absolute; left: 0" :value="parseInt(role.users.length/role.quota*100)"></v-progress-circular>
                                            <v-avatar
                                                    left
                                                    style="position: absolute; z-index: 2; left: 10px"
                                                    color="#eaeaea"
                                                    class="text-white darken-4"
                                            >
                                            {{role.quota}}
                                            </v-avatar>
                                            {{role.name}}
                                        </v-chip>
                                    </template>
                                    <v-card width="300">
                                        <v-list>
                                            <v-list-item-content>
                                                <v-list-item-title>{{role.name}}</v-list-item-title>
                                                <v-list-item-subtitle>{{role.quota}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list>
                                    </v-card>
                                </v-menu>
                            </v-chip-group>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item-content>

                    </v-list-item-content>


                    <v-card-actions v-if="project.approved == 0">
                        <v-btn small @click.prevent.stop="approve(project)"  v-if="$store.state.user.currentUser.admin == 1 && project.approved == 0" class="ma-2" tile outlined color="success">
                            <v-icon left>mdi-check</v-icon> Одобрить
                        </v-btn>
                        <v-btn small @click.prevent.stop="remove(project)" v-if="$store.state.user.currentUser.admin == 1 || project.responsible_user_id == $store.state.user.currentUser.id" class="ma-2" tile outlined color="error">
                            <v-icon left>mdi-delete</v-icon> Удалить
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <!--
                <v-card :loading="loading" :to="'/projects/'+project.id" outlined>
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
                !-->
            </v-col>

        </v-row>

        <v-row align-content="center" v-if="projects.length === 0">
            <v-col>
                <v-card>
                    <v-alert prominent
                             text
                             type="info"
                             v-if="my === 1"
                    >
                        <v-row align="center">
                            <v-col class="grow">Проектов нет. Самое время их создать или вступить в чужой.</v-col>
                            <v-col class="shrink">
                                <v-btn color="green" to="/projects/create">Создать свой</v-btn>
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
                return this.my === 1 ? this.$store.state.projects.userProjects : this.$store.state.projects.projects.filter((project) => {
                    return parseInt(project.approved) === 0 && parseInt(this.$store.state.user.currentUser.admin) === 1 || parseInt(project.approved) === 1
                });
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
            if (this.$store.state.user.currentUser.id > 0) {
                Promise.all([
                    this.$store.dispatch('getEmployees'),
                    this.$store.dispatch('getProjectsByUser', {user_id: this.$store.state.user.currentUser.id}),
                    this.$store.dispatch('getProjects')]).then(() => {
                    this.loading = false;
                })
            } else {
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
