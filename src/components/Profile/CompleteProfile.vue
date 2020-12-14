<template>
    <div>
        <v-dialog
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                v-model="enable"
        >
            <v-card v-if="user">
                <v-toolbar
                        color="primary"
                        dark
                >

                    <v-toolbar-title>Заполните поля</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn :loading="loading"
                               @click="save"
                               dark
                               text
                        >
                            Сохранить
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list
                        subheader
                        three-line
                >

                    <template v-if="this.$store.state.user.currentUser.role === 'visitor'">

                        <v-subheader>Ваша роль на портале не определена. Доступ может быть ограничен.</v-subheader>

                        <v-card-text>
                            <v-autocomplete :items="[
                    {id: 'employee', name: 'Сотрудник'},
                    {id: 'student', name: 'Студент'},
                    {id: 'pupil', name: 'Ученик школы'},
                    {id: 'company', name: 'Организация'},
                    ]" item-text="name" item-value="id" label="Роль" v-model="user.role"/>
                        </v-card-text>
                    </template>

                    <template
                            v-if="user.role === 'student' && !this.$store.state.user.currentUser.student_groups_id">

                        <v-subheader>Выберите вашу студенческую группу</v-subheader>

                        <v-card-text>
                            <v-autocomplete

                                    :items="$store.state.dictionaries.studentGroups"
                                    hint="Выберите существующую или укажите свою, если ее нет в списке"
                                    item-text="name"
                                    item-value="id"
                                    label="Учебная группа"
                                    outlined
                                    v-model="user.student_groups_id"
                            />
                        </v-card-text>
                    </template>

                    <template
                            v-if="user.role === 'employee' && !this.$store.state.user.currentUser.department_id">

                        <v-subheader>Выберите ваше структурное подразделение</v-subheader>

                        <v-card-text>
                            <v-autocomplete

                                    :items="$store.state.dictionaries.departments"
                                    item-text="name"
                                    item-value="id"
                                    label="Подразделение"
                                    outlined
                                    v-model="user.department_id"
                            />

                            <v-text-field
                                    label="Должность"
                                    outlined
                                    v-model="user.employee_post"/>
                        </v-card-text>
                    </template>


                </v-list>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import user from "@/api/user.js";

    export default {
        name: "CompleteProfile",
        props: ['enable'],
        data() {
            return {
                user: null,
                loading: false
            }
        },
        methods: {
            save() {
                this.loading = true;
                user.store(this.user).then(() => {
                    this.$store.dispatch('getUser').then(() => {
                        this.$emit('close');
                    });
                })
            }
        },
        mounted() {
            if (!this.$store.state.user.currentUser.id) return this.$emit('close');
            this.user = {...this.$store.state.user.currentUser};
        }
    }
</script>

<style scoped>

</style>
