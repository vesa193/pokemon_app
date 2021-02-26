import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PhotoIcon from '@material-ui/icons/Photo';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import placehoderImg from '../../assets/placeholder_pokemon.jpg';
import AlertModal from '../../components/alert/alertModal';
import { Layout } from '../../components/layout/layout';
import Pokemon from '../../components/pokemon/pokemon';
import { Slider } from '../../components/slider/slider';
import { searchPokemonType } from '../pokemons/actions';
import './pokemon-details.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => {
  return {
    root: {
      maxWidth: 345,
      [theme.breakpoints.down('md')]: {
        maxWidth: 310,
      }
    },
    title: {
      marginTop: '8rem'
    },
    typography: {
      fontSize: '1.1rem',
      marginTop: 10
    },
    name: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: 20
    },
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      // boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    buttonWrapper: {
      marginTop: 15
    }
  }
});

const PokemonDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const state = useSelector(state => state.pokemons)
  const isClosed = useSelector(state => state.common.isClosed)
  const pokemonsAllType = useSelector(state => state.pokemons.pokemonsAllType)
  const history = useHistory()
  const isLoading = useSelector(state => state.common.isLoading)
  const lsPokemonData = JSON.parse(localStorage.getItem('pokemon_details'))
  const data = state?.pokemonDetailsData || lsPokemonData
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleDialog = (dir) => {
    if (dir === 'open') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const getPokemonsPerType = (pokemonType) => {
    if (pokemonType) {
      dispatch(searchPokemonType(pokemonType))
      setIsOpenModal(true)
    }
  }

  const handleCloseModal = (dir) => {
    const dirClose = dir === 'close'
    if (dirClose || isClosed) {
      setIsOpenModal(false)
    }
    if (isClosed) {
      setIsOpenModal(false)
    }
  }

  let content = <p>No Pokemon Data</p>

  if (isLoading) {
    content = <h2>Loading Pokemon Data ...</h2>
  } else {

    content = (
      <>
        <Typography gutterBottom variant="h2" component="h3" className={classes.title}>Pokemon details</Typography>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="180"
              image={data?.sprites?.front_shiny || data?.sprites?.other['official-artwork'].front_default || placehoderImg}
              title="Contemplative Reptile"
              draggable={false}
              onClick={ () => handleDialog('open') }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" className={classes.name}>
                {data?.name}
              </Typography>
              <h6>Short description:</h6>
              <Typography variant="body2" color="textSecondary" component="h5" className={classes.typography}>
                <span>This is funny pokemon its weight is <strong>{data?.weight}</strong> and height <strong>{data?.height}</strong>.</span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="h5" className={classes.typography}>
                <span>You can click on the image to see more <strong>images</strong> of the pokemon.</span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="h5" className={classes.typography}>
                <span>Abilities:</span> {data?.abilities.map((a, i) =>(
                  <li key={i}><strong>{`${a?.ability?.name}`}</strong></li>
                ))}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="h5" className={classes.typography}>
                <span>Types:</span> {data?.types.map((a, i) => (
                  <div key={i} className={classes.buttonWrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      onClick={ () => getPokemonsPerType(a?.type?.name) }
                    >
                      {`${a?.type?.name}`}
                    </Button>
                  </div>
                ))}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions disableSpacing>
          <Button
            variant="contained"
            color="default"
            size="small"
            className={classes.button}
            startIcon={<PhotoIcon fontSize="large" />}
            onClick={ () => handleDialog('open') }
          >
            PHOTOS
          </Button>
          </CardActions>
        </Card>
        <Dialog
          className="pokemon-dialog"
          open={open}
          onClose={() => handleDialog('close')}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Pokemon Slider</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Slider sprites={data?.sprites} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialog('close')} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <AlertModal
          isOpen={isOpenModal} 
          handleClose={ (val) => handleCloseModal(val) }
          pokemonComponent={
            <div className="pokemons-wrapper auto-grid--modal">
              <Pokemon pokemon={pokemonsAllType} />
            </div>
          }
        />
      </>
    )
  }


  return (
    <Layout>
      <div className="pokemon-details">
        {content}
      </div>
    </Layout>
  );
}
 
export default PokemonDetails;