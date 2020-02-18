<template>
    <div>
        <v-form @submit.prevent.stop="singIn">
            <v-card-text>

                <v-text-field
                        label="Email"
                        name="email"
                        :loading="loading"
                        outlined
                        type="text"
                        v-model="credentials.username"
                />

                <v-text-field :error-messages="this.errors.login"
                              id="password"
                              label="Пароль"
                              name="password"
                              :loading="loading"
                              outlined
                              type="password"

                              v-model="credentials.password"
                />

            </v-card-text>
            <v-card-actions>
                <v-row align="center">
                    <v-col cols="12" lg="4">
                        <v-btn   :loading="loading" type="submit"  class="ma-2" color="blue darken-2" dark  outlined>
                            <v-icon small left>mdi-login</v-icon>
                            Войти c логином и паролем
                        </v-btn>
                    </v-col>
                    <v-col cols="12" lg="3">
                        <div class="signin-button ml-4" data-color="black" data-type="sign in" id="appleid-signin"></div>
                    </v-col>



                </v-row>

            </v-card-actions>

        </v-form>
        <v-snackbar color="success"
                v-model="snackbar"
        >
            Успешно! Входим в систему ...
            <v-btn
                    text
                    @click="snackbar= false"
            >
                Закрыть
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: "LoginComponent",
        data() {
            return {
                credentials: {
                    username: '',
                    password: ''
                },
                loading: false,
                snackbar: false,
                errors: {
                    login: []
                }
            }
        },
        methods: {
            singIn() {
                this.loading = true
                this.$store.dispatch('authUser', this.credentials).then(() => {
                    this.loading = false
                    this.snackbar = true
                    if(localStorage.getItem('return_path')){
                        this.$router.push(localStorage.getItem('return_path'))
                        localStorage.removeItem('return_path')
                    }
                    else this.$router.push('/');

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