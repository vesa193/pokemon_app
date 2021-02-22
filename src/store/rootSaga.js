import { all } from "redux-saga/effects";
import { watchLoadAllPokemons, watchLoadAllPokemonsFlow, watchLoadPaginatedPokemons, watchLoadPokemonDetails } from "../pages/pokemons/sagas";

export default function* rootSaga() {
  yield all([
    watchLoadAllPokemons(),
    watchLoadPaginatedPokemons(),
    watchLoadPokemonDetails(),
    watchLoadAllPokemonsFlow()
  ])
}