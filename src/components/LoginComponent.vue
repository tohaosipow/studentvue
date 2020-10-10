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
                    <v-col cols="12" lg="2">
                        <a style="margin: 16px" href="https://api.student.surgu.ru/login/vkontakte">
                            <svg fill="none" height="30" width="210" viewBox=" 0 0 274 48" xmlns="http://www.w3.org/2000/svg"><path d="M0 23C0 12.158 0 6.737 3.368 3.368S12.158 0 23 0h2c10.842 0 16.264 0 19.632 3.368C48 6.737 48 12.158 48 23v2c0 10.842 0 16.264-3.368 19.632C41.263 48 35.842 48 25 48h-2c-10.842 0-16.263 0-19.632-3.368C0 41.263 0 35.842 0 25z" fill="#2787F5"></path><path clip-rule="evenodd" d="M13 15H9.5c-1 0-1.2.47-1.2.99 0 .927 1.186 5.525 5.525 11.606C16.717 31.749 20.792 34 24.5 34c2.225 0 2.5-.5 2.5-1.361V29.5c0-1 .21-1.2.915-1.2.52 0 1.41.26 3.486 2.262C33.774 32.935 34.165 34 35.5 34H39c1 0 1.5-.5 1.211-1.487-.315-.983-1.448-2.41-2.952-4.101-.816-.964-2.04-2.003-2.41-2.522-.52-.667-.37-.964 0-1.557 0 0 4.264-6.007 4.71-8.046.222-.742 0-1.287-1.06-1.287H35c-.89 0-1.3.47-1.522.99 0 0-1.78 4.338-4.301 7.156-.816.816-1.187 1.076-1.632 1.076-.222 0-.544-.26-.544-1.001v-6.934c0-.89-.259-1.287-1-1.287h-5.5c-.556 0-.89.413-.89.805 0 .843 1.26 1.038 1.39 3.41v5.155c0 1.13-.204 1.335-.65 1.335-1.186 0-4.072-4.358-5.784-9.344C14.231 15.39 13.894 15 13 15z" fill="#FFFFFF" fill-rule="evenodd"></path><g fill="#000000"><path d="M81.893 23.58c1.903-.89 3.13-2.37 3.13-4.654 0-3.468-3.172-5.922-7.74-5.922H66.75V35h10.997c4.738 0 8.038-2.58 8.038-6.091 0-2.665-1.735-4.653-3.892-5.33zm-10.279-6.557h5.668c1.692 0 2.877 1.015 2.877 2.41s-1.185 2.37-2.877 2.37h-5.668zm6.133 13.959h-6.133V25.61h6.133c1.904 0 3.173 1.1 3.173 2.707s-1.269 2.665-3.172 2.665zM103.877 35h6.387l-10.11-11.42 9.264-10.576h-5.795l-7.36 8.545h-1.185v-8.545h-4.864V35h4.864v-8.756h1.185zm18.803.423c6.895 0 11.76-4.738 11.76-11.42s-4.865-11.422-11.76-11.422-11.759 4.738-11.759 11.421 4.864 11.421 11.759 11.421zm0-4.441c-3.976 0-6.683-2.834-6.683-6.98s2.707-6.98 6.683-6.98c3.977 0 6.684 2.835 6.684 6.98s-2.707 6.98-6.684 6.98zm30.709-17.978v8.672h-9.856v-8.672h-4.864V35h4.864v-8.883h9.856V35h4.865V13.004zM169.241 35h4.865V17.446h7.614v-4.442h-20.093v4.442h7.614zm23.999-22.419c-4.272 0-8.037 2.2-9.137 6.007l4.484.761c.677-1.354 2.2-2.623 4.399-2.623 2.665 0 4.23 1.904 4.442 4.78h-4.738c-6.472 0-9.687 2.834-9.687 6.895 0 4.103 3.173 7.022 7.657 7.022 3.595 0 6.006-2.073 7.064-3.892l1.015 3.47h3.596V22.647c0-6.387-3.469-10.067-9.095-10.067zm-1.438 18.739c-2.369 0-3.892-1.227-3.892-3.13 0-1.692 1.227-2.877 4.949-2.877h4.611c0 3.596-2.284 6.007-5.668 6.007zM221.275 35h6.387l-10.11-11.42 9.264-10.576h-5.795l-7.36 8.545h-1.185v-8.545h-4.864V35h4.864v-8.756h1.185zm14.638 0h4.865V17.446h7.614v-4.442h-20.093v4.442h7.614zm36.605-11.252c0-6.345-4.738-11.167-11.421-11.167-6.684 0-11.421 4.78-11.421 11.421s4.737 11.421 11.421 11.421c4.568 0 8.883-2.157 10.532-6.345l-4.568-.761c-1.058 1.565-3.088 2.665-5.668 2.665-3.723 0-6.176-2.285-6.641-5.669h17.681c.042-.465.085-.972.085-1.565zm-11.421-6.937c3.045 0 5.329 1.946 6.133 4.695h-12.182c.803-2.834 3.088-4.695 6.049-4.695z"></path></g></svg>
                        </a>
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
