<template>
    <div>
        <v-card>
            <v-skeleton-loader
                    type="list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line"
                    v-if="!event"
            >

            </v-skeleton-loader>
        </v-card>
        <v-card>
            <v-card-text>

                <v-row>
                    <v-col cols="12" md="6">

                        <v-card>
                            <v-card-text>
                                <h4>Статистика участников по кафедрам</h4>
                                <Chart :keys='statistics.department.map(e => e[0].length === 0?"Не указано":e[0])'
                                       :values="statistics.department.map(e => e[1])"
                                       v-if="statistics.department.length > 0"/>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-text>
                                <h4>Статистика участников по институтам</h4>
                                <Chart :keys='statistics.institute.map(e => e[0].length === 0?"Не указано":e[0])'
                                       :values="statistics.institute.map(e => e[1])"
                                       v-if="statistics.institute.length > 0"/>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>


        </v-card>
    </div>
</template>

<script>
    import events from "@/api/events.js";
    import Chart from "@/components/Chart.vue";

    export default {
        name: "EventStatsComponent",
        methods: {},
        components: {Chart},
        data() {
            return {
                statistics: {
                    department: [],
                    institute: []
                },
            }
        },
        computed: {
            event() {
                return this.$store.state.events.currentEvent
            }
        },
        mounted() {
            events.stats({id: this.$store.state.events.currentEvent.id}).then((r) => {
                this.statistics.department = Object.entries(r.data.department);
                this.statistics.institute = Object.entries(r.data.institute);
            })
        }
    }
</script>

<style scoped>

</style>
