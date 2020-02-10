<template>
    <v-container :fluid="$store.state.user.fluid">
        <v-btn to="/projects/create"
                color="blue darken-2"
                dark
                absolute
                right
                fab
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
    export default {
        name: "ProjectsListComponent",
        mounted(){
            this.$emit('changeTitle', 'Проекты')
        }
    }
</script>

<style scoped>

</style>