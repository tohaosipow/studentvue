<template>
    <div>
        <qrcode-stream @decode="onDecode"></qrcode-stream>
    </div>
</template>

<script>
    export default {
        name: "EventQRRegisterComponent",
        methods:{
            onDecode(decodedString){
                alert(decodedString);
            }

        }
    }
</script>

<style scoped>

</style>