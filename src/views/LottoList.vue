<script setup>
import { ref, onMounted, watchEffect, defineProps } from 'vue'
import LottoCard from '@/components/lotto/LottoCard.vue'
import LottoService from '@/services/LottoService.js'
import { router } from '@/router'

const lottos = ref([])

let selectedDefault = 2

let totalLottos = ref(0)
const selected = ref(props.perPage)

const options = ref([
  { id: 0, text: 'due', value: '2' },
  { id: 1, text: 'tre', value: '3' },
  { id: 2, text: 'cinque', value: '5' }
])

const props = defineProps(['perPage','page'])

onMounted(() => {
  selected.value = selectedDefault
  watchEffect(() => {
    lottos.value = null
    LottoService.getLottos( selected.value , props.page)
    .then((response) => {
      lottos.value = response.data
      totalLottos = response.headers['x-total-count']
    })
    .catch(() => {
      router.push({ name: 'networkError'})
    })
  })
})

function hasNextPage() {
  const totalPages = Math.ceil(totalLottos.value / selected.value)
  return props.page < totalPages;
}
</script>

<template>
  <h1>lottos For Good</h1>
  <div class="lottos">
    <LottoCard 
    v-for="lotto in lottos" 
    :key="lotto.id" 
    :lotto="lotto" />
  </div>
  <div class="pagination">
    <router-link 
    :to="{name: 'LottoList', query: {page: props.page - 1}}"
    rel="prev"
    v-if="page !=1">Prev</router-link>

    <select v-model="selected" >
      <option 
        v-for="option in options" 
        :value="option.value"
        :key="option.id">
          {{ option.text }}
      </option>
    </select>
    <div>NumberPage: {{ props.page }} TotalLottos: {{ totalLottos }}</div>

    <router-link 
      :to="{name: 'LottoList', query: {page: props.page + 1}}"
      rel="next"
      v-if="hasNextPage">Next</router-link>
  </div>
  
</template>

<style scoped>
.lottos {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination{
  margin: auto;
  width: 500px;
  display: flex;
  justify-content: space-around;
}
.pagination a{
  background: #42b983!important;
  color: white!important;
  padding: 5px 10px;
  border-radius: 7px;
  text-decoration: none;
}
</style>
