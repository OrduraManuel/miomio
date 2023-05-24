<script setup>
import { ref, inject } from 'vue'

import iModal from '@/components/item/iModal.vue'

import { useItemStore } from '@/stores'
import { router } from '@/router'

import { v4 as uuidv4 } from 'uuid'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores'

const GStore = inject('GStore')

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const itemStore = useItemStore()
const idRandom = getRandomArbitrary(1, 999)

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const lotto = ref()

const categories = [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ]

let yourPick = ref()

const item = ref({
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
        lotto: ''
      })
      function pickLottos({pickLotto}){
        yourPick = pickLotto
        console.log('ricevuto:', {yourPick})
      }
    function iSubmit(){
      itemStore.createItem(item.value)
      .then(() => {
        const GstoreMsg = item.value
        GStore.flashMessage = 'L Item: '+ GstoreMsg.title + ' è stato creato!'
          setTimeout(() =>{
            GStore.flashMessage = ''
          }, 4000)
          router.push({ name: 'ItemList'})
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
  <h1>Create an item</h1>

  <div class="form-container">
    <form @submit.prevent="iSubmit">
      <label>Select a category: </label>
      <select v-model="item.category">
        <option
          v-for="option in categories"
          :value="option"
          :key="option"
          :selected="option === item.category"
        >
          {{ option }}
        </option>
      </select>

      <h3>Name & describe your item</h3>

      <label>Title</label>
      <input v-model="item.title" type="text" placeholder="Title" />

      <label>Description</label>
      <input
        v-model="item.description"
        type="text"
        placeholder="Description"
      />

      <h3>Where is your item?</h3>

      <label>Location</label>
      <input v-model="item.location" type="text" placeholder="Location" />

      <h3>When is your item?</h3>
      <label>Date</label>
      <input v-model="item.date" type="date" placeholder="Date" />

      <label>Time</label>
      <input v-model="item.time" type="time" placeholder="Time" />

      <h3>Pick your lotto</h3>

        <label>lotto list </label> - <span> {{ pickLottos.value }}</span>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            See all Lottos 
        </button>
<br/><br/><br/>
      <button type="submit">Submit</button>
    </form>
  </div>
  <iModal @burp="pickLottos"/>
</template>
