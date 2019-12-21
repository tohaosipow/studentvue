<template>
    <v-card v-if="!loading">
        <v-list-item :to="{name: 'teams.item', params: {id: $store.state.events.currentEvent.id, team_id: team.id}}" :key="team.id" v-for="(team, index) in this.$store.getters.getTeamsSortByPoints">
            <v-list-item-avatar>
                <v-img :src="team.logo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{team.name}}</v-list-item-title>
                <v-list-item-subtitle>{{team.description}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="$store.state.user.currentUser.id > 0">
                <template v-if="$store.state.events.userStatus.id === undefined">
                    Необходимо "Подать заявку" на мероприятие
                </template>
                <template v-else>
                    <v-btn class="ma-2"
                           color="success"
                           @click.prevent.stop="() => {}"
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
                           outlined rounded tile v-else-if="$store.state.events.userTeam.length === 0">
                        Подать заявку
                    </v-btn>
                </template>
            </v-list-item-action>
            <v-list-item-action
                    v-if="team.user_id === $store.state.user.currentUser.id || $store.state.user.currentUser.admin === 1">
                <v-btn icon>
                    <v-icon @click.prevent.stop.prevent.stop="currentTeam = team; controlTeamDialog = true" color="blue darken-2">mdi-settings
                    </v-icon>
                </v-btn>


            </v-list-item-action>
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
        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-dialog max-width="600" v-model="controlTeamDialog">
            <template v-slot:activator="{ on }">

            </template>
            <EventTeamControlComponent :team="currentTeam"></EventTeamControlComponent>
        </v-dialog>

        <v-dialog max-width="600px" persistent v-if="$store.state.user.currentUser.id > 0" v-model="editTeamDialog">
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
                this.$store.dispatch('userTeam', {event_id: this.$store.state.events.currentEvent.id});
            }
        },
        data() {
            return {
                loading: false,
                editTeamDialog: false,
                controlTeamDialog: false,
                currentTeam: null
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