<template>
    <div>
        <v-btn class="m-2" outlined
               :href="'https://api.student.surgu.ru/events/'+this.$store.state.events.currentEvent.id+'/participants/csv'">
            Скачать
        </v-btn>


        <v-card-title>
            <v-text-field
                    append-icon="mdi-account-search"
                    hide-details
                    label="Поиск пользователя"
                    single-line
                    v-model="search"
            ></v-text-field>
        </v-card-title>

        <v-data-table :search="search"
                      :headers="headers"
                      :items="this.$store.state.events.participants" :items-per-page="10" :loading="loading"
                      loading-text="Загружаем ... "
                      show-select
                      v-if="$store.state.user.currentUser.admin === 1 || $store.getters.isEventAdmin($store.state.user.currentUser.id)"
        >

            <template v-slot:item.role="props">
                <v-edit-dialog
                >
                    <v-chip :key="index"
                            class="ma-2"
                            label
                            v-for="(role, index) in props.item.roles.map((el) => {return el.event_role.role.name})"
                    >
                        {{role}}
                    </v-chip>
                    <template v-slot:input>
                        <v-autocomplete :items="$store.state.events.currentEvent.roles"
                                        :value="props.item.roles.map((el) => {return el.event_role.id})"
                                        @input="changeParticipantRole(props.item.id, $event)"
                                        color="pink"
                                        item-text="role.name"
                                        item-value="id"
                                        label="Редактирование"
                                        multiple
                        />
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:item.is_visit="{ item }">
                <EventUserIsVisitSwitch :event="$store.state.events.currentEvent" :user="item"></EventUserIsVisitSwitch>
            </template>

            <template v-slot:item.type="{ item }">
                <div v-if="item.role === 'student'">
                    Студент
                    <span v-if="item.student_group">{{item.student_group.name}}</span> -
                    <span v-if="item.student_group && item.student_group.department">{{item.student_group.department.name}}</span>
                </div>
                <div v-if="item.role === 'employee'">
                    {{item.employee_post}}
                    <span v-if="item.department">{{item.department.name}}</span>

                </div>
                <div v-if="item.role === 'pupil'">
                    {{item.pupil_school}}
                    {{item.pupil_class}}
                </div>
                <div v-if="item.role === 'visitor'">
                    Посетитель
                </div>

            </template>

        </v-data-table>
    </div>

</template>

<script>
    //  import EventUserCheckSwitch from "@/components/Events/EventParticipants/EventUserCheckSwitch";
    import EventUserIsVisitSwitch from "@/components/Events/EventParticipants/EventUserIsVisitSwitch";

    export default {
        name: "EventParticipantComponent",
        components: {EventUserIsVisitSwitch},
        data() {
            return {
                loading: true,
                search: "",
                headers: [
                    {
                        text: '#',
                        align: 'left',
                        sortable: false,
                        value: 'id',
                    },
                    {text: 'Фамилия', value: 'last_name'},
                    {text: 'Имя', value: 'first_name'},
                    {text: 'Отчество', value: 'third_name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Тип', value: 'type'},
                    {text: 'Роль', value: 'role'},
                    {text: 'Присутствие', value: 'is_visit'},
                ],
            }
        },
        methods: {
            changeParticipantRole(user_id, roles) {
                // eslint-disable-next-line no-console
                console.log(user_id, roles)
                this.$store.dispatch('changeParticipantRole', {
                    event_id: this.$store.state.events.currentEvent.id,
                    user_id,
                    roles
                })
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
