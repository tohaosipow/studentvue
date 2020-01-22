<template>
    <div>
        <v-autocomplete

                :items="$store.state.timetables.disciplines"
                item-text="name"
                item-value="id"
                label="Дисциплина"
                autocomplete="off"
                dense
                outlined
                no-data-text="Не найдено"
                v-model="discipline_id"
                hint="Выберите существующее или укажите свое, если его нет в списке"
        >
            <template v-slot:prepend-item>
                <v-list-item @click="() => {createDisciplineModalShow = true}"
                        ripple
                >
                    <v-list-item-action> <v-icon color="green">mdi-plus</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Добавить дисциплину</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
            </template>

            <template v-slot:append-item>
                <v-divider class="mb-2"></v-divider>
                <v-list-item disabled>
                    <v-list-item-avatar color="grey lighten-3">
                        <v-icon>mdi-account-network</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>
                            Не можете найти свою дисциплину?
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Пролисайте наверх и создайте ее!
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-autocomplete>
        <DisciplineCreateModal @close="createDisciplineModalShow = false; discipline_id = $event" :show="createDisciplineModalShow"></DisciplineCreateModal>
    </div>
</template>

<script>
    import DisciplineCreateModal from "@/components/Timetables/DisplinesCreator/DisciplineCreateModal";

    export default {
        name: "SelectDisciplineStep",
        components: {
            DisciplineCreateModal
        },
        data(){
            return{
                discipline_id: null,
                createDisciplineModalShow: false
            }
        },

        watch:{
            discipline_id(){
                if(this.discipline_id > 0){
                    this.$emit('step_ok');
                    this.$store.commit('setCreationDiscipline', {...this.$store.getters.getDisciplineByID(this.discipline_id)});
                }
            }
        }
    }
</script>

<style scoped>

</style>