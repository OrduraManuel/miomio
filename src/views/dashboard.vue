<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/event/EventCard.vue'
import EventService from '@/services/EventService.js'

import { useAuthStore } from '@/stores';

import { storeToRefs } from 'pinia';

const authStore = useAuthStore();

const { user: authUser } = storeToRefs(authStore);


const events = ref(null)

onMounted(() => {
  EventService.getEvents()
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})

</script>

<template>
    <div class="dashboard">
      <h1>This is a dashboard di: {{ authStore.user.name }} | id: {{ authStore.user.id }} | Type: {{ authStore.user.type }} </h1>
        <div v-if="!isLoggedin" class="EventRow">
            <EventCard  v-for="event in events" :key="event.id" :event="event"/>
        </div>
        <p v-else>
            Loading events...
        </p>
    </div>
</template>
  

<style scoped>
.dashboard {

}
.EventRow{
    display: flex;
    justify-content: space-around;
}
</style>