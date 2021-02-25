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
    Authorization: `Bearer ${`428r298jfw89u2rfoiwigfiegiet8u309goeopgfaa`}`,
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
  type: '/type'
}

const paginatedEndpoint = (offset = 20, limit = 20) => {
  return `?offset=${offset}&limit=${limit}`
}

const pokemonDetailsEndpoint = (pokemonUrl) => {
  return `${endpoint.pokemon}/${pokemonUrl}`
}

const getAllEndpoint = (offset = 0, limit = 1100) => {
  return `?offset=${offset}&limit=${limit}`
}

// https://pokeapi.co/api/v2/pokemon?offset=0&limit=1100

export const getPokemonsData = () => createAxiosInstance().get(`${baseURL}${endpoint.pokemon}`).then(data => data).catch(err => console.log('error', err))
export const getPokemonsPaginatedData = (offsetNum, limitNum) => createAxiosInstance().get(`${baseURL}${endpoint.pokemon}${paginatedEndpoint(offsetNum, limitNum)}`).then(data => data).catch(err => console.log('error', err))
export const getPokemonDetailsData = (pokemonUrl) => createAxiosInstance().get(`${baseURL}${pokemonDetailsEndpoint(pokemonUrl)}`).then(data => data).catch(err => console.log('error', err))
export const getAllPokemonsData = (offsetNum, limitNum) => createAxiosInstance().get(`${baseURL}${endpoint.pokemon}${getAllEndpoint(offsetNum, limitNum)}`).then(data => data).catch(err => console.log('error', err))
export const getAllPokemonsType = (pokemonType) => createAxiosInstance().get(`${baseURL}${endpoint.type}/${pokemonType}`).then(data => data).catch(err => console.log('error', err))
