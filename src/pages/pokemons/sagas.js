import { put, takeLatest, take, call, takeEvery, select } from 'redux-saga/effects'
import { IS_LOADER_ACTIVE } from '../../store/consts';
import { getAllPokemonsData, getPokemonDetailsData, getPokemonsData, getPokemonsPaginatedData, getAllPokemonsType, getAllPokemonsAbility, getAllPokemonsPerAbility, getAllPokemonsKindOfType, getAllPokemonsPerType } from '../../lib/api'
import { GET_SEVERAL_ABILITY, GET_SEVERAL_TYPE, LOAD_ALL_POKEMONS, LOAD_PAGINATED_DATA, LOAD_PAGINATED_DATA_FAILED, LOAD_PAGINATED_DATA_SUCCESS, LOAD_POKEMONS, LOAD_POKEMONS_FAILED, LOAD_POKEMONS_SUCCESS, LOAD_POKEMON_DETAILS, SEARCH_POKEMON_NAME, SEARCH_POKEMON_TYPE, SET_POKEMONS_PROP } from './consts';

function* loadAllPokemons(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(getPokemonsData)
    const pokemons = yield res?.data
    yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsData', value: pokemons })
    yield put({ type: LOAD_POKEMONS_SUCCESS, pokemons: pokemons?.results })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      yield put({ type: LOAD_POKEMONS_FAILED, error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* countOffset(num) {
  let n = null
  if (num > 1) {
    yield n = num * 20
  } else if (num === 56) {
    yield n = (num * 20) - 2
  } else {
    yield n = 0
  }

  return n
}

function* loadPaginatedPokemons(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
      const offset = yield countOffset(action.offsetNum)
      const res = yield call(getPokemonsPaginatedData, offset, 20)
      let resSecond = null
      if (!action.isFilterSwiched) {
        resSecond = yield call(getAllPokemonsAbility)
      } else {
        resSecond = yield call(getAllPokemonsKindOfType)
      }
      const pokemons = yield res?.data
      const pokemonsAbilityData = yield resSecond?.data
      yield localStorage.setItem('all', 'false')
      yield put({ type: LOAD_PAGINATED_DATA_SUCCESS, pokemons: pokemons?.results })
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsAbility', value: pokemonsAbilityData?.results })
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsData', value: pokemons })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      yield put({ type: LOAD_PAGINATED_DATA_FAILED, error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* loadAllPokemonsFLow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(getAllPokemonsData)
    const pokemons = yield res?.data
    yield localStorage.setItem('all', 'true')
    yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsData', value: pokemons })
    yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsAll', value: pokemons?.results })
    yield put({ type: SET_POKEMONS_PROP, key: 'backToPokemonsAll', value: false })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      yield put({ type: SET_POKEMONS_PROP, key: 'error', value: error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* loadPokemonDetails(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
      const res = yield call(getPokemonDetailsData, action.pokemonUrl)
      const pokemon = yield res?.data
      const lsPokemonData = yield JSON.stringify(pokemon)
      yield localStorage.setItem('pokemon_details', lsPokemonData)
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonDetailsData', value: pokemon })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonDetailsError', value: error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}


function* searchPokemonNameFlow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
      const res = yield call(getAllPokemonsData)
      const pokemons = yield res?.data?.results
      const pokemonName = yield action.name.toLowerCase()
      const filterPokemonsPerName = yield pokemons.filter(item => item.name.startsWith(pokemonName))
      yield localStorage.setItem('slug_name', pokemonName)
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonSearchNameSlug', value: pokemonName })
      if (!filterPokemonsPerName.length) {
        yield put({ type: SET_POKEMONS_PROP, key: 'errorMessage', value: 'No results' })
      }
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsAll', value: filterPokemonsPerName })
      yield put({ type: SET_POKEMONS_PROP, key: 'backToPokemonsAll', value: true })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonDetailsError', value: error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* searchPokemonTypeFlow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
      const res = yield call(getAllPokemonsType, action.pokemonType)
      const arr = []
      const pokemons = yield res?.data?.pokemon
      yield pokemons.map(pokemon => arr.push({ ...pokemon.pokemon }) )
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsAllType', value: arr })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonDetailsError', value: error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* getPokemonAbilityFlow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
      const res = yield call(getAllPokemonsPerAbility, action.pokemonAbility)
      const arr = []
      const pokemons = yield res?.data?.pokemon
      yield pokemons.map(pokemon => arr.push({ ...pokemon.pokemon }) )
      yield localStorage.setItem('slug_ability', action.pokemonAbility)
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonAbilitySlug', value: action.pokemonAbility })
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsAllAbility', value: arr })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonDetailsError', value: error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* getPokemonTypeFlow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
      const res = yield call(getAllPokemonsPerType, action.pokemonType)
      const arr = []
      const pokemons = yield res?.data?.pokemon
      yield pokemons.map(pokemon => arr.push({ ...pokemon.pokemon }) )
      yield localStorage.setItem('slug_type', action.pokemonType)
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonTypeSlug', value: action.pokemonType })
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsAllType', value: arr })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonDetailsError', value: error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}


export function* watchLoadAllPokemons() {
  yield takeEvery(LOAD_POKEMONS, loadAllPokemons)
}

export function* watchLoadPaginatedPokemons() {
  yield takeEvery(LOAD_PAGINATED_DATA, loadPaginatedPokemons)
}

export function* watchLoadPokemonDetails() {
  yield takeEvery(LOAD_POKEMON_DETAILS, loadPokemonDetails)
}

export function* watchLoadAllPokemonsFlow() {
  yield takeEvery(LOAD_ALL_POKEMONS, loadAllPokemonsFLow)
}

export function* watchSearchPokemonNameFlow() {
  yield takeEvery(SEARCH_POKEMON_NAME, searchPokemonNameFlow)
}

export function* watchSearchPokemonTypeFlow() {
  yield takeEvery(SEARCH_POKEMON_TYPE, searchPokemonTypeFlow)
}

export function* watchGetPokemonAbilityFlow() {
  yield takeEvery(GET_SEVERAL_ABILITY, getPokemonAbilityFlow)
}

export function* watchGetPokemonTypeFlow() {
  yield takeEvery(GET_SEVERAL_TYPE, getPokemonTypeFlow)
}