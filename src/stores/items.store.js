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
    createItem(item) {
      return ItemService.postItem(item)
        .then((response) => {
          item = response.data
          console.log('item che sta pushando', item)
          this.items.push(item)
        })
        .catch(error => {
          throw error
        })
    },
    pushItem(item) {
      return ItemService.postItem(item)
      .then(function (response) {
        item = response.data
        this.items.push(item)
        console.log('questo è item sono in PINIA push',item)
      })
      .catch(function (error){
        console.log(error)
      })
    },
    fetchItem(id) {
      return ItemService.getItem(id)
        .then(response => {
          this.item = response.data
        })
        .catch(error => {
          throw error
        })
    },
    fetchAllItems() {
      return ItemService.getAllItems()
        .then(response => {
          this.items = response.data
          console.log(this.items)
        })
        .catch(error => {
          throw error
        })
    },
    delItem(id) {
      return ItemService.deleteItem(id)
        .then(response => {
          let e = this.items.map(data => data.id).indexOf(id);
          this.items.splice(e, 1)
        })
        .catch(error => {
          throw error
        })
    },
    edItem(id,obj) {
      return ItemService.editItem(id, obj)
        .then(response => {
          //do something
        })
        .catch(error => {
          throw error
        })
    }
    
  }
})