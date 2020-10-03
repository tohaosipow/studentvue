<template>
    <v-dialog
            v-model="isOpen"
            width="500"
    >
        <v-card  :loading="loading">
            <v-card-title>Добавление роли в {{this.$store.state.projects.currentProject.title}}</v-card-title>
            <v-card-text>
                <v-text-field :error-messages="errors.name" v-model="role.name" dense outlined placeholder="Название роли"></v-text-field>
                <v-text-field :error-messages="errors.tasks"   v-model="role.tasks" dense outlined placeholder="Задачи роли"></v-text-field>
                <v-text-field :error-messages="errors.quota"  v-model="role.quota" dense outlined placeholder="Квота" suffix="чел" type="number"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="black" @click="$emit('close')" right text>Закрыть</v-btn>
                <v-btn :loading="loading" @click="save" class="darken-2" color="blue" right text>Добавить</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "ProjectAddRoleDialogComponent",
        props: [
            'isOpen'
        ],
        data(){
            return {
                role: {
                    name: null,
                    tasks: null,
                    quota: null
                },
                loading: false,
                errors: {}
            }
        },
        methods: {
            save(){
                this.loading = true;
                this.$store.dispatch('storeProjectRole', {...this.role, project_id: this.$store.state.projects.currentProject.id}).then(() => {
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
