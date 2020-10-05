<template>
    <div>
        <v-form @submit.prevent.stop="singIn">
            <v-card-text>

                <v-text-field
                        :loading="loading"
                        label="Email"
                        name="email"
                        outlined
                        type="text"
                        v-model="credentials.username"
                />

                <v-text-field :error-messages="this.errors.login"
                              :loading="loading"
                              id="password"
                              label="Пароль"
                              name="password"
                              outlined
                              type="password"

                              v-model="credentials.password"
                />


                <v-row align="center">
                    <v-col cols="12" lg="5">
                        <v-btn type="submit" color="blue" dark>
                            Войти c логином и паролем
                        </v-btn>
                    </v-col>
                    <v-col cols="12" lg="3">

                        <v-dialog
                                hide-overlay
                                max-width="400"
                                transition="dialog-bottom-transition"
                                v-model="forgot_dialog"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="blue" dark text v-on="on">
                                    Не помню пароль
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>Восстановление пароля</v-card-title>
                                <v-card-text>
                                    <v-text-field
                                            :loading="loading"
                                            label="Email"
                                            name="email"
                                            outlined
                                            type="text"
                                            v-model="credentials.username"
                                    />
                                    <v-btn :loading="loading" @click="forgot" color="blue" dark>
                                        Восстановить пароль
                                    </v-btn>
                                </v-card-text>

                            </v-card>
                        </v-dialog>

                    </v-col>


                </v-row>

            </v-card-text>
            <v-divider/>
            <v-card-subtitle>Вход с помощью других сервисов</v-card-subtitle>
            <v-card-actions>
                <v-row align="center">
                    <v-col cols="12" lg="3">
                        <div class="signin-button ml-4" data-color="black" data-type="sign in"
                             id="appleid-signin"></div>
                    </v-col>


                </v-row>

            </v-card-actions>

        </v-form>
        <v-snackbar color="success"
                    v-model="snackbar"
        >
            Успешно! Входим в систему ...
            <v-btn
                    @click="snackbar= false"
                    text
            >
                Закрыть
            </v-btn>
        </v-snackbar>
        <v-snackbar color="success"
                    v-model="snackbar_forgot"
        >
            Если вы были зарегистрированы с этим Email, то пароль был успешно отправлен.
            <v-btn
                    @click="snackbar_forgot= false"
                    text
            >
                Закрыть
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import user from "@/api/user";

    export default {
        name: "LoginComponent",
        data() {
            return {
                credentials: {
                    username: '',
                    password: ''
                },
                loading: false,
                snackbar: false, snackbar_forgot: false,
                forgot_dialog: false,
                errors: {
                    login: []
                }
            }
        },
        methods: {
            forgot() {
                this.loading = true;
                user.forgot_password({email: this.credentials.username}).then(() => {
                    this.forgot_dialog = false;
                    this.snackbar_forgot = true;
                    this.loading = false;
                });
            },
            singIn() {
                this.loading = true
                this.$store.dispatch('authUser', this.credentials).then(() => {
                    this.loading = false
                    this.snackbar = true
                    if (localStorage.getItem('return_path')) {
                        this.$router.push(localStorage.getItem('return_path'))
                        localStorage.removeItem('return_path')
                    } else this.$router.push('/');

                }, () => {
                    this.errors.login = 'Неверный логин или пароль';
                    this.loading = false
                })
            }
        },
        mounted() {
            if (this.$store.state.user.currentUser.id > 0) this.$router.push('/');
        }
    }
</script>

<style scoped>

</style>
