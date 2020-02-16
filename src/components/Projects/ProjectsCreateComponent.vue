<template>
    <v-container :fluid="$store.state.user.fluid">
        <v-row>
            <v-col cols="12" lg="6" offset-lg="3">
                <v-card outlined>
                    <v-card-title class="subtitle-1">Информация о заказчике</v-card-title>
                    <v-card-text>
                        <v-text-field autocomplete="off" label="Заказчик" outlined
                                      placeholder="Сургутский государственный университет"
                                      v-model="project.customer"/>
                        <v-autocomplete :items="$store.state.projects.project_types" auto-select-first
                                        autocomplete="off"
                                        item-text="name" item-value="id" label="Тип проекта" outlined
                                        v-model="project.project_type_id"/>
                        <label>Цель проекта</label>
                        <v-checkbox label="Получить прототип (продукт, услугу) для внедрения" v-model="purposes"
                                    value="Получить прототип (продукт, услугу) для внедрения"/>
                        <v-checkbox label="Получить свежий взгляд, идеи на решение обозначенной проблемы"
                                    v-model="purposes"
                                    value="Получить свежий взгляд, идеи на решение обозначенной проблемы"/>
                        <v-checkbox
                                label="Познакомиться с молодым поколением, сотрудниками вуза, подразделениями (лабораториями, кафедрами, институтами)"
                                v-model="purposes"
                                value="Познакомиться с молодым поколением, сотрудниками вуза, подразделениями (лабораториями, кафедрами, институтами)"/>
                        <v-checkbox label="Выбрать лучшие кадры из числа молодых специалистов для трудоустройства"
                                    v-model="purposes"
                                    value="Выбрать лучшие кадры из числа молодых специалистов для трудоустройства"/>
                        <!--<v-autocomplete :items="$store.state.timetables.employees" autocomplete="off" item-text="name"
                                        item-value="id" label="Ответственный сотрудник" outlined
                                        v-model="project.responsible_user_id"/> !-->
                    </v-card-text>
                </v-card>
                <v-card class="mt-2" outlined>
                    <v-card-title class="subtitle-1">Информация о проекте</v-card-title>
                    <v-card-text>
                        <v-text-field counter="150" dense filled label="Название проекта" outlined
                                      shaped v-model="project.title"/>
                        <v-textarea counter="500" dense filled label="Задача" outlined shaped v-model="project.task"/>
                        <v-textarea counter="500" dense filled label="Проблема, которую решает проект"
                                    outlined shaped
                                    v-model="project.problem"/>
                        <v-textarea counter="500" dense filled label="Планируемый результат" outlined
                                    shaped v-model="project.result"/>
                        <v-textarea counter="500" dense filled label="Требуемые материальные ресурсы ресурсы"
                                    outlined shaped
                                    v-model="project.resources"/>
                        <v-file-input v-model="logotype" label="Логотип проекта" outlined  filled shaped dense/>
                    </v-card-text>
                </v-card>
                <v-card class="mt-2" outlined>
                    <v-card-title class="subtitle-1">Необходимые участники</v-card-title>
                    <v-card-text>
                        <transition-group name="list" tag="p">
                            <v-row align="center" :key="index" v-for="(role, index) in roles">
                                <v-col cols="8">
                                    <v-text-field dense filled label="Название роли"
                                                  outlined placeholder="Программист"
                                                  v-model="role.name"/>
                                    <v-text-field dense  label="Задачи роли"
                                                  outlined placeholder="Писать код"
                                                  v-model="role.tasks"/>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field dense label="Квота" max="5" min="0" outlined
                                                  suffix="чел. " type="number" v-model="role.quota"/>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn @click="removeRole(index)" color="red" icon text>
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                    <br>
                                    <br>
                                </v-col>
                                <v-divider/>
                            </v-row>
                        </transition-group>
                        <v-btn @click="addRole" class="mx-auto" color="green" outlined small>
                            <v-icon>mdi-plus</v-icon>
                            Добавить роль
                        </v-btn>

                    </v-card-text>
                </v-card>
                <v-card class="mt-2">
                    <v-card-text>
                        <v-btn @click="save" outlined color="blue darken-2">Добавить проект</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: "ProjectsCreateComponent",
        watch: {
            'purposes': function () {
                this.project.participation_purpose = this.purposes.join(", ")
            }
        },
        data() {
            return {
                project: {
                    responsible_user_id: null,
                    project_type_id: null,
                    task: null,
                    problem: null,
                    result: null,
                    title: null,
                    resources: null,
                    customer: null,
                    participation_purpose: null,
                },
                purposes: [],
                logotype: null,
                roles: [],
            }
        },
        methods: {
            addRole() {
                this.roles.push({name: '', tasks: '', quota: 1})
            },

            removeRole(index) {
                this.roles.splice(index, 1);
            },

            save(){
                let bodyFormData = new FormData();
                Object.keys(this.project).forEach((key) => {
                    bodyFormData.set(key, this.project[key])
                });
                bodyFormData.set('roles', JSON.stringify(this.roles));

                bodyFormData.append('logotype', this.logotype)
                this.$store.dispatch('storeProject', bodyFormData).then(() => {
                    this.$router.push('/projects');
                })


            }
        },
        mounted() {
            if(!this.$store.state.user.currentUser.id) return this.$router.push('/auth')
            this.$store.dispatch('getEmployees');
            this.$store.dispatch('getProjectTypes');
            this.project.responsible_user_id = this.$store.state.user.currentUser.id;
            if(this.$store.state.user.currentUser.role === 'company'){
                this.project.customer = this.$store.state.user.currentUser.company_name;
            }
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

    .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }
</style>