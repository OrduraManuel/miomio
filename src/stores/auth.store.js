import { defineStore } from 'pinia';
import { fetchWrapper, router } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_AUTH_API_URL}`;


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });

            // update pinia state with user object + basic auth data
            user.authdata = window.btoa(username + ':' + password);
            this.user = user;

            // store user details and basic auth data in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/LoginView');
        }
    }
});