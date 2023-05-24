<script setup>
import { ref, onMounted, watchEffect, defineProps } from 'vue'
import ItemCard from '@/components/item/ItemCard.vue'
import ItemService from '@/services/ItemService.js'
import { router } from '@/router'

const items = ref([])

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
    items.value = null
    ItemService.getItems( selected.value , props.page)
    .then((response) => {
      items.value = response.data
      totalLottos = response.headers['x-total-count']
    })
    .catch(() => {
      router.push({ name: 'networkError'})
    })
  })
})

function hasNextPage() {
  const totalPages = Math.ceil(totalItems.value / selected.value)
  return props.page < totalPages;
}
</script>

<template>
  <h1>Items For Good</h1>
  <div class="Items Lottos d-flex justify-content-center">
    <ItemCard 
    v-for="item in items" 
    :key="item.id" 
    :item="item" />
  </div>
  <div class="pagination">
    <router-link 
    :to="{name: 'ItemList', query: {page: props.page - 1}}"
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
      :to="{name: 'ItemList', query: {page: props.page + 1}}"
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
