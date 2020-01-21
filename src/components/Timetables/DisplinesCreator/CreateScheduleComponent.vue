<template>
    <v-card class="mt-2" elevation="0">
        <v-card-text>
            <InputDatePicker :min="d_state.discipline.period.start_at" :value="start_at"
                             @input="start_at = $event" label="Дата первого занятия"></InputDatePicker>

            <v-autocomplete :clearable="true"
                            :items="$store.state.timetables.places"
                            aria-autocomplete="none"
                            item-text="name"
                            item-value="id"
                            label="Аудитория"
                            no-data-text="Такой аудитории у нас нет"
                            return-object
                            v-model="place"
            ></v-autocomplete>

            <v-autocomplete :clearable="true"
                            :items="$store.state.timetables.lesson_nums"
                            aria-autocomplete="none"
                            item-text="name"
                            item-value="id"
                            label="Номер пары"
                            no-data-text="Не найдено"
                            return-object
                            v-model="lesson_num"
            ></v-autocomplete>
            <InputTimePicker :value="time_start_at" @input="time_start_at = $event" label="Время начала пары"
                             max="21:30"
                             min="08:00"></InputTimePicker>
            <InputTimePicker :value="time_end_at" @input="time_end_at = $event" label="Время конца пары" max="21:30"
                             min="08:00"></InputTimePicker>

            <v-autocomplete :clearable="true"
                            :items="[
                                {id: 0, name: 'Однократно'},
                                {id: 1, name: 'Раз в неделю'},
                                {id: 2, name: 'Раз в 2 недели'},
                                {id: 3, name: 'Раз в 3 недели'},
                                {id: 4, name: 'Раз в 4 недели'},
                                {id: 5, name: 'Раз в 5 недель'},

                            ]"
                            aria-autocomplete="none"
                            item-text="name"
                            item-value="id"
                            label="Переодичность"
                            no-data-text="Не найдено"
                            v-model="periodicity"
            ></v-autocomplete>

            <v-autocomplete :clearable="true"
                            :items="$store.state.timetables.periods"
                            aria-autocomplete="none"
                            item-text="name"
                            item-value="id"
                            label="Период"
                            no-data-text="Период"
                            return-object
                            v-model="period"
            ></v-autocomplete>

            <v-autocomplete :clearable="true"
                            :items="$store.state.timetables.employees"
                            aria-autocomplete="none"
                            item-text="name"
                            item-value="id"
                            label="Преподаватель"
                            no-data-text="Такого преподавателя у нас нет"
                            return-object
                            v-model="teacher"
            ></v-autocomplete>

            <v-autocomplete :clearable="true"
                            :items="$store.state.timetables.subgroups"
                            aria-autocomplete="none"
                            chips
                            item-text="name"
                            item-value="id"
                            v-model="subgroups"
                            label="Участники"
                            multiple
                            no-data-text="Такой подгруппы нет"
                            return-object
            >
                <template v-slot:prepend-item>
                    <v-list-item @click="() => {createSubgroupModalShow = true}"
                                 ripple
                    >
                        <v-list-item-action>
                            <v-icon color="green">mdi-plus</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Создать подгруппу</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                </template>
            </v-autocomplete>

            <v-dialog max-width="800" v-model="createSubgroupModalShow">
                <CreateSubgroupModal
                        @close="() => {this.createSubgroupModalShow = false; this.$store.dispatch('getSubgroups');}"/>
            </v-dialog>
            <v-card-actions>
                <v-btn @click="storeSchedule" color="blue darken-2" text>Сохранить</v-btn>
            </v-card-actions>
        </v-card-text>
    </v-card>
</template>

<script>

    import InputDatePicker from "@/components/Utility/InputDatePicker";
    import InputTimePicker from "@/components/Utility/InputTimePicker";
    import CreateSubgroupModal from "@/components/Timetables/EditSubgroupsModal";

    let makeScheduleGetterAndSetter = (property, context) => {
        return {
            get() {
                return context.d_state.discipline.schedules[context.schedule_index][property];
            },
            set(value) {
                let schedule = {...context.d_state.discipline.schedules[context.schedule_index]};
                schedule[property] = value;
                context.$store.commit('updateScheduleByIndex', {index: context.schedule_index, schedule: schedule})
            }
        }
    }

    export default {
        name: "CreateScheduleComponent",
        data() {
            return {
                createSubgroupModalShow: false
            }
        },

        props: {
            schedule: {},
            schedule_index: {}
        },
        computed: {
            d_state() {
                return this.$store.state.discreator;
            },

            period: {
                get() {
                    return makeScheduleGetterAndSetter('period', this).get();
                },
                set(value) {
                    return makeScheduleGetterAndSetter('period', this).set(value);
                }
            },

            teacher: {
                get() {
                    return makeScheduleGetterAndSetter('teacher', this).get();
                },
                set(value) {
                    return makeScheduleGetterAndSetter('teacher', this).set(value);
                }
            },
            place: {
                get() {
                    return makeScheduleGetterAndSetter('place', this).get();
                },
                set(value) {
                    return makeScheduleGetterAndSetter('place', this).set(value);
                }
            },

            lesson_num: {
                get() {
                    return makeScheduleGetterAndSetter('lesson_num', this).get();
                },
                set(value) {
                    /*if(value) {
                        // eslint-disable-next-line no-debugger
                        debugger;
                        makeScheduleGetterAndSetter('time_start_at', this).set(value.start_at);
                        makeScheduleGetterAndSetter('time_end_at', this).set(value.end_at);

                    } */
                    makeScheduleGetterAndSetter('lesson_num', this).set(value);
                    makeScheduleGetterAndSetter('time_start_at', this).set(value.start_at);
                    makeScheduleGetterAndSetter('time_end_at', this).set(value.end_at);

                }
            },
            start_at: {
                get() {
                    return makeScheduleGetterAndSetter('start_at', this).get();
                },
                set(value) {
                    makeScheduleGetterAndSetter('start_at', this).set(value);
                    makeScheduleGetterAndSetter('day_of_week', this).set(this.$moment(value).weekday());
                }
            },
            periodicity: {
                get() {
                    return makeScheduleGetterAndSetter('periodicity', this).get();
                },
                set(value) {
                    return makeScheduleGetterAndSetter('periodicity', this).set(value);
                }
            },
            time_start_at: {
                get() {
                    return makeScheduleGetterAndSetter('time_start_at', this).get();
                },
                set(value) {
                    return makeScheduleGetterAndSetter('time_start_at', this).set(value);
                }
            },
            time_end_at: {
                get() {
                    return makeScheduleGetterAndSetter('time_end_at', this).get();
                },
                set(value) {
                    return makeScheduleGetterAndSetter('time_end_at', this).set(value);
                }
            },
            subgroups: {
                get() {
                    return makeScheduleGetterAndSetter('subgroups', this).get();
                },
                set(value) {
                    return makeScheduleGetterAndSetter('subgroups', this).set(value);
                }
            },
        },

        methods: {
            storeSchedule() {
                let schedule = this.d_state.discipline.schedules[this.schedule_index];
                this.$store.dispatch('storeSchedule', {
                    index: this.schedule_index,
                    id: schedule.id,
                    discipline_id: schedule.discipline.id,
                    teacher_id: schedule.teacher.id,
                    place_id: schedule.place.id,
                    day_of_week: schedule.day_of_week,
                    periodicity: schedule.periodicity,
                    period_id: schedule.period.id,
                    lesson_num_id: schedule.lesson_num.id,
                    start_at: schedule.start_at,
                    time_start_at: schedule.time_start_at,
                    time_end_at: schedule.time_end_at,
                    subgroups: schedule.subgroups.map((el) => {return el.id}).join(",")

                });
            },


        },

        mounted() {
        },
        create() {

        },
        components: {
            InputDatePicker, InputTimePicker, CreateSubgroupModal
        }
    }
</script>

<style lang="scss" scoped>

</style>