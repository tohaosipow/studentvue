<template>
    <v-card>
        <v-card-title>Создание аудитории</v-card-title>
        <v-card-text>
            <v-text-field v-model="place.name" label="Название аудитории"/>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="save" text color="blue darken-2">Сохранить</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "CreatePlaceModal",
        data() {
            return {
                place: {
                    name: null
                }
            }
        },
        methods:{
            save(){
                this.$store.dispatch('createPlace', this.place).then((r) => {
                    this.$emit('create', r);
                    this.$emit('close');
                })
            }
        }
    }
</script>

<style scoped>

</style>