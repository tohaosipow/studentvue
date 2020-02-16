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
import TimetableComponent from "@/components/Timetables/TimetableComponent";
import DisciplineCreatorIndex from "@/components/Timetables/DisplinesCreator/DisciplineCreatorIndex";
import MyTimetableComponent from "@/components/Timetables/MyTimetableComponent";
import EditProfileComponent from "@/components/Profile/EditProfileComponent";
import ProjectsListComponent from "@/components/Projects/ProjectsListComponent";
import ProjectsCreateComponent from "@/components/Projects/ProjectsCreateComponent";
import UsersListComponent from "@/components/Users/UsersListComponent";
import EventsCreateComponent from "@/components/Events/EventsCreateComponent";
import ProjectsItemComponent from "@/components/Projects/ProjectsItemComponent";
import ProjectsItemInfoComponent from "@/components/Projects/ProjectsItem/ProjectsItemInfoComponent";
import ProjectsItemParticipantsComponent from "@/components/Projects/ProjectsItem/ProjectsItemParticipantsComponent";
import ProjectsItemRolesComponent from "@/components/Projects/ProjectsItem/ProjectsItemRolesComponent";


const routes = [
    {path: '/', component: EventsComponent, name: 'events'},
    {path: '/events/my', component: EventsComponent, name: 'user.events', props: {my: true}},
    {path: '/events/create', component: EventsCreateComponent, name: 'user.events'},
    {
        path: '/events/:id', component: EventItemComponent, name: 'events.item',
        children:
            [
                {path: 'participants', component: EventParticipantComponent, name: 'event.participants'},
                {path: 'teams', component: EventTeamsComponent, name: 'event.teams'},
                {path: 'criteria', component: EventRubricsComponent, name: 'event.criteria'},
                {path: 'points', component: EventPointComponent, name: 'event.points'},
                {path: 'qr_enter', component: EventQRRegisterComponent, name: 'event.qr_enter'},
            ]
    },
    {path: '/events/:id/teams/:team_id', component: TeamComponent, name: 'teams.item'},
    {path: '/points/:id', component: EventPointComponent, name: 'points'},
    {path: '/auth', component: AuthComponent},
    {path: '/timetable', component: TimetableComponent},
    {path: '/timetable/my/:id?', component: MyTimetableComponent},
    {path: '/timetable/create/master', component: DisciplineCreatorIndex, name: 'timetable.master'},
    {path: '/authByToken/:token', component: AuthByToken},
    {path: '/profile/:id/edit', component: EditProfileComponent},
    {path: '/projects', component: ProjectsListComponent},
    {path: '/projects/create', component: ProjectsCreateComponent},
    {
        path: '/projects/:project_id', component: ProjectsItemComponent, children: [
            {path: '/', redirect: 'info'},
            {path: 'info', component: ProjectsItemInfoComponent, name: 'project.info'},
            {path: 'roles', component: ProjectsItemRolesComponent, name: 'project.roles'},
            {path: 'participants', component: ProjectsItemParticipantsComponent, name: 'project.participants'},
        ]
    },
    {path: '/admin/users', component: UsersListComponent},
]

// 3. Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
// Вы можете передавать и дополнительные опции, но пока не будем усложнять.
export const router = new VueRouter({
    routes
});