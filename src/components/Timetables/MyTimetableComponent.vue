<template>
    <v-container :fluid="$store.state.user.fluid" class="mh-100">
        <v-skeleton-loader :boilerplate="false"
                           :tile="false"
                           class="mx-auto"
                           ref="skeleton"
                           type="table"
                           v-if="loading"
        ></v-skeleton-loader>
        <template v-else>
            <v-calendar
                        :events="events"
                        locale="ru"
                        ref="calendar"
                        event-color="green"
                        start="2020-02-03"
                        event-start="actual_start_at"
                        event-end="actual_start_end"
                        type="week"
                        event-height="60"
                        :weekdays="[1,2,3,4,5, 6]"
                        v-model="value"
            >
                <template v-slot:event="{event, present, past, date }">
                    <div>
                        <div class="pa-1 darken-2 green">
                            {{new Date(event.actual_start_at).getHours()}}:{{new Date(event.actual_start_at).getMinutes()}}
                            {{event.teacher.name}}
                            {{event.place.name}}
                        </div>
                        <div class="pa-1">{{event.schedule.discipline.name}}</div>


                    </div>
                </template>
            </v-calendar>
        </template>
    </v-container>
</template>

<script>
    export default {
        name: "MyTimetableComponent",
        mounted() {
            this.$store.dispatch('getLessons', {user_id: this.$store.state.user.currentUser.id}).then(() => {
                this.loading = false;

            })
        },
        methods: {
            getEventColor() {
                return 'blue';
            },

        },
        computed:{
          events(){
              return this.$store.state.timetables.lessons;
          }
        },
        data: () => ({
            loading: true,
            type: 'month',
            types: ['month', 'week', 'day', '4day'],
            mode: 'stack',
            modes: ['stack', 'column'],
            value: '',
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
            names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
        }),
    }
</script>

<style>
    .v-calendar .v-event {
        white-space: normal !important;
    }

    .nowrap{
        white-space: nowrap;
    }
</style>