<template>
    <v-container :fluid="$store.state.user.fluid" class="mh-100">
        <v-card>
            <v-card-title>Расписание</v-card-title>
            <v-card-subtitle>{{$store.state.user.currentUser.name}}</v-card-subtitle>

            <v-card-text>
                <v-row align-content="center" justify="space-around">
                    <v-col lg="3">
                        <v-autocomplete :items="$store.state.timetables.places" clearable item-text="name"
                                        item-value="id" label="Аудитория" multiple
                                        v-model="filter.place_ids"/>
                    </v-col>
                    <v-col lg="3">
                        <v-autocomplete :items="$store.state.timetables.employees" clearable item-text="name"
                                        item-value="id"
                                        label="Преподаватель" multiple v-model="filter.user_ids"/>
                    </v-col>
                    <v-col lg="3">
                        <v-autocomplete :items="$store.state.dictionaries.studentGroups" clearable item-text="name"
                                        item-value="id"
                                        label="Группа" multiple v-model="filter.group_ids"/>
                    </v-col>
                    <v-col lg="2">
                        <v-btn @click="search" color="blue" outlined>Найти пары</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-row>
            <v-col lg="3">
                <v-card>
                    <v-card-title>Редактирование занятия</v-card-title>
                    <v-card-text v-if="$store.state.lessonmanager.lesson === null">Нажмите на пару, которую хотите
                        редактировать.
                    </v-card-text>
                    <v-card-text v-else>
                        <v-autocomplete :items="$store.state.timetables.disciplines" :value="$store.state.lessonmanager.lesson.schedule.discipline_id"
                                        disabled
                                        item-text="name" item-value="id" label="Дисциплина"
                                        readonly/>
                        <v-autocomplete :items="$store.state.timetables.places" item-text="name" item-value="id" label="Аудитория"
                                        v-model="lesson_place_id"/>
                        <v-autocomplete :items="$store.state.timetables.employees" :value="$store.state.lessonmanager.lesson.actual_teacher_id"
                                        item-text="name" item-value="id"
                                        label="Преподаватель" v-model="lesson_teacher_id"/>
                        <v-text-field label="Дата и время начала пары" v-model="lesson_start_at"></v-text-field>
                        <v-text-field label="Дата и время конца пары" v-model="lesson_end_at"></v-text-field>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col lg="9">
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
                                    :button-text="{today: 'сегодня', month:    'месяц',  week:     'неделя', day:      'день', list:     'список'}"
                                    :events="events"
                                    :first-day="1"
                                    :header="{center: 'title', left: 'prev, next',  right: 'dayGridMonth,timeGridWeek,timeGridDay'}"
                                    :height="1000"
                                    :hidden-days="[0]"
                                    :plugins="calendarPlugins"
                                    :selectable="true"
                                    :slot-event-overlap="false"
                                    @eventClick="eventDragStart"
                                    @eventDrop="eventDrop"
                                    defaultView="timeGridWeek"
                                    locale="ru" max-time="21:30" min-time="08:00"
                                    ref="fullCalendar" slot-duration='0:20:00' slot-label-interval="0:15:00"/>
                        </template>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import dayGridPlugin from "@fullcalendar/daygrid";
    import timeGrid from "@fullcalendar/timegrid";
    import interaction from "@fullcalendar/interaction";
    import rrulePlugin from "@fullcalendar/rrule";
    import FullCalendar from "@fullcalendar/vue";
    import lessons from "@/api/lessons";

    export default {
        name: "MyTimetableComponent",
        mounted() {
            this.$store.dispatch('getEmployees');
            this.$store.dispatch('getDisciplines');
            this.$store.dispatch('getPlaces');
            this.$store.dispatch('getSubgroups');
            this.$store.dispatch('getStudentGroups');
            if (this.$route.params.id) this.filter.user_ids = [this.$route.params.id];
            else this.filter.user_ids = [this.$store.state.user.currentUser.id];
            this.search();
        },
        methods: {
            search() {
                this.$store.dispatch('getLessons', {filter: this.filter}).then(() => {
                    this.loading = false;

                });
            },

            getColor(id) {
                let colors = ['#4be362', '#e34b4b', '#e34b97', '#854be3', '#4be3b3', '#d64be3', '#4be362', '#e39c4b', '#4bc5e3', '#c0e34b', '#4b8fe3',];
                return colors[id % 10]
            },

            eventClick(e) {
                let id = e.event.id;
                let lesson = this.$store.getters.getLessonByID(parseInt(id));
                if (parseInt(lesson.actual_teacher_id) === parseInt(this.$store.state.user.currentUser.id)) {
                    this.$store.commit('setManagedLesson', lesson);
                }
            },
            eventDragStart(e) {
                this.collisionLessons = [];
                let id = e.event.id;
                let lesson = this.$store.getters.getLessonByID(parseInt(id));
                if (lesson.actual_teacher_id === this.$store.state.user.currentUser.id || this.$store.state.user.currentUser.admin) {
                    this.$store.commit('setManagedLesson', lesson);
                    this.updateCollision()
                }
            },

            updateCollision(){
                lessons.all({
                    filter: {
                        subgroup_ids: this.$store.state.lessonmanager.lesson.schedule.subgroups.map(el => {
                            return el.id
                        }),
                        teacher_ids: [this.$store.state.lessonmanager.lesson.actual_teacher_id],
                        place_ids: [this.$store.state.lessonmanager.lesson.actual_place_id]
                    }
                }).then((res) => {
                    this.collisionLessons = res.data
                })
            },
            eventDrop(e) {
                //this.collisionLessons = []
                //
                let start_at = this.$moment(e.event.start).format("YYYY-MM-DD HH:mm:ss");
                let end_at = this.$moment(e.event.end).format("YYYY-MM-DD HH:mm:ss");
                this.$store.commit('setManagedLesson', {...this.$store.state.lessonmanager.lesson, actual_start_at: start_at, actual_end_at: end_at});
                this.updateCollision()
            },

            toEventCalendar(lesson, gray = false) {
                // eslint-disable-next-line no-unused-vars
                let colColor = 'gray';
                // eslint-disable-next-line no-console
                console.log(lesson)
                if (this.$store.state.lessonmanager.lesson && lesson.schedule) {
                    if (parseInt(this.$store.state.lessonmanager.lesson.actual_teacher_id) === parseInt(lesson.actual_teacher_id)) colColor = 'red';
                    if (parseInt(this.$store.state.lessonmanager.lesson.actual_place_id) === parseInt(lesson.actual_place_id)) colColor = 'orange';
                    if (this.$store.state.lessonmanager.lesson.schedule.subgroups.map((el) => {
                        return el.id
                    }).filter(function (el) {
                        return lesson.schedule.subgroups.map((el) => {
                            return el.id
                        }).indexOf(el) !== -1;
                    }).length > 0) colColor = 'blue';
                }
                return {
                    id: lesson.id,
                    groupId: lesson.schedule.id,
                    start: lesson.actual_start_at,
                    end: lesson.actual_end_at,
                    title: lesson.schedule.discipline.short_name + " | " + lesson.teacher.name + " | " + lesson.place.name + "\n" + lesson.schedule.subgroups.map(el => {
                        return el.name
                    }).join(", "),
                    backgroundColor: !gray ? this.getColor(lesson.schedule.subgroups.map((el) => {
                        return el.id
                    }).reduce((a, b) => a + b, 0)) : 'gray',
                    textColor: 'white',
                    borderColor: lesson.actual_teacher_id === this.$store.state.user.currentUser.id ? 'yellow' : 'black',
                    editable: this.$store.state.lessonmanager.lesson ? parseInt(this.$store.state.lessonmanager.lesson.id) === parseInt(lesson.id) : false,
                    constraint: [
                        {
                            startTime: '2020-02-04T10:00:00',
                            endTime: '2020-02-06T22:00:00'

                        }
                    ],
                    rendering: gray ? 'background' : 'normal'
                }
            }

        },
        computed: {
            events() {
                let manage_lesson = [];
                if(this.$store.state.lessonmanager.lesson){
                    manage_lesson = [this.toEventCalendar(this.$store.state.lessonmanager.lesson)]
                }
                // eslint-disable-next-line no-console
                console.log(manage_lesson);
                return [...manage_lesson, ...this.collisionLessons.filter(lesson => {
                    return this.$store.getters.getLessonByID(parseInt(lesson.id)) === undefined
                }).map((lesson) => {
                    return this.toEventCalendar(lesson, true)
                }), ...this.$store.state.timetables.lessons.filter(lesson => {
                    return this.$store.state.lessonmanager.lesson?lesson.id !== this.$store.state.lessonmanager.lesson.id:true
                }).map((lesson) => {
                    return this.toEventCalendar(lesson)
                })]
            },
            lesson_place_id: {
                get() {
                    return this.$store.state.lessonmanager.lesson.actual_place_id;
                },
                set(value) {
                    this.$store.commit('setManagedLesson', {
                        ...this.$store.state.lessonmanager.lesson,
                        actual_place_id: value
                    });
                    this.updateCollision();
                }
            },
            lesson_teacher_id: {
                get() {
                    return this.$store.state.lessonmanager.lesson.actual_teacher_id;
                },
                set(value) {
                    this.$store.commit('setManagedLesson', {
                        ...this.$store.state.lessonmanager.lesson,
                        actual_teacher_id: value
                    })
                    this.updateCollision();
                }
            },
            lesson_start_at: {
                get() {
                    return this.$store.state.lessonmanager.lesson.actual_start_at;
                },
                set(value) {
                    this.$store.commit('setManagedLesson', {
                        ...this.$store.state.lessonmanager.lesson,
                        actual_start_at: value
                    })
                }
            },
            lesson_end_at: {
                get() {
                    return this.$store.state.lessonmanager.lesson.actual_end_at;
                },
                set(value) {
                    this.$store.commit('setManagedLesson', {
                        ...this.$store.state.lessonmanager.lesson,
                        actual_end_at: value
                    })
                }
            }
        },
        data: () => ({
            loading: false,
            calendarPlugins: [dayGridPlugin, timeGrid, interaction, rrulePlugin],
            user: null,
            filter: {
                group_ids: null,
                teacher_ids: null,
                place_ids: null,
                user_ids: null

            },
            collisionLessons: []
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