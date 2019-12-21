<template>
    <v-container>
        <v-row v-if="loading">
            <v-card width="100%">
                <v-list-item>
                    <v-list-item-avatar color="grey">
                        <v-img :src="team.logo"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline"> {{team.name}}t</v-list-item-title>
                        <v-list-item-subtitle> {{team.description}}r</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-card-title>Проекты</v-card-title>
                <EventProjectsComponent :team="team"></EventProjectsComponent>
            </v-card>
        </v-row>
    </v-container>

</template>

<script>
    import EventProjectsComponent from "@/components/Events/EventProjectsComponent";

    export default {
        name: "TeamComponent",
        components: {
            EventProjectsComponent
        },
        computed: {
            team() {
                return this.$store.state.events.currentTeam;
            }
        },
        data(){
            return {
                loading: false
            }
        },
        watch: {
            $route(to) {
                this.loading = false;
                let id = to.params.team_id;
                let can = false;
                this.$store.dispatch('getCurrentTeam', {team_id: id}).then(() => {
                   this.loading = true;
                });
                this.$store.state.events.userTeam.forEach((el) => {
                    if (el.id == id) can = true;
                });
                if(this.$store.getters.checkCanSetPoints(this.$store.state.user.currentUser.id)) can = true;
                if (!can) this.$router.back();
            }
        },
        mounted() {
            let id = this.$route.params.team_id;
            this.$store.dispatch('getCurrentTeam', {team_id: id}).then(() => {
                this.loading = true;
            });
            let can = false;

            this.$store.state.events.userTeam.forEach((el) => {
                if (el.id == id) can = true;
            });
            if(this.$store.getters.checkCanSetPoints(this.$store.state.user.currentUser.id)) can = true;
            if (!can) this.$router.back();
        }
    }
</script>

<style scoped>

</style>