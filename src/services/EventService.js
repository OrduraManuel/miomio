import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_LOTTI_API_URL}`;

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents(perPage, page) {
    return apiClient.get('/events' + '?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) { 
    return apiClient.post('/events' ,{
      id: event.id,
      category: event.category,
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      time: event.time,
      petsAllowed: event.petsAllowed,
      organizer: event.organizer
    })
  }
}

/* EVENTS SEZIONATO
{
      id: event.id,
      category: event.category,
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      time: event.time,
      petsAllowed: event.petsAllowed,
      organizer: event.organizer
    }

*/