import { defineStore } from 'pinia'
import EventService from '../services/EventService.js'


export const useEventStore = defineStore('eventStore', {
  state() {
    return {
      events: [],
      event: {}
    }
  },
  getters: {
    numberOfEvents: state => state.events.length
  },
  actions: {
    createEvent(event) {
      return EventService.postEvent(event)
        .then((response) => {
          event = response.data
          console.log('event che sta pushando', event)
          this.events.push(event)
        })
        .catch(error => {
          throw error
        })
    },
    pushEvent(event) {
      return EventService.postEvent(event)
      .then(function (response) {
        event = response.data
        this.events.push(event)
        console.log('questo è event sono in PINIA push',event)
      })
      .catch(function (error){
        console.log(error)
      })
    },
    fetchEvent(id) {
      return EventService.getEvent(id)
        .then(response => {
          this.event = response.data
        })
        .catch(error => {
          throw error
        })
    },
    fetchEvents() {
      return EventService.getEvents()
        .then(response => {
          this.events = response.data
        })
        .catch(error => {
          throw error
        })
    }
  }
})