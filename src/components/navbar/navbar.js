import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { forwardTo } from '../../lib/utils';
import BackHandler from '../backHandler/backHandler';
import './navbar.css';
import { navConfig } from './navConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 20
  },
  link: {
    color: '#fff'
  },
  activeLink: {
    backgroundColor: '#fff',
    color: '#212121',
    fontWeight: 'bold',
    borderRadius: 5
  }
}));

export const Navbar = (props) => {
  const classes = useStyles();
  const history = useHistory()
  const currentPath = history.location.pathname
  const { navLinks } = navConfig
  const lsPage = localStorage.getItem('page')
  
  const handleNavLink = (path, history) => forwardTo(path, history)
  const styledLink = (path) => {
    let className = null
    if (currentPath === `${path}/${lsPage || '1'}`) {
      className = classes.activeLink
    } else if (currentPath === path) {
      className = classes.activeLink
    } else {
      className = ''
    }

    return className
  }
  
  return (
    <>
      <AppBar position="fixed" className="navbar">
        <Toolbar>
          <Button className="navbar-logo" color="inherit" onClick={() => handleNavLink('/', history)} />
          <Typography variant="h6" className={classes.title}>
            Pokemon App
          </Typography>
          {
            navLinks.map(link => (
              <Link key={ link.id } className={`${classes.link} ${styledLink(link.path)}`} to={ link.label !== 'Home' ? `${link.path}/${lsPage || 1}`: link.path }>
                <Button color="inherit" className={`${styledLink(link.path)}`}>
                  { link.label }
                </Button>
              </Link>
            ))
          }
        </Toolbar>
      </AppBar>
      <BackHandler />
    </>
  );
}
