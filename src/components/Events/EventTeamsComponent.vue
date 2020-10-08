<template>
    <v-card>
        <v-skeleton-loader
                type="list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line"
                v-if="loading"
        >

        </v-skeleton-loader>
        <div v-if="!loading">
            <!-- <v-data-table no-data-text="Команд нет. Но можно создать."
                     :headers="headers"
                     :items="this.$store.getters.getTeamsSortByPoints"
                     :items-per-page="5"
                     class="elevation-1"
             >
                 <template v-slot:item.logo="{ item }">
                     <v-list-item-avatar>
                         <v-img :src="item.logo"></v-img>
                     </v-list-item-avatar>
                 </template>
                 <template v-slot:item.settings="{ item }">
                     <v-list-item-action
                             v-if="item.user_id === $store.state.user.currentUser.id || $store.state.user.currentUser.admin === 1">
                         <v-btn icon>
                             <v-icon @click.prevent.stop.prevent.stop="currentTeam = item, controlTeamDialog = true"
                                     color="blue darken-2">mdi-settings
                             </v-icon>
                         </v-btn>

                     </v-list-item-action>
                 </template>
                 <template v-slot:item.delete="{ item }">
                     <v-btn icon
                            v-if="item.user_id === $store.state.user.currentUser.id || $store.state.user.currentUser.admin === 1">
                         <v-icon @click.prevent.stop.prevent.stop="deleteTeam(item.id)"
                                 color="red darken-2">mdi-delete
                         </v-icon>
                     </v-btn>
                 </template>
                 <template v-slot:item.participate="{ item }">
                     <v-btn @click.prevent.stop="() => {}"
                            class="ma-2"
                            color="success"
                            outlined rounded tile
                            v-if="item.members.map((el) => {return parseInt(el.pivot.approved) === 1?el.id:-1}).includes($store.state.user.currentUser.id)">
                         <v-icon left>mdi-check</v-icon>
                         Вы участник
                     </v-btn>
                     <v-btn class="ma-2"
                            color="warning"
                            outlined rounded tile
                            v-else-if="item.members.map((el) => {return el.id}).includes($store.state.user.currentUser.id)">
                         <v-icon left>mdi-update</v-icon>
                         Подана заявка
                     </v-btn>
                     <v-btn @click.prevent.stop="join(item.id)" class="ma-2" color="blue"
                            outlined rounded tile v-else-if="$store.state.events.userTeam.length === 0">
                         Подать заявку
                     </v-btn>
                 </template>

                 <template v-slot:item.points="{item, index }">
                     <div
                             v-if="parseInt($store.state.events.currentEvent.show_points_to_participants) === 1 || $store.getters.checkCanSetPoints($store.state.user.currentUser.id)">
                         <span class="white--text">{{item.points}}</span>
                     </div>
                 </template>


             </v-data-table> !-->

            <v-card :elevation="0" outlined :key="team.id"
                    three-line
                    v-for="(team, index) in this.$store.getters.getTeamsSortByPoints">

                <v-sheet class="pa-1">
                    <v-row align="center" justify="space-between">
                        <v-col lg="2" md="2" sm="3" col="12">
                            <v-img :src="team.logo" width="100%"></v-img>
                        </v-col>
                        <v-col cols="12" col="12" lg="3">
                            <v-card-title  style="z-index: 2; position:relative;  word-break: break-word;">
                                {{team.name}}
                            </v-card-title>
                            <v-card-subtitle  style="z-index: 2; position:relative;  word-break: break-word;">
                                {{team.name}}
                            </v-card-subtitle>
                            <v-card-actions>
                                <div v-if="$store.state.user.currentUser.id > 0 &&  !$store.getters.isEventPast()">
                                    <template v-if="$store.state.events.userStatus.id === undefined">
                                        Необходимо "Подать заявку" на мероприятие
                                    </template>
                                    <template v-else>
                                        <v-btn @click.prevent.stop="() => {}"
                                               class="ma-2"
                                               color="success"
                                               outlined rounded tile
                                               v-if="team.members.map((el) => {return parseInt(el.pivot.approved) === 1?el.id:-1}).includes($store.state.user.currentUser.id)">
                                            <v-icon left>mdi-check</v-icon>
                                            Вы участник
                                        </v-btn>
                                        <v-btn class="ma-2"
                                               color="warning"
                                               outlined rounded tile
                                               v-else-if="team.members.map((el) => {return el.id}).includes($store.state.user.currentUser.id)">
                                            <v-icon left>mdi-update</v-icon>
                                            Подана заявка
                                        </v-btn>
                                        <v-btn @click.prevent.stop="join(team.id)" class="ma-2" color="blue"
                                               outlined rounded tile
                                               v-else-if="$store.state.events.userTeam.length === 0">
                                            Подать заявку
                                        </v-btn>
                                    </template>
                                </div>
                            </v-card-actions>
                        </v-col>
                        <v-col lg="6" cols="12" col="8">
                            <v-row class="pa-2" justify="space-between" align="center">
                                <v-col lg="5" sm="5">
                                    <v-btn @click.prevent.stop.prevent.stop="currentTeam = team, controlTeamDialog = true" color="blue" outlined
                                           v-if="team.user_id === $store.state.user.currentUser.id || $store.state.user.currentUser.admin === 1">
                                        <v-icon
                                                color="blue darken-2"
                                                left>mdi-settings
                                        </v-icon>
                                        Настройки
                                    </v-btn>
                                </v-col>
                                <v-col lg="5" sm="5">
                                    <v-btn @click.prevent.stop.prevent.stop="deleteTeam(team.id)" color="red" outlined
                                           v-if="team.user_id === $store.state.user.currentUser.id || $store.state.user.currentUser.admin === 1">
                                        <v-icon
                                                color="red darken-2">mdi-delete
                                        </v-icon>
                                        Удалить
                                    </v-btn>
                                </v-col>
                                <v-col style="display: flex; justify-content: flex-end" lg="2" sm="2">
                                    <template v-if="parseInt($store.state.events.currentEvent.show_points_to_participants) === 1 || $store.getters.checkCanSetPoints($store.state.user.currentUser.id)">
                                        <v-list-item-avatar color="#ffd700" size="36" v-if="index === 0">
                                            <span class="white--text">{{team.points}}</span>
                                        </v-list-item-avatar>
                                        <v-list-item-avatar color="#c0c0c0" size="36" v-else-if="index === 1">
                                            <span class="white--text">{{team.points}}</span>
                                        </v-list-item-avatar>
                                        <v-list-item-avatar color="#cd7f32" size="36" v-else-if="index === 2">
                                            <span class="white--text">{{team.points}}</span>
                                        </v-list-item-avatar>
                                        <v-list-item-avatar color="black" size="36" v-else>
                                            <span class="white--text">{{team.points}}</span>
                                        </v-list-item-avatar>
                                    </template>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-card>
        </div>
        <template>

            <v-dialog max-width="600" v-model="controlTeamDialog">
                <EventTeamControlComponent :team="currentTeam"></EventTeamControlComponent>
            </v-dialog>

            <v-dialog max-width="600px" persistent
                      v-if="$store.state.user.currentUser.id > 0 && !$store.getters.isEventPast()"
                      v-model="editTeamDialog">
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
                <TeamCreateEditComponent @close="editTeamDialog = false"></TeamCreateEditComponent>

            </v-dialog>
        </template>
    </v-card>
</template>

<script>
    import TeamCreateEditComponent from "@/components/Events/TeamCreateEditComponent";
    import EventTeamControlComponent from "@/components/Events/EventTeamControlComponent";

    export default {
        name: "EventTeamsComponent",
        components: {
            TeamCreateEditComponent, EventTeamControlComponent
        },
        methods: {
            join(team_id) {
                this.$store.dispatch('joinTeam', {team_id});
                this.$store.dispatch('getUserTeam', {event_id: this.$store.state.events.currentEvent.id});
            },

            deleteTeam(team_id) {
                if (confirm("Вы действительно хотите удалить эту команду? Все участники будут стерты!")) {
                    this.$store.dispatch('deleteTeam', {team_id});
                    this.$store.dispatch('getUserTeam', {event_id: this.$store.state.events.currentEvent.id});
                }
            }
        },
        data() {
            return {
                loading: false,
                editTeamDialog: false,
                controlTeamDialog: false,
                currentTeam: null,
                headers: [
                    {
                        text: 'Логотип',
                        value: 'logo'
                    },
                    {
                        text: 'Название',
                        value: 'name'
                    },
                    {
                        text: 'Описание',
                        value: 'description'
                    },
                    {
                        text: 'Баллы',
                        value: 'points'
                    },
                    {
                        text: 'Удаление',
                        value: 'delete',
                        align: 'right'
                    },
                    {
                        text: 'Настройки',
                        value: 'settings',
                        align: 'right'
                    },

                    {
                        text: 'Участие',
                        align: 'right',
                        value: 'participate'
                    },

                ]
            }
        },
        computed: {
            teams() {
                return this.$store.state.events.teams
            }
        },
        mounted() {
            this.loading = true;
            this.$store.dispatch('getTeams', {event_id: this.$store.state.events.currentEvent.id}).then(() => {
                this.loading = false;
            });
            this.$store.dispatch('getUserTeam', {event_id: this.$store.state.events.currentEvent.id});
            // eslint-disable-next-line no-console
            console.log(this.$store.state.user.currentUser.id);
        }
    }
</script>

<style scoped>

</style>
