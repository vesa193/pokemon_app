import { GET_SEVERAL_ABILITY, IS_FILTER_SWICHED, LOAD_ALL_POKEMONS, LOAD_PAGINATED_DATA, LOAD_PAGINATED_DATA_FAILED, LOAD_PAGINATED_DATA_SUCCESS, LOAD_POKEMONS, LOAD_POKEMONS_FAILED, LOAD_POKEMONS_SUCCESS, LOAD_POKEMON_DETAILS, SEARCH_POKEMON_NAME, SEARCH_POKEMON_TYPE, SET_ABILITY_SLUG, SET_SEARCHED_NAME_SLUG, SET_TYPE_SLUG, GET_SEVERAL_TYPE } from './consts'

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


export const loadPaginatedPokemons = (offsetNum, isShowAll, isFilterSwiched) => {
  return {
    type: LOAD_PAGINATED_DATA,
    offsetNum,
    isShowAll,
    isFilterSwiched
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

export const searchPokemonType = (pokemonType) => {
  return {
    type: SEARCH_POKEMON_TYPE,
    pokemonType
  }
}

export const getSeveralAbility = (pokemonAbility) => {
  return {
    type: GET_SEVERAL_ABILITY,
    pokemonAbility
  }
}

export const getSeveralType = (pokemonType) => {
  return {
    type: GET_SEVERAL_TYPE,
    pokemonType
  }
}

export const setSearchedNameSlug = (searchedNameSlug) => {
  return {
    type: SET_SEARCHED_NAME_SLUG,
    searchedNameSlug
  }
}

export const setAbilitySlug = (abilitySlug) => {
  return {
    type: SET_ABILITY_SLUG,
    abilitySlug
  }
}

export const setTypeSlug = (typeSlug) => {
  return {
    type: SET_TYPE_SLUG,
    typeSlug
  }
}

export const switchingFilter = (isFilterSwitched) => {
  return {
    type: IS_FILTER_SWICHED,
    isFilterSwitched
  }
}