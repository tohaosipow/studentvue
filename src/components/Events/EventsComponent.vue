<template>
    <v-container>
        <v-row>
            <v-col :key="event.id" v-for="event in $store.state.events.events" lg="4">
                <v-card
                        class="mx-auto"
                        max-width="344"
                >
                    <v-img
                            height="200px"
                            :src="event.header_url"
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
                            Участвовать
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

        }
    }
</script>

<style scoped>

</style>