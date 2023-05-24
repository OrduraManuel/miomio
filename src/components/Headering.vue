<script setup>
    import { RouterLink } from 'vue-router'
    import { useAuthStore } from '@/stores';
    import {inject, computed} from 'vue';
    
    import { storeToRefs } from 'pinia';

    const GStore = inject('GStore')

    const authStore = useAuthStore();
    const { user: authUser } = storeToRefs(authStore);

    const user = computed(() => authStore.user);
    const username = computed(() => user.value.username);

    const logOut = () => { 
        const GStoreMsg = username.value
        GStore.flashMessage = 'Ciao '+ GStoreMsg +' torna presto a trovarci!'
            setTimeout(() =>{
              GStore.flashMessage = ''
            }, 4000)
        authStore.logout()
    }; 


</script>
<template>
    <header>
        <div class="wrapper">
        <nav>
            <RouterLink class="mx-2" :to="{ name: 'LottoList' }">Lottos</RouterLink>
            <RouterLink class="mx-2" :to="{ name: 'ItemList' }">Items</RouterLink>

            <RouterLink class="mx-2" :to="{ name: 'about' }">About</RouterLink>
            <RouterLink class="mx-2" v-if="authStore.user" :to="{ name: 'dashboard' }">Dashboard</RouterLink>
            <routerLink class="mx-2" v-if="authStore.user" :to="{ name: 'LottoCreate' }">+Lotto</routerLink>
            <routerLink class="mx-2" v-if="authStore.user" :to="{ name: 'ItemCreate' }">+Item</routerLink>

        </nav>
        <nav>
            <RouterLink v-if="!authStore.user" :to="{ name: 'LoginView' }">Login |</RouterLink>
            <RouterLink v-if="!authStore.user" :to="{ name: 'register' }">Register</RouterLink>
            <ul class="userDescr" v-if="authStore.user" style="display: flex">
                <li class="mx-2"><b>id: </b>{{ authStore.user.id }}</li>
                <li class="mx-2"><b>name: </b>{{ authStore.user.name }}</li>
                <li class="mx-2"><b>type: </b>{{ authStore.user.type }}</li>
                <li class="mx-2"><b>email: </b> {{ authStore.user.email }}</li>
                <span v-if="authStore.user" class="btn btn-primary mx-2" style="font-size: 20px; background-color: purple" @click="logOut">LOGOUT</span>
            </ul>

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
.userDescr{
    list-style-type: none;
    align-content: center;
    align-items: center;
    align-self: center;
}
</style>