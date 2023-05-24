<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  lotto: {
    required: true,
  },
})

</script>

<template>
    <p class="lottoRegister">I'm REGISTER page on {{ lotto.title }} @ {{ lotto.location }}</p>
    <p>{{ lotto.description }}</p>
</template>

<style scoped>
.lottoRegister{

}
</style>