import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import history from './history';
import HomePage from './pages/home/home';
import PokemonDetails from './pages/pokemon-details/pokemon-details';
import PokemonsPage from './pages/pokemons/pokemons';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/pokemons/:paginateIndex">
          <PokemonsPage />
        </Route>
        <Route path="/pokemon-details/:pokemonId">
          <PokemonDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
