
<script setup>
import { ref, defineProps } from 'vue'
import { useLottoStore } from '@/stores'

const props = defineProps({
  lotto: {
    required: true,
  },
})
const lottoStore = useLottoStore()

function deleteLotto(el){
    lottoStore.delLotto(el)
  router.push({ name: 'EventList' })
}
</script>

<template>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal edit: {{ lotto.title }} / id: {{ lotto.id }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            I'm EDIT MODAL on <b>{{ lotto.title }}</b>
            I'm EDIT MODAL on <b>{{ lotto.id }}</b>
        </div>
        <div class="modal-footer  d-flex justify-content-around">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click=deleteLotto(lotto.id)>Elimina</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>