<template>
    <v-card :loading="loading" elevation="0">
        <v-card-title>Файлы проекта</v-card-title>
        <v-btn @click="addFileDialog = true" class="mt-2" color="green" outlined right
               v-if="$store.getters.isProjectAdmin">
            <v-icon left>mdi-plus</v-icon>
            Добавить файл
        </v-btn>
        <v-card-actions>
            <ProjectAddFileDialogComponent :is-open="addFileDialog" @close="addFileDialog = false"/>
        </v-card-actions>
        <v-card-text :key="file.id" v-for="file in this.$store.state.projects.currentProjectFiles">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>{{file.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{file.path.split(".")[1]}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action >
                    <v-icon @click="download(file)" color="blue">mdi-download</v-icon>
                </v-list-item-action>
                <v-list-item-action v-if="$store.getters.isProjectAdmin">
                    <v-icon  @click="remove(file)" color="red">mdi-delete</v-icon>
                </v-list-item-action>
            </v-list-item>
        </v-card-text>

    </v-card>
</template>

<script>
    import ProjectAddFileDialogComponent from "@/components/Projects/ProjectsItem/ProjectAddFileDialogComponent";

    export default {
        name: "ProjectsItemFilesComponent",
        components: {ProjectAddFileDialogComponent},
        data() {
            return {
                loading: true,
                addFileDialog: false
            }
        },
        methods: {
            download(file) {
                window.location = file.path;
            },
            remove(file) {
                this.$store.dispatch('removeProjectFile', {project_file_id: file.id}).then(() => {
                    this.loading = false;
                }).catch(() => this.loading = false)
            }
        },
        mounted() {
            this.$store.dispatch('getProjectFiles', {project_id: this.$route.params.project_id}).then(() => {
                this.loading = false;
            })
        }
    }
</script>

<style scoped>

</style>
