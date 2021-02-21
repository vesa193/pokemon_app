import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './home.css';
import { Layout } from '../../components/layout/layout';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    color: '#fff',
    fontSize: '3.5rem'
  },
  button: {
    background: '#fff'
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const lsPage = localStorage.getItem('page')
  
  return (
    <Layout>
      <div className="home-wrapper">
        <h1 className={classes.title}>Welcome to Pokemon App</h1>
        <Link to={`/pokemons/${lsPage}`}>
          <Button variant="contained">See all Pokemons</Button>
        </Link>
      </div>
    </Layout>
  );
}
 
export default HomePage;