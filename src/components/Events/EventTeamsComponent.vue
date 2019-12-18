<template>
    <v-card v-if="!loading">
        <v-list-item :key="team.id" v-for="team in this.$store.state.events.teams">
            <v-list-item-avatar>
                <v-img :src="team.logo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{team.name}}</v-list-item-title>
                <v-list-item-subtitle>{{team.description}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="$store.state.user.currentUser.id > 0">
                <v-btn class="ma-2"
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
                <v-btn @click="join(team.id)" class="ma-2" color="blue" outlined rounded tile v-else>
                    Подать заявку
                </v-btn>
            </v-list-item-action>
            <v-list-item-action v-if="team.user_id === $store.state.user.currentUser.id">
                <v-btn icon>
                    <v-icon color="blue darken-2">mdi-settings</v-icon>
                </v-btn>
            </v-list-item-action>

        </v-list-item>
        <v-list-item >
            <v-list-item-content>
                <v-list-item-title></v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-dialog v-if="this.$store.state.user.currentUser.id > 0" max-width="600px" persistent v-model="editTeamDialog">
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

    export default {
        name: "EventTeamsComponent",
        components: {
            TeamCreateEditComponent
        },
        methods:{
          join(team_id){
              this.$store.dispatch('joinTeam', {team_id});
          }
        },
        data() {
            return {
                loading: false,
                editTeamDialog: false
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
            })
            // eslint-disable-next-line no-console
            console.log(this.$store.state.user.currentUser.id);
        }
    }
</script>

<style scoped>

</style>