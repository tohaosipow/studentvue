<template>
    <v-card  :elevation="0">
        <v-card-title>Проблемы</v-card-title>
        <v-card-text style="overflow-y: scroll; height: 600px;">
            <v-card  class="mt-2" :key="index"
                    v-for="(col, index) in $store.state.timetables.collisions">
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-icon class="ml-1" color="red" v-if="col.student_collision">mdi-account-group</v-icon>
                    <v-icon color="red" v-if="col.place_collision">mdi-map-marker</v-icon>
                    <v-icon class="ml-1" color="red" v-if="col.teacher_collision">mdi-teach</v-icon>
                </v-card-actions>
                <v-card-title>
                    <span v-if="col.student_collision">{{col.first_lesson.schedule.subgroups.map(el => {return el.name}).join(", ")}} - конфликт групп </span>
                    <span v-else-if="col.place_collision">{{col.first_lesson.place.name}} - конфликт аудитории </span>
                    <span v-else-if="col.teacher_collision">{{col.first_lesson.place.name}} - конфликт преподавателя </span>
                </v-card-title>
                <v-card-subtitle>
                    {{$moment(col.first_lesson.actual_start_at).format("DD.MM HH:mm")}} - {{$moment(col.first_lesson.actual_end_at).format("HH:mm")}}
                </v-card-subtitle>
                <v-card-text>
                    {{col.first_lesson.schedule.discipline.short_name}} -
                    {{col.second_lesson.schedule.discipline.short_name}}
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="goToCollision(col)" text color="grey lighten-1">
                        <v-icon left color="grey lighten-1">mdi-eye</v-icon>
                        Перейти
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "CollisionsComponent",
        methods:{
            goToCollision(col){
                let filter = {};
                if(col.student_collision){
                    filter.subgroup_ids = col.first_lesson.schedule.subgroups.map((el) => {return el.id});
                }
                else if(col.teacher_collision){
                    filter.user_ids = [col.first_lesson.teacher_id]
                }
                else if(col.place_collision){
                    filter.place_ids = [col.first_lesson.actual_place_id]
                }
                // eslint-disable-next-line no-console
                console.log(filter)
                this.$store.dispatch('getLessons', {filter}).then(() => {
                    this.$emit('scrollCalendar', col.first_lesson.actual_start_at)
                });
            }
        }
    }
</script>

<style scoped>

</style>