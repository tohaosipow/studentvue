<template>
    <v-container>
        <v-row>
            <v-col lg="12">
                <v-card>
                    <v-tabs
                            background-color="transparent"
                            color="blue"
                            grow
                            v-model="state"
                    >
                        <v-tab>
                            Вход
                        </v-tab>
                        <v-tab>
                            Регистрация
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="state">
                        <v-tab-item>

                            <LoginComponent></LoginComponent>
                        </v-tab-item>
                        <v-tab-item>
                            <SignupComponent></SignupComponent>
                        </v-tab-item>
                    </v-tabs-items>
                    <v-card-actions>

                    </v-card-actions>
                </v-card>
                <div class="signin-button">
                </div>
            </v-col>

        </v-row>

    </v-container>
</template>

<script>
    import LoginComponent from "@/components/LoginComponent";
    import SignupComponent from "@/components/SignupComponent";

    export default {
        name: "AuthComponent",
        components: {
            // eslint-disable-next-line vue/no-unused-components
            LoginComponent,
            // eslint-disable-next-line vue/no-unused-components
            SignupComponent
        },
        data() {
            return {
                state: 0
            }
        },
        mounted() {
            window.AppleID.auth.init({
                clientId: 'osipov.surgu.auth',
                scope: 'name email',
                redirectURI: 'https://api.student.surgu.ru/apple_redirect'
            });


        },
        beforeRouteEnter: (_, from, next) => {
            localStorage.setItem('return_path', from.path);
            next()
        },
        methods: {
            byApple() {
                window.AppleID.auth.signIn();
            }
        }
    }
</script>

<style>
    .signin-button, .signin-button div {
        width: 210px;
        height: 40px;
    }
</style>
