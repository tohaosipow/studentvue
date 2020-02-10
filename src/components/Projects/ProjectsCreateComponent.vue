<template>
    <v-container :fluid="$store.state.user.fluid">
        <v-row>
            <v-col cols="12" lg="6" offset-lg="3">
                <v-card outlined>
                    <v-card-title class="subtitle-1">Информация о заказчике</v-card-title>
                    <v-card-text>
                        <v-text-field label="Заказчик" outlined placeholder="Сургутский государственный университет"/>
                        <label>Цель участия в проекте</label>
                        <v-checkbox label="Получить прототип (продукт, услугу) для внедрения"/>
                        <v-checkbox label="Получить свежий взгляд, идеи на решение обозначенной проблемы"/>
                        <v-checkbox
                                label="Познакомиться с молодым поколением, сотрудниками вуза, подразделениями (лабораториями, кафедрами, институтами)"/>
                        <v-checkbox label="Выбрать лучшие кадры из числа молодых специалистов для трудоустройства"/>
                        <v-checkbox label="Другое"/>
                        <v-autocomplete :items="$store.state.timetables.employees" item-text="name"
                                        item-value="id" label="Отвественный сотрудник" outlined
                                        v-model="project.responsible_user_id"/>
                    </v-card-text>
                </v-card>
                <v-card class="mt-2" outlined>
                    <v-card-title class="subtitle-1">Информация о проекте</v-card-title>
                    <v-card-text>
                        <v-text-field counter="50" dense filled label="Название проекта" outlined shaped/>
                        <v-text-field counter="50" dense filled label="Задача" outlined shaped/>
                        <v-text-field counter="50" dense filled label="Проблема, которую решает проект" outlined
                                      shaped/>
                        <v-text-field counter="50" dense filled label="Планируемый результат" outlined shaped/>
                        <v-text-field counter="50" dense filled label="Требуемые материальные ресурсы ресурсы" outlined
                                      shaped/>
                    </v-card-text>
                </v-card>
                <v-card class="mt-2" outlined>
                    <v-card-title class="subtitle-1">Необходимые участники</v-card-title>
                    <v-card-text>
                        <transition-group name="list" tag="p">
                            <v-row :key="index" v-for="(role, index) in project.roles">
                                <v-col cols="8">
                                    <v-text-field counter="50" dense filled label="Название роли" outlined
                                                  v-model="role.name"/>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field dense label="Квота" max="5" min="0" outlined
                                                  suffix="чел. " type="number" v-model="role.quote"/>
                                </v-col>
                                <v-scroll-x-transition>
                                    <v-col cols="1">
                                        <v-btn @click="removeRole(index)" color="red" icon text>
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-scroll-x-transition>
                            </v-row>
                        </transition-group>
                        <v-btn @click="addRole" class="mx-auto" color="green" outlined small>
                            <v-icon>mdi-plus</v-icon>
                            Добавить роль
                        </v-btn>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: "ProjectsCreateComponent",
        data() {
            return {
                project: {
                    responsible_user_id: null,
                    roles: []
                }
            }
        },
        methods: {
            addRole() {
                this.project.roles.push({name: '', quote: 1})
            },

            removeRole(index) {
                this.project.roles.splice(index, 1);
            }
        },
        mounted() {
            this.$store.dispatch('getEmployees');
            this.project.responsible_user_id = this.$store.state.user.currentUser.id;
            this.$emit('changeTitle', 'Создание проекта')
        }
    }
</script>

<style scoped>
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }
</style>