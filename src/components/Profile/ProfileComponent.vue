<template>
    <v-sheet>
        <v-breadcrumbs :items="[{
          text: 'Главная',
          href: '/',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Личный кабинет',
          disabled: true,
          href: '/#/profile/'+user.id,
        }]"></v-breadcrumbs>
        <v-card class="mx-auto pa-2" elevation="0"
                outlined
                tile
        >
            <v-col class="py-0">
                <v-list-item
                >
                    <v-list-item-avatar>
                        <v-img :src="user.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="title">
                            {{user.last_name}}
                            {{user.first_name}}
                            {{user.third_name}}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                                    <span
                                            v-if="user.role === 'visitor'">Посетитель</span>
                            <span v-if="user.role === 'student'">Студент {{user.student_group.name}}</span>
                            <span v-if="user.role === 'pupil'">Учащийся</span>
                            <span v-if="user.role === 'employee'">Сотрудник</span>
                            <span v-if="user.role === 'company'">Партнер</span>
                        </v-list-item-subtitle>

                    </v-list-item-content>
                    <v-list-item-action
                            v-if="user.id === $store.state.user.currentUser.id || $store.state.user.currentUser.admin > 0">
                        <v-btn :to="{name: 'profile.edit', params: {id: user.id}}" icon>
                            <v-icon color="gray">mdi-pencil</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-col>
        </v-card>
        <v-card class="mt-2" elevation="0">
            <v-alert border="left"
                     class="mt-2"
                     outlined
                     type="info"
            >
                Сейчас здесь пусто, но скоро здесь будет очень много интересного...
            </v-alert>

            <v-data-table
                    :items-per-page="10"
                    :items="transactions"
                    :headers="[
                {value: 'id', text: '#'},
                {value: 'description', text: 'Описание'},
                {value: 'score', text: 'Балл'},
                {value: 'created_at', text: 'Дата синхронизации'},
            ]"
                    class="elevation-1"
            ></v-data-table>
        </v-card>


    </v-sheet>
</template>

<script>
    import users from "@/api/users.js";

    export default {
        name: "ProfileComponent",
        data() {
            return {
                user: undefined,
                transactions: []
            }
        },
        mounted() {
            users.item({id: this.$route.params.id}).then((r) => {
                this.user = r.data;
            });

            users.transactions({id: this.$route.params.id}).then((r) => {
                this.transactions = r.data;
            })
        }
    }
</script>

<style scoped>

</style>
