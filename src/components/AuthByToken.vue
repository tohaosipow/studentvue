<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "AuthByToken",
        mounted(){
            let token = this.$route.params.token;
            localStorage.setItem('access_token', token);
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            this.$store.dispatch('getUser').then(() => {
                this.loaded = true;
            });

            this.$store.dispatch('getDepartments');
            this.$store.dispatch('getStudentGroups');
            this.$router.push('/');
        }
    }
</script>

<style scoped>

</style>