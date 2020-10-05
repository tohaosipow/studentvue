<template>
    <v-sheet style="padding: 2em">
        <v-row align="center" justify="center">
            <v-col md="1" sm="2">
                <v-img src="http://www.surgu.ru/assets/front/logo-ce9a2f65225f534c436fd68e635d5d93.png"></v-img>
            </v-col>
            <v-col md="11" sm="10">
                <span style="font-size: 25px; display: block">АИС "Абитуриент"</span>
                портал для студентов и преподавателей <span style="color: #0174bd;">Сургутского государственного университета</span>

            </v-col>
        </v-row>
        <v-divider class="mt-4"/>
        <h2 class="mt-4" style="font-size: 20px; color: #0174bd; font-weight: 900; ">Мероприятия</h2>
        <v-row>
            <v-col :key="event.id" cols="12"
                   sm="4"
                   v-for="event in $store.state.events.events.slice($store.state.events.events.length - 4, $store.state.events.events.length - 1)"
            >
                <v-card :to="'/events/'+event.id" ripple elevation="0">
                    <v-img :src="event.header_url" class="white--text align-end"

                           gradient="to top right, rgba(100,115,201,.8), rgba(25,32,72,.7)"
                           height="250"
                    >
                        <v-card-title style="z-index: 2; position:relative;  word-break: break-word;">{{event.name}}
                        </v-card-title>
                        <v-card-text>
                            <v-chip v-if="$moment().isAfter($moment(event.end_at))" outlined color="white">#прошло</v-chip>
                        </v-card-text>

                    </v-img>

                </v-card>


            </v-col>
            <v-row align="center" justify="center">
                <v-btn class="mt-2" :to="'/events'" outlined color="blue">Все мероприятия</v-btn>
            </v-row>
        </v-row>
        <br><br>
        <v-row>
            <v-col lg="3" sm="12">
                <v-img src="https://enrollee.ams3.digitaloceanspaces.com/ok.png"></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col  :key="project.id" cols="12"
                   sm="4"
                   v-for="project in $store.state.projects.projects"
            >
                <v-card :to="'/projects/'+project.id" ripple elevation="0">
                    <v-img :src="project.logotype_url" class="white--text align-end"

                           gradient="to top right, rgba(100,115,201,.8), rgba(25,32,72,.7)"
                           height="250"
                    >
                        <v-card-title style="z-index: 2; position:relative;  word-break: break-word;">{{project.title}}
                        </v-card-title>


                    </v-img>

                </v-card>


            </v-col>
            <v-row align="center" justify="center">
                <v-btn class="mt-2" :to="'/projects'" outlined color="blue">Все проекты</v-btn>
            </v-row>
        </v-row>
        <v-dialog max-width="700" v-model="dialog">
            <v-card>
                <v-card-title>Зарегистрируйтесь или войдите</v-card-title>
                <AuthComponent/>
            </v-card>
        </v-dialog>
    </v-sheet>
</template>

<script>
    //import LoginComponent from "@/components/LoginComponent";
    import AuthComponent from "@/components/AuthComponent";

    export default {
        name: "Homepage",
        components:{
            AuthComponent
        },
        data(){
           return{
               dialog: false
           }
        },
        mounted() {
            this.$store.dispatch('getEvents');
            this.$store.dispatch('getProjects');
            setTimeout(() => {this.dialog = true}, 5000);
        }
    }
</script>

<style scoped>

</style>
