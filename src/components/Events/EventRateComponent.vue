<template>
    <v-dialog :value="dialog  && $store.state.events.userStatus.rate_useful_for_me === null" max-width="400">
        <v-card v-if="$store.state.events.userStatus.rate_useful_for_me === null" elevation="0">
            <v-card-title>Оцените мероприятие</v-card-title>
            <v-card-subtitle>Это анонимно.</v-card-subtitle>
            <v-card-subtitle> Получите 1 балл за оценку</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col>
                        <div>Уровень организации мероприятия</div>
                    </v-col>
                    <v-col>
                        <v-rating
                                background-color="orange lighten-3"
                                color="orange"
                                medium
                                v-model="rate.rate_organization_level"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div>Информационная поддержка мероприятия</div>
                    </v-col>
                    <v-col>
                        <v-rating
                                background-color="orange lighten-3"
                                color="orange"
                                medium
                                v-model="rate.rate_information_support"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div>Насколько интересным мероприятие было для участников</div>
                    </v-col>
                    <v-col>
                        <v-rating
                                background-color="orange lighten-3"
                                color="orange"
                                medium
                                v-model="rate.rate_interesting_for_all"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div>Насколько полезным мероприятие было лично для вас</div>
                    </v-col>
                    <v-col>
                        <v-rating
                                background-color="orange lighten-3"
                                color="orange"
                                medium
                                v-model="rate.rate_useful_for_me"
                        />
                    </v-col>
                </v-row>


            </v-card-text>
            <v-card-actions>
                <v-card-subtitle>
                    <v-rating
                            background-color="red lighten-3"
                            color="red"
                            readonly
                            v-model="rating"
                            x-small
                    />
                </v-card-subtitle>
                <v-spacer/>
                <v-btn @click="send" color="blue darken-2" small outlined>Отправить</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "EventRateComponent",
        computed: {
            rating() {
                return (this.rate.rate_information_support + this.rate.rate_useful_for_me + this.rate.rate_organization_level + this.rate.rate_information_support) / 4;
            }
        },
        data() {
            return {
                rate: {
                    rate_useful_for_me: 1,
                    rate_interesting_for_all: 1,
                    rate_information_support: 1,
                    rate_organization_level: 1,
                },
                dialog: false
            }
        },
        methods:{
            send(){
                this.$store.dispatch('rateEvent', {event_id: this.$store.state.events.currentEvent.id, user_id: this.$store.state.user.currentUser.id, ...this.rate})
            }
        },
        mounted(){
           if(!this.$store.state.user.currentUser.id) this.$router.push('/auth');
           else this.dialog = true
        }
    }
</script>

<style scoped>

</style>