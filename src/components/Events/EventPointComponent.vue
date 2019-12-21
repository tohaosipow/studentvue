<template>
    <v-container flat color="basil">
        <EventTeamPointSetComponent v-if="$store.state.events.currentEvent.teams_allowed"></EventTeamPointSetComponent>
        <EventUserPointSetComponent v-else></EventUserPointSetComponent>
    </v-container>
</template>

<script>
    import EventUserPointSetComponent from "@/components/Events/EventUserPointSetComponent";
    import EventTeamPointSetComponent from "@/components/Events/EventTeamPointSetComponent";

    export default {
        name: "EventPointComponent",
        components:{
            EventTeamPointSetComponent,
            EventUserPointSetComponent
        },
        mounted(){
            this.$store.dispatch('getEvent', {id: this.$route.params.id}).then(() => {
                this.$store.dispatch('getEventParticipants', {id: this.$store.state.events.currentEvent.id});
                this.$store.dispatch('getUserStatus', {id: this.$route.params.id});
            });
        }
    }
</script>

<style scoped>

</style>