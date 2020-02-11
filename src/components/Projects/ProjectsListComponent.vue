<template>
    <v-container :fluid="$store.state.user.fluid">
        <v-btn
                color="blue darken-2"
                dark
                fab
                fixed
                right
                to="/projects/create"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-row v-if="loading">
            <v-col :key="i" lg="3" v-for="i in 8">
                <v-skeleton-loader
                        class="mx-auto mt-2"
                        max-width="300"
                        type="image, article, list-item-avatar-three-line"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col :key="project.id" cols="12" lg="3" v-for="project in $store.state.projects.projects">
                <v-card>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn @click="remove(project)"
                               color="red"
                               icon v-if="$store.state.user.currentUser.admin == 1 || project.responsible_user_id == $store.state.user.currentUser.id">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn @click="approve(project)" color="green" icon
                               v-if="$store.state.user.currentUser.admin == 1 && project.approved == 0">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <div style="position: relative">
                        <v-img
                                :src="project.logotype_url"
                                class="white--text align-end"
                                height="200px"
                        >
                            <v-card-title style="z-index: 2; position:relative;">{{project.title}}</v-card-title>
                            <v-overlay :value="true" absolute z-index="1">
                            </v-overlay>

                        </v-img>
                        <v-card-subtitle>{{project.type.name}} проект</v-card-subtitle>
                        <v-card-text>
                            <div> {{project.task}}</div>
                        </v-card-text>
                        <v-divider/>
                        <v-overlay :value="true" absolute v-if="project.approved == 0" z-index="1">
                            <v-alert>
                                На модерации
                            </v-alert>
                        </v-overlay>
                        <v-list class="transparent">
                            <v-subheader>Вакансии</v-subheader>
                            <v-list-item :key="role.id" v-for="role in project.roles">
                                <v-list-item-title>
                                    {{role.name}}
                                </v-list-item-title>

                                <v-list-item-icon>
                                    <v-icon></v-icon>
                                </v-list-item-icon>

                                <v-list-item-subtitle class="text-right">
                                    {{role.quota}} чел
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                        <v-divider/>
                        <v-list-item color="blue">
                            <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="project.responsible_user.name+' '"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "ProjectsListComponent",
        data() {
            return {
                loading: true
            }
        },
        methods:{
            approve(project){
                if(confirm('Вы действительно хотите одобрить?')){
                    this.$store.dispatch('approveProject', {id: project.id})
                }
            },
            remove(project){
                if(confirm('Вы действительно хотите удалить проект?')){
                    this.$store.dispatch('removeProject', {id: project.id})
                }
            }
        },
        mounted() {
            this.$emit('changeTitle', 'Проекты')
            this.$store.dispatch('getProjects').then(() => {
                this.loading = false;
            })
        }
    }
</script>

<style scoped>

</style>