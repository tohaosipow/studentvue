<template>
    <v-card>
        <v-card-title>Создание преподавателя</v-card-title>
        <v-card-text>
            <v-text-field v-model="teacher.last_name" label="Фамилия"/>
            <v-text-field v-model="teacher.first_name" label="Имя"/>
            <v-text-field v-model="teacher.third_name" label="Отчество"/>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="save" text color="blue darken-2">Сохранить</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "CreateTeacherModal",
        data() {
            return {
                teacher: {
                    first_name: null,
                    last_name: null,
                    third_name: null,
                }
            }
        },
        methods:{
            save(){
                this.$store.dispatch('createTeacher', this.teacher).then((r) => {
                    this.$emit('create', r);
                    this.$emit('close');
                })
            }
        }
    }
</script>

<style scoped>

</style>