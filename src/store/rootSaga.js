import { all } from "redux-saga/effects";
import { watchLoadAllPokemons, watchLoadPaginatedPokemons } from "../pages/pokemons/sagas";

export default function* rootSaga() {
  yield all([
    watchLoadAllPokemons(),
    watchLoadPaginatedPokemons()
  ])
}