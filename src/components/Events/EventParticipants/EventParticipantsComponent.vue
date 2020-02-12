<template>
    <v-data-table :headers="headers" :items="this.$store.state.events.participants" :items-per-page="10"
                  :loading="loading"
                  loading-text="Загружаем ... "
                  show-select
    >

        <template v-slot:item.role="props">
            <v-edit-dialog
                    :return-value.sync="props.item.roles"
            >
                <v-chip :key="index"
                        class="ma-2"
                        label
                        v-for="(role, index) in props.item.roles.map((el) => {return el.event_role.role.name})"
                >
                    {{role}}
                </v-chip>
                <template v-slot:input>
                    <v-autocomplete :items="$store.state.events.currentEvent.roles" :value="props.item.roles.map((el) => {return el.event_role.id})"
                                    color="pink"
                                    item-text="role.name"
                                    item-value="id"
                                    label="Редактирование"
                                    multiple
                    />
                </template>
            </v-edit-dialog>
        </template>
        <template v-slot:item.approve="{ item }">
            <EventUserCheckSwitch :event="$store.state.events.currentEvent" :user="item"></EventUserCheckSwitch>
        </template>

        <template v-slot:item.is_visit="{ item }">
            <EventUserIsVisitSwitch :event="$store.state.events.currentEvent" :user="item"></EventUserIsVisitSwitch>
        </template>

    </v-data-table>
</template>

<script>
    import EventUserCheckSwitch from "@/components/Events/EventParticipants/EventUserCheckSwitch";
    import EventUserIsVisitSwitch from "@/components/Events/EventParticipants/EventUserIsVisitSwitch";

    export default {
        name: "EventParticipantComponent",
        components: {EventUserCheckSwitch, EventUserIsVisitSwitch},
        data() {
            return {
                loading: true,
                headers: [
                    {
                        text: '#',
                        align: 'left',
                        sortable: false,
                        value: 'id',
                    },
                    {text: 'Фамилия Имя', value: 'name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Роль', value: 'role'},
                    {text: 'Баллы', value: 'points'},
                    {text: 'Одобрение заявки', value: 'approve'},
                    {text: 'Присутствие', value: 'is_visit'},
                ],
            }
        },
        mounted() {
            this.$store.dispatch('getEventParticipants', {id: this.$store.state.events.currentEvent.id}).then(() => {
                this.loading = false
            })
        }
    }
</script>

<style scoped>

</style>