<template>
    <v-card>
        <v-card-text>
            <v-form>
                <v-text-field
                        label="Email"
                        name="Email"
                        outlined
                        type="text"
                        v-model="credentials.username"
                />

                <v-text-field :error-messages="this.errors.login"
                              id="password"
                              label="Пароль"
                              name="password"
                              outlined
                              type="password"

                              v-model="credentials.password"
                />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="blue" outlined @click="singIn">Войти в систему</v-btn>
        </v-card-actions>
    </v-card>

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
                errors: {
                    login: []
                }
            }
        },
        methods: {
            singIn() {
                this.$store.dispatch('authUser', this.credentials).then(() => {
                    this.$router.push('/');
                }, () => {
                    alert();
                    this.errors.login = 'Неверный логин или пароль';
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