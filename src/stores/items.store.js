import { defineStore } from 'pinia'
import ItemService from '../services/ItemService.js'

export const useItemStore = defineStore('itemStore', {
  state() {
    return {
      items: [],
      itemsId: [],
      item: {}
    }
  },
  getters: {
    numberOfItems: state => state.items.length
  },
  actions: {
    createitem(item) {
      return ItemService.postitem(item)
        .then((response) => {
          item = response.data
          console.log('item che sta pushando', item)
          this.items.push(item)
        })
        .catch(error => {
          throw error
        })
    },
    pushitem(item) {
      return ItemService.postitem(item)
      .then(function (response) {
        item = response.data
        this.items.push(item)
        console.log('questo è item sono in PINIA push',item)
      })
      .catch(function (error){
        console.log(error)
      })
    },
    fetchitem(id) {
      return ItemService.getitem(id)
        .then(response => {
          this.item = response.data
        })
        .catch(error => {
          throw error
        })
    },
    fetchAllitems() {
      return ItemService.getAllItems()
        .then(response => {
          this.items = response.data
          console.log(this.items)
        })
        .catch(error => {
          throw error
        })
    },
    delitem(id) {
      return ItemService.deleteitem(id)
        .then(response => {
          let e = this.items.map(data => data.id).indexOf(id);
          this.items.splice(e, 1)
        })
        .catch(error => {
          throw error
        })
    },
    editem(id,obj) {
      return ItemService.edititem(id, obj)
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