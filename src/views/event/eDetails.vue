<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  event: {
    required: true,
  },
})

</script>

<template>
    <p class="eventDetails">{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>

<style scoped>
.eventDetails{

}
</style>
