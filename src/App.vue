<template>
    <div id="app">
        <v-app light>
            <v-navigation-drawer :mini-variant.sync="mini"
                                 :value="drawer"
                                 app
                                 clipped
                                 light
            >

                <v-list-item>
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
                    <v-list-item @click="() => {}">
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
        data: () => ({
            drawer: null,
            items: [],
            items2: [],
            mini: true
        }),
        created() {

        },
    }
</script>

<style>

</style>
