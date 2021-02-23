import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles, TextField } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Layout } from '../../components/layout/layout';
import Pokemon from '../../components/pokemon/pokemon'
import './pokemons.css'
import { loadAllPokemons, loadPaginatedPokemons } from './actions';


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
  const pokemons = useSelector(state => state.pokemons.pokemons)
  // console.log('POKEEEAA', pokemons.pokemons, pokemons.pokemonsAll)
  const pokemonsData = useSelector(state => state?.pokemons?.pokemonsData)
  const [pokemonsState, setPokemonsState] = useState(null)
  const pokemonsCount = Math.floor(pokemonsData?.count / 20)
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
    providingDataToState()
    history.push(`/pokemons/${page}`)
  }, [])

  // useEffect(() => {
  //   window.onpopstate = e => {
  //     const location = window.location.href.split('/')[4]
  //     const lsLocation = localStorage.getItem('page')
  //     console.log('LOC -----', location, lsLocation)

  //     if (location !== lsLocation) {
  //       setPage(location || 1)
  //       getAllPokemonsPerPagination(location || 1)
  //       localStorage.setItem('page', location || '1')
  //       history.push(`/pokemons/${location || 1}`)
  //     }
  //   }
  // }, [page])


  const providingDataToState = () => {
    setPokemonsState(pokemons)
  }

  useEffect(() => {
    providingDataToState()
  }, [pokemons])


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
    // getAllPokemons()
    // setIsClicked(true)
    history.push(`/${dir}Pokemons`)
  }

  return (
    <Layout>
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