<template>
    <v-card>
        <v-card-title class="headline">Заполните заявку на участие</v-card-title>
        <v-form>
            <v-container>
                <v-row>
                    <v-col lg="12">
                        <v-select v-model="application.event_role_id" no-data-text="Нет подходящих ролей" item-value="id" item-text="role.name" :items="$store.state.events.currentEvent.visible_roles" dense label="Выберите тип участия" outlined></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$emit('close')">Закрыть</v-btn>
            <v-btn :loading="loading" color="blue darken-3" text @click="checkIn">Подать</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "EventApplicationComponent",
        data(){
          return {
              application:{
                  event_role_id: null
              },
              loading: false
          }
        },
        methods:{
            checkIn(){
                this.loading = true;
                this.$store.dispatch('checkIn', {event_id: this.$store.state.events.currentEvent.id, event_role_id: this.application.event_role_id}).then(() => {
                    this.loading = false;
                    this.$emit('close');

                })

            }
        },
        mounted(){
        }
    }
</script>

<style scoped>

</style>