import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_ITEMS_API_URL}`;

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getItems(perPage, page) {
    return apiClient.get('/items' + '?_limit=' + perPage + '&_page=' + page)
  },
  getAllItems() {
    return apiClient.get('/items')
  },
  getItem(id) {
    return apiClient.get('/items/' + id)
  },
  deleteItem(id) {
    return apiClient.delete('/items/' + id)
  },
  editItem(id, obj) {
    return apiClient.put('/items/' + id, {
      id: obj.id,
      category: obj.category,
      title: obj.title,
      description: obj.description,
      location: obj.location,
      date: obj.date,
      time: obj.time,
      petsAllowed: obj.petsAllowed,
      organizer: obj.organizer
    })
  },
  postItem(item) { 
    return apiClient.post('/items' ,{
      id: item.id,
      category: item.category,
      title: item.title,
      description: item.description,
      location: item.location,
      date: item.date,
      time: item.time,
      petsAllowed: item.petsAllowed,
      organizer: item.organizer
    })
  }
}
