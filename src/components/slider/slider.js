import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import placeholder_pokemon from '../../assets/placeholder_pokemon.jpg'

const tutorialSteps = (sprites) => [
  {
    label: 'Back Default',
    imgPath: sprites.back_default || placeholder_pokemon,
  },
  {
    label: 'Back Shiny',
    imgPath: sprites.back_shiny || placeholder_pokemon,
  },
  {
    label: 'Front Default',
    imgPath: sprites.front_default || placeholder_pokemon,
  },
  {
    label: 'Front Shiny',
    imgPath: sprites.front_shiny || placeholder_pokemon,
  },
  {
    label: 'Official Artwork - (Front Default)',
    imgPath: sprites.other.['official-artwork'].front_default,
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    objectFit: 'contain'
  },
}));

export function Slider({ sprites }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps(sprites).length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <p>{tutorialSteps(sprites)[activeStep]?.label}</p>
      </Paper>
      { tutorialSteps(sprites)[activeStep]?.imgPath !== null ?
          <img
            className={classes.img}
            src={tutorialSteps(sprites)[activeStep]?.imgPath}
            alt={tutorialSteps(sprites)[activeStep]?.label}
          />
        : null }
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}