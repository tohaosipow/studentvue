<template>
    <div class="row">
        <div class="col-md-4">
            <v-card :loading="loading" class="mx-auto"
                    outlined
                    tile
            >
                <div>
                    <v-card-actions>
                        <v-btn @click="select_chat_id = null, select_chat = null" class="float-right" color="blue" dark
                               depressed
                               elevation="0" outlined>
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Новый чат
                        </v-btn>
                    </v-card-actions>
                    <v-card-title>Ваши чаты</v-card-title>
                    <v-card-subtitle>выберите нужный чат</v-card-subtitle>

                </div>

                <v-list three-line>
                    <div v-if="!chats.length">
                        <p class="text-center grey lighten-3 pa-2">Диалогов пока нет. <br> Но вы можете создать новый
                        </p>
                    </div>
                    <v-list-item-group
                            color="primary"
                            v-model="select_chat_id">

                        <div :key="chat.id" v-for="chat in chats">


                            <v-list-item @click="select_chat = chat">

                                <v-list-item-avatar>
                                    <v-img :src="'https://ui-avatars.com/api/?name='+chat.name+'&rounded=true&background=1967c3&color=ffffff'"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>{{chat.goodName}} <span
                                            class="grey--text text--lighten-1 float-right">
                                        <v-badge
                                                :content="chat.unread_count"
                                                :value="chat.unread_count"
                                                color="red"
                                                inline
                                        ></v-badge>
                                    </span>
                                    </v-list-item-title>
                                    <v-list-item-subtitle v-if="chat.messagesCount > 0">
                                        {{chat.lastMessage.text}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>

                            </v-list-item>
                            <v-divider/>
                        </div>

                    </v-list-item-group>
                </v-list>
            </v-card>
        </div>
        <div class="col-md-8">
            <DialogComponent :chat="select_chat"
                             @newchat="select_chat = chats[chats.length-1], select_chat_id = chats[chats.length-1].id"/>
        </div>
    </div>

</template>

<script>
    import DialogComponent from "@/components/Messages/DialogComponent.vue";

    export default {
        name: "MessagesComponent",
        data() {
            return {
                loading: true,
                select_chat: null,
                select_chat_id: 0
            }
        },
        methods: {

        },
        components: {
            DialogComponent
        },
        computed: {
            chats() {
                return this.$store.state.chats.chats;
            }
        },
        mounted() {
            if (!this.$store.state.user.currentUser.id) return this.$router.push('/auth');
            this.$store.dispatch('getChats').then(() => {
                this.select_chat = this.chats[0]
                this.loading = false;
            });

            /*setInterval(() => {
                this.$store.dispatch('getChats').then(() => {
                    this.select_chat = this.chats[0]
                    this.loading = false;
                });

            }, 1000) */

        },
        watch: {
            chats() {
                this.chats.forEach((chat) => {
                    window.Echo.private(`messages.chat.${chat.id}`)
                        .listen('chat_changed', () => {
                            this.$store.dispatch('getChats')
                        });
                })

            }
        }
    }
</script>

<style scoped>

</style>
