import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';

import LottoList from '../views/LottoList.vue'
import LottoLayout from '../views/lotto/lLayout.vue'
import LottoDetails from '../views/lotto/lDetails.vue'
import LottoRegister from '../views/lotto/lRegister.vue'
import LottoEdit from '../views/lotto/lEdit.vue'
import LottoCreate from '../views/lotto/lCreate.vue'

import ItemList from '../views/ItemList.vue'
import ItemLayout from '../views/item/iLayout.vue'
import ItemDetails from '../views/item/iDetails.vue'
import ItemRegister from '../views/item/iRegister.vue'
import ItemEdit from '../views/item/iEdit.vue'
import ItemCreate from '../views/item/iCreate.vue'

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
            name: 'LottoList',
            component: LottoList,
            props: route => ({ page: parseInt(route.query.page) || 1 })
          },
          {
            path: '/lottos/:id',
            name: 'LottoLayout',
            props: true,
            component: LottoLayout,
            children:[
              {
                path: '',
                name: 'LottoDetails',
                component: LottoDetails,
              },
              {
                path: 'register',
                name: 'LottoRegister',
                component: LottoRegister,
              },
              {
                path: 'edit',
                name: 'LottoEdit',
                component: LottoEdit,
              }
            ] 
          },
          {
            path: '/lotto/:afterEvent(.*)',
            redirect: to =>{
              return{ path: '/lottos/' + to.params.afterEvent }}
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
            name: 'LottoCreate',
            component: LottoCreate,
          },
          {
            path: '/itemCreate',
            name: 'ItemCreate',
            component: ItemCreate,
          },
           {
            path: '/itemList',
            name: 'ItemList',
            component: ItemList,
            props: route => ({ page: parseInt(route.query.page) || 1 })
          },
          {
            path: '/items/:id',
            name: 'ItemLayout',
            props: true,
            component: ItemLayout,
            children:[
              {
                path: '',
                name: 'ItemDetails',
                component: ItemDetails,
              },
              {
                path: 'register',
                name: 'ItemRegister',
                component: ItemRegister,
              },
              {
                path: 'edit',
                name: 'ItemEdit',
                component: ItemEdit,
              }
            ] 
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