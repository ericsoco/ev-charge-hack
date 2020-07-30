// @flow
import React from 'react';
// import { useDispatch } from 'react-redux';
import styled, { type BareStyledComponent } from 'styled-components';
import { DownloadOutlined } from '@uber/icons';

import { type City } from '../state/ui-reducer';
import CitySelector from './city-selector';
import ModelSlider from './model-slider';

const Container: BareStyledComponent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 25rem;
  height: calc(100% - 2 * 1rem);
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 16rem;
  flex-grow: 0;
  padding: 1.5rem;
  background-color: rgba(246, 246, 246, 0.9);
`;

const Title = styled.h2`
  display: inline-block;
  color: ${p => p.theme.color};
  ${p => p.theme.mixins.h2};
  margin-bottom: 3rem;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: auto;
  flex-grow: 1;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.9);
`;

const BottomButton = styled.button`
  width: 100%;
  height: 3.5rem;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  color: #ffffff;
`;

type Props = $ReadOnly<{|
  currentCity: City,
|}>;

// eslint-disable-next-line no-empty-pattern
export default function Sidebar({ currentCity }: Props) {
  // TODO: implement slider handlers
  // const dispatch = useDispatch();
  // const onOffShiftChange = () => {};

  return (
    <Container>
      <TopContainer>
        <Title>{'EV Charging Demand Model'}</Title>
        <CitySelector currentCity={currentCity} />
      </TopContainer>
      <BottomContainer>
        <ModelSlider />
      </BottomContainer>
      <BottomButton>
        <DownloadOutlined size={'1.25rem'} />
        <span style={{ marginLeft: '1rem' }}>{'Download data'}</span>
      </BottomButton>
    </Container>
  );
}
