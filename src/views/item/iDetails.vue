<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  item: {
    required: true,
  },
})

</script>

<template>
    <p class="itemDetails">{{ item.time }} on {{ item.date }} @ {{ item.location }}</p>
    <p>{{ item.description }}</p>
</template>

<style scoped>
.itemDetails{

}
</style>
