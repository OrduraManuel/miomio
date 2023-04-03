<script setup>
    import { RouterLink } from 'vue-router'
    import { useAuthStore } from '@/stores';

    import { storeToRefs } from 'pinia';

    const authStore = useAuthStore();

    const logOut = () => { 
        authStore.logout()
    }; 

    const { user: authUser } = storeToRefs(authStore);

</script>
<template>
    <header>
        <div class="wrapper">
        <nav>
            <RouterLink :to="{ name: 'event-list' }">Events</RouterLink> |
            <RouterLink :to="{ name: 'about' }">About</RouterLink> |
            <RouterLink v-if="authStore.user" :to="{ name: 'dashboard' }">Dashboard</RouterLink>
        </nav>
        <nav>
            <RouterLink v-if="!authStore.user" :to="{ name: 'LoginView' }">Login</RouterLink> |
            <RouterLink v-if="!authStore.user" :to="{ name: 'register' }">Register</RouterLink>
            <ul  v-if="authStore.user" style="display: flex">
                <li>id: {{ authStore.user.id }}</li>
                <li>name: {{ authStore.user.name }}</li>
                <li>type: {{ authStore.user.type }}</li>
                <li>email: {{ authStore.user.email }}</li>
            </ul>
            <span v-if="authStore.user" class="btn btn-primary" style="font-size: 20px; color: purple" @click="logOut">LOGOUT</span>
        </nav>
        </div>
    </header>
</template>

<style scoped>
header{
    background: #f1f1f1;
}
.wrapper{
    display: flex;
    justify-content: space-around;
}
</style>