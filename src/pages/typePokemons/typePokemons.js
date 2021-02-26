import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout } from '../../components/layout/layout';
import Pokemon from '../../components/pokemon/pokemon';
import { getSeveralAbility, getSeveralType, loadAllPokemons, loadPaginatedPokemons, searchPokemonName } from '../pokemons/actions';
import SearchBox from '../../components/searchBox/searchBox';
import { uppercaseFirstLetter } from '../../lib/utils';
import '../abilityPokemons/abilityPokemons.css';


const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    button: {
      backgroundColor: theme.palette.grey
    },
    buttonOfPagination: {
      position: 'absolute',
      width: 'auto',
      height: 30,
      right: 10,
      top: '50%',
      borderRadius: 50,
      transform: `translateY(-50%)`,
      zIndex: 999
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      fontSize: '1.3rem'
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }
})

const TypePokemons = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const pokemons = useSelector(state => state.pokemons.pokemonsAllType)
  const slug = useSelector(state => state.pokemons.typeSlug)
  const lsSlug = localStorage.getItem('slug_type')
  const slugName = slug || lsSlug
  const [pokemonsState, setPokemonsState] = useState(null)
  const pokemonStateClass = pokemonsState ? 'pokemons-exist' : 'pokemons-unexist'
  const newClass = pokemonsState ? 'auto-grid' : ''

  useEffect(() => {
    dispatch(getSeveralType(slugName))
    history.push(`/pokemon-type/${slugName}`)
  }, [])

  useEffect(() => {
    setPokemonsState(pokemons)
  }, [pokemons])


  return (
    <Layout>
      <div className={`pokemons pokemons--ability ${pokemonStateClass}`}>
        <h3>Filtered Pokemons per <span>{uppercaseFirstLetter(slugName)}</span> Type</h3>
        <div className={`pokemons-wrapper ${newClass}`}>
          <Pokemon pokemon={pokemonsState} />
        </div>
      </div>
    </Layout>
  );
}
 
export default TypePokemons;