<script setup>
import { ref, onMounted } from 'vue'
import LottoService from '@/services/LottoService.js'
import { router } from '@/router'

import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);



const props = defineProps({
  id: {
    required: true,
  },
})

const lotto = ref(null)

onMounted(() => {
  LottoService.getLotto(props.id)
    .then((response) => {
      lotto.value = response.data
    })
    .catch((error) => {
        if(error.response && error.response.status == 404){
            router.push({
                name: '404Resource',
                params: { resource: 'lotto'}
            })
        } else {
            router.push({ name: 'NetworkError'})
        }
    })
})
</script>

<template>
  <div v-if="lotto" class="lotto" :class="id">

    <h1 >{{ lotto.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'LottoDetails'}">Details</router-link>
      <router-link :to="{ name: 'LottoRegister' }">Register</router-link>
      <router-link :to="{ name: 'LottoEdit' }" v-if="lotto.organizer.id == authUser.id">Edit</router-link>
    </div>
    <router-view :lotto="lotto" />
  </div>
</template>

<style scoped>
#nav{
    display:flex;
    justify-content: center;
}
#nav a{
    background: green;
    color: white;
    padding: 10px 20px;
    margin: 25px;
    border-radius: 12px;
    text-decoration: none;
    transition: all .4s ease-in-out;
}
#nav a:hover{
    background: rgb(0, 255, 0);
    color: rgb(67, 67, 67);
    transition: all .4s ease-in-out;
}
</style>
