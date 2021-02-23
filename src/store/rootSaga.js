import { all } from "redux-saga/effects";
import { watchLoadAllPokemons, watchLoadAllPokemonsFlow, watchLoadPaginatedPokemons, watchLoadPokemonDetails, watchSearchPokemonNameFlow } from "../pages/pokemons/sagas";
import { watchInitSaga } from "./commonSaga";

export default function* rootSaga() {
  yield all([
    watchLoadAllPokemons(),
    watchLoadPaginatedPokemons(),
    watchLoadPokemonDetails(),
    watchLoadAllPokemonsFlow(),
    watchInitSaga(),
    watchSearchPokemonNameFlow()
  ])
}