<template>
    <v-row>
        <v-col lg="7" cols="12">
            <v-card :loading="loadings.users">
                <v-card-title>Рейтинг студентов</v-card-title>
                <BarChart v-if="!loadings.users" height="100" :keys="student_rates.map(el => el.name)"
                          :values="student_rates.map(el => el.score)"/>
                <v-data-table
                        :headers="[
                            { text: '#', value: 'id' },
                            { text: 'Фамилия', value: 'last_name'},
                            { text: 'Имя', value: 'first_name' },
                            { text: 'Институт', value: 'student_group.department.institute.name' },
                            { text: 'Кафедра', value: 'student_group.department.name' },
                            { text: 'Группа', value: 'student_group.name' },
                            { text: 'Рейтинг', value: 'score' }
                        ]"
                        :items="student_rates"
                        :items-per-page="100"
                        class="elevation-1"
                >
                    <template v-slot:item.score="{ item }">
                        <v-chip
                                dark
                        >
                            {{ item.score }}
                        </v-chip>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
        <v-col lg="5" cols="12">
            <v-card :loading="loadings.groups">
                <v-card-title>Рейтинг студ. групп</v-card-title>
                <BarChart v-if="!loadings.groups" height="100" :keys="group_rates.map(el => el.name)"
                          :values="group_rates.map(el => el.score)"/>
                <v-data-table
                        :headers="[
                            { text: '#', value: 'id' },
                            { text: 'Группа', value: 'name' },
                            { text: 'Институт', value: 'department.institute.name' },
                            { text: 'Рейтинг', value: 'score' }
                        ]"
                        :items="group_rates"
                        :items-per-page="100"
                        class="elevation-1"
                >
                    <template v-slot:item.score="{ item }">
                        <v-chip
                                dark
                        >
                            {{ item.score }}
                        </v-chip>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>

</template>

<script>
    import users from "@/api/users.js";
    import student_groups from "@/api/student_groups.js";
    import BarChart from "@/components/BarChart.vue";

    export default {
        components: {BarChart},
        name: "RatingsComponent",
        data() {
            return {
                student_rates: [],
                group_rates: [],
                loadings: {
                    users: true,
                    groups: true,
                }
            }
        },
        mounted() {
            users.rating().then((r) => {
                this.student_rates = r.data;
                this.loadings.users = false;
            });
            student_groups.rating().then((r) => {
                this.group_rates = r.data;
                this.loadings.groups = false;
            })
        }
    }
</script>

<style scoped>

</style>
