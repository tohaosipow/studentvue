<template>
    <v-container :fluid="$store.state.user.fluid">
        <v-tooltip left :value="true">
            <template v-slot:activator="{ on }">
                <v-btn
                        color="blue darken-2"
                        dark
                        to="/events/create"
                        v-on="on"
                        fab
                        fixed
                        right
                        bottom
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <span>Создайте мероприятие</span>
        </v-tooltip>
        <v-tabs
                v-model="actual"
                background-color="white"
                color="blue darken-2 accent-4"
                right
        >
            <v-tab>Прошедшие</v-tab>
            <v-tab>Актуальные</v-tab>
        </v-tabs>

        <!--
        <v-card disabled elevation="0">
            <v-card-title>Поиск мероприятий</v-card-title>
            <v-card-subtitle>Выберите интересующие Вас фильтры</v-card-subtitle>
            <v-card-text>
                <v-row align-content="center" justify="center">
                    <v-col lg="3">
                        <InputDatePicker label="Дата начала"/>

                    </v-col>
                    <v-col lg="3">
                        <InputDatePicker  label="Дата конца"/>
                    </v-col>
                    <v-col lg="3">
                        <v-autocomplete   autocomplete="off" label="Место проведения"></v-autocomplete>
                    </v-col>
                    <v-col lg="3">
                        <v-autocomplete   autocomplete="off" item-value="id" item-text="name"  :items="$store.state.timetables.employees" label="Организатор"></v-autocomplete>
                    </v-col>
                    <v-col lg="3">
                        <v-checkbox label="Показать прошедшие"></v-checkbox>
                    </v-col>
                    <v-col lg="3">
                        <v-autocomplete label="Теги" multiple chips autocomplete="off"/>
                    </v-col>
                    <v-col lg="3">
                        <v-btn color="blue darken-2" dark>Найти мероприятия</v-btn>
                    </v-col>
                </v-row>

            </v-card-text>
        </v-card> !-->

        <v-row v-if="events.length > 0">
            <v-col :key="event.id" lg="12" v-for="event in events">
                <v-card outlined
                        :loading="loading"
                        class="mx-auto"
                >
                    <template slot="progress">
                        <v-progress-linear
                                color="deep-purple"
                                height="10"
                                indeterminate
                        ></v-progress-linear>
                    </template>

                    <v-row align-content="stretch">
                        <v-col lg="4" cols="12">
                            <v-img
                                    height="100%"
                                    max-width="100%"
                                    contain
                                    class="align-end"
                                    :src="event.header_url"
                            >
                            </v-img>
                        </v-col>
                        <v-col lg="8" cols="12">
                            <v-card-title style="white-space: normal">
                                <b>{{$moment(event.start_at).format("DD.MM.YYYY")}}</b>: {{event.name}}
                            </v-card-title>

                            <v-card-text>

                                <v-row
                                        align="center"
                                        class="mx-0"
                                >
                                    <v-rating
                                            :value="parseFloat(event.rate)"
                                            color="amber"
                                            dense
                                            half-increments
                                            readonly
                                            size="14"
                                    ></v-rating>

                                    <div class="grey--text ml-4">
                                        {{event.rate}}
                                    </div>
                                    <div>
                                        {{event.participants_count}} участников
                                    </div>
                                </v-row>

                                <div class="my-4 subtitle-1">

                                </div>

                                <div style="max-height: 200px; overflow: hidden">
                                    {{event.description}}
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                        color="blue lighten-2"
                                        text
                                        :to="{name: 'events.item.info', params: {id: event.id}}"
                                >
                                    Перейти к мероприятию
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>





<!--                    <v-divider class="mx-4"></v-divider>-->

<!--                    <v-card-title>Tonight's availability</v-card-title>-->

<!--                    <v-card-text>-->
<!--                        <v-chip-group-->
<!--                                v-model="selection"-->
<!--                                active-class="deep-purple accent-4 white&#45;&#45;text"-->
<!--                                column-->
<!--                        >-->
<!--                            <v-chip>5:30PM</v-chip>-->

<!--                            <v-chip>7:30PM</v-chip>-->

<!--                            <v-chip>8:00PM</v-chip>-->

<!--                            <v-chip>9:00PM</v-chip>-->
<!--                        </v-chip-group>-->
<!--                    </v-card-text>-->


                </v-card>

<!--                <v-card outlined-->
<!--                        class="mx-auto"-->
<!--                >-->
<!--                    <v-img-->
<!--                            :src="event.header_url"-->
<!--                            height="200px"-->
<!--                    ></v-img>-->

<!--                    <v-card-title class="title">{{event.name}}</v-card-title>-->

<!--                    <v-card-subtitle>-->
<!--                        {{event.start_at}}-->
<!--                    </v-card-subtitle>-->
<!--                    <v-card-text>-->
<!--                        <div style="height: 150px; display: inline-block; overflow:hidden;  text-overflow: ellipsis;">-->
<!--                            {{event.description}}-->
<!--                        </div>-->

<!--                    </v-card-text>-->
<!--                    <v-card-actions>-->

<!--                        <v-btn :to="{name: 'events.item.info', params: {id: event.id}}"-->
<!--                               color="blue"-->
<!--                               text-->
<!--                        >-->
<!--                            Подробнее-->
<!--                        </v-btn>-->

<!--                        <v-spacer></v-spacer>-->
<!--                    </v-card-actions>-->

<!--                </v-card>-->
            </v-col>
        </v-row>
        <div v-else>
            <v-alert class="mt-2"
                    outlined
                    type="warning"
                    border="left"
            >
               Ближайших мероприятий нет, но вы можете организовать новое
            </v-alert>
        </div>

    </v-container>
</template>

<script>
   // import InputDatePicker from "@/components/Utility/InputDatePicker";

    export default {
        name: "EventsComponent",
        components: {
           // InputDatePicker
        },
        mounted() {
            this.$store.dispatch('getEvents');
            this.$store.dispatch('getUserEvents');
            this.$store.dispatch('getEmployees');
            this.$emit('changeTitle', 'Мероприятия')
        },
        data(){
          return{
              actual: 1
          }
        },
        computed:{
            events(){
                if(this.my)  return this.$store.state.events.events.filter((el) => {return this.actual === 0 && this.$moment(el.check_end_at).isBefore(this.$moment()) ||  this.actual == 1  && this.$moment(el.check_end_at).isAfter(this.$moment()) })
                else return this.$store.state.events.events.filter((el) => {return this.actual === 0 && this.$moment(el.check_end_at).isBefore(this.$moment()) ||  this.actual == 1  && this.$moment(el.check_end_at).isAfter(this.$moment()) })
            }
        },
        props: {
            my: {
                default: false,
                type: Boolean
            }
        }
    }
</script>

<style scoped>

</style>
