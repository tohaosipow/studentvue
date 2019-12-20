<template>
    <v-card>
        <v-card-text>
            <v-row align="center">
                <v-col>
                    <v-btn-toggle
                            mandatory
                            v-model="mode"
                    >
                        <v-btn small>
                            По участникам
                        </v-btn>
                        <v-btn small>
                            Сводный
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-col md="4">
                    <template v-if="mode === 0">
                        <v-select
                                :items="$store.state.events.teams"
                                item-text="name"
                                label="Команда"
                                return-object
                                v-model="team"
                        ></v-select>
                    </template>
                </v-col>
            </v-row>
            <template v-if="mode === 0 && team">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th></th>
                            <th :colspan="$store.state.events.currentEvent.rubrics.length" class="text-center">
                                Критерии
                            </th>
                        </tr>
                        <tr>
                            <th class="text-left">Член жюри</th>
                            <th :key="rubric.id" class="text-left"
                                v-for="rubric in $store.state.events.currentEvent.rubrics">{{rubric.title}}
                            </th>
                            <th>Общий балл</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="user.id" v-for="user in $store.getters.jury">
                            <td>{{ user.name }}</td>
                            <td :key="rubric.id" class="text-left"
                                v-for="rubric in $store.state.events.currentEvent.rubrics">
                                <v-list-item>
                                    <v-text-field
                                            :loading="loading"
                                            :value="getPointEarned(team.id, user.id, rubric.id)"
                                            label="Выставите балл"
                                            :min="0"
                                            :rules="[value => value >= 0 && value <= rubric.points_max || 'Недопустимый балл']"
                                            :max="rubric.points_max"
                                            single-line
                                            :suffix="'/ '+rubric.points_max"
                                            type="number"
                                            v-on:change="updatePoint(user.id, rubric.id, $event)"
                                    ></v-text-field>
                                </v-list-item>
                            </td>
                            <td>
                                {{$store.getters.getTotalTeamPointsByTeamIdAndAdminID(team.id, user.id)}}
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "EventUserPointSetComponent",
        data() {
            return {
                mode: 0,
                loading: false,
                team: null
            }
        },
        computed: {
            ...mapGetters({
                getPoint: 'getEventTeamPointsByTeamIdAndAdminIDAndRubricID'
            })
        },

        methods: {
            getPointEarned(team_id, admin_id, rubric_id) {
                let result = this.getPoint(team_id, admin_id, rubric_id)[0];
                return !result ? null : result.points_earned;
            },
            updatePoint(admin_id, rubric_id, points_earned) {
                this.loading = true;
                this.$store.dispatch('updateEventTeamPoint', {
                    team_id: this.team.id,
                    admin_id,
                    rubric_id,
                    points_earned
                }).then(() => {
                    this.loading = false
                });
            }
        },
        mounted() {
            Promise.all([this.$store.dispatch('getTeams', {event_id: this.$store.state.events.currentEvent.id}), this.$store.dispatch('getEventAdmins', {id: this.$store.state.events.currentEvent.id}), this.$store.dispatch('getEventTeamPoints', {id: this.$store.state.events.currentEvent.id})]).then(() => {
                this.loading = false
            });
        }
    }
</script>

<style scoped>

</style>