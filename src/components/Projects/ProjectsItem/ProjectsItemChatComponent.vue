<template>
    <div>
        <DialogComponent v-if="$store.state.projects.currentProjectChat"  :chat="$store.state.projects.currentProjectChat"/>
    </div>
</template>

<script>
    import DialogComponent from "@/components/Messages/DialogComponent.vue";

    export default {
        name: "ProjectsItemChatComponent",
        components: {DialogComponent},
        mounted(){
            if(!this.$store.getters.canWriteToChat) this.$router.back();
            else this.$store.dispatch('getProjectChat')
        }
    }
</script>

<style scoped>

</style>
