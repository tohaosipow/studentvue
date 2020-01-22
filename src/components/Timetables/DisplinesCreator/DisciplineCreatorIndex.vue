<template>
    <v-container :fluid="$store.state.user.fluid">
        <div v-if="show">
            <v-row>
                <v-col cols="12" lg="4" style="position: relative">
                    <v-card>
                        <v-card-text>
                            <SelectDisciplineStep></SelectDisciplineStep>
                        </v-card-text>

                    </v-card>
                    <v-card color="mt-2">
                        <v-toolbar
                                @click="addSchedule"
                                color="blue darken-2"
                                dark
                                flat
                        >
                            <v-toolbar-title>
                                <span v-if="d_state.discipline">Занятия {{d_state.discipline.name}}</span>
                                <span v-else>Выберите дисциплину</span>
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <div v-if="d_state.discipline">
                            <div v-if="d_state.discipline.schedules.length > 0">
                                <v-tabs
                                        background-color="blue darken-2"
                                        dark
                                        grow
                                        show-arrows
                                        v-model="tab"

                                >
                                    <v-tabs-slider color="white lighten-3"></v-tabs-slider>

                                    <v-tab
                                            :key="index"
                                            v-for="(schedule, index) in d_state.discipline.schedules"
                                    >
                                        #{{ index }} {{get_day_name(schedule.day_of_week)}}
                                    </v-tab>

                                </v-tabs>

                            </div>
                            <v-card-text class="text-center" v-if="d_state.discipline.schedules.length <= 0">
                                Занятий нет. Нажмите на
                                <v-icon>mdi-plus</v-icon>
                                чтобы создать
                            </v-card-text>
                            <v-tabs-items v-else v-model="tab">
                                <v-tab-item
                                        :key="index"
                                        v-for="(schedule, index) in d_state.discipline.schedules"
                                >
                                    <CreateScheduleComponent :schedule="schedule"
                                                             :schedule_index="index"
                                                             @preview="() => {preview($event); }">
                                    </CreateScheduleComponent>
                                </v-tab-item>
                            </v-tabs-items>
                        </div>


                    </v-card>

                </v-col>
                <v-col cols="12" lg="8" v-if="this.$store.state.discreator.discipline">
                    <FullCalendar
                            :all-day-slot="false"
                            :business-hours="{daysOfWeek: [ 1, 2, 3, 4, 5, 6 ],   startTime: '08:00',   endTime: '21:30'}"
                            :events="events" :first-day="1"
                            :header="{center: 'title', left: 'prev, next',  right: 'dayGridMonth,timeGridWeek,timeGridDay'}"
                            :height="1000"
                            :hidden-days="[0]"
                            :plugins="calendarPlugins"
                            :selectable="true"
                            :valid-range="validRange"
                            @dateClick="dateClick"
                            @eventDrop="eventDrop"
                            @eventResize="eventDrop"
                            defaultView="dayGridMonth"
                            locale="ru" max-time="21:30" min-time="08:00"
                            ref="fullCalendar" slot-duration='0:20:00' slot-label-interval="0:10:00"/>
                </v-col>

            </v-row>

        </div>


    </v-container>
</template>

<script>
    import SelectDisciplineStep from './DisciplineSelectStep'
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGrid from '@fullcalendar/timegrid'
    import interaction from '@fullcalendar/interaction'
    import rrulePlugin from '@fullcalendar/rrule';
    import CreateScheduleComponent from "@/components/Timetables/DisplinesCreator/CreateScheduleComponent";


    export default {
        name: "DisciplineCreatorIndex",
        components: {
            SelectDisciplineStep, FullCalendar, CreateScheduleComponent
        },

        computed: {
            d_state() {
                return this.$store.state.discreator;
            },

            validRange() {
                return this.d_state.discipline ? {
                    start: this.d_state.discipline.period.start_at,
                    end: this.d_state.discipline.period.end_at
                } : null;
            },

            events() {
                let events = [];
                this.d_state.discipline.schedules.forEach((schedule, index) => {
                    if (!schedule.lessons || schedule.lessons.length === 0) {
                        if (schedule.start_at === null || schedule.time_end_at === null || schedule.time_start_at === null || schedule.day_of_week === -1) return {};
                        events.push(this.scheduleToEvent(schedule, index));
                    } else {
                        schedule.lessons.forEach((lesson) => {
                            events.push({
                                groupId: schedule.id,
                                start: lesson.actual_start_at,
                                end: lesson.actual_end_at,
                                title: this.d_state.discipline.name,
                                backgroundColor: 'green',
                                textColor: 'white',
                                editable: true,
                                borderColor: 'black',
                            })
                        })
                    }
                });
                return events;
                /*return this.d_state.discipline.schedules.map((s, index) => {

                }); */

            }
        },

        data() {
            return {
                show: true,
                calendarPlugins: [dayGridPlugin, timeGrid, interaction, rrulePlugin],
                tab: 0
            }
        },

        methods: {
            dateClick(info) {
                alert('Clicked on: ' + info.dateStr);
                alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                alert('Current view: ' + info.view.type);
            },

            get_day_name(id) {
                switch (id) {
                    case -1: {
                        return 'Не указано'
                    }

                    case 1: {
                        return 'Понедельник'
                    }
                    case 2: {
                        return 'Вторник'
                    }
                    case 3: {
                        return 'Среда'
                    }
                    case 4: {
                        return 'Четверг'
                    }
                    case 5: {
                        return 'Пятница'
                    }
                    case 6: {
                        return 'Суббота'
                    }
                }
            },
            addSchedule() {
                this.$store.commit('addSchedule', {
                    discipline: this.d_state.discipline,
                    teacher: this.d_state.discipline.teacher,
                    place: null,
                    day_of_week: -1,
                    periodicity: 1,
                    start_at: null,
                    time_start_at: null,
                    time_end_at: null,
                    lesson_num: null,
                    editable: true,
                    period: this.d_state.discipline.period,
                    subgroups: []
                });
                this.tab = this.d_state.discipline.schedules.length - 1;
                this.$store.dispatch('getDisciplines');
                this.$store.dispatch('getPeriods');
                this.$store.dispatch('getEmployees');
                this.$store.dispatch('getPlaces');
                this.$store.dispatch('getLessonNums');
                this.$store.dispatch('getSubgroups');
            },

            scheduleToEvent(schedule, id) {
                // eslint-disable-next-line no-debugger,no-console
                //debugger;
                if (schedule.start_at.split(" ").length > 1) {
                    schedule.start_at = schedule.start_at.split(" ")[0];
                }
                let duration = this.$moment.duration(this.$moment(schedule.start_at + " " + schedule.time_end_at).diff(this.$moment(schedule.start_at + " " + schedule.time_start_at))).hours() + ":" + this.$moment.duration(this.$moment(schedule.start_at + " " + schedule.time_end_at).diff(this.$moment(schedule.start_at + " " + schedule.time_start_at))).minutes()

                return {
                    groupId: id,
                    title: this.d_state.discipline.name,
                    //endRecur: this.$moment(this.d_state.discipline.period.end_at + " " + schedule.lesson_num.end_at).toISOString(),
                    // startRecur: this.$moment(schedule.start_at + " " + schedule.lesson_num.end_at).toISOString(),
                    // daysOfWeek: [schedule.day_of_week],
                    //startTime: schedule.lesson_num.start_at,
                    //endTime: schedule.lesson_num.end_at,
                    editable: true,
                    backgroundColor: 'gray',
                    textColor: 'white',
                    borderColor: 'black',
                    rrule: {
                        freq: 'weekly',
                        interval: schedule.periodicity === 0 ? 1 : schedule.periodicity,
                        byweekday: [schedule.day_of_week - 1],
                        dtstart: this.$moment(schedule.start_at + " " + schedule.time_start_at).toISOString(),
                        until: schedule.periodicity === 0 ? this.$moment(schedule.start_at + " " + schedule.time_end_at).toISOString() : this.$moment(this.d_state.discipline.period.end_at + " " + schedule.time_end_at).toISOString(),
                    },
                    duration: duration
                    //schedule.start_at + " " + schedule.lesson_num.start_at
                    // duration: this.$moment.duration(this.$moment(schedule.start_at + " " + schedule.lesson_num.start_at).diff(this.$moment(schedule.start_at + " " + schedule.lesson_num.end_at))).format('HH:mm')
                }
            },

            preview() {
                this.events = [];
                this.d_state.discipline.schedules.forEach((schedule, index) => {
                    this.events.push(this.scheduleToEvent(schedule, index));
                });
            },
            eventResize(info) {
                // eslint-disable-next-line no-console
                console.log(info)
            },
            eventDrop(info) {
                let index = parseInt(info.event.groupId);
                let start = this.$moment(info.event.start).format('YYYY-MM-DD');
                let time_start_at = this.$moment(info.event.start).format('HH:mm');
                let time_end_at = this.$moment(info.event.end).format('HH:mm');
                // eslint-disable-next-line no-console
                console.log(info, time_start_at);
                let schedule = {
                    ...this.d_state.discipline.schedules[index],
                    start_at: start,
                    time_start_at: time_start_at,
                    time_end_at: time_end_at,
                    day_of_week: this.$moment(start).weekday()
                };
                this.$store.commit('updateScheduleByIndex', {index: index, schedule: schedule})
            }

        },


        mounted() {
            this.$store.dispatch('getDisciplines');
            this.$store.dispatch('getPeriods');
            this.$store.dispatch('getEmployees');
            this.$store.dispatch('getPlaces');
            this.$store.dispatch('getLessonNums');
            this.$store.dispatch('getSubgroups');
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
    @import '~@fullcalendar/timegrid/main.css';
</style>