<template>
    <div>
        <NewChatComponent @newchat="$emit('newchat')" v-if="!chat"/>
        <v-card  :loading="loading" ref="main_block" v-else>
            <v-card-text>
                <div class="text-center" v-if="!messages.length">Сообщений пока нет, но Вы можете отправить первое.
                </div>

            </v-card-text>
            <div class="pa-3 messages" ref="message_box" style="overflow-y: scroll; height: calc(100vh - 350px)">
                <Message :date="item.created_at" :key="item.id" :me="$store.state.user.currentUser.id === item.owner_id"
                         :name="item.owner.first_name + ' ' + item.owner.last_name"
                         :text="item.text" :id="item.id"
                         v-for="item in messages"/>

            </div>
            <div class="pa-2" ref="input_box" style="background: #fafafa;">
                <form v-on:keyup.enter="sendMessage" @submit.prevent="sendMessage">
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
                on_send: false
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
            }
        },
        watch: {
            chat(now, before) {
                // eslint-disable-next-line no-console
                console.log(now, before)
                if(!before || now.id !== before.id) {
                    if(before) window.Echo.leave(`messages.chat.${before.id}`)
                    window.Echo.private(`messages.chat.${this.chat.id}`)
                        .listen('messages_send', (message) => {
                            this.$store.commit('addMessage', message);
                            this.$refs.message_box.scrollTop+=200;
                        });


                    this.$store.dispatch('getCurrentChatMessages', {id: this.chat.id}).then(() => {
                        this.loading = false;
                        this.$refs.message_box.scrollTop = this.$refs.message_box.scrollHeight;

                    })
                }
            },
        },

        mounted() {


        },

        beforeDestroy(){
            if(this.chat) window.Echo.leave(`messages.chat.${this.chat.id}`)
        }


    }
</script>

<style scoped>

</style>
