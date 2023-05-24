<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  lotto: {
    required: true,
  },
})

</script>

<template>
    <p class="lottoDetails">{{ lotto.time }} on {{ lotto.date }} @ {{ lotto.location }}</p>
    <p>{{ lotto.description }}</p>
</template>

<style scoped>
.lottoDetails{

}
</style>
