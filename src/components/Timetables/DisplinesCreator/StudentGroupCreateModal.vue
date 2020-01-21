<template>
    <v-card>
        <v-card-title>
            Создание учебной группы
        </v-card-title>
        <v-card-text>
            <v-text-field label="Название"  v-model="group.name"    :error-messages="errors.name"/>
            <v-autocomplete :clearable="true"
                            :items="$store.state.dictionaries.departments"
                            aria-autocomplete="none"
                            item-text="name"
                            :error-messages="errors.department_id"
                            item-value="id"
                            label="Структурное подразделение"
                            no-data-text="Такого института у нас нет"
                            v-model="group.department_id"
            />

        </v-card-text>
        <v-card-actions>
            <v-btn @click="$emit('close')" text color="blue lighten-2">Отменить</v-btn>
            <v-spacer></v-spacer>
            <v-btn :loading="loading" @click="save" text color="blue darken-2">Сохранить</v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
    export default {
        name: "CreateStudentGroupModal",
        data(){
          return{
              group:{
                  name: null,
                  department_id: null
              },
              errors:{
                  name: null,
                  department_id: null
              },
              loading: false
          }
        },
        methods:{
            save(){
                this.loading = true;
                this.$store.dispatch('createStudentGroup', this.group).then((r) => {
                    this.$emit('create', r);
                    this.$emit('close');
                    this.loading = false;
                }).catch((error) => {
                    // eslint-disable-next-line no-console
                    this.errors = error.response.data.errors;
                    this.loading = false;
                });

            }
        }
    }
</script>

<style scoped>

</style>