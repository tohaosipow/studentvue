<template>
    <div>
        <v-dialog
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                v-model="enable"
        >
            <v-card v-if="user">
                <v-toolbar
                        color="primary"
                        dark
                >

                    <v-toolbar-title>Заполните поля</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn :loading="loading"
                                @click="save"
                                dark
                                text
                        >
                            Сохранить
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list
                        subheader
                        three-line
                >
                    <template  v-if="this.$store.state.user.currentUser.role === 'student' && !this.$store.state.user.currentUser.student_groups_id">
                        <v-subheader>Выберите вашу студенческую группу</v-subheader>

                        <v-card-text>
                            <v-autocomplete

                                      :items="$store.state.dictionaries.studentGroups"
                                      hint="Выберите существующую или укажите свою, если ее нет в списке"
                                      item-text="name"
                                      item-value="id"
                                      v-model="user.student_groups_id"
                                      label="Учебная группа"
                                      outlined
                            />
                        </v-card-text>
                    </template>

                </v-list>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import user from "@/api/user.js";

    export default {
        name: "CompleteProfile",
        props: ['enable'],
        data(){
            return{
                user: null,
                loading: false
            }
        },
        methods:{
            save() {
                this.loading = true;
                user.store(this.user).then(() => {
                    this.$store.dispatch('getUser').then(() => {
                        this.$emit('close');
                    });
                })
            }
        },
        mounted(){
            if(!this.$store.state.user.currentUser.id) return this.$emit('close');
            this.user = {...this.$store.state.user.currentUser};
        }
    }
</script>

<style scoped>

</style>
