// @flow
import React from 'react';
import { useSelector } from 'react-redux';

import {
  colorAccessor,
  heightAccessor,
  processChargingData,
  type ChargingDatum,
} from '../state/data-processors';
import { selectCurrentCity } from '../state/ui-selectors';
import useData from '../hooks/use-data';
import useDeriveScale from '../hooks/use-derive-scale';
import Map from './map';
import Sidebar from './sidebar';
import Legend from './legend';

export default function App() {
  const currentCity = useSelector(selectCurrentCity);
  const chargingData = useData<ChargingDatum>({
    city: currentCity,
    processor: processChargingData,
  });

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
