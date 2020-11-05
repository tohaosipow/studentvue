<template>
    <div>
        <div :class="{'flex-row-reverse':me}" class="row align-center">
            <div class="col-2 col-md-1 col-sm-1">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-img v-on="on" :src="'https://ui-avatars.com/api/?name='+name+'&rounded=true&background=1967c3&color=ffffff'"></v-img>
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
            date:{},
            id:{}
        },
        mounted(){
            chats.markAsRead({id: this.id})
        }
    }
</script>

<style scoped>

</style>
