import EventsComponent from "@/components/Events/EventsComponent";
import VueRouter from 'vue-router'
import EventItemComponent from "@/components/Events/EventItemComponent";
import AuthComponent from "@/components/AuthComponent";
import TeamComponent from "@/components/Events/TeamComponent";


const routes = [
    { path: '/', component: EventsComponent, name: 'events'},
    { path: '/events/my', component: EventsComponent, name: 'user.events', props: { my: true}},
    { path: '/events/:id', component: EventItemComponent, name: 'events.item'},
    { path: '/events/:id/teams/:team_id', component: TeamComponent, name: 'teams.item'},
    { path: '/auth', component: AuthComponent },
]

// 3. Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
// Вы можете передавать и дополнительные опции, но пока не будем усложнять.
export const router = new VueRouter({
    routes
});