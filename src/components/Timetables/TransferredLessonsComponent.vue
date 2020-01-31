<template>
    <v-card elevation="0">
        <v-card-title>Мои переносы</v-card-title>
        <v-card-text>
            <v-card v-if="$store.state.timetables.transferredLessons === null || $store.state.timetables.transferredLessons.length < 1">
                <v-card-text>
                    Вы пока ничего не переносили
                </v-card-text>
            </v-card>
            <template v-else>
                <div>Отметьте пары, которые нужно внести в СЗ</div>
                <v-list-item-group
                        multiple
                        v-model="selected"
                >
                    <v-list-item  :key="tl.id" v-for="tl in $store.state.timetables.transferredLessons">
                        <template v-slot:default="{ active, toggle }">
                            <v-list-item-action>
                                <v-checkbox
                                        @click="toggle, url = null"
                                        color="primary"
                                        v-model="active"
                                ></v-checkbox>
                            </v-list-item-action>

                            <v-list-item-content>
                                <v-list-item-title>{{tl.schedule.discipline.short_name}} ({{tl.place.name}})</v-list-item-title>
                                <v-list-item-subtitle>{{$moment(tl.reg_start_at).format('MM.DD HH:mm')}}-{{$moment(tl.reg_end_at).format('HH:mm')}} -> {{$moment(tl.actual_start_at).format('MM.DD HH:mm')}} {{$moment(tl.actual_end_at).format('HH:mm')}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                    </v-list-item>
                </v-list-item-group>
                <v-btn :loading="loading" v-if="url === null" @click="makeDoc" text color="blue darken-2">Сформировать СЗ</v-btn>
                <v-btn  :loading="loading" v-else :href="url" text color="red darken-2">Скачать СЗ</v-btn>
            </template>
        </v-card-text>
    </v-card>
</template>

<script>
    import docs from "@/api/docs";

    export default {
        name: "TransferredLessonsComponent",
        data(){
          return{
              selected: [],
              url: null,
              loading: false
          }
        },
        methods:{
            makeDoc(){
                this.loading = true;
                docs.transferLessonsMakeDoc({lessons: this.selected.map((el) => {return this.$store.state.timetables.transferredLessons[el].id})}).then((r) => {
                    this.url = r.data;
                    this.loading = false;
                })
            }
        },
        mounted() {
            this.$store.dispatch('getTransferredLessons', {filter: {teacher_ids: [this.$store.state.user.currentUser.id]}});
        }
    }
</script>

<style scoped>

</style>