<template>
    <div id="app">
        <v-app light v-if="loaded">
            <v-app-bar app color="#1976d2" dark v-if="$vuetify.breakpoint.mdAndDown">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="!drawer"></v-app-bar-nav-icon>
            </v-app-bar>

            <CompleteProfile :enable="completeDialog" @close="completeDialog = false"/>
            <v-snackbar
                    color="red"
                    v-model="snackbar_error.enable"
            >
                {{ snackbar_error.text }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                            @click="snackbar_error.enable = false"
                            color="pink"
                            text
                            v-bind="attrs"
                    >
                        Закрыть
                    </v-btn>
                </template>
            </v-snackbar>

            <v-navigation-drawer
                    app
                    color="#1976d2"
                    dark
                    disable-route-watcher
                    hide-overlay
                    style="min-height: 100vh"
                    v-model="drawer"
            >
                <div class="text-center pa-4 text-white" style="color: white">
                    <h4 style="display: flex; align-items: center">

                        АИС "Студент СурГУ"

                        <v-icon @click.stop="drawer = !drawer" right
                                style="position: absolute; right: 10px;" v-if="drawer && $vuetify.breakpoint.mdAndDown">
                            mdi-chevron-left
                        </v-icon>
                    </h4>
                </div>

                <v-list
                        class="py-0"
                        dense
                        nav
                >
                    <!--                    <Snowf-->
                    <!--                            :amount="70"-->
                    <!--                            :image="null"-->
                    <!--                            :opacity="0.5"-->
                    <!--                            :resize="true"-->
                    <!--                            :size="5"-->
                    <!--                            :speed="1.7"-->
                    <!--                            :swing="1"-->
                    <!--                            :wind="1"-->
                    <!--                            :zIndex="-3"-->
                    <!--                            color="#fff"-->
                    <!--                    />-->


                    <v-list-item
                            @click.stop="$router.push({name: 'profile', params: {id: $store.state.user.currentUser.id}})"
                            two-line v-if="$store.state.user.currentUser.id > 0">


                        <v-list-item-avatar style="overflow: visible">

                            <v-badge
                                    :content="$store.state.user.currentUser.score"
                                    color="purple"
                                    offset-x="10"
                                    offset-y="10"
                            >
                                <v-avatar size="40">
                                    <img :src="$store.state.user.currentUser.avatar"/>
                                </v-avatar>
                            </v-badge>
                        </v-list-item-avatar>


                        <v-list-item-content>

                            <v-list-item-title> {{$store.state.user.currentUser.first_name}}
                                {{$store.state.user.currentUser.last_name}}
                            </v-list-item-title>
                            <v-list-item-subtitle><span
                                    v-if="$store.state.user.currentUser.role === 'visitor'">Посетитель</span>
                                <span v-if="$store.state.user.currentUser.role === 'student'">Студент</span>
                                <span v-if="$store.state.user.currentUser.role === 'pupil'">Учащийся</span>
                                <span v-if="$store.state.user.currentUser.role === 'employee'">Сотрудник</span>
                                <span v-if="$store.state.user.currentUser.role === 'company'">Партнер</span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon @click.stop="$store.dispatch('logout'), $router.push('/auth')">mdi-logout</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item two-line v-else>

                        <v-list-item-content>
                            <v-list-item-title> Вход / регистрация
                            </v-list-item-title>
                            <v-list-item-subtitle>Войдите или зарегистрируйтесь
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon @click.stop="$store.dispatch('logout'), $router.push('/auth')">mdi-login</v-icon>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item link
                                 to="/"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Главная</v-list-item-title>
                            <v-list-item-subtitle>about this</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link
                                 to="/events"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-calendar</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Мероприятия</v-list-item-title>
                            <v-list-item-subtitle>be yourself</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link
                                 to="/projects"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-google-circles</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Студенческие проекты</v-list-item-title>
                            <v-list-item-subtitle>improve yourself</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/messages"
                                 v-if="$store.state.user.currentUser.id > 0"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-chat</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Сообщения</v-list-item-title>
                            <v-list-item-subtitle>messenger</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/ratings"
                                 v-if="$store.state.user.currentUser.id > 0"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-star</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Рейтинг</v-list-item-title>
                            <v-list-item-subtitle>betters</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-content :style="$vuetify.breakpoint.smAndDown && 'padding-top: 45px'">
                <v-container fluid>
                    <router-view @changeTitle="title = $event"></router-view>
                </v-container>
            </v-content>
            <v-footer app>
                <!-- -->
            </v-footer>

        </v-app>

    </div>
</template>

<script>


    import CompleteProfile from "@/components/Profile/CompleteProfile.vue";

    export default {
        name: 'app',
        components: {CompleteProfile},
        created() {
        },
        mounted() {
            this.drawer = this.$vuetify.breakpoint.mdAndUp;

            window.axios.interceptors.response.use(
                response => {
                    return response;
                },
                (error) => {
                    let return_error = {...error};
                    this.onError(error.response.data.message)
                    return Promise.reject(return_error)
                }
            );

            let token = localStorage.getItem('access_token');
            if (token) {
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                this.$store.dispatch('getUser').then(() => {
                    if (this.$store.state.user.currentUser.role === 'visitor' || (this.$store.state.user.currentUser.role === 'student' && !this.$store.state.user.currentUser.student_groups_id)) this.completeDialog = true;
                    this.loaded = true;
                });
                this.$store.dispatch('getDepartments');
                this.$store.dispatch('getStudentGroups');
            } else {
                this.loaded = true;
            }

            this.$root.$on('requestError', (e) => {
                this.snackbar_error.text = e;
                this.snackbar_error.enable = true;
            })
        },
        methods: {
            onError(text) {
                this.snackbar_error.enable = true;
                this.snackbar_error.text = text;
            }
        },
        data: () => ({
            drawer: true,
            items: [],
            items2: [],
            completeDialog: false,
            loaded: false,
            snackbar_error: {
                enable: false,
                text: ''
            },
            title: 'АИС "Студент СурГУ"'
        }),

        watch: {
            drawer() {
                // eslint-disable-next-line no-console
                console.log(this.$vuetify.application.left)

                // this.$store.commit('setFluid', !this.drawer)
            }
        }
    }
</script>

<style>

</style>
