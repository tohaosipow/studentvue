<template>
    <div>
        <v-dialog :value="dialog" max-width="700" persistent>
            <v-card>
                <v-card-title class="headline">Создание дисциплины</v-card-title>
                <v-card-text>Заполните все поля в соответствии с требованиями и нажмите сохранить</v-card-text>
                <v-card-text>
                    <v-text-field
                            :counter="20"
                            label="Название дисциплины"
                            required
                            :error-messages="errors.name"
                            v-model="discipline.name"
                            hint="Согласно учебному плану"
                    ></v-text-field>

                    <v-text-field
                            :counter="10"
                            label="Сокращенное название"
                            required
                            v-model="discipline.short_name"
                            :error-messages="errors.short_name"
                            hint="Для отображения в расписании"
                    ></v-text-field>

                    <v-textarea
                            :counter="50"
                            label="Описание"
                            :error-messages="errors.description"
                            v-model="discipline.description"
                            hint="Не обязательно"
                    ></v-textarea>

                    <v-autocomplete :clearable="true"
                                    :items="$store.state.timetables.employees"
                                    item-text="name"
                                    :error-messages="errors.teacher_id"
                                    v-model="discipline.teacher_id"
                                    item-value="id"
                                    label="Преподаватель"
                                    no-data-text="Такого преподавателя у нас нет"
                    >

                    </v-autocomplete>

                    <v-autocomplete :clearable="true"
                                    :items="$store.state.timetables.periods"
                                    item-text="name"
                                    :error-messages="errors.period_id"
                                    v-model="discipline.period_id"
                                    item-value="id"
                                    label="v"
                                    no-data-text="Такого преподавателя у нас нет"
                    >

                    </v-autocomplete>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="close" color="blue ligthen-1" text>Отменить</v-btn>
                    <v-btn :loading="loading" @click="save" color="blue darken-2" text>Сохранить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "DisciplineCreateModal",
        data() {
            return {
                dialog: false,
                loading: false,
                errors:{
                    name: null,
                    description: null,
                    teacher_id: null,
                    short_name: null,
                    period_id: null
                },
                discipline: {
                    name: null,
                    description: null,
                    teacher_id: null,
                    short_name: null,
                    period_id: null
                }
            }
        },
        props: {
            show: {
                default: false
            }
        },
        watch: {
            show() {
                this.dialog = this.show;
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            save(){
                this.loading = true;
                this.$store.dispatch('createDiscipline', this.discipline).catch((error) => {
                    // eslint-disable-next-line no-console
                    this.errors = error.response.data.errors;
                }).then((r) => {
                    this.loading = false;
                    this.$emit('close', r.id);
                })
            }
        }
    }
</script>

<style scoped>

</style>