import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import Pagination, { usePagination } from '@material-ui/lab/Pagination';
import { Layout } from '../../components/layout/layout';
import Pokemon from '../../components/pokemon/pokemon'
import './pokemons.css'
import { loadPaginatedPokemons, loadPokemons } from './actions';
import { forwardTo } from '../../lib/utils';


const useStyles = makeStyles((theme) => {
  return {
    button: {
      backgroundColor: theme.palette.grey
    }
  }
})

const PokemonsPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const pokemons = useSelector(state => state.pokemons.pokemons)
  const pokemonsData = useSelector(state => state?.pokemons?.pokemonsData)
  const [pokemonsState, setPokemonsState] = useState(null)
  const pokemonsCount = Math.floor(pokemonsData?.count / 20)
  const lsPageNum = localStorage.getItem('page')
  console.log('lsPageNum', lsPageNum)
  const [page, setPage] = React.useState(lsPageNum);
  const pokemonStateClass = pokemonsState ? 'pokemons-exist' : 'pokemons-unexist'
  const newClass = pokemonsState ? 'auto-grid' : ''
  console.log('localStoragePokemons', pokemonsCount)
  // console.log('INFOOO1')

  useEffect(() => {
    // setPokemonsState(pokemons)
    getAllPokemons()
  }, [])

  useEffect(() => {
    setPokemonsState(pokemons)
  }, [pokemons])

  const getAllPokemons = () => {
    dispatch(loadPokemons())
  }


  const handleChangePage = (event, pageNum) => {
    setPage(+pageNum)
    console.log('event, pageNum', event, pageNum)
    localStorage.setItem('page', `${pageNum}`)
    history.push(`/pokemons/${pageNum}`)
    dispatch(loadPaginatedPokemons(pageNum))
  };

  console.log('infooo11 222', pokemonsState, page)

  return (
    <Layout>
      <TextField id="filled-basic" className="pokemons-input" label="Search Pokemon per name" variant="filled" />
      <div className={`pokemons ${pokemonStateClass}`}>
        <div className={`pokemons-wrapper ${newClass}`}>
          <Pokemon pokemon={pokemonsState} />
        </div>
        <div className="pokemons-pagination">
          <Pagination 
            key={`page-${page}`}
            defaultPage={+page}
            className="pokemons-pagination" 
            color="primary" 
            count={pokemonsCount}
            onChange={(e, a) => handleChangePage(e, a)}
          />
        </div>
      </div>
    </Layout>
  );
}
 
export default PokemonsPage;