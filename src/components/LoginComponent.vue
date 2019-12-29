<template>
    <div>
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
            <v-btn depressed @click="singIn" color="blue darken-2" icon class="ma-2" tile dark>
                <v-icon left>mdi-login</v-icon>  Войти в систему</v-btn>
            <v-spacer></v-spacer>
            <div class="signin-button ml-4" data-color="black" data-type="sign in" id="appleid-signin"></div>

        </v-card-actions>
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