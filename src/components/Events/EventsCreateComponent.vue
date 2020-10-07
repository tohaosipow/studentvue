<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" lg="7">
                <v-card :loading="loading">
                    <v-card-title>Создание мероприятия</v-card-title>
                    <v-card-text>
                        <v-alert :key="i" type="error" v-for="(e,i) in errors">{{e[0]}}</v-alert>
                        <v-text-field :error-messages="errors.name" label="Название" v-model="event.name"/>
                        <v-textarea :error-messages="errors.description" label="Описание" v-model="event.description"/>
                        <v-switch color="green" label="Онлайн-мероприятие" v-model="event.is_online"/>
                        <v-switch label="Мероприятие проводится внутри университета" v-if="!event.is_online"
                                  v-model="inner"/>


                        <v-text-field :error-messages="errors.address" label="Адрес" v-if="!inner && !event.is_online"
                                      v-model="event.address"/>
                        <v-autocomplete :clearable="true" :error-messages="errors.place_id" :items="$store.state.timetables.places"
                                        aria-autocomplete="none"
                                        autocomplete="off"
                                        item-text="name"
                                        item-value="id"
                                        label="Аудитория проведения"
                                        no-data-text="Такой аудитории у нас нет"
                                        v-if="inner"
                                        v-model="event.place_id"
                        >
                            <template v-slot:prepend-item>
                                <v-list-item @click="() => {createPlaceModalShow = true}"
                                             ripple
                                >
                                    <v-list-item-action>
                                        <v-icon color="green">mdi-plus</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>Создать аудиторию</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider class="mt-2"></v-divider>
                            </template>

                        </v-autocomplete>
                        <v-text-field :error-messages="errors.check_start_at"
                                      :placeholder="$moment().format('DD.MM.YYYY HH:mm')"
                                      hint="Дата, начиная с которой можно подавать заявки" label="Начало регистрации"
                                      v-mask="'##.##.#### ##:##'" v-model="event.check_start_at"/>
                        <v-text-field :error-messages="errors.check_end_at"
                                      :placeholder="$moment().format('DD.MM.YYYY HH:mm')"
                                      hint="Дата, начиная с которой нельзя стать участником" label="Конец регистрации"
                                      v-mask="'##.##.#### ##:##'" v-model="event.check_end_at"/>
                        <v-text-field :error-messages="errors.start_at"
                                      :placeholder="$moment().format('DD.MM.YYYY HH:mm')" label="Начало мероприятия"
                                      v-mask="'##.##.#### ##:##'" v-model="event.start_at"/>
                        <v-text-field :error-messages="errors.end_at"
                                      :placeholder="$moment().format('DD.MM.YYYY HH:mm')" label="Конец мероприятия"
                                      v-mask="'##.##.#### ##:##'" v-model="event.end_at"/>
                        <v-autocomplete :error-messages="errors.event_type_id" :items="$store.state.events.event_types"
                                        item-text="name" item-value="id" label="Тип мероприятия"
                                        v-model="event.event_type_id"/>
                        <v-autocomplete :error-messages="errors.user_role_id" :items="user_roles" auto-select-first
                                        item-text="name"
                                        item-value="id" label="Роль по умолчанию" v-model="event.user_role_id"/>
                        <v-text-field :error-messages="errors.phone" label="Телефон для справки" v-mask="'+7##########'"
                                      v-model="event.phone"/>
                        <v-switch :error-messages="errors.teams_allowed" label="Командное участие"
                                  v-model="event.teams_allowed"/>
                        <v-file-input :error-messages="errors.header_bg" label="Постер"
                                      v-model="header_bg"></v-file-input>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :loading="loading" @click="save" color="blue darken-2" outlined>Добавить мероприятие</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" lg="5">
                <v-card>
                    <v-card-title>Роли</v-card-title>
                    <v-card-text>
                        <v-sheet class="pa-3 text-center" color="grey lighten-3" v-if="event_roles.length < 1">Добавьте
                            роли
                        </v-sheet>
                        <v-sheet :key="index" class="pa-5 mt-3" color="grey lighten-4"
                                 v-for="(role, index) in event_roles">
                            <v-row align="center">
                                <v-col lg="6">
                                    <v-autocomplete :items="user_roles" auto-select-first item-text="name"
                                                    item-value="id" label="Роль" v-model="role.user_role_id"/>
                                </v-col>
                                <v-col lg="5">
                                    <v-text-field hint="Баллы, начисляемые за участие" items=""
                                                  label="Баллы" type="number" v-model="role.points_max"/>
                                </v-col>
                                <v-col lg="1">
                                    <v-btn icon>
                                        <v-icon @click="removeRole(index)" color="red">mdi-delete</v-icon>
                                    </v-btn>
                                    <br>
                                </v-col>
                                <v-col lg="12">
                                    <v-checkbox dense label="Недоступна для выбора при регистрации"
                                                v-model="role.hidden"/>
                                    <v-checkbox dense label="Может оценивать участников" v-model="role.can_set_points"/>
                                    <v-checkbox dense label="Может редактировать мероприятие" v-model="role.admin"/>
                                </v-col>

                            </v-row>
                        </v-sheet>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="addRole" color="green" text>Добавить роль в мероприятие</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog max-width="500" v-model="createPlaceModalShow">
            <CreatePlaceModal
                    @close="() => {this.createPlaceModalShow = false;}" @create="place = $event"/>
        </v-dialog>
    </v-container>
</template>

<script>
    import {mask} from 'vue-the-mask'
    import CreatePlaceModal from "@/components/Timetables/DisplinesCreator/CreatePlaceModal";

    export default {
        directives: {
            mask,
        },
        components: {
            CreatePlaceModal
        },
        name: "EventsCreateComponent",
        data() {
            return {
                loading: true,
                inner: false,
                createPlaceModalShow: false,
                header_bg: null,
                event: {
                    place_id: null,
                    name: null,
                    address: null,
                    phone: null,
                    description: null,
                    check_start_at: null,
                    check_end_at: null,
                    teams_allowed: false,
                    start_at: null,
                    end_at: null,
                    event_type_id: null,
                    user_role_id: null,
                    is_online: false
                },
                errors: {},
                event_roles: []
            }
        },
        computed: {
            user_roles() {
                return this.$store.state.events.user_roles
            }
        },
        methods: {
            addRole() {
                this.event_roles.push({
                    user_role_id: null,
                    points_max: 1,
                    hidden: false,
                    admin: false,
                    can_set_points: false,
                })
            },
            removeRole(index) {
                this.event_roles.splice(index, 1)
            },

            save() {
                this.loading = true;
                let fd = new FormData();
                Object.keys(this.event).forEach((key) => {
                    if (this.event[key] === true) this.event[key] = 1;
                    if (this.event[key] === false) this.event[key] = 0;
                    fd.set(key, this.event[key])
                });
                fd.append('header_bg', this.header_bg)
                fd.set('roles', JSON.stringify(this.event_roles));
                this.$store.dispatch('storeEvent', fd).then(() => {
                    this.$router.push('/')
                    this.loading = false;
                }).catch((e) => {
                    this.errors = e.response.data.errors
                    this.loading = false;
                })
            }
        },
        mounted() {
            if(!this.$store.state.user.currentUser.id) return this.$router.push('/auth')
            Promise.all([
                this.$store.dispatch('getEventTypes'),
                this.$store.dispatch('getPlaces'),
                this.$store.dispatch('getUserRoles')
            ]).then(() => {
                this.loading = false;
            })

            this.$emit('changeTitle', 'Создание мероприятия')
        }
    }
</script>

<style scoped>

</style>
