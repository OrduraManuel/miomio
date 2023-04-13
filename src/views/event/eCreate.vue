<script setup>
import { ref } from 'vue'
import axios from 'axios'

//import { v4 as uuidv4 } from 'uuid'
import { useEventStore } from '@/stores'
import { router } from '@/router'
//import { useAuthStore } from '@/stores'
const baseUrl = `${import.meta.env.VITE_LOTTI_API_URL}`;
const eventStore = useEventStore()

const categories = [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ]

const event = ref({
        id: 'uiidvi4',
        organizer: 'manivel',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: ''
      })

function onSubmit() {
      axios.post(baseUrl + '/events', event.value)
        .then(function (response) {
          const data = response.data
          console.log('response data', data)
          console.log('Response EVENTVALUE', event.value)
        })
        .catch(function (err) {
          console.log('Error', err)
        })
    }

    function eSubmit(){
      eventStore.createEvent(event.value)
      .then(() => {
          console.log('event in eCreate',event.value)
          router.push({ name: 'EventList'})
        })
        .catch(error => {
          console.log('event dentro ecreate SUBMIT',event.value)
          router.push({
            name: '404Resource',
            params: { resource: error }
          })
        })
    }

/*
      eventStore.pushEvent(event.value)
        .then(() => {
          console.log('event',event.value)
          router.push({ name: 'EventList'})
        })
        .catch(error => {
          console.log('event dentro ecreate SUBMIT',event.value)
          router.push({
            name: '404Resource',
            params: { resource: error }
          })
        })

        */
</script>

<template>
  <h1>Create an event</h1>

  <div class="form-container">
    <form @submit.prevent="eSubmit">
      <label>Select a category: </label>
      <select v-model="event.category">
        <option
          v-for="option in categories"
          :value="option"
          :key="option"
          :selected="option === event.category"
        >
          {{ option }}
        </option>
      </select>

      <h3>Name & describe your event</h3>

      <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Title" />

      <label>Description</label>
      <input
        v-model="event.description"
        type="text"
        placeholder="Description"
      />

      <h3>Where is your event?</h3>

      <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Location" />

      <h3>When is your event?</h3>
      <label>Date</label>
      <input v-model="event.date" type="text" placeholder="Date" />

      <label>Time</label>
      <input v-model="event.time" type="text" placeholder="Time" />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>
