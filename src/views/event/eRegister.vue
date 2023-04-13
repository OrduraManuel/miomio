<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  event: {
    required: true,
  },
})

</script>

<template>
    <p class="eventRegister">I'm REGISTER page on {{ event.title }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>

<style scoped>
.eventRegister{

}
</style>