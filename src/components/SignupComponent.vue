<template>
    <v-container>
        <v-row>
            <v-col lg="12">


            </v-col>
        </v-row>
        <v-row>
            <v-col lg="12">
                <v-card>
                    <v-card-title class="headline">Кто Вы?</v-card-title>
                    <v-card-subtitle>Выберите Вашу роль</v-card-subtitle>
                    <v-item-group mandatory v-model="user.role">
                        <v-container>
                            <v-row>
                                <v-col
                                        cols="12"
                                        md="4"
                                >
                                    <v-item value="visitor" v-slot:default="{ active, toggle }">
                                        <v-card
                                                :color="active ? 'red lighten-2' : ''"
                                                @click="toggle"
                                                class="d-flex align-center"
                                                dark
                                                height="200"
                                        >
                                            <v-scroll-y-transition>
                                                <div
                                                        class="display-1 flex-grow-1 text-center"
                                                        v-if="active"
                                                >
                                                    Я - посетитель
                                                </div>
                                                <div class="display-1 flex-grow-1 text-center" v-else>
                                                    Посетитель
                                                </div>
                                            </v-scroll-y-transition>
                                        </v-card>
                                    </v-item>
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="4"
                                >
                                    <v-item value="pupil" v-slot:default="{ active, toggle }">
                                        <v-card
                                                :color="active ? 'yellow darken-2' : ''"
                                                @click="toggle"
                                                class="d-flex align-center"
                                                dark
                                                height="200"
                                        >
                                            <v-scroll-y-transition>
                                                <div
                                                        class="display-1 flex-grow-1 text-center"
                                                        v-if="active"
                                                >
                                                    Я - ученик
                                                </div>
                                                <div class="display-1 flex-grow-1 text-center" v-else>
                                                    Ученик
                                                </div>
                                            </v-scroll-y-transition>
                                        </v-card>
                                    </v-item>
                                </v-col>

                                <v-col
                                        cols="12"
                                        md="4"
                                >
                                    <v-item value="student" v-slot:default="{ active, toggle }">
                                        <v-card
                                                :color="active ? 'primary' : ''"
                                                @click="toggle"
                                                class="d-flex align-center"
                                                dark
                                                height="200"
                                        >
                                            <v-scroll-y-transition>
                                                <div
                                                        class="display-1 flex-grow-1 text-center"
                                                        v-if="active"
                                                >
                                                    Я - студент
                                                </div>
                                                <div
                                                        class="display-1 flex-grow-1 text-center"
                                                        v-else
                                                >
                                                    Студент
                                                </div>
                                            </v-scroll-y-transition>
                                        </v-card>
                                    </v-item>
                                </v-col>
                                <!--  <v-col
                                    cols="12"
                                    md="3"
                            >
                              <v-item value="employee" v-slot:default="{ active, toggle }">
                                    <v-card
                                            :color="active ? 'orange darken-2' : ''"
                                            @click="toggle"
                                            class="d-flex align-center"
                                            dark
                                            height="200"
                                    >
                                        <v-scroll-y-transition>
                                            <div
                                                    class="display-1 flex-grow-1 text-center"
                                                    v-if="active"
                                            >
                                                Я - сотрудник
                                            </div>
                                            <div class="display-1 flex-grow-1 text-center" v-else>
                                                Сотрудник
                                            </div>
                                        </v-scroll-y-transition>
                                    </v-card>
                                </v-item>
                            </v-col>!-->

                            </v-row>
                        </v-container>
                    </v-item-group>
                    <v-card-text>
                        <v-subheader>Основные данные</v-subheader>
                        <v-container>
                            <v-row>
                                <v-col lg="4" cols="12">
                                    <v-text-field name="given-name" :error-messages="errors.last_name"
                                                  :rules="[ v => !!v || 'Обязательно для заполнения']"
                                                  label="Фамилия" outlined
                                                  v-model="user.last_name"></v-text-field>
                                </v-col>
                                <v-col lg="4" cols="12">
                                    <v-text-field name="family-name" :error-messages="errors.first_name"
                                                  :rules="[ v => !!v || 'Обязательно для заполнения']"
                                                  label="Имя" outlined
                                                  v-model="user.first_name"></v-text-field>
                                </v-col>
                                <v-col lg="4" cols="12">
                                    <v-text-field name="additional-name" :error-messages="errors.third_name"
                                                  :rules="[ v => !!v || 'Обязательно для заполнения']"
                                                  label="Отчество" outlined
                                                  v-model="user.third_name"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col lg="12">
                                    <v-text-field name="email" :error-messages="errors.email"
                                                  :rules="[ v => !!v || 'E-mail обязателен', v => /.+@.+\..+/.test(v) || 'E-mail должен быть корретным']"
                                                  label="Email"
                                                  outlined type="email" v-model="user.email"></v-text-field>

                                    <v-text-field :error-messages="errors.phone"
                                                  validate-on-blur
                                                  v-mask="'\+7 (###) ###-##-##'"
                                                  :rules="[ v => !!v || 'Телефон обязателен']"
                                                  label="Телефон"
                                                  name="phone"
                                                  outlined type="phone" v-model="user.phone"></v-text-field>
                                    <v-text-field name="password" :error-messages="errors.password"
                                                  :rules="[ v => !!v || 'Обязательно для заполнения']"
                                                  label="Пароль" outlined type="password"
                                                  v-model="user.password"></v-text-field>
                                    <v-text-field name="password_confirm"
                                            :rules="[ v => v === user.password    || 'Должен совпадать с паролем']"
                                            label="Подтверждение пароля"
                                            outlined type="password" v-model="user.password_confirm"></v-text-field>

                                </v-col>
                            </v-row>
                            <transition name="fade">
                                <v-row transition="scroll-y-transition" v-if="user.role === 'student'">
                                    <v-subheader>Информация о студенте</v-subheader>
                                    <v-col lg="12">
                                        <v-combobox
                                                :items="$store.getters.getStudentsDepartments"
                                                item-text="name"
                                                item-value="id"
                                                label="Структурное подразделение"
                                                outlined
                                                v-model="user.department"
                                                hint="Выберите существующее или укажите свое, если его нет в списке"
                                        ></v-combobox>

                                        <v-combobox
                                                :items="$store.state.dictionaries.studentGroups"
                                                item-text="name"
                                                item-value="id"
                                                label="Учебная группа"
                                                outlined
                                                v-model="user.student_group"
                                                hint="Выберите существующую или укажите свою, если ее нет в списке"
                                        ></v-combobox>


                                    </v-col>
                                </v-row>
                            </transition>
                            <transition name="fade">
                                <v-row transition="scroll-y-transition" v-if="user.role === 'employee'">
                                    <v-subheader>Информация о сотруднике</v-subheader>
                                    <v-col lg="12">
                                        <v-combobox
                                                :items="$store.state.dictionaries.departments"
                                                item-text="name"
                                                item-value="id"
                                                label="Структурное подразделение"
                                                outlined
                                                v-model="user.department"
                                                hint="Выберите существующее или укажите свое, если его нет в списке"
                                        ></v-combobox>

                                        <v-text-field
                                                label="Должность"
                                                outlined
                                                v-model="user.employee_post"
                                        ></v-text-field>


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
                                                v-model="user.pupil_school"
                                        ></v-text-field>

                                        <v-text-field
                                                label="Класс"
                                                outlined
                                                v-model="user.pupil_class"
                                        ></v-text-field>


                                    </v-col>
                                </v-row>
                            </transition>

                            <v-row>
                                <v-col lg="12">
                                    <v-btn @click="signUp" color="blue" outlined>Зарегистрироваться</v-btn>
                                </v-col>
                            </v-row>


                        </v-container>


                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mask } from 'vue-the-mask'

    export default {
        directives: {
            mask,
        },
        name: "SignupComponent",
        data() {
            return {
                student_groups: ['609-71', '609-72'],
                institutes: ['Политехнический институт'],
                user: {
                    first_name: '',
                    last_name: '',
                    third_name: '',
                    email: '',
                    password: '',
                    password_confirm: '',
                    role: 'visitor',
                    phone: '',
                    student_group: '',
                    department: '',
                    employee_post: '',
                    pupil_school: '',
                    pupil_class: ''
                },
                errors: {}
            }
        },
        methods: {
            signUp() {
                this.$store.dispatch('signUp', this.user).then(() => {
                    this.$store.dispatch('authUser', {
                        username: this.user.email,
                        password: this.user.password
                    }).then(() => {
                        this.$router.push('/');
                    })
                }).catch((error) => {
                    this.errors = error.response.data.errors;
                });
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
    {
        opacity: 0;
    }
</style>