import axios from "axios"

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/ToonNich/se331_Lab2',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvent() {
        return apiClient.get('/events')
    }
}