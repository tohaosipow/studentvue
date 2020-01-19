<template>
    <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="date"
                    :label="label"
                    readonly
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker :min="min" :max="max" v-model="date" no-title scrollable locale="ru" first-day-of-week="1">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Отмена</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
    export default {
        name: "InputDatePicker",
        props: ['label', 'min', 'max', 'value'],
        data(){
            return {
                menu: false,
                date: null,
            }
        },
        watch:{
            date(n, l){
                if(n !== l) this.$emit('input', this.date)
            },
            value(){
                this.date = this.value;
            }
        },
        mounted(){
            this.date = this.value;
        }
    }
</script>

<style scoped>

</style>