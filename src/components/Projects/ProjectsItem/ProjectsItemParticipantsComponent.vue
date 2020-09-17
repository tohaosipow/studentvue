<template>
    <div>
        <template v-if="$store.state.user.currentUser.admin == 1 || $store.getters.canEditProject">
            <v-alert type="info">
                Используйте кнопки Одобрить и Исключить для модерации заявки.
            </v-alert>
            <v-data-table :loading="loading"
                    :headers="headers"
                    :items="participants"
                    :items-per-page="5"
                    class="elevation-1"
                    no-data-text="Заявок на участие нет"
            >
                <template v-slot:item.pivot.admin="props">
                    <v-edit-dialog
                            :return-value.sync="props.item.admin"
                    >
                        <v-chip color="red" dark small v-if="!props.item.pivot.admin">Участник</v-chip>
                        <v-chip color="green" dark small v-else>Администратор проекта</v-chip>

                        <template v-slot:input>
                            <v-autocomplete
                                    :items="[{value: 0, name: 'Участник'}, {value: 1, name: 'Администратор'}]"
                                    :value="props.item.admin"
                                    @input="changePermission(props.item, $event)"
                                    item-text="name"
                                    item-value="value"
                                    label="Изменить"
                            />
                        </template>
                    </v-edit-dialog>

                </template>

                <template v-slot:item.pivot.approved="{ item }">
                    <v-btn @click="approve(item)" class="ma-2" color="success" outlined tile v-if="!item.pivot.approved"
                           x-small>
                        <v-icon left x-small>mdi-account-plus</v-icon>
                        Одобрить заявку
                    </v-btn>
                    <v-btn @click="decline(item)" class="ma-2" color="error" outlined tile x-small>
                        <v-icon left x-small>mdi-account-minus</v-icon>
                        Исключить
                    </v-btn>
                </template>
            </v-data-table>
        </template>
        <v-sheet v-else>
            <v-list-item :disabled="participant.pivot.approved == 0" :key="participant.id"
                         v-for="participant in participants"
            >
                <v-list-item-avatar>
                    <v-avatar color="blue" size="36">
                        <span class="white--text">{{participant.last_name.slice(0,1) + participant.first_name.slice(0,1)}}</span>
                    </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        {{participant.last_name}} {{participant.first_name}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        <span v-if="participant.student_group">
                        {{participant.student_group.name}} <span
                                v-if="participant.student_group.department && participant.student_group.department.institute"> {{participant.student_group.department.institute.name}}</span>
                    </span>
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-actions>
                    <v-chip color="green" dark v-if="participant.pivot.approved == 1">
                        {{participant.project_role.name}}
                    </v-chip>
                    <v-chip color="red" dark v-else>
                        Подал заявку
                    </v-chip>
                    <v-icon class="ml-2" v-if="participant.pivot.admin == 0 && participant.pivot.approved == 1">
                        mdi-account
                    </v-icon>
                    <v-icon class="ml-2" color="orange" v-else-if="participant.pivot.approved == 1">mdi-crown</v-icon>
                </v-list-item-actions>


            </v-list-item>
        </v-sheet>
    </div>
</template>

<script>
    export default {
        name: "ProjectsItemParticipantsComponent",
        computed: {
            project() {
                return this.$store.state.projects.currentProject;
            },
            participants() {
                return this.$store.state.projects.currentProjectParticipants;
            },

            readOnly() {
                return true
            }
        },
        methods: {
            approve(user) {
                user.loading = true
                this.loading = true
                this.$store.dispatch('approveUserOnProject', {id: this.project.id, user_id: user.id}).then(() => {
                    user.loading = false
                    this.loading = false
                })
            },
            decline(user) {
                user.loading = true;
                this.loading = true;
                this.$store.dispatch('declineUserOnProject', {id: this.project.id, user_id: user.id}).then(() => {
                    user.loading = false
                    this.loading = false
                })
            },
            changePermission(user, admin_mode) {
                this.$store.dispatch('changeParticipantPermission', {
                    id: this.project.id,
                    user_id: user.id,
                    admin: admin_mode
                })
            }
        },
        data() {
            return {
                loading: false,
                headers: [
                    {
                        text: '#',
                        align: 'left',
                        sortable: false,
                        value: 'id',
                    },
                    {text: 'Фамилия И. О. ', value: 'name'},
                    {text: 'Роль', value: 'project_role.name'},
                    {text: 'Полномочия', value: 'pivot.admin'},
                    {text: 'Участие', value: 'pivot.approved'},
                ],
            }
        }
    }
</script>

<style scoped>

</style>
