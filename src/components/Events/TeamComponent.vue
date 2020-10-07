<template>
    <v-container>
        <v-row v-if="loading">
            <v-card width="100%">
                <v-list-item>
                    <v-list-item-avatar color="grey">
                        <v-img :src="team.logo"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="headline"> {{team.name}}</v-list-item-title>
                        <v-list-item-subtitle> {{team.description}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
            <v-card elevation="0" class="mt-2" width="100%">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline">Список участников</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item :key="member.id" v-for="member in team.members">
                    <v-list-item-avatar color="grey">
                        <v-img :src="member.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{member.name}}</v-list-item-title>
                        <v-list-item-subtitle>{{member.role}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-row>
    </v-container>

</template>

<script>


    export default {
        name: "TeamComponent",
        components: {
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
