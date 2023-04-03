import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';

import EventListView from '../views/EventListView.vue'
import EventDetailsView from '../views/EventDetailsView.vue'
import AboutView from '../views/AboutView.vue'
import dashboard from '../views/dashboard.vue'

import HomeView from '../views/HomeView.vue'

import LoginView from '../views/LoginView.vue'
import register from '../views/register.vue'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'event-list',
            component: EventListView,
            props: route => ({ page: parseInt(route.query.page) || 1 })
          },
          {
            path: '/event/:id',
            name: 'event-details',
            props: true,
            component: EventDetailsView,
          },
          {
            path: '/about',
            name: 'about',
            component: AboutView,
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