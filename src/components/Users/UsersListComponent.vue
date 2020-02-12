<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                <v-text-field
                        append-icon="mdi-account-search"
                        hide-details
                        label="Поиск пользователя"
                        single-line
                        v-model="search"
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="users.data"
                    :items-per-page="30"
                    :loading="loading"
                    :options.sync="options"
                    :search="search"
                    :server-items-length="users.total"
                    class="elevation-1"
            >

                <template v-slot:item.email="props">
                    <v-edit-dialog
                            :return-value.sync="props.item.name"
                            @cancel="cancel"
                            @save="save(props.item)"
                    > {{ props.item.email }}
                        <template v-slot:input>
                            <v-text-field color="pink"
                                          label="Редактирование"
                                          single-line
                                          v-model="props.item.email"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>

                <template v-slot:item.first_name="props">
                    <v-edit-dialog
                            :return-value.sync="props.item.first_name"
                            @cancel="cancel"
                            @save="save(props.item)"
                    > {{ props.item.first_name }}
                        <template v-slot:input>
                            <v-text-field color="pink"
                                          label="Редактирование"
                                          single-line
                                          v-model="props.item.first_name"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>

                <template v-slot:item.last_name="props">
                    <v-edit-dialog
                            :return-value.sync="props.item.last_name"
                            @cancel="cancel"
                            @save="save(props.item)"
                    > {{ props.item.last_name }}
                        <template v-slot:input>
                            <v-text-field color="pink"
                                          label="Редактирование"
                                          single-line
                                          v-model="props.item.last_name"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>

                <template v-slot:item.third_name="props">
                    <v-edit-dialog
                            :return-value.sync="props.item.third_name"
                            @cancel="cancel"
                            @save="save(props.item)"
                    > {{ props.item.third_name }}
                        <template v-slot:input>
                            <v-text-field color="pink"
                                          label="Редактирование"
                                          single-line
                                          v-model="props.item.third_name"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>

                <template v-slot:item.employee_post="props">
                    <div v-if="props.item.role === 'employee'">
                        <v-edit-dialog
                                :return-value.sync="props.item.employee_post"
                                @cancel="cancel"
                                @save="save(props.item)"

                        >

                            <span>{{ props.item.employee_post }}</span>
                            <template v-slot:input>
                                <v-text-field color="pink"
                                              label="Редактирование"
                                              single-line
                                              v-model="props.item.employee_post"
                                />
                            </template>

                        </v-edit-dialog>
                    </div>
                    <template v-else>
                        -
                    </template>
                </template>

                <template v-slot:item.department_id="props">
                    <div v-if="props.item.role === 'employee'">
                        <v-edit-dialog
                                :return-value.sync="props.item.department_id"
                                @cancel="cancel"
                                @save="save(props.item)"

                        >

                            <span>{{$store.getters.getDepartmentByID(props.item.department_id).name}}</span>
                            <template v-slot:input>
                                <v-autocomplete :items="$store.state.dictionaries.departments"
                                                color="pink"
                                                label="Редактирование"
                                                item-text="name"
                                                item-value="id"
                                                single-line
                                                v-model="props.item.department_id"
                                />
                            </template>

                        </v-edit-dialog>
                    </div>
                    <template v-else>
                        -
                    </template>
                </template>

                <template v-slot:item.actions="props">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>mdi-gesture-tap-hold</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="break_password(props.item)">
                                <v-list-item-title>Сбросить пароль</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                </template>

            </v-data-table>
            <v-snackbar :color="snackColor" :timeout="3000" v-model="snack">
                {{ snackText }}
                <v-btn @click="snack = false" text>Закрыть</v-btn>
            </v-snackbar>
        </v-card>


    </v-container>
</template>

<script>
    import users from "@/api/users";
    import user from "@/api/user";

    export default {
        name: "UsersListComponent",
        watch: {
            options: {
                handler() {
                    this.load()
                },
                deep: true,
            },
            search: {
                handler() {
                    this.load()
                },
                deep: true,
            },
        },
        data() {
            return {
                snack: null,
                snackColor: null,
                snackText: null,

                page: 1,
                options: {},
                search: null,
                loading: true,
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
                    {text: 'Роль', value: 'role'},
                    {text: 'Email', value: 'email'},
                    {text: 'Телефон', value: 'phone'},
                    {text: 'Дата рождения', value: 'birthday_date'},
                    {text: 'Подразделение', value: 'department_id'},
                    {text: 'Должность', value: 'employee_post'},
                    {text: 'Действия', value: 'actions'},

                ],
                users: []
            }
        },
        methods: {
            load() {
                this.loading = true;
                users.all({
                    page: this.options.page,
                    perPage: this.options.itemsPerPage,
                    sortBy: this.options.sortBy[0],
                    sortDesc: this.options.sortDesc[0],
                    filter: this.search
                }).then((r) => {
                    this.users = r.data
                    this.loading = false;
                });
            },

            cancel() {
                this.load();
            },

            break_password(user) {
                users.break_password(user).then(() => {
                    this.snack = true;
                    this.snackColor = 'info';
                    this.snackText = 'Письмо на Email отправлено'
                })
            },

            save(user_i) {
                user.store(user_i).then(() => {
                    this.load()
                    this.snack = true;
                    this.snackColor = 'info';
                    this.snackText = 'Данные сохранены';
                });

            }
        },
        mounted() {
            this.$emit('changeTitle', 'Управление пользователями')
            this.load();

        }
    }
</script>

<style scoped>

</style>