<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  item: {
    required: true,
  },
})

</script>

<template>
    <p class="itemRegister">I'm REGISTER page on {{ item.title }} @ {{ item.location }}</p>
    <p>{{ item.description }}</p>
</template>

<style scoped>
.itemRegister{

}
</style>