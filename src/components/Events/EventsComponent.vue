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

        <v-row>
            <v-col :key="event.id" lg="3" v-for="event in events">
                <v-card
                        class="mx-auto"
                >
                    <v-img
                            :src="event.header_url"
                            height="200px"
                    ></v-img>

                    <v-card-title class="title">{{event.name}}</v-card-title>

                    <v-card-subtitle>
                        {{event.start_at}}
                    </v-card-subtitle>
                    <v-card-text>
                        {{event.description}}
                    </v-card-text>
                    <v-card-actions>

                        <v-btn :to="{name: 'events.item', params: {id: event.id}}"
                               color="blue"
                               text
                        >
                            Подробнее
                        </v-btn>

                        <v-spacer></v-spacer>
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>

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