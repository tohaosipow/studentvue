<template>
    <v-container :fluid="$store.state.user.fluid" class="mh-100">
        <v-card>
            <v-card-title>Расписание</v-card-title>
            <v-card-subtitle>Сургутского государственного университета</v-card-subtitle>

            <v-card-text>
                <v-row align-content="center" justify="space-around">
                    <v-col lg="3">
                        <v-autocomplete v-model="filter.place_ids" multiple :items="$store.state.timetables.places"
                                        clearable item-text="name" item-value="id"
                                        label="Аудитория"/>
                    </v-col>
                    <v-col lg="3">
                        <v-autocomplete v-model="filter.teacher_ids" multiple clearable :items="$store.state.timetables.employees"
                                        item-text="name" item-value="id" label="Преподаватель"/>
                    </v-col>
                    <v-col lg="3">
                        <v-autocomplete v-model="filter.group_ids" multiple clearable :items="$store.state.dictionaries.studentGroups"
                                        item-text="name" item-value="id" label="Группа"/>
                    </v-col>
                    <v-col lg="2">
                        <v-btn @click="search" outlined color="blue">Найти пары</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card class="mt-2">
            <v-card-text>
                <v-skeleton-loader :boilerplate="false"
                                   :tile="false"
                                   class="mx-auto"
                                   ref="skeleton"
                                   type="table"
                                   v-if="loading"
                />
                <template v-else>
                    <FullCalendar
                            :all-day-slot="false"
                            :business-hours="{daysOfWeek: [ 1, 2, 3, 4, 5, 6 ],   startTime: '08:00',   endTime: '21:30'}"
                            :button-text="{today: 'сегодня', month:    'месяц',  week:     'неделя', day:      'день', list:     'список'}"
                            :events="events"
                            :slot-event-overlap="false"
                            :first-day="1"
                            :header="{center: 'title', left: 'prev, next',  right: 'dayGridMonth,timeGridWeek,timeGridDay'}"
                            :height="1000"
                            :hidden-days="[0]"
                            :plugins="calendarPlugins"
                            :selectable="true"
                            defaultView="timeGridWeek"
                            locale="ru" max-time="21:30" min-time="08:00"
                            ref="fullCalendar" slot-duration='0:20:00' slot-label-interval="0:15:00"/>
                </template>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import dayGridPlugin from "@fullcalendar/daygrid";
    import timeGrid from "@fullcalendar/timegrid";
    import interaction from "@fullcalendar/interaction";
    import rrulePlugin from "@fullcalendar/rrule";
    import FullCalendar from "@fullcalendar/vue";

    export default {
        name: "TimetableComponent",
        mounted() {
            this.$emit('changeTitle', 'Расписание');
            this.$store.dispatch('getEmployees');
            this.$store.dispatch('getPlaces');
            this.$store.dispatch('getSubgroups');
            this.$store.dispatch('getStudentGroups');
            this.$store.dispatch('getCollisions');
        },

        methods: {
            search(){
                this.loading = true;
                this.$store.dispatch('getLessons', {filter: this.filter}).then(() => {
                    this.loading = false;

                });
            },

            getColor(id){
                let colors = ['#4be362', '#e34b4b', '#e34b97', '#854be3', '#4be3b3',  '#d64be3', '#4be362', '#e39c4b', '#4bc5e3', '#c0e34b',   '#4b8fe3',  ];
                return colors[id % 10]
            }

        },
        computed: {
            events() {
                return this.$store.state.timetables.lessons.map((lesson) => {
                    return {
                        start: lesson.actual_start_at,
                        end: lesson.actual_end_at,
                        title: lesson.schedule.discipline.short_name+" | "+lesson.teacher.name+" | "+lesson.place.name + "\n"+lesson.schedule.subgroups.map(el => {return el.name}).join(", "),
                        backgroundColor: this.getColor(lesson.schedule.subgroups.map((el) => {return el.id}).reduce((a, b) => a + b, 0)),
                        textColor: 'white',
                        borderColor: 'black',
                    }
                });
            },

        },
        data: () => ({
            loading: false,
            calendarPlugins: [dayGridPlugin, timeGrid, interaction, rrulePlugin],
            filter:{
                group_ids: null,
                teacher_ids: null,
                place_ids: null

            }
        }),
        components: {
            FullCalendar
        },
    }
</script>

<style lang="scss">
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
    @import '~@fullcalendar/timegrid/main.css';
</style>