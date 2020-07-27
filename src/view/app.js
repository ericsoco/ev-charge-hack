// @flow
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  type ChargingRawDatum,
  type ChargingDatum,
} from '../state/data-reducer';
import { selectCurrentCity } from '../state/ui-selectors';
import useData, { type Dataset } from '../hooks/use-data';
import useDeriveScale from '../hooks/use-derive-scale';
import Map from './map';
import Sidebar from './sidebar';
import Legend from './legend';

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
      <Sidebar currentCity={currentCity}></Sidebar>
      <Legend></Legend>
    </div>
  );
}
