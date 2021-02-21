import { combineReducers } from "redux";
import pokemonsReducer from '../pages/pokemons/reducer'
import commonReducer from "./commonReducer";

export default combineReducers({
	common: commonReducer,
	pokemons: pokemonsReducer
})
