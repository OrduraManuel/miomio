
<script setup>
import { ref, defineProps } from 'vue'
import { useEventStore } from '@/stores'
import { router } from '@/router'

const props = defineProps({
  event: {
    required: true,
  },
})
const thisEvent = ref('')

const store = useEventStore()

function addItemAndClear(item) {
  if (item.lenght === 0) {
    return
  }
  // invokes function in the store:
  store.addEvent(item)
  thisEvent.value = ''
}

function deleteItem(event){
  store.deleteEvent(event.id)
  router.push({ name: 'EventList' })
}
</script>

<template>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal edit: {{ event.title }} / id: {{ event.id }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            I'm EDIT MODAL on <b>{{ event.title }}</b>
            I'm EDIT MODAL on <b>{{ event.id }}</b>
        </div>
        <div class="modal-footer  d-flex justify-content-around">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteItem(thisEvent)">Elimina</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>