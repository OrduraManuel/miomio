import { defineStore } from 'pinia'
import EventService from '../services/EventService.js'

export const useEventStore = defineStore('eventStore', {
  state() {
    return {
      events: [],
      eventsId: [],
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
    fetchAllEvents() {
      return EventService.getAllEvents()
        .then(response => {
          this.events = response.data
          console.log(this.events)
        })
        .catch(error => {
          throw error
        })
    },
    delEvent(id) {
      return EventService.deleteEvent(id)
        .then(response => {
          let e = this.events.map(data => data.id).indexOf(id);
          this.events.splice(e, 1)
        })
        .catch(error => {
          throw error
        })
    },
    edEvent(id,obj) {
      return EventService.editEvent(id, obj)
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