import axios from 'axios'
import { apiUrl } from '../config'

const baseURL = `${apiUrl}`

let axiosInstance
const createAxiosInstance = token => {
  const headers = token !== null ? {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
  } : {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
  axiosInstance = axios.create({
    headers,
    timeout: 30000,
  })

  return axiosInstance
}

const endpoint = {
  // TODO: add some of endpoints
  pokemon: '/pokemon',
}

const paginatedEndpoint = (offset = 20, limit = 20) => {
  return `?offset=${offset}&limit=${limit}`
}

export const getPokemonsData = () => createAxiosInstance().get(`${baseURL}${endpoint.pokemon}`).then(data => data).catch(err => console.log('error', err))
export const getPokemonsPaginatedData = (offsetNum, limitNum) => createAxiosInstance().get(`${baseURL}${endpoint.pokemon}${paginatedEndpoint(offsetNum, limitNum)}`).then(data => data).catch(err => console.log('error', err))