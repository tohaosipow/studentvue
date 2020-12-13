<template>
    <v-container :fluid="$store.state.user.fluid">
        <v-tooltip :value="true" left>
            <template v-slot:activator="{ on }">
                <v-btn
                        bottom
                        color="blue darken-2"
                        dark
                        fab
                        fixed
                        right
                        to="/events/create"
                        v-on="on"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <span>Создайте мероприятие</span>
        </v-tooltip>
        <v-tabs
                background-color="white"
                color="blue darken-2 accent-4"
                right
                v-model="actual"
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
                <v-card :loading="loading"
                        class="mx-auto"
                        outlined
                >
                    <template slot="progress">
                        <v-progress-linear
                                color="deep-purple"
                                height="10"
                                indeterminate
                        ></v-progress-linear>
                    </template>

                    <v-row align-content="stretch">
                        <v-col cols="12" lg="4">
                            <v-img
                                    :src="event.header_url"
                                    class="align-end"
                                    contain
                                    height="100%"
                                    max-width="100%"
                            >
                            </v-img>
                        </v-col>
                        <v-col cols="12" lg="8">
                            <v-card-title style="white-space: normal">
                                <b>{{$moment(event.start_at).format("DD.MM.YYYY")}}</b>: {{event.name}}
                            </v-card-title>

                            <v-card-text>

                                <v-row style="background: #fafafa"
                                        align="center"
                                        class="mx-0"
                                >

                                    <div  v-if="parseFloat(event.rate)" class="grey--text pa-2 mr-4">
                                        рейтинг <br/>
                                        <span class="black--text py-4" style="font-size: 20px;">
                                            {{parseFloat(event.rate).toFixed(2)}}
                                             <v-rating :value="parseFloat(event.rate)"
                                                       color="amber"
                                                       dense
                                                       half-increments
                                                       readonly
                                                       size="14"
                                                       class="ml-2"

                                             ></v-rating>

                                        </span>
                                    </div>
                                    <div class="grey--text pa-2 mr-4">
                                        участвует <br/>
                                        <span class="black--text py-4" style="font-size: 20px;">{{event.participants_count}} чел</span>
                                    </div>
                                    <div class="grey--text pa-2 mr-4">
                                        срок подачи заявок <br/>
                                        <span class="black--text py-4" style="font-size: 20px"> {{$moment(event.check_end_at).format("DD.MM.YYYY")}}</span>
                                    </div>

                                    <div class="grey--text pa-2 mr-4">
                                        продолжительность <br/>
                                        <span class="black--text py-4" style="font-size: 20px">
                                        {{$moment.duration($moment(event.end_at).diff($moment(event.start_at))).hours()}} ч.
                                        {{$moment.duration($moment(event.end_at).diff($moment(event.start_at))).minutes()}} м.
                                            </span>
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
                                        :to="{name: 'events.item.info', params: {id: event.id}}"
                                        color="blue lighten-2"
                                        text
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
            <v-alert border="left"
                     class="mt-2"
                     outlined
                     type="warning"
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
        data() {
            return {
                actual: 1
            }
        },
        computed: {
            events() {
                if (this.my) return [...this.$store.state.events.events.filter((el) => {
                    return this.actual === 0 && this.$moment(el.check_end_at).isBefore(this.$moment()) || this.actual == 1 && this.$moment(el.check_end_at).isAfter(this.$moment())
                })].reverse()
                else return this.$store.state.events.events.filter((el) => {
                    return this.actual === 0 && this.$moment(el.check_end_at).isBefore(this.$moment()) || this.actual == 1 && this.$moment(el.check_end_at).isAfter(this.$moment())
                })
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
