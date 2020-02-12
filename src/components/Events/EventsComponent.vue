<template>
    <v-container :fluid="$store.state.user.fluid">
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

                    <v-card-title class="title">{{event.name.slice(0, 28)}}</v-card-title>

                    <v-card-subtitle>
                        {{event.start_at}}
                    </v-card-subtitle>
                    <v-card-text>
                        {{event.description.slice(0, 200)}} ...
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
        computed:{
            events(){
                if(this.my) return this.$store.state.user.currentUserEvents;
                else return this.$store.state.events.events;
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