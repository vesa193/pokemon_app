import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import Pagination, { usePagination } from '@material-ui/lab/Pagination';
import { Layout } from '../../components/layout/layout';
import Pokemon from '../../components/pokemon/pokemon'
import './pokemons.css'
import { loadAllPokemons, loadPaginatedPokemons, loadPokemons } from './actions';
import { forwardTo } from '../../lib/utils';


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
      zIndex: 999
    }
  }
})

const PokemonsPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const pokemons = useSelector(state => state.pokemons)
  console.log('POKEEEAA', pokemons.pokemons, pokemons.pokemonsAll)
  const pokemonsData = useSelector(state => state?.pokemons?.pokemonsData)
  const [pokemonsState, setPokemonsState] = useState(null)
  const pokemonsCount = Math.ceil(pokemonsData?.count / 20)
  const lsPageNum = localStorage.getItem('page')
  const lsAll = localStorage.getItem('all')
  const initPage = lsPageNum || 1
  const [page, setPage] = useState(initPage);
  const [value, setValue] = useState('');
  const [isClicked, setIsClicked] = useState(false)
  const pokemonStateClass = pokemonsState ? 'pokemons-exist' : 'pokemons-unexist'
  const newClass = pokemonsState ? 'auto-grid' : ''
  const isAllCategory = isClicked || lsAll === 'true'


  useEffect(() => {
    getAllPokemonsPerPagination(page)
    history.push(`/pokemons/${page}`)
  }, [])

  // useEffect(() => {
  //   setPokemonsState(pokemons)
  // }, [pokemons])

  React.useMemo(() => {
    if (isAllCategory) {
      setPokemonsState(pokemons.pokemonsAll)
    } else {
      setPokemonsState(pokemons.pokemons)
    }
  }, [pokemons.pokemons, pokemons.pokemonsAll])


  const handleChangePage = (event, pageNum) => {
    setPage(+pageNum)
    localStorage.setItem('page', `${pageNum}`)
    history.push(`/pokemons/${pageNum}`)
    dispatch(loadPaginatedPokemons(pageNum))
  };

  const getAllPokemons = () => {
    dispatch(loadAllPokemons())
  }

  const getAllPokemonsPerPagination = (pageNum) => {
    // dispatch(loadPokemons())
    dispatch(loadPaginatedPokemons(pageNum, false))
  }

  const showAllHandler = (dir) => {
    if (!pokemons.pokemonsAll) {
      getAllPokemons()
    } else {
      setPokemonsState(pokemons.pokemonsAll)
    }
    setIsClicked(true)
    history.push(`/pokemons/${dir}`)
  }

  const handleBackToPagination = () => {
    getAllPokemonsPerPagination(page)
    setIsClicked(false)
    history.push(`/pokemons/${page}`)
  }

  const handleInput = (e) => {
    console.log('val', e.target.value)
    // setValue(e.target.value)
  }

  return (
    <Layout>
      { isAllCategory ? 
        <TextField 
          id="filled-basic" 
          className="pokemons-input" 
          label="Search Pokemon's name" 
          variant="filled"
          defaultValue={value}
          onChange={ (e) => handleInput(e) }
        /> 
        : 
        null }
      <div className={`pokemons ${pokemonStateClass}`}>
        <div className={`pokemons-wrapper ${newClass}`}>
          <Pokemon pokemon={pokemonsState} />
        </div>
        <div className="pokemons-pagination">
          <Pagination 
            key={`page-${page}`}
            disabled={isClicked}
            defaultPage={+page}
            className="pokemons-pagination" 
            color="primary" 
            count={pokemonsCount}
            onChange={(e, a) => handleChangePage(e, a)}
          />
          { !isClicked ?
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.buttonOfPagination}
              onClick={ () => showAllHandler('all') }
            >
              All
            </Button>
          :
            <Button 
              variant="contained" 
              color="default"
              className={classes.buttonOfPagination}
              onClick={ () => handleBackToPagination('pieces') }
            >
              ← Back to Pagination
            </Button> }
        </div>
      </div>
    </Layout>
  );
}
 
export default PokemonsPage;