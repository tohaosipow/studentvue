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
                    <v-item-group mandatory>
                        <v-container>
                            <v-row>

                                <v-col
                                        cols="12"
                                        md="4"
                                >
                                    <v-item v-slot:default="{ active, toggle }">
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
                                <v-col
                                        cols="12"
                                        md="4"
                                >
                                    <v-item v-slot:default="{ active, toggle }">
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
                                                    Я - преподаватель
                                                </div>
                                                <div class="display-1 flex-grow-1 text-center" v-else>
                                                    Преподаватель
                                                </div>
                                            </v-scroll-y-transition>
                                        </v-card>
                                    </v-item>
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="4"
                                >
                                    <v-item v-slot:default="{ active, toggle }">
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
                            </v-row>
                        </v-container>
                    </v-item-group>
                    <v-card-text>
                        <v-text-field :error-messages="errors.name" :rules="[ v => !!v || 'Обязательно для заполнения']"
                                      label="Имя Фамилия" outlined
                                      v-model="user.name"></v-text-field>
                        <v-text-field :error-messages="errors.email" :rules="[ v => !!v || 'E-mail обязателен', v => /.+@.+\..+/.test(v) || 'E-mail должен быть корретным']"
                                      label="Email"
                                      outlined type="email" v-model="user.email"></v-text-field>
                        <v-text-field :error-messages="errors.password" :rules="[ v => !!v || 'Обязательно для заполнения']"
                                      label="Пароль" outlined type="password"
                                      v-model="user.password"></v-text-field>
                        <v-text-field  :rules="[ v => v === user.password    || 'Должен совпадать с паролем']"
                                      label="Подтверждение пароля"
                                      outlined type="password" v-model="user.password_confirm"></v-text-field>
                        <v-btn @click="signUp" color="blue" outlined>Зарегистрироваться</v-btn>
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "SignupComponent",
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirm: ''
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

</style>