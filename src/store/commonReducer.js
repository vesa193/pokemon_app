import { IS_LOADER_ACTIVE } from "./consts"

const initialState = {
  isLoading: null
}

function commonReducer(state = initialState, action) {
  const { type } = action
	switch (type) {
    case IS_LOADER_ACTIVE:
      return {
        ...state,
        isLoading: action.isLoading
      }

	default:
		return state
	}
}

export default commonReducer