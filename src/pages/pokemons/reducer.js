import { LOAD_PAGINATED_DATA_FAILED, LOAD_PAGINATED_DATA_SUCCESS, LOAD_POKEMONS, LOAD_POKEMONS_FAILED, LOAD_POKEMONS_SUCCESS, SET_ABILITY_SLUG, SET_POKEMONS_PROP, SET_SEARCHED_NAME_SLUG, IS_FILTER_SWICHED } from "./consts"

const initialState = {
  pokemons: null,
  pokemonsAll: null,
  searchedNameSlug: '',
  abilitySlug: '',
  isFilterSwitched: false
}

function pokemonsReducer(state = initialState, action) {
  const { type } = action
	switch (type) {
    case LOAD_POKEMONS_SUCCESS:
      return {
        ...state,
        pokemons: action.pokemons
      }
    case LOAD_POKEMONS_FAILED:
      return {
        ...state,
        error: action.error
      }
    case LOAD_PAGINATED_DATA_SUCCESS:
      return {
        ...state,
        pokemons: action.pokemons
      }
    case LOAD_PAGINATED_DATA_FAILED:
      return {
        ...state,
        error: action.error
      }
    case SET_SEARCHED_NAME_SLUG:
      return {
        ...state,
        searchedNameSlug: action.searchedNameSlug
      }
    case SET_ABILITY_SLUG:
      return {
        ...state,
        abilitySlug: action.abilitySlug
      }
    case IS_FILTER_SWICHED:
      return {
        ...state,
        isFilterSwitched: action.isFilterSwitched
      }
    case SET_POKEMONS_PROP:
      return {
        ...state,
        [action.key]: action.value
      }

	default:
		return state
	}
}

export default pokemonsReducer