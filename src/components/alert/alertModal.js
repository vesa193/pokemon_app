import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';
import Pokemon from '../pokemon/pokemon';


const useStyles = makeStyles((theme) => {
  return {
    modal: {
      width: '80%',
    },
    modalTitle: {
      fontSize: '1.5rem'
    }
  }
});

export default function AlertModal({ isOpen, handleClose, pokemonComponent }) {
  const classes = useStyles()

  return (
      <Dialog
        open={isOpen}
        onClose={() => handleClose('close')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" className={classes.modalTitle}>POKEMONS OF THE SAME TYPE</DialogTitle>
        <DialogContent>
          { pokemonComponent }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('close')} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}