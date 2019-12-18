<template>
    <div id="app">
        <v-app v-if="loaded" light>
            <v-navigation-drawer :mini-variant.sync="mini"
                                 :value="drawer"
                                 app
                                 clipped
                                 light
            >

                <v-list-item v-if="$store.state.user.currentUser.id > 0">
                    <v-list-item-avatar>
                        <v-img :src="$store.state.user.currentUser.avatar"></v-img>
                    </v-list-item-avatar>


                    <v-list-item-title>{{$store.state.user.currentUser.name}}</v-list-item-title>


                    <v-btn
                            @click.stop="mini = !mini"
                            icon
                    >
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                </v-list-item>

                <v-divider></v-divider>

                <v-list>
                    <v-subheader v-if="!mini">Мероприятия</v-subheader>
                    <v-list-item :to="{name: 'events'}" @click="() => {}">
                        <v-list-item-icon>
                            <v-icon>mdi-calendar-multiple</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Все мероприятия</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                    <v-list-item :to="{name: 'user.events'}" v-if="$store.state.user.currentUser.id > 0">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Мои мероприятия</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                    <template v-if="$store.state.user.currentUser.admin === 1">
                        <v-subheader v-if="!mini">Администратор</v-subheader>
                        <v-list-item @click="() => {}">
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

            </v-navigation-drawer>

            <v-app-bar app
                       clipped-left
                       dense
                       height="64"
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
                <v-toolbar-title class="mr-12 align-center">
                    <span class="title">АИС "Студент СурГУ"</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn v-if="$store.state.user.currentUser.id > 0" @click="$store.dispatch('logout'); $router.push('/auth')" text>Выйти</v-btn>
                    <template v-else>
                        <v-btn to="/auth" text>Вход / Регистрация</v-btn>
                    </template>
                </v-toolbar-items>

            </v-app-bar>
            <div style="margin-top: 64px;">
                <router-view></router-view>
            </div>
        </v-app>

    </div>
</template>

<script>


    export default {
        name: 'app',
        components: {},
        mounted(){
            let token = localStorage.getItem('access_token');
            if(token){
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                this.$store.dispatch('getUser').then(() => {
                   this.loaded = true;
                });
            }
        },
        data: () => ({
            drawer: null,
            items: [],
            items2: [],
            mini: true,
            loaded: false
        }),
        created() {

        },
    }
</script>

<style>

</style>
