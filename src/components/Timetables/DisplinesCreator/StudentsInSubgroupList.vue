<template>
    <v-list>
        <v-list-item :key="user.id" v-for="user in students">
            <v-list-item-content>
                <v-list-item-title>{{user.name}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <v-checkbox  :input-value="$store.getters.getStudentInSubgroup(user, subgroup)"
                                   color="green"
                                   @click.stop="() => {change(user)}"
                                   :disabled="$store.getters.getStudentInOtherSubgroup(user, subgroup)"
                                   readonly

                />
            </v-list-item-action>

        </v-list-item>
    </v-list>
</template>

<script>

    export default {
        name: "StudentsInSubgroupList",
        props: {
            subgroup: {},
            students: {}
        },
        methods:{
            change(user){

                let state = this.$store.getters.getStudentInSubgroup(user, this.subgroup);
                if(state){
                    this.$store.dispatch('removeUserFromSubgroup', {user, subgroup: this.subgroup})
                }
                else{
                    this.$store.dispatch('addUserToSubgroup', {user, subgroup: this.subgroup})
                }
            }
        }
    }
</script>

<style scoped>

</style>