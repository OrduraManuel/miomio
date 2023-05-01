<script setup>
import eModal from '@/components/event/eModal.vue'
import { ref, inject, defineProps } from 'vue'
import { useEventStore } from '@/stores'
import { router } from '@/router'

const GStore = inject('GStore')

const eventStore = useEventStore()

const props = defineProps({
  event: {
      required: true,
    },
})

const thisEvent = props.event

const event = ref({
        id: thisEvent.id,
        category: thisEvent.category,
        title: thisEvent.title,
        description:thisEvent.description,
        location: thisEvent.location,
        date: thisEvent.date,
        time: thisEvent.time,
        organizer: {
            id: thisEvent.organizer.id,
            username: thisEvent.organizer.username
        }
      })
console.log('event VALUE', thisEvent.value)
function eEdit(){
    eventStore.edEvent(thisEvent.id, thisEvent)
    .then(() => {
          GStore.flashMessage = 'L Event: '+ thisEvent.title + ' è stato modificato'
          setTimeout(() =>{
            GStore.flashMessage = ''
          }, 4000)
          router.push({ name: 'EventDetails', params: thisEvent.id })
        })
        .catch(error => {
          console.log('event dentro edit SUBMIT',thisEvent.value)
          router.push({
            name: '404Resource',
            params: { resource: error }
          })
        })
}
function eDel(){
    eventStore.delEvent(thisEvent.id)
    .then(() => {
          router.push({ name: 'EventList', query: {page: props.page - 1}})
        })
        .catch(error => {
          console.log('event dentro edit SUBMIT',thisEvent.value)
          router.push({
            name: '404Resource',
            params: { resource: error }
          })
        })    
}
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-5 mx-auto my-5">
                <form @submit.prevent="eEdit" class="card eventEdit">
                    <div class="card-header">
                        I'm EDIT page on <b>{{ thisEvent.title }}</b>
                    </div>
                    <div class="card-body">  
                        <input v-model="thisEvent.title" type="text" placeholder="Title" />

                        <label>Description</label>
                        <input
                        v-model="thisEvent.description"
                        type="text"
                        placeholder="Description"
                        />

                        <h3>Where is your event?</h3>

                        <label>Location</label>
                        <input v-model="thisEvent.location" type="text" placeholder="Location" />

                        <h3>When is your event?</h3>
                        <label>Date</label>
                        <input v-model="thisEvent.date" type="text" placeholder="Date" />

                        <label>Time</label>
                        <input v-model="thisEvent.time" type="text" placeholder="Time" />
                    </div>
                    <div class="card-footer d-flex justify-content-around">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Open modal
                        </button>
                        <button class="btn btn-warning" type="submit"> modifica dati</button>
                        <div class="btn btn-danger" @click=eDel> Elimina</div>
                    </div>
                </form>
            </div>
        </div>
    </div>

<eModal :event="event"/>
    
</template>

<style scoped>
.eventEdit{

}
</style>