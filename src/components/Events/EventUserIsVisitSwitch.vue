<template>
    <v-switch @click.stop="change" readonly :value="is_visit" color="blue"
    ></v-switch>
</template>

<script>
    import events from "@/api/events";
    import event_checks from "@/api/event_checks";

    export default {
        name: "EventUserIsVisitSwitch",
        props:{
            user:{

            },
            event:{

            }
        },
        computed:{
            is_visit(){
              return  this.event_check && parseInt(this.event_check.is_visit) === 1;
          }
        },
        data(){
            return{
                event_check: null
            }
        },
        methods: {
            change(){
                event_checks.visit(this.event_check.id).then((r) => {
                    this.event_check = r.data;
                });
            }
        },
        mounted(){
            events.userEventCheck(this.user.id, this.event.id).then((r) => {
                this.event_check = r.data;
            });
        }
    }
</script>

<style scoped>

</style>