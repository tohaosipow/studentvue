<template>
    <v-sheet>
        <v-alert
                prominent
                type="info"
        >
            <v-row align="center">
                <v-col class="grow">
                    Критерии необходимы для оценки участников. Пока критериев нет, но вы можете их создать.
                </v-col>
                <v-col class="shrink">
                    <v-btn @click="editRubricDialog = true" color="white" outlined>Создать критерий</v-btn>
                </v-col>
            </v-row>
        </v-alert>

        <v-list-item :key="rubric.id" @click="() => {}" v-for="rubric in $store.state.events.currentEvent.rubrics">
            <v-list-item-icon>
                <v-avatar color="blue">{{rubric.points_max}}</v-avatar>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{rubric.title}}</v-list-item-title>
                <v-list-item-subtitle>{{rubric.description}}</v-list-item-subtitle>
            </v-list-item-content>
            <!--<v-list-item-action>
                <v-btn icon>
                    <v-icon color="gray lighten-1">mdi-pencil</v-icon>

                </v-btn>

            </v-list-item-action> !-->
            <v-list-item-action>
                <v-btn icon>
                    <v-icon @click="removeRubric(rubric.id)" color="red lighten-2">mdi-delete</v-icon>

                </v-btn>

            </v-list-item-action>
        </v-list-item>


        <v-dialog max-width="600px" persistent v-model="editRubricDialog">
            <template v-slot:activator="{ on }">
                <v-btn color="blue"
                       dark
                       fab
                       fixed
                       right
                       bottom
                       v-on="on"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <RubricCreateEditComponent :event_id="$store.state.events.currentEvent.id"
                                       v-on:close="editRubricDialog = false"></RubricCreateEditComponent>

        </v-dialog>
    </v-sheet>
</template>

<script>
    import RubricCreateEditComponent from "@/components/Events/RubricCreateEditComponent";

    export default {
        name: "EventRubricsComponent",
        components: {
            RubricCreateEditComponent
        },
        props: {},
        data() {
            return {
                editRubricDialog: false,
                loading: true
            }
        },
        methods: {
            removeRubric(id) {
                this.loading = true;
                this.$store.dispatch('deleteRubric', {id}).then(() => {
                    this.loading = false;
                })
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
