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
  postItem(items) { 
    return apiClient.post('/items' ,{
      id: items.id,
      category: items.category,
      title: items.title,
      description: items.description,
      location: items.location,
      date: items.date,
      time: items.time,
      petsAllowed: items.petsAllowed,
      organizer: items.organizer
    })
  }
}

/* ItemS SEZIONATO
{
      id: Item.id,
      category: Item.category,
      title: Item.title,
      description: Item.description,
      location: Item.location,
      date: Item.date,
      time: Item.time,
      petsAllowed: Item.petsAllowed,
      organizer: Item.organizer
    }

*/