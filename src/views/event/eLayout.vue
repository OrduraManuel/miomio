<script setup>
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService.js'
import { router } from '@/router'

const props = defineProps({
  id: {
    required: true,
  },
})

const event = ref(null)

onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
        if(error.response && error.response.status == 404){
            router.push({
                name: '404Resource',
                params: { resource: 'event'}
            })
        } else {
            router.push({ name: 'NetworkError'})
        }
    })
})
</script>

<template>
  <div v-if="event" class="event" :class="id">

    <h1 >{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails'}">Details</router-link>
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
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
