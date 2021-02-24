import React from 'react'
import Card from '@material-ui/core/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, makeStyles } from '@material-ui/core';
import bgdImage from '../../assets/the_pokemon.jpg'
import './pokemon.css'
import { loadPokemonDetails } from '../../pages/pokemons/actions';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      maxWidth: 345,
    },
    media: {
      height: 180,
    },
    button: {
      backgroundColor: theme.palette.grey
    }
  }
});

const Pokemon = ({ pokemon }) => {
  const classes = useStyles();
  const history = useHistory()
  const state = useSelector(state => state.common)
  const dispatch = useDispatch()

  const handleShowPokemonDetails = (pokemonUrl) => {
    const pokemonId = pokemonUrl.split('pokemon/')[1].replace('/', '')
    dispatch(loadPokemonDetails(pokemonId))
    history.push(`/pokemon-details/${pokemonId}`)
  }

  let content = state.isLoading ? `Please Wait ...` : `No Pokemons data`

  if (pokemon?.length === 0 && history.location.pathname === '/allPokemons/search') {
    content = `No Results from Search`
  }

  if (pokemon) {
    content = pokemon?.map(p => {
      return (
        <div key={`index-${p.name}`}>
          <Card key={`index-${p.name}`} className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={bgdImage}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography className="pokemon-title" gutterBottom variant="h5" component="h2">
                  {p.name}
                </Typography>
                <Typography className="pokemon-desc" variant="body2" color="textSecondary" component="p">
                  <span>#pokemon</span>
                  <span>{`#${p.name}`}</span>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {/* <Button size="small" color="primary">
                Share
              </Button> */}
              <Button size="small" color="primary" onClick={() => handleShowPokemonDetails(p.url)}>
                View details ...
              </Button>
            </CardActions>
          </Card>
        </div>
      )
    })
  }

  return content
}

export default Pokemon;