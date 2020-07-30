// @flow
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import styled, { type BareStyledComponent } from 'styled-components';
import { useStyletron } from 'baseui';
import { FormControl } from 'baseui/form-control';
import { Slider } from 'baseui/slider';

// TODO: refine or remove container
const Container: BareStyledComponent = styled.div``;

export default function ModelSlider() {
  // TODO: wire this up
  // const dispatch = useDispatch();
  // const handleChange = value => {
  //   dispatch(setCurrentCity(value.id));
  // };

  const [value, setValue] = useState<number>(0);

  const [css, theme] = useStyletron();

  return (
    <Container>
      <FormControl label={'On- / off-shift charging ratio'}>
        <Slider
          value={[value]}
          min={0}
          max={100}
          step={5}
          onChange={params =>
            Array.isArray(params.value) && setValue(params.value[0])
          }
          overrides={{
            // eslint-disable-next-line react/display-name
            TickBar: () => (
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: theme.sizing.scale600,
                  paddingLeft: theme.sizing.scale600,
                  paddingBottom: theme.sizing.scale400,
                })}
              >
                <div>{'100% off-shift'}</div>
                <div>{'50% / 50%'}</div>
                <div>{'100% on-shift'}</div>
              </div>
            ),
          }}
        />
      </FormControl>
    </Container>
  );
}
