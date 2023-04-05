<script setup>
import { ref, onMounted, watchEffect, defineProps } from 'vue';
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService.js';

const props = defineProps(["perPage", "page"]);
// `props` devono essere devinite prima di essere lette
console.log('perPage fuori then:', props.perPage)
console.log('selected fuori then:', selected)
console.log('page fuori then:', props.page)

const events = ref([]);
const totalEvents = ref(0);
const selected = ref(props.perPage);

const options = ref([
  { id: 0, text: 'due', value: '2' },
  { id: 1, text: 'tre', value: '3' },
  { id: 2, text: 'cinque', value: '5' }
])
onMounted(() => {
  watchEffect(() => {
    events.value = null;
    EventService.getEvents(selected.value, props.page)
      .then((response) => {
        events.value = response.data;
        totalEvents.value = response.headers["x-total-count"];
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

function hasNextPage() {
  const totalPages = Math.ceil(totalEvents.value / selected.value);
  return props.page < totalPages;
}
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
  <div class="pagination">
    <router-link
      :to="{ name: 'event-list', query: { page: props.page - 1 } }"
      rel="prev"
      v-if="props.page !== 1"
      >Prev</router-link
    >

    <select v-model="selected">
      <option v-for="option in options" :value="option.value" :key="option.id">
        {{ option.text }}
      </option>
    </select>
    <div>Selected: {{ selected }}</div>

    <router-link
      :to="{ name: 'event-list', query: { page: props.page + 1 } }"
      rel="next"
      v-if="hasNextPage()"
      >Next</router-link
    >
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  margin: auto;
  width: 500px;
  display: flex;
  justify-content: space-around;
}
.pagination a {
  background: #42b983 !important;
  color: white !important;
  padding: 5px 10px;
  border-radius: 7px;
  text-decoration: none;
}
</style>
