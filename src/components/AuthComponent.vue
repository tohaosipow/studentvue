<template>
    <v-container>
        <v-row>
            <v-col lg="12">
                <v-card>
                    <v-card-title class="headline">Войдите или зарегистрируйтесь</v-card-title>
                    <v-card-actions>
                        <img @click="byApple" width="200" src="https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple/images/apple-id-sign-in-with_2x.png" alt="">
                    </v-card-actions>
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

                </v-card>
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
        methods:{
            byApple(){
                window.AppleID.auth.signIn();
            }
        }
    }
</script>

<style scoped>

</style>