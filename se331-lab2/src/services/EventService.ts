import axios, { type AxiosResponse } from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/ToonNich/DataServer',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage: Number, page: Number): Promise<AxiosResponse<Event[]>> {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEventById(id: Number): Promise<AxiosResponse<Event>> {
    return apiClient.get('/events/' + id)
  }
}
