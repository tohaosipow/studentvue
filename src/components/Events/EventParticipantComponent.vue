<template>
    <v-data-table show-select loading="loading" loading-text="Загружаем ... "
            :headers="headers"
            :items="this.$store.state.events.participants"
            :items-per-page="5"
            class="elevation-1"
    >

        <template v-slot:item.approve="{ item }">
            <EventUserCheckSwitch :user="item" :event="$store.state.events.currentEvent"></EventUserCheckSwitch>
        </template>

        <template v-slot:item.is_visit="{ item }">
            <EventUserIsVisitSwitch :user="item" :event="$store.state.events.currentEvent"></EventUserIsVisitSwitch>
        </template>

        <template v-slot:item.rubrics="{ item }">
            <v-btn>Протокол</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import EventUserCheckSwitch from "@/components/Events/EventUserCheckSwitch";
    import EventUserIsVisitSwitch from "@/components/Events/EventUserIsVisitSwitch";

    export default {
        name: "EventParticipantComponent",
        components: {EventUserCheckSwitch, EventUserIsVisitSwitch},
        data(){
            return {
                loading: true,
                headers: [
                    {
                        text: '#',
                        align: 'left',
                        sortable: false,
                        value: 'id',
                    },
                    { text: 'Фамилия Имя', value: 'name' },
                    { text: 'Email', value: 'email' },
                    {text: 'Баллы', value: 'points'},
                    {text: 'Одобрение заявки', value: 'approve'},
                    {text: 'Присутствие', value: 'is_visit'},
                ],
            }
        },
        mounted(){
            this.$store.dispatch('getEventParticipants', {id: this.$store.state.events.currentEvent.id}).then(() => {this.loading = false})
        }
    }
</script>

<style scoped>

</style>