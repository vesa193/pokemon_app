import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout } from '../../components/layout/layout';
import Pokemon from '../../components/pokemon/pokemon';
import { loadAllPokemons, loadPaginatedPokemons, searchPokemonName } from '../pokemons/actions';
import './allPokemons.css';
import SearchBox from '../../components/searchBox/searchBox';


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

const AllPokemons = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const pokemons = useSelector(state => state.pokemons.pokemonsAll)
  const pokemonsAllFiltered = useSelector(state => state.pokemons.pokemonsAllFiltered)
  const [pokemonsState, setPokemonsState] = useState(null)
  const pokemonsCount = Math.floor(1118 / 20)
  const lsPageNum = localStorage.getItem('page')
  const lsAll = localStorage.getItem('all')
  const initPage = +lsPageNum || 1
  const [page, setPage] = useState(initPage);
  const [isClicked, setIsClicked] = useState(false)
  const pokemonStateClass = pokemonsState ? 'pokemons-exist' : 'pokemons-unexist'
  const newClass = pokemonsState ? 'auto-grid' : ''
  // console.log('INFOOO1')

  // useEffect(() => {
  //   getAllPokemonsPerPagination(page)
  //   history.push(`/pokemons/${page}`)
  // }, [])

  // useEffect(() => {
  //   if (lsAll === 'true') {
  //     history.push(`/allPokemons`)
  //   } else {
  //     history.push(`/pokemons/${page}`)
  //   }
  // }, [])


  useEffect(() => {
    console.log('allPokemons page')
    getAllPokemons()
    history.push(`/allPokemons`)
  }, [])

  useEffect(() => {
    setPokemonsState(pokemons)
  }, [pokemons])

  const getAllPokemonsPerPagination = (pageNum) => {
    // dispatch(loadPokemons())
    dispatch(loadPaginatedPokemons(pageNum, false))
  }

  const getAllPokemons = () => {
    dispatch(loadAllPokemons(1100))
  }

  const handleChangePage = (event, pageNum) => {
    setPage(+pageNum)
    console.log('event, pageNum', event, pageNum)
    localStorage.setItem('page', `${pageNum}`)
    history.push(`/pokemons/${pageNum}`)
    dispatch(loadPaginatedPokemons(pageNum))
  };

  const showAllHandler = (dir) => {
    if (dir === 'all') {
      setIsClicked(true)
      getAllPokemonsPerPagination(page)
      history.push(`/${dir}Pokemons`)
    }
  }

  const handleBackToPagination = () => {
    getAllPokemonsPerPagination(page)
    history.push(`/pokemons/${page}`)
    setIsClicked(false)
  }

  return (
    <Layout>
      <SearchBox />
      <div className={`pokemons ${pokemonStateClass}`}>
        <div className={`pokemons-wrapper ${newClass}`}>
          <Pokemon pokemon={pokemonsState} />
        </div>
        <div className="pokemons-pagination">
          <Button 
            variant="contained" 
            color="default"
            className={classes.buttonOfPagination}
            onClick={ () => handleBackToPagination() }
          >
            ← Back to Pagination
          </Button>
        </div>
      </div>
    </Layout>
  );
}
 
export default AllPokemons;