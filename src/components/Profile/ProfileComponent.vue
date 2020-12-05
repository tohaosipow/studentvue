<template>
    <v-sheet>
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
                            <span v-if="user.role === 'student'">Студент</span>
                            <span v-if="user.role === 'pupil'">Учащийся</span>
                            <span v-if="user.role === 'employee'">Сотрудник</span>
                            <span v-if="user.role === 'company'">Партнер</span>
                        </v-list-item-subtitle>

                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn :to="{name: 'profile.edit', params: {id: user.id}}" icon>
                            <v-icon color="gray">mdi-pencil</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-col>
        </v-card>
        <v-card class="mt-2" elevation="0">

            <v-list-item
            >
                <v-list-item-avatar>
                    <v-icon>mdi-calendar</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="heading">
                        Опыт участия в мероприятиях
                    </v-list-item-title>


                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="mt-2" elevation="0">

            <v-list-item
            >
                <v-list-item-avatar>
                    <v-icon>mdi-calendar</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="heading">
                        Опыт участия в проетках
                    </v-list-item-title>


                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-sheet>
</template>

<script>
    export default {
        name: "ProfileComponent",
        computed: {
            user() {
                return this.$store.state.user.currentUser
            }
        },
    }
</script>

<style scoped>

</style>
