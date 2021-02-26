import { Backdrop, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '../navbar/navbar';
import './layout.css';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const Layout = ({ children, className, rest }) => {
  const classes = useStyles();
  const state = useSelector(state => state.common)
  
  return (
    <div className={`layout ${ className || "" }`}>
      {/* <div className="layout-spinner-wrapper">
        <div className="layout-spinner-overlay" />
          <CircularProgress disableShrink className="layout-spinner" />
      </div> */}
      <Backdrop className={classes.backdrop} open={state.isLoading || false}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Navbar />
      { children }
    </div>
  );
}
