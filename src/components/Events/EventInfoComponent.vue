<template>
    <div>
    <v-card>
        <v-skeleton-loader type="list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line"
                           v-if="!event"
        >

        </v-skeleton-loader>
    </v-card>
        <v-card>

        <div v-if="event">
            <v-subheader>Проведение мероприятия</v-subheader>
            <v-list-item>
                <v-list-item-title>Подача заявок</v-list-item-title>
                <v-list-item-subtitle class="text-right">{{$moment(event.check_start_at).format('DD.MM')}} -
                    {{$moment(event.check_end_at).format('DD.MM')}}
                </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Место</v-list-item-title>
                <v-list-item-subtitle v-if="event.u_place"  class="text-right">{{event.u_place.name}}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else  class="text-right"> Не указано
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
            <v-list-item :key="role.id" v-for="role in event.roles.filter((el) => {return parseInt(el.hidden) === 0})">
                <v-list-item-title>{{role.role.name}}</v-list-item-title>
                <v-list-item-subtitle class="text-right">{{role.points_max}} балл
                </v-list-item-subtitle>
            </v-list-item>
        </div>
    </v-card></div>
</template>

<script>
    export default {
        name: "EventInfoComponent",
        methods: {},

        computed: {
            event() {
                return this.$store.state.events.currentEvent
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
