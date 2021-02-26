import { FormControlLabel, IconButton, Switch } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { useDispatch } from 'react-redux';
import { switchingFilter } from '../../pages/pokemons/actions';
import './abilityFilter.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  label: {
    fontSize: '1.5rem'
  },
  menuItem: {
    fontSize: '1.5rem',
    textTransform: 'capitalize'
  },
}));


const AbilityFilter = ({ pokemonAbilities, getAllPokemonsPerAbility, getAllPokemonsPerType }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [ability, setAbility] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setAbility(event.target.value);
  };

  const handleSendAbiltySlug = (abilitySlug) => {
    // Needs to handle fetching data from several type of pokemons
    if (abilitySlug && !checked) {
      getAllPokemonsPerAbility(abilitySlug)
    }
  }

  const handleSwitch = () => {
    setChecked(!checked)
    dispatch(switchingFilter(!checked))
  }

  const labelType = checked ? 'Type' : 'Ability' 

  return (
    <div className="ability-filter">
      <h3>{ !checked ? 'Search Pokemons per ability' : 'Search Pokemons per type' }</h3>
      <div className="ability-filter-switch">
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={() => handleSwitch()}
              name="switch"
              color="primary"
            />
          }
          label={labelType}
        />
      </div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label" className={classes.label}>{ !checked ? 'Pokemon Abilities' : 'Pokemon Types' }</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={ability}
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value="">
            <em>{ !checked ? 'Choose an ability' : 'Choose a type' }</em>
          </MenuItem>
          { pokemonAbilities?.map((item, i) => (
              <MenuItem key={i} value={item.name} className={classes.menuItem}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="ability-filter-search">
        <IconButton 
          color="default" 
          aria-label="add an alarm" 
          className={classes.searchIcon}
          onClick={() => handleSendAbiltySlug(ability)}
        >
            <SearchIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}
 
export default AbilityFilter;