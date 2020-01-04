<template>
    <v-switch :loading="loading" @click.stop="change" readonly v-model="value" color="blue"
    ></v-switch>
</template>

<script>
    export default {
        name: "ApiSwitch",
        props:{
            changeHandle:{
                type: Function
            },
            load:{

            }
        },
        data(){
            return{
                value: null,
                loading: false
            }
        },
        methods: {
            change(){
                this.loading = true;
                this.changeHandle(this).then(() => {
                    this.loading = false;
                })
            }
        },
        mounted(){
            this.loading = true;
            this.load(this).then(() => {
                this.loading = false;
            })
        }
    }
</script>

<style scoped>

</style>