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


                                <div class="pa-2" v-if="!$store.getters.isEventPast()">
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
                            <v-card-text v-html="event.description"/>
                            <v-rating
                                    v-model="event.rate"
                                    color="yellow darken-3"
                                    background-color="grey darken-1"
                                    empty-icon="$ratingFull"
                                    half-increments
                                    readonly
                            ></v-rating>
                            <v-card-actions>
                                <v-dialog
                                        v-model="connectToEvent"
                                        width="500"
                                >
                                    <v-card :loading="true">
                                        <v-card-title>Подключение к онлайн-мероприятию</v-card-title>
                                        <v-card-actions>
                                        <v-row justify="center">
                                            <v-progress-circular
                                                    :width="3" class="pa-5"
                                                    color="blue"
                                                    :size="50"
                                                    indeterminate
                                            ></v-progress-circular>
                                        </v-row>

                                        </v-card-actions>
                                        <p style="text-align: center; padding: 20px; margin-top: 10px;">Пожалуйста подождите ... </p>


                                    </v-card>
                                </v-dialog>
                                <v-btn @click="connect" v-if="event.is_online && $store.state.events.userStatus.approved"  class="mt-2 icon outlined rounded" dark color="blue" >
                                    <v-icon left>mdi-account-network</v-icon>
                                    Подключиться к мероприятию
                                </v-btn>
                            </v-card-actions>



                        </v-col>
                    </v-row>


                </v-card>
            </v-col>
            <v-col  lg="12" style="min-height: 400px">
                <v-card min-height="100%">

                    <v-tabs background-color="transparent"
                            color="blue"
                            grow
                            v-model="part"
                    >
                        <v-tab :to="{name: 'events.item.info', params: {id: $store.state.events.currentEvent.id}}">
                            Информация
                        </v-tab>
                        <v-tab :to="{name: 'events.item.checks', params: {id: $store.state.events.currentEvent.id}}"
                               v-if="$store.state.user.currentUser.admin === 1 || $store.getters.isEventAdmin($store.state.user.currentUser.id)">
                            Заявки на мероприятие
                        </v-tab>
                        <v-tab :to="{name: 'event.participants', params: {id: $store.state.events.currentEvent.id}}"
                               v-if="$store.state.user.currentUser.admin === 1 || $store.getters.isEventAdmin($store.state.user.currentUser.id)">
                            Участники
                        </v-tab>
                        <v-tab :to="{name: 'event.teams', params: {id: $store.state.events.currentEvent.id}}"
                               v-if="$store.state.events.currentEvent.teams_allowed && ($store.state.events.userStatus.approved || $store.state.user.currentUser.admin === 1)">
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
                        <v-tab :to="{name: 'event.stats', params: {id: $store.state.events.currentEvent.id}}"
                               v-if="$store.getters.isEventAdmin($store.state.user.currentUser.id)">
                            Статистика
                        </v-tab>
                        <!--<v-tab :to="{name: 'event.qr_enter', params: {id: $store.state.events.currentEvent.id}}"
                               v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id) || $store.getters.isEventAdmin($store.state.user.currentUser.id)">
                            QR вход
                        </v-tab> !-->
                    </v-tabs>
                    <router-view></router-view>
                </v-card>

            </v-col>
        </v-row>
    </div>
</template>

<script>
    import EventParticipantComponent from "@/components/Events/EventParticipants/EventParticipantsComponent";
    import EventCheckComponent from "@/components/Events/EventCheckComponent";
    import EventEditDialogComponent from "@/components/Events/EventEditDialogComponent";
    import events from "@/api/events";
   // import EventQRRegisterComponent from "@/components/Events/EventQRRegisterComponent";


    export default {
        name: "EventItemComponent",
        components: {

            // eslint-disable-next-line vue/no-unused-components
            EventParticipantComponent,
            EventCheckComponent,
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
                part: 0,
                connectToEvent: false
            }
        },

        methods:{
            connect(){
                this.connectToEvent = true;
                events.link({id: this.event.id}).then((response) => {
                    window.location.href = response.data;
                })
            }
        }
    }
</script>

<style scoped>

</style>
