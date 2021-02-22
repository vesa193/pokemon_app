import { LOAD_PAGINATED_DATA_FAILED, LOAD_PAGINATED_DATA_SUCCESS, LOAD_POKEMONS, LOAD_POKEMONS_FAILED, LOAD_POKEMONS_SUCCESS, SET_POKEMONS_PROP } from "./consts"

const initialState = {
  pokemons: null,
  pokemonsAll: null
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