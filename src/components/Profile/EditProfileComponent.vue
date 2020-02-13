<template>
    <v-container :fluid="$store.state.user.fluid">
        <v-row v-if="user">

            <v-col cols="12" lg="8">
                <transition name="fade">
                    <v-alert type="success" v-if="update">
                        Данные обновлены
                    </v-alert>
                </transition>
                <v-card>
                    <v-card-title>Редактирование профиля</v-card-title>
                    <v-card-subtitle>{{user.name}}</v-card-subtitle>
                    <v-card-text>
                        <v-row>
                            <v-col col="12" lg="4">
                                <v-text-field
                                        :rules="[ v => !!v || 'Обязательно для заполнения']"
                                        label="Фамилия" outlined
                                        v-model="user.last_name"></v-text-field>
                            </v-col>
                            <v-col col="12" lg="4">
                                <v-text-field
                                        :rules="[ v => !!v || 'Обязательно для заполнения']"
                                        label="Имя" outlined
                                        v-model="user.first_name"></v-text-field>
                            </v-col>
                            <v-col col="12" lg="4">
                                <v-text-field
                                        :rules="[ v => !!v || 'Обязательно для заполнения']"
                                        label="Отчество" outlined
                                        v-model="user.third_name"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field
                                :rules="[ v => !!v || 'Телефон обязателен']"
                                label="Телефон"
                                outlined
                                type="phone"
                                v-mask="'\+7 (###) ###-##-##'" v-model="user.phone" validate-on-blur/>
                        <v-text-field
                                :rules="[ v => !!v || 'E-mail обязателен', v => /.+@.+\..+/.test(v) || 'E-mail должен быть корретным']"
                                label="Email"
                                outlined type="email" v-model="user.email"/>
                        <v-text-field
                                label="Дата рождения" type="date"
                                outlined v-model="user.birthday_date" />

                        <v-autocomplete :items="[
                    {id: 'employee', name: 'Сотрудник'},
                    {id: 'student', name: 'Студент'},
                    {id: 'pupil', name: 'Ученик школы'},
                    {id: 'visitor', name: 'Посетитель'},
                    {id: 'company', name: 'Организация'},
                    ]" item-text="name" item-value="id" label="Роль" v-model="user.role"/>
                        <transition name="fade">
                            <v-row transition="scroll-y-transition" v-if="user.role === 'student'">
                                <v-subheader>Информация о студенте</v-subheader>
                                <v-col lg="12">
                                    <v-autocomplete
                                            :items="$store.getters.getStudentsDepartments"
                                            hint="Выберите существующее или укажите свое, если его нет в списке"
                                            item-text="name"
                                            item-value="id"
                                            label="Структурное подразделение"
                                            outlined
                                            v-model="user.department_id"
                                    />

                                    <v-autocomplete
                                            :items="$store.state.dictionaries.studentGroups"
                                            hint="Выберите существующую или укажите свою, если ее нет в списке"
                                            item-text="name"
                                            item-value="id"
                                            label="Учебная группа"
                                            outlined
                                            v-model="user.student_groups_id"
                                    />


                                </v-col>
                            </v-row>
                        </transition>
                        <transition name="fade">
                            <v-row transition="scroll-y-transition" v-if="user.role === 'employee'">
                                <v-subheader>Информация о сотруднике</v-subheader>
                                <v-col lg="12">
                                    <v-autocomplete
                                            :items="$store.state.dictionaries.departments"
                                            item-text="name"
                                            item-value="id"
                                            label="Структурное подразделение"
                                            outlined
                                            v-model="user.department_id"/>

                                    <v-text-field
                                            label="Должность"
                                            outlined
                                            v-model="user.employee_post"/>


                                </v-col>
                            </v-row>
                        </transition>

                        <transition name="fade">
                            <v-row transition="scroll-y-transition" v-if="user.role === 'pupil'">
                                <v-subheader>Информация об ученике</v-subheader>
                                <v-col lg="12">
                                    <v-text-field
                                            label="Учебное заведение"
                                            outlined
                                            v-model="user.pupil_school"/>

                                    <v-text-field
                                            label="Класс"
                                            outlined
                                            v-model="user.pupil_class"/>


                                </v-col>
                            </v-row>
                        </transition>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :loading="loading" @click="save" color="blue darken-2" text>Сохранить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import user from "@/api/user";
    import {mask} from 'vue-the-mask'

    export default {
        directives: {
            mask,
        },
        name: "EditProfileComponent",
        data() {
            return {
                user: null,
                loading: false,
                update: false
            }
        },
        methods: {
            save() {
                this.loading = true;
                user.store(this.user).then((r) => {
                    this.user = r.data;
                    this.user.birthday_date = this.$moment(r.data.birthday_date).format('YYYY-MM-DD');
                    this.loading = false;
                    this.update = true;
                    setTimeout(() => {
                        this.update = false;
                    }, 2000);
                })
            }
        },
        mounted() {
            this.$emit('changeTitle', 'Редактирование профиля ')
            user.item({id: this.$route.params.id}).then((r) => {
                this.user = r.data;
                // this.user.birthday_date = "2000-02-04"
                this.user.birthday_date = this.$moment(r.data.birthday_date).format('YYYY-MM-DD');
            })
        }
    }
</script>

<style scoped>

</style>