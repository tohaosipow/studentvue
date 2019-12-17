<template>
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Вход в систему</v-toolbar-title>
                                <v-spacer />
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field v-model="credentials.username"
                                            label="Email"
                                                  outlined
                                            name="Email"
                                            type="text"
                                    />

                                    <v-text-field v-model="credentials.password"
                                            id="password"
                                            label="Пароль"
                                            name="password"
                                                  outlined

                                            type="password"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn @click="singIn" color="primary">Вход</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
</template>

<script>
    export default {
        name: "LoginComponent",
        data(){
            return{
                credentials:{
                    username: '',
                    password: ''
                }
            }
        },
        methods:{
            singIn(){
                this.$store.dispatch('authUser', this.credentials).then(() =>{
                    this.$router.push('/');
                })
            }
        },
        mounted(){
            if(this.$store.state.user.currentUser.id > 0) this.$router.push('/');
        }
    }
</script>

<style scoped>

</style>