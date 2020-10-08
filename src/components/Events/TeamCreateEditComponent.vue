<template>
    <v-card :loading="loading">
        <v-card-title class="headline">Создание команды</v-card-title>
        <v-container>
            <v-row>
                <v-col lg="12">
                    <v-text-field :error-messages="errors.name" v-model="team.name" counter dense prepend-icon="mdi-account" outlined label="Название команды"></v-text-field>
                    <v-text-field :error-messages="errors.description" v-model="team.description" counter dense prepend-icon="mdi-text" outlined label="Девиз команды"></v-text-field>
                    <v-file-input :error-messages="errors.logo"  v-model="team.logo" outlined prepend-icon="mdi-camera" dense accept="image/*" label="Логотип команды"></v-file-input>
                </v-col>

            </v-row>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$emit('close')">Закрыть</v-btn>
            <v-btn :loading="loading" color="blue darken-3" text @click="save">Создать</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "TeamCreateEditComponent",
        data(){
            return{
                errors: {},
                team:{
                    name: '',
                    description: '',
                    logo: null
                },
                loading: false,
            }
        },
        methods:{
            save(){
                this.loading = true;
                let formData = new FormData();
                formData.append('logo', this.team.logo);
                formData.append('description', this.team.description);
                formData.append('name', this.team.name);
                this.$store.dispatch('createTeam', {event_id: this.$store.state.events.currentEvent.id, form_data: formData}).then(() => {
                    this.loading = false;
                   this.$emit('close');
                }).catch((e) => {
                    this.loading = false;
                    this.errors = e.response.data.errors;
                })

            }
        }
    }
</script>

<style scoped>

</style>
