import { LOAD_ALL_POKEMONS, LOAD_PAGINATED_DATA, LOAD_PAGINATED_DATA_FAILED, LOAD_PAGINATED_DATA_SUCCESS, LOAD_POKEMONS, LOAD_POKEMONS_FAILED, LOAD_POKEMONS_SUCCESS, LOAD_POKEMON_DETAILS, SEARCH_POKEMON_NAME } from './consts'

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


export const loadPaginatedPokemons = (offsetNum, isShowAll, cb) => {
  return {
    type: LOAD_PAGINATED_DATA,
    offsetNum,
    isShowAll,
    cb
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

export const loadPokemonDetails = (pokemonUrl) => {
  return {
    type: LOAD_POKEMON_DETAILS,
    pokemonUrl
  }
}

export const loadAllPokemons = (limit, cb) => {
  return {
    type: LOAD_ALL_POKEMONS,
    limit,
    cb
  }
}


export const searchPokemonName = (name) => {
  return {
    type: SEARCH_POKEMON_NAME,
    name
  }
}
