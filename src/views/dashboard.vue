<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

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
      <h1>This is a dashboard</h1>
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