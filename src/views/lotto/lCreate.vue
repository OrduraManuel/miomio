<script setup>
import { ref, onMounted, inject } from 'vue'
import { router } from '@/router'

import { useItemStore } from '@/stores'
import { useLottoStore } from '@/stores'


import { v4 as uuidv4 } from 'uuid'
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores'

const GStore = inject('GStore')

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const itemStore = useItemStore()

const lottoStore = useLottoStore()
const idRandom = getRandomArbitrary(1, 999)

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const categories = [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ]

const lotto = ref({
        id: idRandom,
        organizer: {
          id: authStore.user.id,
          username: authStore.user.username
        },
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        items: ''
      })

const { items: items } = storeToRefs(itemStore);

onMounted(() => {
    itemStore.fetchAllItems()
    .then(() => {
      console.log('questi sono items:',items.value)
    })
    .catch(error => {
          console.log(error)

        })
})

    function lSubmit(){
      lottoStore.createLotto(lotto.value)
      .then(() => {
        const GstoreMsg = lotto.value
        GStore.flashMessage = 'Il lotto: '+ GstoreMsg.title + ' è stato creato!'
          setTimeout(() =>{
            GStore.flashMessage = ''
          }, 4000)
          router.push({ name: 'LottoList'})
        })
        .catch(error => {
          router.push({
            name: '404Resource',
            params: { resource: error }
          })
        })
    }
</script>




<template>
  <h1>Create an lotto</h1>

  <div class="form-container">
    <form @submit.prevent="lSubmit">
      <label>Select a category: </label>
      <select v-model="lotto.category">
        <option
          v-for="option in categories"
          :value="option"
          :key="option"
          :selected="option === lotto.category"
        >
          {{ option }}
        </option>
      </select>

      <h3>Name & describe your lotto</h3>

      <label>Title</label>
      <input v-model="lotto.title" type="text" placeholder="Title" />

      <label>Description</label>
      <input
        v-model="lotto.description"
        type="text"
        placeholder="Description"
      />

      <h3>Where is your lotto?</h3>

      <label>Location</label>
      <input v-model="lotto.location" type="text" placeholder="Location" />

      <h3>When is your lotto?</h3>
      <label>Date</label>
      <input v-model="lotto.date" type="date" placeholder="Date" />

      <label>Time</label>
      <input v-model="lotto.time" type="time" placeholder="Time" />


      <label>Select a category: </label>
      <select v-model="items">
        <option
          v-for="option in items"
          :value="option"
          :key="option"
          :selected="option === lotto.items.id"
        >
          {{ option.id }}
        </option>
      </select>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>
