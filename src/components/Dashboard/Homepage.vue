<template>
    <v-sheet style="padding: 2em">
        <!--        <v-row align="center" justify="center">-->
        <!--            <v-col md="1" sm="2">-->
        <!--                <v-img src="https://ams3.digitaloceanspaces.com/enrollee/surgu.png"></v-img>-->
        <!--            </v-col>-->
        <!--            <v-col md="11" sm="10">-->
        <!--                <span style="font-size: 25px; display: block">АИС "Студент СурГУ"</span>-->
        <!--                портал для студентов и преподавателей <span style="color: #0174bd;">Сургутского государственного университета</span>-->

        <!--            </v-col>-->
        <!--        </v-row>-->
        <!--        <v-divider class="mt-4"/>-->
        <h2 style="font-size: 20px; color: #0174bd; font-weight: 900; ">Мероприятия</h2>
        <v-row>

            <v-col v-if="false" cols="12"
                   sm="4">
                <!--                <v-card height="250"-->
                <!--                        color="blue"-->
                <!--                        dark-->
                <!--                >-->
                <!--                    <v-card-title class="headline">-->
                <!--                        Новинка!-->
<!--                        <v-btn @click="notice = 0" style="position: absolute; right: 0; top: 0" icon>-->
<!--                            <v-icon>mdi-close</v-icon>-->
<!--                        </v-btn>-->
<!--                    </v-card-title>-->

<!--                    <v-card-text>Теперь можно создавать онлайн мероприятия и проводить их прямо на этой платформе! Достаточно указать при создании мероприятия, что оно будет онлайн в формате.</v-card-text>-->
<!--                    <br/>-->
<!--                    <v-card-actions>-->
<!--                        <v-btn :to="'/events/create'" text>-->
<!--                            Попробовать-->
<!--                        </v-btn>-->
<!--                    </v-card-actions>-->
<!--                </v-card>-->
            </v-col>
            <v-col :key="event.id" cols="12"
                   sm="4"
                   v-for="event in $store.state.events.events.slice($store.state.events.events.length - 3).reverse()"
            >

                <v-card style="border-radius: 30px;" :to="'/events/'+event.id+'/info'" ripple elevation="0">
                    <v-img :src="event.header_url" class="white--text align-end"

                           gradient="to top right, rgba(100,115,201,.8), rgba(25,32,72,.7)"
                           height="250"
                    >
                        <v-card-title style="z-index: 2; position:relative;  word-break: break-word;">{{event.name}}
                        </v-card-title>
                        <v-card-text>
                            <v-chip v-if="$moment().isAfter($moment(event.end_at))" outlined color="white">#прошло
                            </v-chip>
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
                <v-card style="border-radius: 30px;" :to="'/projects/'+project.id" ripple elevation="0">
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
               dialog: false,
               notice: 1
           }
        },
        mounted() {
            this.$store.dispatch('getEvents');
            this.$store.dispatch('getProjects');
          //  if(!this.$store.state.user.currentUser.id) setTimeout(() => {this.dialog = true}, 5000);
        }
    }
</script>

<style scoped>

</style>
