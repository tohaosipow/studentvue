<template>
    <v-card>

        <v-form @submit.prevent.stop="reset">
            <v-card-title>Восстановление пароля</v-card-title>
            <v-card-subtitle>Укажите новый пароль и его подтверждение в полях ниже</v-card-subtitle>
            <v-card-text>
                <h2></h2>

                <v-text-field :error-messages="this.errors.password"
                              id="password"
                              label="Пароль"
                              name="password"
                              :loading="loading"
                              outlined
                              type="password"

                              v-model="credentials.password"
                />

                <v-text-field :error-messages="this.errors.password_confirmation"
                              id="password"
                              label="Подтверждение пароля"
                              name="password"
                              :loading="loading"
                              outlined
                              type="password"

                              v-model="credentials.password_confirmation"
                />

            </v-card-text>
            <v-card-actions>
                <v-btn   :loading="loading" type="submit"  class="ma-2" color="blue darken-2" dark  outlined>
                    <v-icon small left>mdi-account</v-icon>
                    Сменить пароль
                </v-btn>
            </v-card-actions>

        </v-form>
    </v-card>
</template>

<script>
    export default {
        name: "LoginComponent",
        data() {
            return {
                credentials: {
                    password: '',
                    password_confirmation: ''
                },
                token: '',
                loading: false,
                snackbar: false,
                errors: {
                    password: [],
                    password_confirmation: []
                }
            }
        },
        methods: {
            reset() {
                this.loading = true;
                this.$store.dispatch('reset',  {...this.credentials, token: this.token, email: this.$route.query.email}).then(() => {
                    this.loading = false;
                    if(localStorage.getItem('return_path')){
                        this.$router.push(localStorage.getItem('return_path'));
                        localStorage.removeItem('return_path')
                    }
                    else this.$router.push('/');
                }).catch((r) => {
                    this.loading = false;
                    this.errors = r.response.data.errors

                })

            }
        },
        mounted() {
            if (this.$store.state.user.currentUser.id > 0) this.$router.push('/');
            // eslint-disable-next-line no-unused-vars
            this.token = this.$route.params.token;
        }
    }
</script>

<style scoped>

</style>
