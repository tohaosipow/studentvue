<template>
    <ApiSwitch :change-handle="change" :load="load"></ApiSwitch>
</template>

<script>
    import events from "@/api/events";
    import event_checks from "@/api/event_checks";
    import ApiSwitch from "@/components/Utility/ApiSwitch";

    export default {
        name: "EventUserIsVisitSwitch",
        components: {
            ApiSwitch
        },
        props: {
            user: {},
            event: {}
        },
        data() {
            return {
                event_check: null,
            }
        },
        methods: {
            change(context) {
                return event_checks.visit(this.event_check.id).then((r) => {
                    context.$set(context, 'value', r.data.is_visit);
                });
            },
            load(context){
                return events.userEventCheck(this.user.id, this.event.id).then((r) => {
                    context.$set(context, 'value', r.data.is_visit)
                });
            }
        },
        mounted() {
            return events.userEventCheck(this.user.id, this.event.id).then((r) => {
                this.event_check = r.data;
            });
        }
    }
</script>

<style scoped>

</style>