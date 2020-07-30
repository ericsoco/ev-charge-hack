// @flow
import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { type BareStyledComponent } from 'styled-components';
import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';

import { CITIES, setCurrentCity, type City } from '../state/ui-reducer';

// TODO: refine or remove container
const Container: BareStyledComponent = styled.div``;

const cityOptions = Object.entries(CITIES).map(([id, label]) => ({
  id,
  label,
}));
function toSelectValue(
  city: City
): $ReadOnlyArray<{| id: string, label: string |}> {
  return CITIES[city] ? [{ id: city, label: CITIES[city] }] : [];
}

type Props = $ReadOnly<{|
  currentCity: City,
|}>;
export default function CitySelector({ currentCity }: Props) {
  const dispatch = useDispatch();

  const handleChange = value => {
    dispatch(setCurrentCity(value.id));
  };

  return (
    <Container>
      <FormControl label={'City'}>
        <Select
          options={cityOptions}
          value={toSelectValue(currentCity)}
          clearable={false}
          onChange={params => handleChange(params.value[0])}
        />
      </FormControl>
    </Container>
  );
}
