<template>
    <div>
        <v-card-text>
            <v-row align="center">
                <v-col>
                    <v-btn-toggle
                            mandatory
                            v-model="mode"
                    >
                        <v-btn :value="1" small>
                            По командам
                        </v-btn>
                        <v-btn :value="0" small>
                            По членам жюри
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
            <template v-if="mode === 1">
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
                            <th class="text-left">Команда</th>
                            <th style="width: 100px; font-size: 10px; writing-mode: lr-tb !important;" :key="rubric.id"
                                v-for="rubric in $store.state.events.currentEvent.rubrics">{{rubric.title}}
                            </th>
                            <th>Общий балл</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="team_.id" v-for="team_ in $store.state.events.teams">
                            <td>{{ team_.name }}</td>
                            <td style="width: 100px; font-size: 12px;" :key="rubric.id" class="text-left"
                                v-for="rubric in $store.state.events.currentEvent.rubrics">
                                    <v-text-field style="vertical-align: middle !important;"
                                            :loading="loading"
                                            :value="getPointEarned(team_.id, $store.state.user.currentUser.id, rubric.id)"
                                            :min="0"
                                            outlined
                                            dense
                                            :rules="[value => value >= 0 && value <= rubric.points_max || 'Недопустимый балл']"
                                            :max="rubric.points_max"
                                            type="number"
                                            v-on:change="updatePoint($store.state.user.currentUser.id, rubric.id, $event, team_.id)"
                                    ></v-text-field>
                            </td>
                            <td>
                                {{$store.getters.getTotalTeamPointsByTeamIdAndAdminID(team_.id, $store.state.user.currentUser.id)}}
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
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
                            <td :key="rubric.id" class="text-center"
                                v-for="rubric in $store.state.events.currentEvent.rubrics">{{rubric.title}}
                            </td>
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
                                            :min="0"
                                            :rules="[value => value >= 0 && value <= rubric.points_max || 'Недопустимый балл']"
                                            :max="rubric.points_max"
                                            outlined
                                            full-width
                                            type="number"
                                            v-on:change="updatePoint(user.id, rubric.id, $event, team.id)"
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
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "EventUserPointSetComponent",
        data() {
            return {
                mode: 1,
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
            updatePoint(admin_id, rubric_id, points_earned, team_id) {
                this.loading = true;
                this.$store.dispatch('updateEventTeamPoint', {
                    team_id,
                    admin_id,
                    rubric_id,
                    points_earned
                }).then(() => {
                    this.loading = false
                }).catch(() => {
                    this.loading = false;
                })
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
