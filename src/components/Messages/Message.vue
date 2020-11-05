<template>
    <div>
        <div :class="{'flex-row-reverse':me}" class="row align-center">
            <div class="col-2 col-md-1 col-sm-1">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-badge
                                 bordered
                                 bottom
                                 :value="readers.filter(el => el.id !== $store.state.user.currentUser.id).length > 0 && me"
                                 color="blue accent-4"
                                 icon="mdi-check"
                                 offset-x="15"
                                 offset-y="15"
                        >
                            <v-avatar size="40" >
                                <v-img v-on="on" :src="'https://ui-avatars.com/api/?name='+name+'&rounded=true&background=1967c3&color=ffffff'"
                                ></v-img>
                            </v-avatar>
                        </v-badge>
                    </template>
                    <span>{{name}}</span>
                </v-tooltip>




            </div>
            <div class="col-8 col-md-5 col-sm-5">
                <span class="d-block" style="font-size: 10px">{{$moment(date).fromNow()}}</span>
                {{text}}
            </div>
        </div>
    </div>
</template>

<script>
    import chats from "@/api/chats.js";

    export default {
        name: "Message",
        props: {
            me: {
                default: false
            },
            name: {},
            text: {},
            date: {},
            id: {},
            readers: {},
        },
        mounted() {
            if (this.readers.map(r => r.id).indexOf(this.$store.state.user.currentUser.id) === -1) chats.markAsRead({id: this.id})
        }
    }
</script>

<style scoped>

</style>
