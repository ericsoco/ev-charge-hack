// @flow
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  type ChargingRawDatum,
  type ChargingDatum,
} from '../state/data-reducer';
import { selectCurrentCity } from '../state/ui-selectors';
import useData, { type Dataset } from '../hooks/use-data';
import useDeriveScale from '../hooks/use-derive-scale';
import Map from './map';

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  max-height: 7rem;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 25rem auto 500px;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.75);
`;
const TitleContainer = styled.div`
  grid-column: 1 / 2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem 0;
`;
const Title = styled.h1`
  display: inline-block;
  color: ${p => p.theme.color};
  ${p => p.theme.mixins.h1};
`;

// TODO: move this into useData
const processChargingData = (
  data: Dataset<ChargingRawDatum> | null
): Dataset<ChargingDatum> | null =>
  data
    ? data.map(d => ({
        hex: d.hex,
        onShift: parseFloat(d.od_kwh),
        atHome: parseFloat(d.home_kwh),
      }))
    : null;

const colorAccessor = (d: ChargingDatum) => d.onShift;
const heightAccessor = (d: ChargingDatum) => d.atHome;

export default function App() {
  const currentCity = useSelector(selectCurrentCity);
  const chargingRawData = useData<ChargingRawDatum>({ city: currentCity });
  const chargingData = useMemo(() => processChargingData(chargingRawData), [
    chargingRawData,
  ]);

  useDeriveScale(chargingData, 'color', colorAccessor);
  useDeriveScale(chargingData, 'height', heightAccessor);

  return (
    <div>
      <Map currentCity={currentCity} chargingData={chargingData} />
      <Overlay>
        <div>
          <TitleContainer>
            <Title>{'EV Charging Demand Model'}</Title>
          </TitleContainer>
        </div>
      </Overlay>
    </div>
  );
}
