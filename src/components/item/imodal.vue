
<script setup>
import { ref, defineEmits, onMounted } from 'vue'
import { useLottoStore } from '@/stores'
import { storeToRefs } from 'pinia';


let pickLotto = ref()

const lottoStore = useLottoStore()
const { lottos: lottos } = storeToRefs(lottoStore);


async function burp(pick){
    pickLotto = pick.id
    await emit('burp', pickLotto)
    console.log('questo è pickLottos di burp',pickLotto,'pick.id', pick.id)
}

const emit = defineEmits(['pickLotto', 'burp'])


onMounted(() => {
    lottoStore.fetchAllLottos()
    .then(() => {
      console.log('questi sono gli Lottos:',lottos.value)
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
                <select class="form-select" size="3" aria-label="size 3 select example" v-model="pickLotto">
                    <option v-for="option in lottos"
                        :value="option"
                        :key="option"
                        :selected="option.id === pickLotto">
                        {{ option.id }}
                    </option><br/>
                </select>
                <button type="submit" class="btn btn-primary" @click=burp(pickLotto)>PICK</button>
            </form>
        </div>
        <div class="modal-footer  d-flex justify-content-around">

          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click=lottoStore.delLotto(lotto.id)>Elimina</button>
         
        </div>
      </div>
    </div>
  </div>
</template>