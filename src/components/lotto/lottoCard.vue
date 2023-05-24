<script setup>
defineProps({
  lotto: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink
    class="lotto-link"
    :to="{ name: 'LottoDetails', params: { id: lotto.id } }"
  >
    <div class="lotto-card">
      <h2>{{ lotto.title }}</h2>
      <span>@{{ lotto.time }} on {{ lotto.date }}</span><br>
      <span>{{ lotto.organizer }}</span><br>
      <span>{{ lotto.items }}</span><br>
      <h2>{{ lotto.id }}</h2>
    </div>
  </RouterLink>
</template>

<style scoped>
.lotto-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.lotto-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.lotto-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
