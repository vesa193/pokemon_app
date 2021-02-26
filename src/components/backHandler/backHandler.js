import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import './backHandler.css';
import { useDispatch } from 'react-redux';
import { loadAllPokemons } from '../../pages/pokemons/actions';


const BackHandler = ({ history }) => {
  const dispatch = useDispatch()
  const currentPath = history.location.pathname
  const lsPageNum = localStorage.getItem('page')
  const slug = lsPageNum || 1
  const addNewClass = currentPath.includes('/search?') ? 'back-handler--down' : ''

  const handleBackToAllPokemons = () => {
    dispatch(loadAllPokemons(1100))
    history.push(`/allPokemons`)
  }

  const handleBack = () => {
    if (currentPath.includes('/pokemon-ability') || currentPath.includes('/pokemon-type')) {
      history.push(`/pokemons/${slug}`)
    } else if (currentPath.includes('/search?')) {
      handleBackToAllPokemons()
    } else {
      history.goBack()
    }
  }

  const showBackHandler = () => {
    let style = null
    if (currentPath.includes('/pokemons') || currentPath.includes('search') || currentPath === '/allPokemons' || currentPath === '/') {
      style = { display: 'none' }
    } else {
      style = { display: 'flex' }
    }

    return style
  } 

  return (
    <div style={showBackHandler()} className={`back-handler ${addNewClass}`}>
      <Button size="large" onClick={() => handleBack()}>
        <KeyboardArrowLeft />
        Back
      </Button>
    </div>
  );
}
 
export default withRouter(BackHandler);