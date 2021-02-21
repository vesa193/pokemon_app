import { put, takeLatest, take, call, takeEvery } from 'redux-saga/effects'
import { IS_LOADER_ACTIVE } from '../../store/consts';
import { getPokemonsData, getPokemonsPaginatedData } from '../../lib/api'
import { LOAD_PAGINATED_DATA, LOAD_PAGINATED_DATA_FAILED, LOAD_PAGINATED_DATA_SUCCESS, LOAD_POKEMONS, LOAD_POKEMONS_FAILED, LOAD_POKEMONS_SUCCESS, SET_POKEMONS_PROP } from './consts';

function* loadAllPokemons(action) {
  // yield console.log('TOKEN saga', token)
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {

      console.log('infoo data111111')
      const res = yield call(getPokemonsData)
      const pokemons = res?.data
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

function* loadPaginatedPokemons(action) {
  // yield console.log('TOKEN saga', token)
  console.log('loadPaginatedPokemons', action)
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const offset = yield `${action.offsetNum > 1 ? action.offsetNum * 20 : 0 }`
    console.log('offset', offset, action.offsetNum)
    // const limitNum = yield action.offsetNum === 55 ? 18 : 20
      
      // console.log('infoo data111111')
      const res = yield call(getPokemonsPaginatedData, offset, 20)
      console.log('O222222', res)
      const pokemons = res?.data
      // console.log('SAGA loadAllPokemons', pokemons);
      yield put({ type: SET_POKEMONS_PROP, key: 'pokemonsData', value: pokemons })
      yield put({ type: LOAD_PAGINATED_DATA_SUCCESS, pokemons: pokemons?.results })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('dddd', error)
      // yield put({ type: CREATE_BILL_FAILED, errorBill: error })
      // yield put({ type: LOAD_POKEMONS_FAILED, error })
      yield put({ type: LOAD_PAGINATED_DATA_FAILED, error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

export function* watchLoadAllPokemons() {
  yield takeEvery(LOAD_POKEMONS, loadAllPokemons)
}

export function* watchLoadPaginatedPokemons() {
  yield takeEvery(LOAD_PAGINATED_DATA, loadPaginatedPokemons)
}
