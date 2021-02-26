import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AbilityPokemons from './pages/abilityPokemons/abilityPokemons';
import AllPokemons from './pages/allPokemons/allPokemons';
import HomePage from './pages/home/home';
import NotFound from './pages/notFound/notFound';
import PokemonDetails from './pages/pokemon-details/pokemon-details';
import PokemonsPage from './pages/pokemons/pokemons';
import SearchedPokemons from './pages/searchedPokemons/searchedPokemons';
import TypePokemons from './pages/typePokemons/typePokemons';
import { initSaga } from './store/actions';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initSaga())
  }, [])

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/pokemons/:paginateIndex" component={PokemonsPage} />
        <Route path="/pokemon-ability/:abilitySlug" component={AbilityPokemons} />
        <Route path="/pokemon-type/:typeSlug" component={TypePokemons} />
        <Route path="/allPokemons" component={AllPokemons} />
        <Route path="/allPokemons/search?/:query" component={SearchedPokemons} />
        <Route path="/pokemon-details/:pokemonId" component={PokemonDetails} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
