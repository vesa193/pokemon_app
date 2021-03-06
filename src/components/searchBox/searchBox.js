import React, { memo, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { FormHelperText, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPokemons, searchPokemonName, setSearchedNameSlug } from '../../pages/pokemons/actions';

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
    errorText: {
      color: 'red',
      fontSize: '1.5rem',
      paddingLeft: 20
    }
  }
})


const SearchBox = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const currentPath = history.location.pathname
  const flag = useSelector(state => state.pokemons.backToPokemonsAll)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)


  const backHandlerToAll = () => {
    dispatch(loadAllPokemons(1100))
    history.goBack()
  }

  const handleInput = (e) => {
    if (e.target.value !== '') {
      setError(false)
    }
    setValue(e.target.value)
  }

  const handleQueryName = (e, name) => {
    e.preventDefault()
    
    if (name.length >= 3 || e.keyCode === 13 && name.length >= 3) {
      setError(false)
      dispatch(searchPokemonName(name))
      dispatch(setSearchedNameSlug(name))
      history.push(`/allPokemons/search?/${name}`)
    } else if (name.length >= 3 || e.keyCode === 27 && name.length >= 3) {
      backHandlerToAll(name)
    } else {
      setError(true)
    }
  }

  const handleCloseSearching = (e) => {
    if (e.keyCode === 27 && currentPath.includes('search')) {
      backHandlerToAll()
      setValue('')
    }
  }

  return (
    <div className="pokemons-input">
      <Paper component="form" className={classes.root} onSubmit={ (e) => handleQueryName(e, value) } onKeyDown={ (e) => handleCloseSearching(e) } >
        <InputBase
          className={classes.input}
          placeholder="Search Pokemon's name"
          inputProps={{ 'aria-label': 'search google maps' }}
          defaultValue={value}
          onChange={ (e) => handleInput(e) }
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton 
          type="submit" 
          className={classes.iconButton} 
          aria-label="search" 
          onClick={ (e) => handleQueryName(e, value) }
        >
          <SearchIcon />
        </IconButton>
        { currentPath !== '/allPokemons' ?
          <>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              type="button" 
              className={classes.iconButton} 
              aria-label="search" 
              onClick={ () => backHandlerToAll() }
            >
              <CloseIcon />
            </IconButton>
          </>
          : null }
      </Paper>
      { error ? <FormHelperText id="component-error-text" className={classes.errorText}>Field must contain 3 chars at least</FormHelperText> : null }
    </div>
  );
}
 
export default SearchBox;