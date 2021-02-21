import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../store/rootReducer'
import rootSaga from '../store/rootSaga'


const sagaMiddleware = createSagaMiddleware()
const isDevTools = true

let middleware = applyMiddleware(sagaMiddleware)
if (isDevTools) {
	middleware = composeWithDevTools(applyMiddleware(sagaMiddleware))
}

export const store = createStore(
	rootReducer,
	middleware
)

sagaMiddleware.run(rootSaga)