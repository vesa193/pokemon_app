import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import './backHandler.css';


const BackHandler = ({ history }) => {
  const currentPath = history.location.pathname

  const handleBack = () => {
    history.goBack()
  }

  const showBackHandler = () => {
    let style = null
    if (currentPath.includes('/pokemons') || currentPath === '/allPokemons' || currentPath === '/') {
      style = { display: 'none' }
    } else {
      style = { display: 'flex' }
    }

    return style
  } 

  return (
    <div style={showBackHandler()} className="back-handler">
      <Button size="large" onClick={() => handleBack()}>
        <KeyboardArrowLeft />
        Back
      </Button>
    </div>
  );
}
 
export default withRouter(BackHandler);