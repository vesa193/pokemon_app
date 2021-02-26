import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles, TextField } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Layout } from '../../components/layout/layout';
import Pokemon from '../../components/pokemon/pokemon'
import './pokemons.css'
import { getSeveralAbility, switchingFilter, loadAllPokemons, loadPaginatedPokemons, setAbilitySlug, getSeveralType, setTypeSlug } from './actions';
import AbilityFilter from '../../components/abilityFilter/abilityFilter';


const useStyles = makeStyles((theme) => {
  return {
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
      zIndex: 999,
      [theme.breakpoints.down('md')]: {
        position: 'relative',
        maxWidth: 200,
        justifySelf: 'center'
      }
    }
  }
})

const PokemonsPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const pokemons = useSelector(state => state.pokemons.pokemons)
  const pokemonsData = useSelector(state => state?.pokemons?.pokemonsData)
  const isSwitched = useSelector(state => state?.pokemons?.isFilterSwitched)
  const pokemonsAbility = useSelector(state => state?.pokemons?.pokemonsAbility)
  const [pokemonsState, setPokemonsState] = useState(null)
  const [pokemonsAbilityState, setPokemonsAbilityState] = useState(null)
  const pokemonsCount = Math.floor(pokemonsData?.count / 20)
  const lsPageNum = localStorage.getItem('page')
  const lsAll = localStorage.getItem('all')
  const initPage = lsPageNum || 1
  const [page, setPage] = useState(initPage);
  const [value, setValue] = useState('');
  const [isClicked, setIsClicked] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const pokemonStateClass = pokemonsState ? 'pokemons-exist' : 'pokemons-unexist'
  const newClass = pokemonsState ? 'auto-grid' : ''
  const isAllCategory = isClicked || lsAll === 'true'


  useEffect(() => {
    getAllPokemonsPerPagination(page)
    providingDataToState()
    history.push(`/pokemons/${page}`)
  }, [isSwitched])


  const providingDataToState = () => {
    setPokemonsState(pokemons)
    setPokemonsAbilityState(pokemonsAbility)
  }

  useEffect(() => {
    providingDataToState()
  }, [pokemons, pokemonsAbility])


  const handleChangePage = (event, pageNum) => {
    setPage(+pageNum)
    localStorage.setItem('page', `${pageNum}`)
    history.push(`/pokemons/${pageNum}`)
    dispatch(loadPaginatedPokemons(pageNum))
  };

  const getAllPokemonsPerPagination = (pageNum) => {
    dispatch(loadPaginatedPokemons(pageNum, false, isSwitched))
  }

  const showAllHandler = (dir) => {
    history.push(`/${dir}Pokemons`)
  }

  const showFilterHandler = () => {
    setIsShow(true)
  }

  const getAllPokemonsPerAbility = (abilityType) => {
    dispatch(getSeveralAbility(abilityType))
    dispatch(setAbilitySlug(abilityType))
    history.push(`/pokemon-ability/${abilityType}`)
  }
  
  const getAllPokemonsPerType = (pokemonType) => {
    dispatch(getSeveralType(pokemonType))
    dispatch(setTypeSlug(pokemonType))
    history.push(`/pokemon-type/${pokemonType}`)
  }

  return (
    <Layout>
      <AbilityFilter pokemonAbilities={pokemonsAbility} getAllPokemonsPerAbility={(name) => getAllPokemonsPerAbility(name)} getAllPokemonsPerType={(name) => getAllPokemonsPerType(name)} />
      <div className={`pokemons ${pokemonStateClass}`}>
        <div className={`pokemons-wrapper ${newClass}`}>
          <Pokemon pokemon={pokemonsState} />
        </div>
        <div className="pokemons-pagination">
          <Pagination 
            key={`page-${page}`}
            disabled={isClicked}
            defaultPage={+page}
            color="primary" 
            count={pokemonsCount}
            onChange={(e, a) => handleChangePage(e, a)}
          />

          <Button 
            variant="contained" 
            color="primary" 
            className={classes.buttonOfPagination}
            onClick={ () => showAllHandler('all') }
          >
            All
          </Button>
        </div>
      </div>
    </Layout>
  );
}
 
export default PokemonsPage;