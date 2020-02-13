<template>
    <v-container :fluid="$store.state.user.fluid" v-if="$store.state.events.currentEvent">
        <v-row>
            <v-col lg="3">
                <v-card>
                    <v-img
                            :src="event.header_url"
                            height="200px"
                    ></v-img>

                    <v-list-item>
                        <v-list-item-title>Подача заявок</v-list-item-title>
                        <v-list-item-subtitle class="text-right">{{$moment(event.check_start_at).format('DD.MM')}} -
                            {{$moment(event.check_end_at).format('DD.MM')}}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-divider/>
                    <v-subheader>Проведения мероприятия</v-subheader>
                    <v-list-item>
                        <v-list-item-title>Место</v-list-item-title>
                        <v-list-item-subtitle class="text-right">{{event.u_place.name}}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Начало</v-list-item-title>
                        <v-list-item-subtitle class="text-right">{{$moment(event.start_at).format('DD.MM HH:mm')}}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Конец</v-list-item-title>
                        <v-list-item-subtitle class="text-right">{{$moment(event.end_at).format('DD.MM HH:mm')}}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Длительность</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                            {{$moment.duration($moment(event.end_at).diff(this.$moment(event.start_at))).hours()}} ч.
                            {{$moment.duration($moment(event.end_at).diff(this.$moment(event.start_at))).minutes()}}
                            мин.
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-divider/>
                    <v-subheader>Организатор</v-subheader>
                    <v-list-item>
                        <v-list-item-title>{{event.user.name}}</v-list-item-title>
                        <v-list-item-icon>
                            <v-icon>
                                mdi-account
                            </v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Телефон</v-list-item-title>
                        <v-list-item-subtitle class="text-right">{{event.phone}}</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider/>
                    <v-subheader>Начисление баллов</v-subheader>
                    <v-list-item :key="role.id" v-for="role in event.roles.filter((el) => {return el.hidden == 0})">
                        <v-list-item-title>{{role.role.name}}</v-list-item-title>
                        <v-list-item-subtitle class="text-right">{{role.points_max}} балл
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-divider/>

                </v-card>
            </v-col>
            <v-col lg="9">
                <v-card>
                    <EventCheckComponent/>
                    <v-card-title class="title">{{event.name}}</v-card-title>
                    <v-card-text>
                        {{event.description}}
                    </v-card-text>
                    <v-tabs background-color="transparent"
                            color="blue"
                            grow
                            v-model="part"
                    >
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
                        <v-tab :to="{name: 'event.qr_enter', params: {id: $store.state.events.currentEvent.id}}"
                               v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id) || $store.getters.isEventAdmin($store.state.user.currentUser.id)">
                            QR вход
                        </v-tab>

                    </v-tabs>
                    <router-view></router-view>
                    <v-tabs-items v-model="part">
                        <v-tab-item v-if="$store.state.events.currentEvent.teams_allowed">
                            <v-card color="basil" flat>
                                <EventTeamsComponent></EventTeamsComponent>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item v-if="$store.state.user.currentUser.admin === 1">
                            <v-card color="basil" flat>
                                <EventRubricsComponent :rubrics="event.rubrics"></EventRubricsComponent>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id)">
                        </v-tab-item>
                        <v-tab-item v-if="$store.getters.checkCanSetPoints($store.state.user.currentUser.id)">
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
        components: {

            // eslint-disable-next-line vue/no-unused-components
            EventParticipantComponent,
            EventRubricsComponent,
            EventCheckComponent,
            EventTeamsComponent,
            EventQRRegisterComponent
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