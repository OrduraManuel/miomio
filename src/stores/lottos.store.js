import { defineStore } from 'pinia'
import LottoService from '../services/LottoService.js'


export const useLottoStore = defineStore('lottoStore', {
  state() {
    return {
      lottos: [],
      lottosId: [],
      lotto: {}
    }
  },
  getters: {
    numberOfLottos: (state) => { return state.lottos.length}
  },
  actions: {
    createLotto(lotto) {
      return LottoService.postLotto(lotto)
        .then((response) => {
          lotto = response.data
          this.lottos.push(lotto)
          setTimeout(() =>{
            GStore.flashMessage = ''
          }, 4000)
        })
        .catch(error => {
          GStore.flashMessage = 'Errore: '+ error
          throw error
        })
    },
    pushLotto(lotto) {
      return LottoService.postLotto(lotto)
      .then(function (response) {
        lotto = response.data
        this.lottos.push(lotto)
      })
      .catch(function (error){
        console.log(error)
      })
    },
    fetchLotto(id) {
      return LottoService.getLotto(id)
        .then(response => {
          this.lotto = response.data
        })
        .catch(error => {
          throw error
        })
    },
    fetchAllLottos() {
      return LottoService.getAllLottos()
        .then(response => {
          this.lottos = response.data
          console.log(this.lottos)
        })
        .catch(error => {
          throw error
        })
    },
    delLotto(id) {
      return LottoService.deleteLotto(id)
        .then(response => {
          let e = this.lottos.map(data => data.id).indexOf(id);
          this.lottos.splice(e, 1)
        })
        .catch(error => {
          throw error
        })
    },
    edLotto(id,obj) {
      return LottoService.editLotto(id, obj)
        .then(response => {
          console.log('response',response)
          console.log('dentro', obj,'oppelelà',id)
          //do something

        })
        .catch(error => {
          throw error
        })
    }
    
  }
})