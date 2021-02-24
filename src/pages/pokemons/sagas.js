import { put, takeLatest, take, call, takeEvery, select } from 'redux-saga/effects'
import { IS_LOADER_ACTIVE } from '../../store/consts';
import { getAllPokemonsData, getPokemonDetailsData, getPokemonsData, getPokemonsPaginatedData } from '../../lib/api'
import { LOAD_ALL_POKEMONS, LOAD_PAGINATED_DATA, LOAD_PAGINATED_DATA_FAILED, LOAD_PAGINATED_DATA_SUCCESS, LOAD_POKEMONS, LOAD_POKEMONS_FAILED, LOAD_POKEMONS_SUCCESS, LOAD_POKEMON_DETAILS, SEARCH_POKEMON_NAME, SET_POKEMONS_PROP } from './consts';

function* loadAllPokemons(action) {
  // yield console.log('TOKEN saga', token)
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {

      const res = yield call(getPokemonsData)
      const pokemons = yield res?.data
      console.log('SAGA loadAllPokemons', pokemons);
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsData', value: pokemons })
      yield put({ type: LOAD_POKEMONS_SUCCESS, pokemons: pokemons?.results })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
    // console.log('dddd', error)
    // yield put({ type: CREATE_BILL_FAILED, errorBill: error })
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
      console.log('loadPaginatedPokemons', action, action.offsetNum)
      const offset = yield countOffset(action.offsetNum)
      const res = yield call(getPokemonsPaginatedData, offset, 20)
      const pokemons = yield res?.data
      yield localStorage.setItem('all', 'false')
      yield put({ type: LOAD_PAGINATED_DATA_SUCCESS, pokemons: pokemons?.results })
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsData', value: pokemons })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('dddd', error)
      yield put({ type: LOAD_PAGINATED_DATA_FAILED, error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* loadAllPokemonsFLow(action) {
  // yield console.log('TOKEN saga', token)
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    console.log('loadAllPokemonsFLow', action)
    const res = yield call(getAllPokemonsData)
    const pokemons = yield res?.data
    yield localStorage.setItem('all', 'true')
    yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsData', value: pokemons })
    yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsAll', value: pokemons?.results })
    yield put({ type: SET_POKEMONS_PROP, key: 'backToPokemonsAll', value: false })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('dddd', error)
      yield put({ type: SET_POKEMONS_PROP, key: 'error', value: error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* loadPokemonDetails(action) {
  console.log('loadPokemonDetails', action)
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
      const res = yield call(getPokemonDetailsData, action.pokemonUrl)
      const pokemon = yield res?.data
      const lsPokemonData = yield JSON.stringify(pokemon)
      yield localStorage.setItem('pokemon_details', lsPokemonData)
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonDetailsData', value: pokemon })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('dddd', error)
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonDetailsError', value: error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}


function* searchPokemonNameFlow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
      const state = yield select()
      console.log('searchPokemonNameFlow', action.name)
      const res = yield call(getAllPokemonsData)
      const pokemons = yield res?.data?.results
      console.log('SEARCH',  pokemons)
      // const allPokemons = yield state.pokemons.pokemonsAll
      const pokemonName = yield action.name.toLowerCase()
      // const filterPokemonsPerName = yield pokemons.filter(item => item.name.includes(pokemonName))
      const filterPokemonsPerName = yield pokemons.filter(item => item.name.startsWith(pokemonName))
      yield localStorage.setItem('slug_name', pokemonName)
      // yield console.log('filterPokemonsPerName', filterPokemonsPerName)
      if (!filterPokemonsPerName.length) {
        yield put({ type: SET_POKEMONS_PROP, key: 'errorMessage', value: 'No results' })
      }
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsAll', value: filterPokemonsPerName })
      yield put({ type: SET_POKEMONS_PROP, key: 'backToPokemonsAll', value: true })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('dddd', error)
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