<script setup>
import { ref, onMounted } from 'vue'
import ItemService from '@/services/ItemService.js'
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

const item = ref(null)

onMounted(() => {
  ItemService.getItem(props.id)
    .then((response) => {
      item.value = response.data
      console.log(item.value)
    })
    .catch((error) => {
        if(error.response && error.response.status == 404){
            router.push({
                name: '404Resource',
                params: { resource: 'item'}
            })
        } else {
            router.push({ name: 'NetworkError'})
        }
    })
})
</script>

<template>
  <div v-if="item" class="item" :class="id">

    <h1 >{{ item.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'ItemDetails'}">Details</router-link>
      <router-link :to="{ name: 'ItemRegister' }">Register</router-link>
      <router-link :to="{ name: 'ItemEdit' }" v-if="item.organizer.id == authUser.id">Edit</router-link>
    </div>
    <router-view :item="item" />
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
