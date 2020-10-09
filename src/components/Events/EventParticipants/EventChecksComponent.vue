<template>
    <v-card :loading="loading"
            v-if="$store.getters.isEventAdmin($store.state.user.currentUser.id)">
        <v-card-title>
            <v-text-field
                    append-icon="mdi-magnify"
                    hide-details
                    label="Поиск заявок"
                    single-line
                    v-model="search"
            ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="items"
                      :loading="loading" :search="search"
                      loading-text="Загрузка"
                      no-data-text="Нет заявок"
        >
            <template v-slot:item.check_at="{ item }">
                {{$moment(item.check_at).format("DD.MM.YYYY H:mm")}}
            </template>

            <template v-slot:item.role="{ item }">
                {{item.event_check_roles.map((ecr) => ecr.event_role.role.name).join(", ")}}
            </template>

            <template v-slot:item.type="{ item }">
                <div v-if="item.user.role === 'student'">
                    Студент
                </div>
                <div v-if="item.user.role === 'employee'">
                    {{item.user.employee_post}}
                    <span v-if="item.department">{{item.user.department.name}}</span>

                </div>
                <div v-if="item.role === 'pupil'">
                    {{item.user.pupil_school}}
                    {{item.user.pupil_class}}
                </div>
                <div v-if="item.user.role === 'visitor'">
                    Посетитель
                </div>

            </template>

            <template v-slot:item.accept="{ item }">
                <v-btn @click="approve(item.id)" color="green" outlined small>Принять</v-btn>
            </template>

            <template v-slot:item.decline="{ item }">
                <v-btn @click="decline(item.id)"  color="red" outlined small>Отклонить</v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import event_checks from "@/api/event_checks";

    export default {
        name: "EventChecksComponent",
        data() {
            return {
                search: "",
                loading: true,
                headers: [
                    {
                        text: '#',
                        align: 'left',
                        sortable: false,
                        value: 'id',
                    },
                    {text: 'Фамилия Имя', value: 'user.name'},
                    {text: 'Дата подачи заявки', value: 'check_at'},
                    {text: 'Информация', value: 'type'},
                    {text: 'Роль', value: 'role'},
                    {text: 'Принять', value: 'accept'},
                    {text: 'Отклонить', value: 'decline'},
                ],
                items: []
            }
        },
        methods: {
            approve(id) {
                this.loading = true;
                this.$store.dispatch('approveJoinToEvent', {
                    id,
                    event_id: this.$store.state.events.currentEvent.id
                }).then(() => {
                    this.update()
                })

            },

            decline(id) {
                this.loading = true;
                this.$store.dispatch('declineJoinToEvent', {id, event_id: this.$store.state.events.currentEvent.id}).then(() => {
                    this.update()
                })
            },

            update() {
                event_checks.all(this.$store.state.events.currentEvent.id).then((r) => {
                    this.items = r.data;
                    this.loading = false;
                })
            }
        },
        mounted() {
            this.update();
        }
    }
</script>

<style scoped>

</style>
