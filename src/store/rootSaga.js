import { all } from "redux-saga/effects";
import { watchGetPokemonAbilityFlow, watchGetPokemonTypeFlow, watchLoadAllPokemons, watchLoadAllPokemonsFlow, watchLoadPaginatedPokemons, watchLoadPokemonDetails, watchSearchPokemonNameFlow, watchSearchPokemonTypeFlow } from "../pages/pokemons/sagas";
import { watchInitSaga } from "./commonSaga";

export default function* rootSaga() {
  yield all([
    watchLoadAllPokemons(),
    watchLoadPaginatedPokemons(),
    watchLoadPokemonDetails(),
    watchLoadAllPokemonsFlow(),
    watchInitSaga(),
    watchSearchPokemonNameFlow(),
    watchSearchPokemonTypeFlow(),
    watchGetPokemonAbilityFlow(),
    watchGetPokemonTypeFlow()
  ])
}