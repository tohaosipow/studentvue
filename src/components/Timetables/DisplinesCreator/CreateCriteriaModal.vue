<template>
    <v-card>
        <v-card-title>Создание способа деления группы</v-card-title>
        <v-card-subtitle>Для группы {{group.name}}</v-card-subtitle>
        <v-card-text>
            <v-text-field label="Название" :placeholder="group.name + ' на 2 части для Экономики'"  v-model="criteria.name"  />
            <v-text-field :min="0" :max="5" type="number" placeholder="2" label="Разделить группу на" suffix="подгруппы" v-model="criteria.count"  />
        </v-card-text>
        <v-card-actions>
            <v-btn @click="$emit('close')" text color="blue">Отменить</v-btn>
            <v-spacer></v-spacer>
            <v-btn :loading="loading" @click="save" text color="blue darken-2">Сохранить</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "CreateCriteriaModel",
        props:{
            group:{

            }
        },
        data(){
            return{
                countSet: true,
                loading: false,
                criteria:{
                    name: null,
                    count: null,
                }
            }
        },
        methods:{
            save(){
                this.loading = true;
                this.$store.dispatch('createCriterion', {...this.criteria, group_id: this.group.id}).then((response) => {
                    this.$store.dispatch('getStudentGroups');
                    this.$emit('create', response);
                    this.$emit('close');
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>