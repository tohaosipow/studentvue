<template>
    <v-dialog fullscreen transition="scale-transition" v-if="$store.state.user.currentUser.id > 0 && event && event.id > 0" v-model="open">
        <template v-slot:activator="{ on }">
            <v-btn block class="mt-2" color="orange" icon outlined rounded v-on="on">
                <v-icon left>mdi-pencil</v-icon>
                Редактировать информацию
            </v-btn>
        </template>
        <v-card :loading="loading">
            <v-card-actions>
                <v-btn @click="open = false" icon right>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-actions>
            <v-card-title>Редактирование мероприятия</v-card-title>
            <v-card-text>
                <v-alert :key="i" type="error" v-for="(e,i) in errors">{{e[0]}}</v-alert>
                <v-text-field :error-messages="errors.name" label="Название" v-model="event.name"/>
                <v-textarea :error-messages="errors.description" label="Описание" v-model="event.description"/>
                <v-switch color="green" label="Онлайн-мероприятие" v-model="event.is_online"/>
                <v-switch label="Мероприятие проводится внутри университета" v-if="!event.is_online"
                          v-model="inner"/>


                <v-text-field :error-messages="errors.address" label="Адрес" v-if="!inner && !event.is_online"
                              v-model="event.address"/>
                <v-autocomplete :clearable="true" :error-messages="errors.place_id"
                                :items="$store.state.timetables.places"
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
                              v-model="event.check_start_at"/>
                <v-text-field :error-messages="errors.check_end_at"
                              :placeholder="$moment().format('DD.MM.YYYY HH:mm')"
                              hint="Дата, начиная с которой нельзя стать участником" label="Конец регистрации"
                              v-model="event.check_end_at"/>
                <v-text-field :error-messages="errors.start_at"
                              :placeholder="$moment().format('DD.MM.YYYY HH:mm')" label="Начало мероприятия"
                              v-model="event.start_at"/>
                <v-text-field :error-messages="errors.end_at"
                              :placeholder="$moment().format('DD.MM.YYYY HH:mm')" label="Конец мероприятия"
                              v-model="event.end_at"/>
                <v-autocomplete :error-messages="errors.event_type_id" :items="$store.state.events.event_types"
                                item-text="name" item-value="id" label="Тип мероприятия"
                                v-model="event.event_type_id"/>
                <v-autocomplete :error-messages="errors.user_role_id" :items="$store.state.events.user_roles"
                                auto-select-first
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
                <v-btn :loading="loading" @click="save" color="blue darken-2" outlined>Сохранить мероприятие</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mask} from 'vue-the-mask'
    export default {
        directives: {
            mask,
        },
        name: "EventEditDialogComponent",
        computed: {
            currentEvent() {
                return this.$store.state.events.currentEvent;
            }
        },
        data() {
            return {
                header_bg: null,
                loading: true,
                inner: false,
                event: {},
                open: false,
                errors: {},
            }
        },
        methods: {
            save() {
                let fd = new FormData();
                Object.keys(this.event).forEach((key) => {
                    if (this.event[key] === true) this.event[key] = 1;
                    if (this.event[key] === false) this.event[key] = 0;
                    fd.set(key, this.event[key])
                });
                if (this.header_bg) fd.append('header_bg', this.header_bg)

                this.$store.dispatch('updateEvent', {id: this.event.id, obj: fd}).then(() => {
                    this.open = false;

                }).catch((e) => {
                    this.errors = e.response.data.errors
                })
            }

        },
        mounted() {
            this.event = {...this.currentEvent};
            this.event.teams_allowed = this.event.teams_allowed == 1;
            this.event.is_online = this.event.is_online == 1;
            Promise.all([
                this.$store.dispatch('getEventTypes'),
                this.$store.dispatch('getPlaces'),
                this.$store.dispatch('getUserRoles')
            ]).then(() => {
                this.loading = false;
            })
        },

        watch: {
            currentEvent(){
                this.event = {...this.currentEvent}
                this.event.teams_allowed = this.event.teams_allowed == 1;
                this.event.is_online = this.event.is_online == 1;
            }
        }
    }
</script>

<style scoped>

</style>
