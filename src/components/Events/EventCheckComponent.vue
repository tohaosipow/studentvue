<template>
    <v-container>
        <v-row>
            <v-col>
                <v-banner two-line>
                    Для участия в мероприятии необходимо подать заявку, для этого нужно быть зарегистрированным.
                    <template v-slot:actions>
                        <v-dialog v-if="$store.state.user.currentUser.id > 0" v-model="application.show" width="500">
                            <template v-slot:activator="{ on }">
                                <v-btn v-if="$store.state.events.userStatus.id === undefined"  v-on="on" color="blue" dark outlined rounded>Подать заявку</v-btn>
                                <v-btn v-else-if="!$store.state.events.userStatus.approved"  color="warning" dark outlined rounded>Заявка подана</v-btn>
                                <v-btn v-else color="success" dark outlined rounded>Участие подтверждено</v-btn>
                            </template>
                            <EventApplicationComponent v-on:close="application.show = false"></EventApplicationComponent>
                        </v-dialog>
                        <v-btn to="/singup" v-else color="error" dark outlined rounded>Зарегистрироваться</v-btn>


                    </template>
                </v-banner>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
    import EventApplicationComponent from "@/components/Events/EventApplicationComponent";
    export default {
        name: "EventCheckComponent",
        components: {
            EventApplicationComponent
        },
        data(){
            return{
                application:{
                    show: false,
                }
            }
        }
    }
</script>

<style scoped>

</style>