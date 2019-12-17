<template>
    <v-card>
        <v-list-item @click="() => {}" :key="rubric.id" v-for="rubric in rubrics">
            <v-list-item-icon>
                <v-avatar color="blue">{{rubric.points_max}}</v-avatar>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{rubric.title}}</v-list-item-title>
                <v-list-item-subtitle>{{rubric.description}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn icon>
                    <v-icon color="gray lighten-1">mdi-pencil</v-icon>

                </v-btn>

            </v-list-item-action>
            <v-list-item-action>
                <v-btn icon>
                    <v-icon color="red lighten-2">mdi-delete</v-icon>

                </v-btn>

            </v-list-item-action>
        </v-list-item>
        <v-list-item >
            <v-list-item-content>
                <v-list-item-title></v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-dialog v-model="editRubricDialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on"
                        absolute
                        dark
                        fab
                        bottom
                        right
                        color="blue"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <RubricCreateEditComponent v-on:close="editRubricDialog = false" :event_id="$store.state.events.currentEvent.id"></RubricCreateEditComponent>

        </v-dialog>
    </v-card>
</template>

<script>
    import RubricCreateEditComponent from "@/components/Events/RubricCreateEditComponent";

    export default {
        name: "EventRubricsComponent",
        components: {
            RubricCreateEditComponent
        },
        props: {
            rubrics: {}
        },
        data(){
            return{
                editRubricDialog: false
            }
        }
    }
</script>

<style scoped>

</style>