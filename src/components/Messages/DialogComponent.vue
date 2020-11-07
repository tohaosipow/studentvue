<template>
    <div>
        <NewChatComponent @newchat="$emit('newchat')" v-if="!chat"/>
        <v-card :loading="loading" ref="main_block" v-else>

            <div class="text-center grey pa-2 lighten-5">
                <span class=" text-center mb-0">{{chat.goodName}}</span>
                <v-dialog v-if="!chat.private"
                        v-model="participantDialog"
                        width="600px"
                >
                    <template v-slot:activator="{ on, attrs }">

                        <v-btn color="primary" dark
                               style="font-size: 10px;"
                               text
                               v-bind="attrs"
                               v-on="on"
                        >
                            {{chat.participantsCount}} участников
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            Участники чата
                        </v-card-title>
                        <v-card-text>
                            <v-list>
                                <v-list-item :key="p.id" v-for="p in chat.participants">
                                    <v-list-item-avatar>
                                        <v-img :src="'https://ui-avatars.com/api/?name='+p.name+'&rounded=true&background=1967c3&color=ffffff'"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>{{p.name}}</v-list-item-title>
                                        <v-list-item-subtitle v-if="p.id === chat.owner_id">Организатор</v-list-item-subtitle>
                                        <v-list-item-subtitle v-else>Участник</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>

                    </v-card>
                </v-dialog>


            </div>

            <v-card-text>
                <div class="text-center" v-if="!messages.length">Сообщений пока нет, но Вы можете отправить первое.
                </div>

            </v-card-text>
            <div class="pa-3 messages" ref="message_box" style="overflow-y: scroll; height: calc(100vh - 350px)">
                <Message :date="item.created_at" :id="item.id" :key="item.id"
                         :me="$store.state.user.currentUser.id === item.owner_id"
                         :name="item.owner.first_name + ' ' + item.owner.last_name" :readers="item.readers"
                         :text="item.text"
                         v-for="item in messages"/>

            </div>
            <div class="pa-2" ref="input_box" style="background: #fafafa;">
                <form @submit.prevent="sendMessage" v-on:keyup.enter="sendMessage">
                    <v-textarea class="mt-5" clearable label="Ваше сообщение" outlined
                                ref="input_field"
                                v-model="text"
                    ></v-textarea>
                    <v-btn :disabled="text.length < 3" :loading="on_send" color="blue" dark type="submit">
                        <v-icon left>mdi-send</v-icon>
                        Отправить
                    </v-btn>
                </form>
            </div>
        </v-card>
    </div>
</template>

<script>
    import NewChatComponent from "@/components/Messages/NewChatComponent.vue";
    import Message from "@/components/Messages/Message.vue";

    export default {
        name: "DialogComponent",
        components: {NewChatComponent, Message},
        props: {
            chat: {
                default: null
            }
        },
        computed: {
            messages() {
                return this.$store.state.chats.currentChatMessages;
            }
        },
        data() {
            return {
                participants: [],
                availableParticipants: [],
                loading: true,
                text: "",
                on_send: false,
                participantDialog: false
            }
        },
        methods: {
            sendMessage() {
                this.on_send = true;
                this.$store.dispatch('sendMessage', {id: this.chat.id, text: this.text}).then(() => {
                    this.on_send = false;
                    this.text = "";
                    this.$refs.input_field.focus();
                    this.$refs.message_box.scrollTop = this.$refs.message_box.scrollHeight;

                })
            },

            updateMessages() {
                this.$store.dispatch('getCurrentChatMessages', {id: this.chat.id}).then(() => {
                    this.loading = false;
                    this.$refs.message_box.scrollTop = this.$refs.message_box.scrollHeight;

                })
            },
            init() {
                if (this.chat === null) return false;
                window.Echo.private(`messages.chat.${this.chat.id}`)
                    .listen('messages_send', (message) => {
                        this.$store.commit('addMessage', message);
                        this.updateMessages();
                        this.$refs.message_box.scrollTop += 200;
                    });

                this.updateMessages();
            }
        },
        watch: {
            chat(now, before) {
                // eslint-disable-next-line no-console
                console.log(now, before)
                if (!before || now.id !== before.id) {
                    if (before) window.Echo.leave(`messages.chat.${before.id}`)
                    this.init();

                }
            },
        },


        mounted() {

            this.init();

        },

        beforeDestroy() {
            if (this.chat) window.Echo.leave(`messages.chat.${this.chat.id}`)
        }


    }
</script>

<style scoped>

</style>
