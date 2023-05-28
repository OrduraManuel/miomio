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
    numberOfLottos: (state) => {
      return state.lottos.length
    }
  },
  actions: {
    async createLotto(lotto) {
      try {
        const response = await LottoService.postLotto(lotto)
        lotto = response.data
        this.lottos.push(lotto)
        setTimeout(() => {
          GStore.flashMessage = ''
        }, 4000)
      } catch (error) {
        GStore.flashMessage = 'Errore: ' + error
        throw error
      }
    },
    async pushLotto(lotto) {
      try {
        const response = await LottoService.postLotto(lotto)
        lotto = response.data
        this.lottos.push(lotto)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchLotto(id) {
      try {
        const response = await LottoService.getLotto(id)
        this.lotto = response.data
      } catch (error) {
        throw error
      }
    },
    async fetchAllLottos() {
      try {
        const response = await LottoService.getAllLottos()
        this.lottos = response.data
        console.log(this.lottos)
      } catch (error) {
        throw error
      }
    },
    async delLotto(id) {
      try {
        const response = await LottoService.deleteLotto(id)
        let e = this.lottos.map(data => data.id).indexOf(id)
        this.lottos.splice(e, 1)
      } catch (error) {
        throw error
      }
    },
    async edLotto(id,obj) {
      try {
        const response = await LottoService.editLotto(id, obj)
        console.log('response', response)
        console.log('dentro', obj, 'oppelelà', id)
      } catch (error) {
        throw error
      }
    }
  }
})