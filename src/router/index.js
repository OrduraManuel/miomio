import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';

import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/eLayout.vue'
import EventDetails from '../views/event/eDetails.vue'
import EventRegister from '../views/event/eRegister.vue'
import EventEdit from '../views/event/eEdit.vue'
import EventCreate from '../views/event/eCreate.vue'

import Test from '../views/Testissimo.vue'

import AboutView from '../views/AboutView.vue'
import dashboard from '../views/dashboard.vue'

import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import networkError from '../views/networkError.vue'

import LoginView from '../views/LoginView.vue'
import register from '../views/register.vue'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'EventList',
            component: EventList,
            props: route => ({ page: parseInt(route.query.page) || 1 })
          },
          {
            path: '/events/:id',
            name: 'EventLayout',
            props: true,
            component: EventLayout,
            children:[
              {
                path: '',
                name: 'EventDetails',
                component: EventDetails,
              },
              {
                path: 'register',
                name: 'EventRegister',
                component: EventRegister,
              },
              {
                path: 'edit',
                name: 'EventEdit',
                component: EventEdit,
              }
            ] 
          },
          {
            path: '/event/:afterEvent(.*)',
            redirect: to =>{
              return{ path: '/events/' + to.params.afterEvent }}
          },
          {
            path: '/about',
            name: 'about',
            component: AboutView,
          },
          {
            path: '/Test',
            name: 'Test',
            component: Test,
          },
          {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboard,
          },
          {
            path: '/LoginView',
            name: 'LoginView',
            component: LoginView,
          },
          {
            path: '/register',
            name: 'register',
            component: register,
          },
          {
            path: '/HomeView',
            name: 'HomeView',
            component: HomeView,
          },
          {
            path: '/Create',
            name: 'EventCreate',
            component: EventCreate,
          },
          {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFound,
          },
          {
            path: '/404/:resource',
            name: '404Resource',
            component: NotFound,
            props: true
          },
          {
            path: '/networkError',
            name: 'networkError',
            component: networkError,
          }
    ]
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/LoginView'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();
    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/LoginView';
    }
});