<template>
    <v-container :fluid="$store.state.user.fluid" class="mh-100">
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-card>
            <v-card-title>Расписание</v-card-title>
            <v-card-subtitle>{{$store.state.user.currentUser.name}}</v-card-subtitle>

            <v-card-text>
                <v-row  align-content="center" justify="space-around">
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
            <v-col cols="12" lg="3"
                   v-if="$store.state.user.currentUser.admin || $store.state.user.currentUser.role === 'employee'">
                <v-card>
                    <v-card-title>Редактирование занятия</v-card-title>
                    <v-card-text v-if="$store.state.lessonmanager.lesson === null">Нажмите на пару, которую хотите
                        редактировать.
                    </v-card-text>
                    <v-card-text v-else>
                        <v-autocomplete :items="$store.state.timetables.disciplines"
                                        :value="$store.state.lessonmanager.lesson.schedule.discipline_id"
                                        disabled
                                        item-text="name" item-value="id" label="Дисциплина"
                                        readonly/>
                        <v-autocomplete :items="$store.state.timetables.places" item-text="name" item-value="id"
                                        label="Аудитория"
                                        v-model="lesson_place_id"/>
                        <v-autocomplete :items="$store.state.timetables.employees"
                                        :value="$store.state.lessonmanager.lesson.actual_teacher_id"
                                        item-text="name" item-value="id"
                                        label="Преподаватель" v-model="lesson_teacher_id"/>

                        <v-text-field label="Дата и время начала пары" v-model="lesson_start_at"/>
                        <v-text-field label="Дата и время конца пары" v-model="lesson_end_at"/>
                        <v-checkbox label="Изменить последующие" v-model="moveAll"/>
                        <v-btn @click="$store.commit('setManagedLesson', null), collisionLessons = []"
                               color="red darken-2"
                               text>Отмена
                        </v-btn>
                        <v-btn @click="save" color="blue darken-2" text>Сохранить</v-btn>
                    </v-card-text>
                </v-card>
                <TransferredLessonsComponent @scrollCalendar="$refs.fullCalendar.getApi().gotoDate($event)"
                                             class="mt-2"/>
                <CollisionsComponent @scrollCalendar="$refs.fullCalendar.getApi().gotoDate($event)" class="mt-2"/>
            </v-col>
            <v-col :lg="$store.state.user.currentUser.admin || $store.state.user.currentUser.role === 'employee'?9:12"
                   cols="12">
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
                                    @eventClick="eventClick"
                                    @eventDrop="eventDrop"
                                    @eventResize="eventDrop"
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
    import CollisionsComponent from "@/components/Timetables/CollisionsComponent";
    import TransferredLessonsComponent from "@/components/Timetables/TransferredLessonsComponent";

    export default {
        name: "MyTimetableComponent",
        mounted() {
            this.$emit('changeTitle', 'Мое расписание');
            this.$store.dispatch('getEmployees');
            this.$store.dispatch('getDisciplines');
            this.$store.dispatch('getPlaces');
            this.$store.dispatch('getSubgroups');
            this.$store.dispatch('getStudentGroups');
            this.$store.dispatch('getCollisions');
            this.$store.dispatch('getTransferredLessons', {filter: {teacher_ids: [this.$store.state.user.currentUser.id]}});

            if (this.$route.params.id) this.filter.user_ids = [this.$route.params.id];
            else this.filter.user_ids = [this.$store.state.user.currentUser.id];
            this.search();
        },
        watch: {
            '$store.state.timetables.lessons': function(){
                this.updateLessons()
            }
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
                this.overlay = true;
                this.collisionLessons = [];
                let id = e.event.id;
                let lesson = this.$store.getters.getLessonByID(parseInt(id));
                if (lesson.actual_teacher_id === this.$store.state.user.currentUser.id || this.$store.state.user.currentUser.admin) {
                    this.$store.commit('setManagedLesson', lesson);
                    this.updateCollision();


                }
            },

            updateCollision() {
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
                    this.overlay = true
                    this.updateLessons()
                })
            },
            updateLessons() {
                this.overlay = true
                this.events = this.getLessons()
                this.overlay = false
            },
            getLessons() {

                let manage_lesson = [];
                if (this.$store.state.lessonmanager.lesson) {
                    manage_lesson = this.$store.state.lessonmanager.moveAll ? [this.toEventCalendarPeriod(this.$store.state.lessonmanager.lesson)] : [this.toEventCalendar(this.$store.state.lessonmanager.lesson)];
                }
                // eslint-disable-next-line no-console
                //console.log(manage_lesson);
                return [...manage_lesson, ...this.collisionLessons/*.filter(lesson => {
                    return this.$store.getters.getLessonByID(parseInt(lesson.id)) === undefined
                })*/.map((lesson) => {
                    return this.toEventCalendar(lesson, true)
                }), ...this.$store.state.timetables.lessons.filter(lesson => {
                    return this.$store.state.lessonmanager.lesson ? this.$store.state.lessonmanager.moveAll ? this.$store.state.lessonmanager.lesson.id !== lesson.id && (this.$store.state.lessonmanager.lesson.schedule.id !== lesson.schedule.id || this.$moment(lesson.actual_start_at).isSameOrBefore(this.$moment(this.$store.state.lessonmanager.lesson.actual_start_at))) : lesson.id !== this.$store.state.lessonmanager.lesson.id : true
                }).map((lesson) => {
                    return this.toEventCalendar(lesson)
                })]
            },
            eventDrop(e) {
                this.collisionLessons = []
                let start_at = this.$moment(e.event.start).format("YYYY-MM-DD HH:mm:ss");
                let end_at = this.$moment(e.event.end).format("YYYY-MM-DD HH:mm:ss");
                // eslint-disable-next-line no-console
                console.log(start_at, end_at);
                this.$store.commit('setManagedLesson', {
                    ...this.$store.state.lessonmanager.lesson,
                    actual_start_at: start_at,
                    actual_end_at: end_at
                });
                //this.updateCollision()
            },

            save() {
                this.overlay = true
                let lesson = this.$store.state.lessonmanager.lesson;
                this.$store.dispatch('moveLesson', {
                    id: lesson.id,
                    new_teacher_id: lesson.actual_teacher_id,
                    new_place_id: lesson.actual_place_id,
                    new_start_at: lesson.actual_start_at,
                    new_end_at: lesson.actual_end_at,
                    move_all: this.$store.state.lessonmanager.moveAll
                }).then(() => {
                    this.search();
                    this.$store.commit('setManagedLesson', null)
                    this.$store.commit('setMoveAll', false)
                    this.$store.dispatch('getCollisions');
                    this.collisionLessons = [];
                    this.$store.dispatch('getTransferredLessons', {filter: {teacher_ids: [this.$store.state.user.currentUser.id]}});
                    this.updateLessons();
                })
            },
            toEventCalendarPeriod(lesson) {
                let duration = this.$moment.duration(this.$moment(lesson.actual_end_at).diff(this.$moment(lesson.actual_start_at)))
                // eslint-disable-next-line no-console
                console.log(duration);
                return {
                    id: parseInt(lesson.id),
                    groupId: parseInt(lesson.schedule.id),
                    title: lesson.schedule.discipline.short_name + " | " + lesson.teacher.name + " | " + lesson.place.name + "\n" + lesson.schedule.subgroups.map(el => {
                        return el.name
                    }).join(", "),
                    backgroundColor: 'gray',
                    textColor: 'white',
                    borderColor: lesson.actual_teacher_id === this.$store.state.user.currentUser.id ? 'yellow' : 'black',
                    editable: this.$store.state.lessonmanager.lesson ? parseInt(this.$store.state.lessonmanager.lesson.id) === parseInt(lesson.id) : false,
                    rrule: {
                        freq: 'weekly',
                        interval: lesson.schedule.periodicity,
                        byweekday: [this.$moment(lesson.actual_start_at).day() - 1],
                        dtstart: this.$moment(lesson.actual_start_at).toISOString(),
                        until: this.$moment("2020-05-31 11:00:00").toISOString(),
                    },
                    duration: duration.hours() + ":" + duration.minutes()


                }
            },

            toEventCalendar(lesson, gray = false) {
                // eslint-disable-next-line no-unused-vars
                let colColor = 'gray';
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
                    id: parseInt(lesson.id),
                    /*groupId: lesson.schedule.id, */
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
                    rendering: gray ? 'background' : 'normal',

                }

            }

        },
        computed: {
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
                    this.updateLessons();
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
                    this.updateLessons();
                }
            },
            lesson_start_at: {
                get() {
                    return this.$store.state.lessonmanager.lesson.actual_start_at;
                },
                set(value) {
                    let duration = this.$moment.duration(this.$moment(value).diff(this.$moment(value)))
                    this.$store.commit('setManagedLesson', {
                        ...this.$store.state.lessonmanager.lesson,
                        actual_start_at: value,
                        actual_end_at: this.$moment(this.$store.state.lessonmanager.lesson.actual_end_at).add(duration).toISOString()
                    });

                    this.updateLessons();
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
                    this.updateLessons();
                }
            },
            moveAll: {
                get() {
                    return this.$store.state.lessonmanager.moveAll;
                },
                set(value) {
                    this.$store.commit('setMoveAll', value)
                    this.updateLessons();
                }
            }
        },
        data: () => ({
            loading: false,
            overlay: true,
            calendarPlugins: [dayGridPlugin, timeGrid, interaction, rrulePlugin],
            user: null,
            filter: {
                group_ids: null,
                teacher_ids: null,
                place_ids: null,
                user_ids: null

            },
            events: [],
            collisionLessons: []
        }),
        components: {
            TransferredLessonsComponent,
            FullCalendar, CollisionsComponent
        },
    }
</script>

<style lang="scss">
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
    @import '~@fullcalendar/timegrid/main.css';
</style>