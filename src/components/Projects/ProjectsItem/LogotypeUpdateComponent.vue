<template>
    <v-dialog v-if="$store.state.user.currentUser.admin == 1 || $store.getters.canEditProject" v-model="changeLogotypeDialog" persistent max-width="500">
        <template v-slot:activator="{ on }">
            <v-btn style="z-index: 2; position:relative;" class="ma-2"  x-small v-on="on" outlined color="white">Сменить логотип</v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">Загрузите новый логотип проекта</v-card-title>
            <v-card-text>
                <br/>
                <v-file-input label="Логотип проекта" v-model="logotype" outlined filled  dense/>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" text @click="changeLogotypeDialog = false">Отменить</v-btn>
                <v-btn  color="blue darken-2" text @click="changeLogotype">Обновить логотип</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "LogotypeUpdateComponent",
        props: ['project'],
        data(){
            return {
                changeLogotypeDialog: false,
                logotype: null,
                loading: false
            }
        },
        methods: {
            changeLogotype(){
                let bodyFormData = new FormData();
                if(this.logotype !== null) bodyFormData.append('logotype', this.logotype);
                // eslint-disable-next-line no-console
                console.log(this.project);
                this.loading = true;
                this.$store.dispatch('updateProject', {id: this.project.id, form_data: bodyFormData}).then(() => {
                    this.loading = false;
                    this.changeLogotypeDialog = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>
