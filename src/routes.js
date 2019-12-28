import EventsComponent from "@/components/Events/EventsComponent";
import VueRouter from 'vue-router'
import EventItemComponent from "@/components/Events/EventItemComponent";
import AuthComponent from "@/components/AuthComponent";
import TeamComponent from "@/components/Events/TeamComponent";
import EventPointComponent from "@/components/Events/EventPointComponent";
import AuthByToken from "@/components/AuthByToken";


const routes = [
    { path: '/', component: EventsComponent, name: 'events'},
    { path: '/events/my', component: EventsComponent, name: 'user.events', props: { my: true}},
    { path: '/events/:id', component: EventItemComponent, name: 'events.item'},
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