import EventsComponent from "@/components/Events/EventsComponent";
import VueRouter from 'vue-router'
import EventItemComponent from "@/components/Events/EventItemComponent";
import AuthComponent from "@/components/AuthComponent";
import TeamComponent from "@/components/Events/TeamComponent";
import EventPointComponent from "@/components/Events/EventPointComponent";
import AuthByToken from "@/components/AuthByToken";
import EventParticipantComponent from "@/components/Events/EventParticipants/EventParticipantsComponent";
import EventTeamsComponent from "@/components/Events/EventTeamsComponent";
import EventRubricsComponent from "@/components/Events/EventRubricsComponent";
import EventQRRegisterComponent from "@/components/Events/EventQRRegisterComponent";


const routes = [
    { path: '/', component: EventsComponent, name: 'events'},
    { path: '/events/my', component: EventsComponent, name: 'user.events', props: { my: true}},
    { path: '/events/:id', component: EventItemComponent, name: 'events.item',
        children:
            [
                {path: 'participants', component: EventParticipantComponent, name: 'event.participants'},
                {path: 'teams', component: EventTeamsComponent, name: 'event.teams'},
                {path: 'criteria', component: EventRubricsComponent, name: 'event.criteria'},
                {path: 'points', component: EventPointComponent, name: 'event.points'},
                {path: 'qr_enter', component: EventQRRegisterComponent, name: 'event.qr_enter'},
            ]
    },
    { path: '/events/:id/teams/:team_id', component: TeamComponent, name: 'teams.item'},
    { path: '/points/:id', component: EventPointComponent, name: 'points'},
    { path: '/auth', component: AuthComponent },
    { path: '/authByToken/:token', component: AuthByToken},
]

// 3. Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
// Вы можете передавать и дополнительные опции, но пока не будем усложнять.
export const router = new VueRouter({
    routes
});