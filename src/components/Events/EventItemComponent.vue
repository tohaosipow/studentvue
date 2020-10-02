<template>
    <div v-if="event && event.id > 0">
        <v-row>
            <v-col lg="12">
                <v-card elevation="0">
                    <v-row>
                        <v-col lg="4">

                            <v-card elevation="0">
                                <v-img
                                        :src="event.header_url"
                                        contain
                                        height="300px"
                                        style="padding: 10px"
                                ></v-img>


                                <div class="pa-2">
                                    <EventCheckComponent/>
                                    <template v-if="$store.getters.isEventAdmin($store.state.user.currentUser.id)">
                                        <EventEditDialogComponent/>
                                        <!--<v-btn block class="mt-2" color="red" icon outlined rounded>
                                            <v-icon left>mdi-delete</v-icon>
                                            Удалить мероприятие
                                        </v-btn> !-->
                                    </template>


                                </div>
                            </v-card>


                        </v-col>
                        <v-col lg="8">

                            <v-card-title class="title">{{event.name}}</v-card-title>
                            <v-card-text>
                                {{event.description}}
                            </v-card-text>


                        </v-col>
                    </v-row>


                </v-card>
            </v-col>
            <v-col lg="12" style="min-height: 400px">
                <v-card min-height="100%">

                    <v-tabs background-color="transparent"
                            color="blue"
                            grow
                            v-model="part"
                    >
                        <v-tab :to="{name: 'events.item.info', params: {id: $store.state.events.currentEvent.id}}">
                            Информация
                        </v-tab>
                        <v-tab :to="{name: 'event.participants', params: {id: $store.state.events.currentEvent.id}}"
                               v-if="$store.state.user.currentUser.admin === 1 || $store.getters.isEventAdmin($store.state.user.currentUser.id)">
                            Участники
                        </v-tab>
                        <v-tab :to="{name: 'event.teams', params: {id: $store.state.events.currentEvent.id}}"
                               v-if="$store.state.events.currentEvent.teams_allowed ">
                            Команды
                        </v-tab>
                        <v-tab :to="{name: 'event.criteria', params: {id: $store.state.events.currentEvent.id}}"
                               v-if="$store.state.user.currentUser.admin === 1 || $store.getters.isEventAdmin($store.state.user.currentUser.id)">
                            Критерии
                        </v-tab>
                        <v-tab :to="{name: 'event.points', params: {id: $store.state.events.currentEvent.id}}"
                               v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id) || $store.getters.isEventAdmin($store.state.user.currentUser.id) ">
                            Оценки
                        </v-tab>
                        <!--<v-tab :to="{name: 'event.qr_enter', params: {id: $store.state.events.currentEvent.id}}"
                               v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id) || $store.getters.isEventAdmin($store.state.user.currentUser.id)">
                            QR вход
                        </v-tab> !-->

                    </v-tabs>
                    <router-view></router-view>
                    <v-tabs-items v-model="part">
                        <v-tab-item v-if="$store.state.events.currentEvent.teams_allowed">
                            <v-card color="basil" flat>
                                <EventTeamsComponent></EventTeamsComponent>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item v-if="$store.state.user.currentUser.admin === 1">
                            <EventRubricsComponent :rubrics="event.rubrics"></EventRubricsComponent>
                        </v-tab-item>
                        <v-tab-item v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id)">
                        </v-tab-item>
                        <!--<v-tab-item v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id)">
                            <v-card>
                                <EventQRRegisterComponent></EventQRRegisterComponent>
                            </v-card>
                        </v-tab-item> !-->

                    </v-tabs-items>
                </v-card>

            </v-col>
        </v-row>
    </div>
</template>

<script>
    import EventParticipantComponent from "@/components/Events/EventParticipants/EventParticipantsComponent";
    import EventRubricsComponent from "@/components/Events/EventRubricsComponent";
    import EventCheckComponent from "@/components/Events/EventCheckComponent";
    import EventTeamsComponent from "@/components/Events/EventTeamsComponent";
    import EventEditDialogComponent from "@/components/Events/EventEditDialogComponent";
   // import EventQRRegisterComponent from "@/components/Events/EventQRRegisterComponent";


    export default {
        name: "EventItemComponent",
        components: {

            // eslint-disable-next-line vue/no-unused-components
            EventParticipantComponent,
            EventRubricsComponent,
            EventCheckComponent,
            EventTeamsComponent,
            EventEditDialogComponent
          //  EventQRRegisterComponent
        },
        mounted() {
            this.$store.dispatch('getEvent', {id: this.$route.params.id}).then(() => {
                this.$emit('changeTitle', this.event.name)
                this.$store.dispatch('getEventParticipants', {id: this.$store.state.events.currentEvent.id});
                this.$store.dispatch('getUserStatus', {id: this.$route.params.id});
            });

        },
        computed: {
            event() {
                return this.$store.state.events.currentEvent;
            }
        },
        data() {
            return {
                part: 0
            }
        }
    }
</script>

<style scoped>

</style>
