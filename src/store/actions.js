import { CLOSE_MODAL_ON_VIEW_DETAILS, INIT_SAGA, IS_LOADER_ACTIVE } from "./consts"

export const loader = (isLoading) => {
  return {
    type: IS_LOADER_ACTIVE,
    isLoading
  }
}

export const initSaga = () => {
  return {
    type: INIT_SAGA,
  }
}

export const closeModalOnViewDetails = (isClosed) => {
  return {
    type: CLOSE_MODAL_ON_VIEW_DETAILS,
    isClosed
  }
}