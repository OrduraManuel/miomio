<script setup>
import lModal from '@/components/lotto/lModal.vue'
import { ref, inject, defineProps } from 'vue'
import { useLottoStore } from '@/stores'
import { router } from '@/router'

const GStore = inject('GStore')

const lottoStore = useLottoStore()

const props = defineProps({
  lotto: {
      required: true,
    },
})

const thisEvent = props.lotto

const lotto = ref({
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
function lEdit(){
  lottoStore.edLotto(thisEvent.id, thisEvent)
    .then(() => {
          GStore.flashMessage = 'Il lotto: '+ thisEvent.title + ' è stato modificato'
          setTimeout(() =>{
            GStore.flashMessage = ''
          }, 4000)
          router.push({ name: 'LottoDetails', params: thisEvent.id })
        })
        .catch(error => {
          console.log('lotto dentro edit SUBMIT',thisEvent.value)
          router.push({
            name: '404Resource',
            params: { resource: error }
          })
        })
}
function lDel(){
  lottoStore.delLotto(thisEvent.id)
    .then(() => {
      const GStoreMsg = thisEvent.title
        GStore.flashMessage = 'Il Lotto: '+ GStoreMsg +' è stato eliminato!'
            setTimeout(() =>{
              GStore.flashMessage = ''
            }, 4000)
          router.push({ name: 'LottoList', query: {page: props.page - 1}})
        })
        .catch(error => {
          console.log('lotto dentro edit SUBMIT',thisEvent.value)
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
                <form @submit.prevent="lEdit" class="card lottoEdit">
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
                        <div class="btn btn-danger" @click=lDel> Elimina</div>
                    </div>
                </form>
            </div>
        </div>
    </div>

<iModal :lotto="lotto"/>
    
</template>

<style scoped>
.lottoEdit{

}
</style>