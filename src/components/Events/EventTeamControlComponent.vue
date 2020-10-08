<template>
    <v-card>
        <v-card-title>{{team.name}}</v-card-title>
        <v-card-subtitle>управление командой</v-card-subtitle>
        <v-subheader>Настройте состав</v-subheader>
        <v-list-item :key="member.id" v-for="member in team.members">
            <v-list-item-icon>
                <v-icon color="orange" v-if="parseInt(member.id) === parseInt(team.user_id)">mdi-crown</v-icon>
                <v-icon color="blue darken-2" v-else>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>{{member.first_name}} {{member.last_name}} {{member.third_name}}</v-list-item-title>
                <v-list-item-subtitle v-if="member.event_checks[0]">{{member.event_checks[0].event_check_roles.map((el) => {return el.event_role.role.name}).join(',')}}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                    Роль не выбрана
                </v-list-item-subtitle>
            </v-list-item-content>
            <template v-if="!$store.getters.isEventPast()">
                <v-list-item-action v-if="!member.pivot.approved">
                    <v-btn @click="acceptMember(team.id, member.id)" color="success" outlined small>
                        <v-icon left>mdi-check</v-icon>
                        Одобрить
                    </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                    <v-btn :disabled="team.user_id === member.id" @click="declineMember(team.id, member.id)"
                           color="red lighten-2" icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </template>
        </v-list-item>
    </v-card>
</template>

<script>
    export default {
        name: "EventTeamControlComponent",
        props: {
            team: {}
        },
        methods: {
            acceptMember(team_id, user_id) {
                this.$store.dispatch('acceptMember', {team_id, user_id});
                this.$store.dispatch('getUserTeam', {event_id: this.$store.state.events.currentEvent.id});
            },

            declineMember(team_id, user_id) {
                this.$store.dispatch('declineMember', {team_id, user_id});
                this.$store.dispatch('getUserTeam', {event_id: this.$store.state.events.currentEvent.id});
            }
        }
    }
</script>

<style scoped>

</style>
