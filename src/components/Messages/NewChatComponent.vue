<template>
    <v-card  outlined>
        <v-card-title>Выберите чат</v-card-title>
        <v-card-text>
            <v-autocomplete
                    :items="users"
                    chips
                    return-object
                    item-text="name"
                    min-height="32px"
                    item-value="name"
                    no-data-text="Не найдено"
                    label="Выберите с кем вы хотите начать чат"
                    multiple
                    v-model="participants"
            >
                <template  v-slot:selection="data">
                    <v-chip :input-value="data.selected"
                            @click="data.select"
                            @click:close="remove(data.item)"
                            close
                            color="primary"
                            v-bind="data.attrs"
                    >
                        <v-avatar left>
                            <v-img :src="data.item.avatar"></v-img>
                        </v-avatar>
                        {{ data.item.last_name }}  {{ data.item.first_name }}
                    </v-chip>
                </template>
                <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                    </template>
                    <template v-else>
                        <v-list-item-avatar>
                            <img :src="data.item.avatar">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{data.item.first_name}} {{data.item.last_name}}
                            </v-list-item-title>
                            <v-list-item-subtitle v-html="data.item.role"></v-list-item-subtitle>
                        </v-list-item-content>
                    </template>
                </template>
            </v-autocomplete>
            <v-btn @click="createChat" :disabled="!participants.length" color="blue darken-2" dark>Создать чат</v-btn>
        </v-card-text>
    </v-card>

</template>

<script>
    export default {
        name: "NewChatComponent",
        computed: {
            users() {
                return this.$store.state.chats.users;
            }
        },
        methods: {
            remove(user){
                this.participants = this.participants.filter((el) => el.id !== user.id)
            },

            createChat(){
                this.$store.dispatch('createChat', {users: this.participants.map((p) => p.id)}).then(() => {
                    this.$emit('newchat')
                })
            }
        },
        data() {
            return {
                participants: [],
                loading: true
            }
        },
        mounted() {
            this.$store.dispatch('getUsers').then(() => {
                this.loading = false;
            })
        }
    }
</script>

<style scoped>

</style>
