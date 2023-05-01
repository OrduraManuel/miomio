
<script setup>
import { ref, defineEmits, onMounted } from 'vue'
import { useEventStore } from '@/stores'
import { storeToRefs } from 'pinia';


let pickEvent = ref()

const eventStore = useEventStore()
const { events: events } = storeToRefs(eventStore);


async function burp(pick){
    pickEvent = pick.id
    await emit('burp', pickEvent)
    console.log('questo è pickEvents di burp',pickEvent,'pick.id', pick.id)
}

const emit = defineEmits(['pickEvent', 'burp'])


onMounted(() => {
    eventStore.fetchAllEvents()
    .then(() => {
      console.log('questi sono gli events:',events.value)
    })
    .catch(error => {
          console.log(error)

        })
})

</script>

<template>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal edit: daje / id: dfghjkokjhgfhjk</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form @submit.prevent="burp">
                <select class="form-select" size="3" aria-label="size 3 select example" v-model="pickEvent">
                    <option v-for="option in events"
                        :value="option"
                        :key="option"
                        :selected="option.id === pickEvent">
                        {{ option.id }}
                    </option><br/>
                </select>
                <button type="submit" class="btn btn-primary" @click=burp(pickEvent)>PICK</button>
            </form>
        </div>
        <div class="modal-footer  d-flex justify-content-around">

          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click=eventStore.delEvent(event.id)>Elimina</button>
         
        </div>
      </div>
    </div>
  </div>
</template>