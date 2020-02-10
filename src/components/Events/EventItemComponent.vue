<template>
    <v-container :fluid="$store.state.user.fluid" v-if="$store.state.events.currentEvent">
        <v-row>
            <v-col lg="12">
                <v-card>
                    <v-img contain
                            :src="event.header_url"
                            height="200px"
                    ></v-img>
                    <v-card-title class="headline">{{event.name}}</v-card-title>
                    <v-card-text>{{event.description}}</v-card-text>
                    <EventCheckComponent></EventCheckComponent>
                    <v-tabs v-model="part"
                            grow
                            background-color="transparent"
                            color="blue"
                    >
                        <v-tab v-if="$store.state.user.currentUser.admin === 1" :to="{name: 'event.participants', params: {id: $store.state.events.currentEvent.id}}">
                            Участники
                        </v-tab>
                        <v-tab v-if="$store.state.events.currentEvent.teams_allowed" :to="{name: 'event.teams', params: {id: $store.state.events.currentEvent.id}}">
                            Команды
                        </v-tab>
                        <v-tab v-if="$store.state.user.currentUser.admin === 1" :to="{name: 'event.criteria', params: {id: $store.state.events.currentEvent.id}}">
                            Критерии
                        </v-tab>
                        <v-tab  v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id)" :to="{name: 'event.points', params: {id: $store.state.events.currentEvent.id}}"  >
                            Оценки
                        </v-tab>
                        <v-tab  v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id)" :to="{name: 'event.qr_enter', params: {id: $store.state.events.currentEvent.id}}" >
                            QR вход
                        </v-tab>

                    </v-tabs>
                    <router-view></router-view>
                    <v-tabs-items v-model="part">
                        <v-tab-item>
                            <v-card flat>
                                <v-textarea readonly
                                        solo :value="event.description"
                                        name="input-7-4"
                                        label="Описание"
                                ></v-textarea>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item  v-if="$store.state.events.currentEvent.teams_allowed">
                            <v-card flat color="basil">
                                <EventTeamsComponent></EventTeamsComponent>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item v-if="$store.state.user.currentUser.admin === 1">
                            <v-card flat color="basil">
                                <EventRubricsComponent :rubrics="event.rubrics"></EventRubricsComponent>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id)">
                        </v-tab-item>
                        <v-tab-item  v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id)">
                            <v-card>
                                <EventQRRegisterComponent></EventQRRegisterComponent>
                            </v-card>
                        </v-tab-item>

                    </v-tabs-items>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import EventParticipantComponent from "@/components/Events/EventParticipants/EventParticipantsComponent";
    import EventRubricsComponent from "@/components/Events/EventRubricsComponent";
    import EventCheckComponent from "@/components/Events/EventCheckComponent";
    import EventTeamsComponent from "@/components/Events/EventTeamsComponent";
    import EventQRRegisterComponent from "@/components/Events/EventQRRegisterComponent";


    export default {
        name: "EventItemComponent",
        components:{

            // eslint-disable-next-line vue/no-unused-components
          EventParticipantComponent, EventRubricsComponent,  EventCheckComponent, EventTeamsComponent, EventQRRegisterComponent
        },
        mounted(){
            this.$store.dispatch('getEvent', {id: this.$route.params.id}).then(() => {
                this.$emit('changeTitle', this.event.name)
                this.$store.dispatch('getEventParticipants', {id: this.$store.state.events.currentEvent.id});
                this.$store.dispatch('getUserStatus', {id: this.$route.params.id});
            });

        },
        computed:{
            event(){
                return this.$store.state.events.currentEvent;
            }
        },
        data(){
            return{
                part: 0
            }
        }
    }
</script>

<style scoped>

</style>