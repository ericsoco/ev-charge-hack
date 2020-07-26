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

// TODO: remove this and use something like useDeriveScales from hospital-trips
const processChargingData = (
  data: Dataset<ChargingRawDatum> | null
): Dataset<ChargingDatum> =>
  (data || []).map(d => ({
    hex: d.hex,
    onShift: d.od_kwh / 100,
    atHome: d.home_kwh / 100,
  }));

export default function App() {
  const currentCity = useSelector(selectCurrentCity());
  const chargingRawData = useData<ChargingRawDatum>({ city: currentCity });
  const chargingData = useMemo(() => processChargingData(chargingRawData), [
    chargingRawData,
  ]);

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
