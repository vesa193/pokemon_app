import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, makeStyles } from '@material-ui/core';
import bgdImage from '../../assets/the_pokemon.jpg'
import './pokemon.css'

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

  let content = `No Pokemons data`

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
              <Button size="small" color="primary" onClick={() => console.log('ind', p.url)}>
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