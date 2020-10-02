<template>
            <v-dialog v-if="$store.state.user.currentUser.id > 0" v-model="application.show" width="500">
                <template v-slot:activator="{ on }">
                    <v-btn block color="blue" dark outlined rounded v-if="$store.state.events.userStatus.id === undefined"
                           v-on="on">Подать заявку
                    </v-btn>
                    <v-btn block color="warning" dark outlined rounded v-else-if="!$store.state.events.userStatus.approved">
                        Заявка подана
                    </v-btn>
                    <v-btn block color="success" dark outlined rounded v-else>Участие подтверждено</v-btn>
                </template>
                <EventApplicationComponent v-on:close="application.show = false"></EventApplicationComponent>
            </v-dialog>
            <v-btn block color="error" dark outlined rounded to="/auth" v-else>Зарегистрироваться</v-btn>

</template>

<script>
    import EventApplicationComponent from "@/components/Events/EventApplicationComponent";

    export default {
        name: "EventCheckComponent",
        components: {
            EventApplicationComponent
        },
        data() {
            return {
                application: {
                    show: false,
                }
            }
        }
    }
</script>

<style scoped>

</style>
