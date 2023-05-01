<script setup>
import { onMounted } from 'vue'

// import ItemService from '../services/ItemService.js'

import { useItemStore } from '@/stores';
import { useEventStore } from '@/stores';
import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const eventStore = useEventStore()
const { events: events } = storeToRefs(eventStore);

const itemStore = useItemStore()
const { items: items } = storeToRefs(itemStore);

  onMounted(() => {
    itemStore.fetchAllitems()
    eventStore.fetchAllEvents()
    .then(() => {
      console.log('questi sono gli items:',items.value)
    })
    .catch(error => {
          console.log(error)

        })
})
</script>

<template>
    <div class="dashboard">
      <h1>This is a dashboard di: {{ authUser.username }} | id: {{ authUser.id }} | Type: {{ authUser.type }} </h1>
        <div class="EventRow">
          <table class="table caption-top mx-5"  >
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category</th>
                <th scope="col">Location</th>
                <th scope="col">Item</th>
                <th scope="col">Organizer ID</th>
                <th scope="col">Organizer</th>
              </tr>
            </thead>
            <tbody v-for="event in events" :key="event.id" :event="event">
              <tr v-if="event.organizer.id == authUser.id"> <!--v-if="event.organizer.id == authStore.user.id"-->
                <th scope="row"  >{{ event.id }}</th>
                <td >{{ event.category }}</td>
                <td >{{ event.location }}</td>
                <td>
                  <div  v-for="item in items" :key="item.id" :item="item">
                    <span v-if="item.event.id == event.id">
                      {{ item.event.id }}
                    </span>
                  </div>
                </td>
                <td >{{ event.organizer.id }}</td>
                <td >{{ event.organizer.username }}</td>
                <!--<router-link :to="{name: EventEdit, query: {id: event.id}}" style="width: 110px; background-color: green; color: white;">Tasto EDIT</router-link>-->
                <RouterLink
                  class="event-link"
                  :to="{ name: 'EventEdit', params: { id: event.id } }">Tasto edit</RouterLink>
                <td id="delBtn" style="width: 110px; background-color: red; color: white;" @click=eventStore.delEvent(event.id)>Tasto elimina</td>
              </tr>

            </tbody>
          </table>        
        </div>

    </div>
</template>
<style scoped>
.dashboard {

}
.EventRow{
    display: flex;
    justify-content: space-around;
}
</style>