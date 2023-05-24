<script setup>
import { onMounted, inject } from 'vue'

import { router } from '@/router'

// import ItemService from '../services/ItemService.js'

import { useItemStore } from '@/stores';
import { useLottoStore } from '@/stores';
import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

const GStore = inject('GStore')

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const lottoStore = useLottoStore()
const { lottos: lottos } = storeToRefs(lottoStore);

const itemStore = useItemStore()
const { items: items } = storeToRefs(itemStore);

  onMounted(() => {
    itemStore.fetchAllItems()
    lottoStore.fetchAllLottos()
    .then(() => {
      console.log('questi sono gli items:',items.value)
    })
    .catch(error => {
          console.log(error)

        })
})

function lDel(el){
  lottoStore.delLotto(el.id)
    .then(() => {
      const GStoreMsg = el.title 
      GStore.flashMessage = 'Il Lotto: '+ GStoreMsg +' è stato eliminato!'
            setTimeout(() =>{
              GStore.flashMessage = ''
            }, 4000)
          router.push({ name: 'LottoList'})
        })
        .catch(error => {
          console.log('lotto dentro edit SUBMIT',el.value)
          router.push({
            name: '404Resource',
            params: { resource: error }
          })
        })    
}
function iDel(el){
  itemStore.delItem(el.id)
    .then(() => {
      const GStoreMsg = el.title
        GStore.flashMessage = 'L item: '+ GStoreMsg +' è stato eliminato!'
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
    <div class="dashboard">
      <h1>This is a dashboard di: {{ authUser.username }} | id: {{ authUser.id }} | Type: {{ authUser.type }} </h1>
        <div class="LottoRow">
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
            <tbody v-for="lotto in lottos" :key="lotto.id" :lotto="lotto">
              <tr v-if="lotto.organizer.id == authUser.id"> 
                <th scope="row"  >{{ lotto.id }}</th>
                <td >{{ lotto.category }}</td>
                <td >{{ lotto.location }}</td>
                <td>{{ lotto.item }}</td> 
                <td >{{ lotto.organizer.id }}</td>
                <td >{{ lotto.organizer.username }}</td>
                <RouterLink
                  class="lotto-link"
                  :to="{ name: 'LottoEdit', params: { id: lotto.id } }">Tasto edit</RouterLink>
                <td id="delBtn" style="width: 110px; background-color: red; color: white;" @click=lDel(lotto.value)>Tasto elimina</td>
              </tr>

            </tbody>
          </table>        
        </div>
        <h1>This is a list of Items di: {{ authUser.username }} | id: {{ authUser.id }} | Type: {{ authUser.type }} </h1>

        <div class="LottoRow">
          <table class="table caption-top mx-5"  >
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Organizer ID</th>
                <th scope="col">Organizer</th>
              </tr>
            </thead>
            <tbody v-for="item in items" :key="item.id" :item="item">
              <tr v-if="item.organizer.id == authUser.id"> 
                <th scope="row"  >{{ item.id }}</th>
                <td >{{ item.title }}</td>
                <td >{{ item.organizer.id }}</td>
                <td >{{ item.organizer.username }}</td>
                <RouterLink
                  class="lotto-link"
                  :to="{ name: 'ItemEdit', params: { id: item.id } }">Tasto edit</RouterLink>
                <td id="delBtn" style="width: 110px; background-color: red; color: white;" @click=iDel(item)>Tasto elimina</td>
              </tr>

            </tbody>
          </table>        
        </div>
    </div>
</template>
<style scoped>
.dashboard {

}
.LottoRow{
    display: flex;
    justify-content: space-around;
}
</style>