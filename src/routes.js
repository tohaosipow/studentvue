import EventsComponent from "@/components/Events/EventsComponent";
import VueRouter from 'vue-router'
import LoginComponent from "@/components/LoginComponent";
import EventItemComponent from "@/components/Events/EventItemComponent";
import SignupComponent from "@/components/SignupComponent";


const routes = [
    { path: '/', component: EventsComponent, name: 'events'},
    { path: '/events/:id', component: EventItemComponent, name: 'events.item'},
    { path: '/login', component: LoginComponent },
    { path: '/signup', component: SignupComponent },
]

// 3. Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
// Вы можете передавать и дополнительные опции, но пока не будем усложнять.
export const router = new VueRouter({
    routes
});