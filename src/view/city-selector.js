// @flow
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styled, { type BareStyledComponent } from 'styled-components';

import { CITIES, setCurrentCity, type City } from '../state/ui-reducer';

const Container: BareStyledComponent = styled.div`
  display: inline-block;
`;

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: '8rem',
  },
  select: {
    fontSize: '2rem',
    fontFamily: '"Lato", sans-serif',
    outline: 'none',
  },
}));

type Props = $ReadOnly<{|
  currentCity: City,
|}>;
export default function CitySelector({ currentCity }: Props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleChange = event => {
    dispatch(setCurrentCity(event.target.value));
  };

  return (
    <Container>
      <FormControl className={classes.formControl}>
        <Select
          className={classes.select}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={currentCity}
          onChange={handleChange}
        >
          {Object.entries(CITIES).map(([code, name]) => (
            <MenuItem key={code} value={code}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
}
