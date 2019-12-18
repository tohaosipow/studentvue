<template>
    <v-container>
        <v-row>
            <v-col :key="event.id" lg="4" v-for="event in events">
                <v-card
                        class="mx-auto"
                        max-width="344"
                >
                    <v-img
                            :src="event.header_url"
                            height="200px"
                    ></v-img>

                    <v-card-title>
                        {{event.name}}
                    </v-card-title>

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
    export default {
        name: "EventsComponent",
        mounted() {
            this.$store.dispatch('getEvents');
            this.$store.dispatch('getUserEvents');
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