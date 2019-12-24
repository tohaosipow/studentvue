<template>
    <div>
        <qrcode-stream @decode="onDecode"></qrcode-stream>
    </div>
</template>

<script>
    import event_checks from "@/api/event_checks";

    export default {
        name: "EventQRRegisterComponent",
        methods:{
            onDecode(decodedString){
                event_checks.qrVisit(this.$store.state.events.currentEvent.id, decodedString);
                this.$store.dispatch('getEventParticipants', {id: this.$store.state.events.currentEvent.id});
            }

        }
    }
</script>

<style scoped>

</style>