import { put, takeLatest, take, call, takeEvery } from 'redux-saga/effects'
import { INIT_SAGA, IS_LOADER_ACTIVE, SET_COMMON_PROP } from './consts';


function* initSaga() {
  // yield console.log('TOKEN saga', token)
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
      const lsPage = localStorage.getItem('page') ? localStorage.getItem('page') : localStorage.setItem('page', '1')
      yield put({ type: SET_COMMON_PROP, key: 'page', value: lsPage })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
    // console.log('dddd', error)
    // yield put({ type: CREATE_BILL_FAILED, errorBill: error })
    const lsPage = localStorage.getItem('page') ? localStorage.getItem('page') : localStorage.setItem('page', '1')
    yield put({ type: SET_COMMON_PROP, key: 'page', value: lsPage })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

export function* watchInitSaga() {
  yield takeEvery(INIT_SAGA, initSaga)
}
