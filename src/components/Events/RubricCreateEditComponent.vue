<template>
    <v-card :loading="loading">
        <v-card-title>
            <span class="headline">Создание критерия</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-form>
                        <v-text-field v-model="rubric.title"   :rules="[v => !!v || 'Нужно заполнить']"  counter placeholder="Участие"  outlined label="Название критерия" required></v-text-field>
                        <v-text-field v-model="rubric.description" :rules="[v => !!v || 'Нужно заполнить']" placeholder="Начисляется в случае участия"   counter clearable outlined label="Описание критерия" required></v-text-field>
                        <v-text-field v-model="rubric.points_max" :rules="[v => !!v  || 'Нужно заполнить', v => v > 0 || 'Не меньше 0 !']"  placeholder="5" type="number"  clearable outlined label="Максимальный балл" required></v-text-field>
                        <v-btn @click="save" text color="blue">Создать</v-btn>
                        </v-form>
                    </v-col>

                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$emit('close')">Закрыть</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "RubricCreateEditComponent",
        props:{
            event_id:{

            }
        },
        data(){
            return{
                rubric: {
                    title: '',
                    description: '',
                    points_max: '',
                },
                loading: false
            }
        },
        methods:{
            save(){
                this.loading = true;
                this.$store.dispatch('storeRubric', {title: this.rubric.title, description: this.rubric.description, points_max: this.rubric.points_max, event_id: this.event_id}).then(() => {
                   this.loading = false;
                   this.$emit('close');
                });
            }
        }
    }
</script>

<style scoped>

</style>