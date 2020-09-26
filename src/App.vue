<template>
    <div id="app">
        <v-app light v-if="loaded">
            <v-app-bar v-if="$vuetify.breakpoint.mdAndDown" dark  color="#1976d2" app>
                <v-app-bar-nav-icon v-if="!drawer" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </v-app-bar>

            <v-navigation-drawer
                    app
                    color="#1976d2"
                    disable-route-watcher
                    dark
                    style="min-height: 100vh"
                    hide-overlay
                    v-model="drawer"
            >
                <div class="text-center pa-4 text-white" style="color: white">
                    <h4>АИС "Абитуриент"    <v-icon right style="position: absolute; right: 10px;" v-if="drawer && $vuetify.breakpoint.mdAndDown" @click.stop="drawer = !drawer">mdi-chevron-left</v-icon> </h4>
                </div>

                <v-list
                        class="py-0"
                        dense
                        nav
                >
                    <v-list-item v-if="$store.state.user.currentUser.id > 0" two-line>
                        <v-list-item-avatar>
                            <img src="https://randomuser.me/api/portraits/men/81.jpg">
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
                            <v-icon  @click.stop="$store.dispatch('logout'), $router.push('/auth')">mdi-logout</v-icon>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item to="/"
                            link
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-calendar</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Мероприятия</v-list-item-title>
                            <v-list-item-subtitle>be yourself</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/projects"
                            link
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-google-circles</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Студенческие проекты</v-list-item-title>
                            <v-list-item-subtitle>improve yourself</v-list-item-subtitle>
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
            <!-- <v-navigation-drawer color="blue darken-4"
                                  v-model="drawer"
                                  app
                                  dark
             >

                 <v-list-item @click="$router.push('/profile/'+$store.state.user.currentUser.id+'/edit')"  v-if="$store.state.user.currentUser.id > 0">
                     <v-list-item-avatar>
                         <v-img :src="$store.state.user.currentUser.avatar"></v-img>
                     </v-list-item-avatar>

                     <v-list-item-content>
                         <v-list-item-title class="title">
                             {{$store.state.user.currentUser.first_name}} {{$store.state.user.currentUser.last_name}}
                         </v-list-item-title>
                         <v-list-item-subtitle>
                             <span v-if="$store.state.user.currentUser.role === 'visitor'">Посетитель</span>
                             <span v-if="$store.state.user.currentUser.role === 'student'">Студент</span>
                             <span v-if="$store.state.user.currentUser.role === 'pupil'">Учащийся</span>
                             <span v-if="$store.state.user.currentUser.role === 'employee'">Сотрудник</span>
                             <span v-if="$store.state.user.currentUser.role === 'company'">Партнер</span>
                         </v-list-item-subtitle>
                     </v-list-item-content>


                 </v-list-item>

                 <v-divider></v-divider>

                 <v-list nav>
                     <v-subheader>Мероприятия</v-subheader>
                     <v-list-item to="/" @click="() => {}">
                         <v-list-item-icon>
                             <v-icon>mdi-calendar-multiple</v-icon>
                         </v-list-item-icon>

                         <v-list-item-content>
                             <v-list-item-title>Все мероприятия</v-list-item-title>
                         </v-list-item-content>

                     </v-list-item>
                     <v-list-item to="/events/my" v-if="$store.state.user.currentUser.id > 0">
                         <v-list-item-icon>
                             <v-icon>mdi-account</v-icon>
                         </v-list-item-icon>

                         <v-list-item-content>
                             <v-list-item-title>Мои мероприятия</v-list-item-title>
                         </v-list-item-content>

                     </v-list-item>
                     <v-subheader>Учебная часть</v-subheader>
                     <v-list-item to="/timetable">
                         <v-list-item-icon>
                             <v-icon>mdi-account-network</v-icon>
                         </v-list-item-icon>

                         <v-list-item-content>
                             <v-list-item-title>Все пары</v-list-item-title>
                         </v-list-item-content>


                     </v-list-item>
                     <v-list-item to="/timetable/my" v-if="$store.state.user.currentUser.id > 0">
                         <v-list-item-icon>
                             <v-icon>mdi-account</v-icon>
                         </v-list-item-icon>

                         <v-list-item-content>
                             <v-list-item-title>Мои пары</v-list-item-title>
                         </v-list-item-content>


                     </v-list-item>
                     <v-subheader>Проектная деятельность</v-subheader>
                     <v-list-item to="/projects">
                         <v-list-item-icon>
                             <v-icon>mdi-account-network</v-icon>
                         </v-list-item-icon>

                         <v-list-item-content>
                             <v-list-item-title>Проекты</v-list-item-title>
                         </v-list-item-content>


                     </v-list-item>
                     <template v-if="$store.state.user.currentUser.admin === 1">
                         <v-subheader>Администратор</v-subheader>
                         <v-list-item to="/admin/users">
                             <v-list-item-icon>
                                 <v-icon>mdi-account-group</v-icon>
                             </v-list-item-icon>

                             <v-list-item-content>
                                 <v-list-item-title>Пользователи</v-list-item-title>
                             </v-list-item-content>

                         </v-list-item>
                         <v-list-item @click="() => {}">
                             <v-list-item-icon>
                                 <v-icon>mdi-settings</v-icon>
                             </v-list-item-icon>

                             <v-list-item-content>
                                 <v-list-item-title>Настройки</v-list-item-title>
                             </v-list-item-content>

                         </v-list-item>
                     </template>
                 </v-list>

             </v-navigation-drawer> !-->

            <!--<v-app-bar elevate-on-scroll app color="blue" dark
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer">
                    <v-icon v-if="drawer">
                        mdi-close
                    </v-icon>
                    <v-icon v-else>
                        mdi-menu
                    </v-icon>
                </v-app-bar-nav-icon>
                <v-toolbar-title>
                    <span class="title">{{title}}</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn v-if="$store.state.user.currentUser.id > 0" @click="$store.dispatch('logout'); $router.push('/auth')" text>Выйти</v-btn>
                    <template v-else>
                        <v-btn to="/auth" text>Вход / Регистрация</v-btn>
                    </template>
                </v-toolbar-items>

            </v-app-bar> !-->

        </v-app>

    </div>
</template>

<script>


    export default {
        name: 'app',
        components: {},
        created() {
        },
        mounted() {
            this.drawer = this.$vuetify.breakpoint.mdAndUp;

            let token = localStorage.getItem('access_token');
            if (token) {
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                this.$store.dispatch('getUser').then(() => {
                    this.loaded = true;
                });
                this.$store.dispatch('getDepartments');
                this.$store.dispatch('getStudentGroups');
            } else {
                this.loaded = true;
            }
        },
        data: () => ({
            drawer: true,
            items: [],
            items2: [],
            loaded: false,
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
