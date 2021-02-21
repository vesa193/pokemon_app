import { LOAD_PAGINATED_DATA, LOAD_PAGINATED_DATA_FAILED, LOAD_PAGINATED_DATA_SUCCESS, LOAD_POKEMONS, LOAD_POKEMONS_FAILED, LOAD_POKEMONS_SUCCESS } from './consts'

export const loadPokemons = () => {
  return {
    type: LOAD_POKEMONS,
  }
}

export const loadPokemonsSuccess = (pokemons) => {
  return {
    type: LOAD_POKEMONS_SUCCESS,
    pokemons
  }
}

export const loadPokemonsFailed = (error) => {
  return {
    type: LOAD_POKEMONS_FAILED,
    error
  }
}


export const loadPaginatedPokemons = (offsetNum) => {
  return {
    type: LOAD_PAGINATED_DATA,
    offsetNum
  }
}

export const loadPaginatedPokemonsSuccess = (pokemons) => {
  return {
    type: LOAD_PAGINATED_DATA_SUCCESS,
    pokemons
  }
}

export const loadPaginatedPokemonsFailed = (error) => {
  return {
    type: LOAD_PAGINATED_DATA_FAILED,
    error
  }
}