<template>
    <v-dialog
            v-model="isOpen"
            width="500"
    >

        <v-card  :loading="loading">
            <v-card-title>Добавление файла в {{this.$store.state.projects.currentProject.title}}</v-card-title>
            <v-card-text>
                <v-text-field :error-messages="errors.name" v-model="file.name" dense outlined placeholder="Название файла"></v-text-field>
                <v-file-input :error-messages="errors.file" v-model="file.file" dense outlined placeholder="Файл"></v-file-input>
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
        name: "ProjectAddFileDialogComponent",
        props: [
            'isOpen'
        ],
        data(){
            return {
                file: {
                    name: null,
                    file: null,
                },
                loading: false,
                errors: {}
            }
        },
        methods: {
            save(){
                this.loading = true;
                let form_data = new FormData();
                form_data.set('name', this.file.name);
                form_data.append('file', this.file.file);

                this.$store.dispatch('storeProjectFile', {project_id: this.$store.state.projects.currentProject.id, data: form_data}).then(() => {
                    this.loading = false;
                    this.$emit('close');
                }).catch((e) => {
                    this.loading = false;
                    if(e.response && e.response.data && e.response.data.errors) this.errors = e.response.data.errors;
                });
            }
        }
    }
</script>

<style scoped>

</style>
