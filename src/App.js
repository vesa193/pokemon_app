import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllPokemons from './pages/allPokemons/allPokemons';
import HomePage from './pages/home/home';
import NotFound from './pages/notFound/notFound';
import PokemonDetails from './pages/pokemon-details/pokemon-details';
import PokemonsPage from './pages/pokemons/pokemons';
import { initSaga } from './store/actions';
import './App.css';
import SearchedPokemons from './pages/searchedPokemons/searchedPokemons';

function App() {
  const dispatch = useDispatch()
  console.log('pathname', window.location.pathname, process.env.PUBLIC_URL)


  useEffect(() => {
    dispatch(initSaga())
  }, [])

  // const removeLocalStorage = () => {
  //   localStorage.removeItem('page')
  //   localStorage.removeItem('all')
  //   localStorage.removeItem('pokemon_details')
  // }

  // window.addEventListener("beforeunload", (ev) => {  
  //   ev.preventDefault();
  //   ev.returnValue = 'Are you sure you want to close?';
  //   removeLocalStorage()
  // });

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/pokemons/:paginateIndex" component={PokemonsPage} />
        <Route path="/allPokemons" component={AllPokemons} />
        <Route path="/allPokemons/search?/:query" component={SearchedPokemons} />
        <Route path="/pokemon-details/:pokemonId" component={PokemonDetails} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
