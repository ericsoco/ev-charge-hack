// @flow
import React, { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { FlyToInterpolator } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import styled, { type BareStyledComponent } from 'styled-components';

import LoadingIcon from './loading-icon';
import { type Dataset } from '../hooks/use-data';
import { type ChargingDatum } from '../state/data-reducer';
import { type City } from '../state/ui-reducer';

const performAdditiveBlending = false;
// https://docs.mapbox.com/api/maps/#styles
const basemap = performAdditiveBlending
  ? 'mapbox://styles/mapbox/dark-v10'
  : 'mapbox://styles/mapbox/light-v10';

const StyledContainer: BareStyledComponent = styled.div`
  canvas {
    mix-blend-mode: multiply;
  }
`;

const commonViewState = {
  pitch: 0,
  bearing: 0,
  transitionDuration: 3000,
  transitionInterpolator: new FlyToInterpolator(),
};
const mapViewState = {
  LON: {
    longitude: 0.1278,
    latitude: 51.5074,
    zoom: 9,
  },
  CHI: {
    longitude: -87.8,
    latitude: 41.85,
    zoom: 11,
    ...commonViewState,
  },
  DEN: {
    longitude: -104.98,
    latitude: 39.74,
    zoom: 11,
    ...commonViewState,
  },
  DET: {
    longitude: -83.12,
    latitude: 42.36,
    zoom: 11,
    ...commonViewState,
  },
  LA: {
    longitude: -118.36,
    latitude: 34.0,
    zoom: 10.1,
    ...commonViewState,
  },
  MIA: {
    longitude: -80.26,
    latitude: 25.83,
    zoom: 11,
    ...commonViewState,
  },
  NOLA: {
    longitude: -90.1,
    latitude: 29.96,
    zoom: 11.5,
    ...commonViewState,
  },
  NYC: {
    longitude: -74.0,
    latitude: 40.7,
    zoom: 10,
    ...commonViewState,
  },
  SEA: {
    longitude: -122.38,
    latitude: 47.6,
    zoom: 10.5,
    ...commonViewState,
  },
  SF: {
    longitude: -122.45,
    latitude: 37.75,
    zoom: 10.5,
    ...commonViewState,
  },
};

type Props = $ReadOnly<{|
  currentCity: City,
  chargingData: Dataset<ChargingDatum> | null,
|}>;
export default function Map({ currentCity, chargingData }: Props) {
  const [viewState, setViewState] = useState(mapViewState[currentCity]);
  useEffect(() => {
    setViewState(mapViewState[currentCity]);
  }, [currentCity]);

  // TODO: implement / remove as necessary
  const isHovering = false;
  const isLoading = !chargingData;

  return (
    <StyledContainer>
      <DeckGL
        controller={true}
        getCursor={({ isDragging }) =>
          isHovering ? 'pointer' : isDragging ? 'grabbing' : 'grab'
        }
        viewState={viewState}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
      >
        <StaticMap
          mapboxApiAccessToken={process.env.MapboxAccessToken}
          mapStyle={basemap}
        />
        <H3HexagonLayer
          id={'h3-hexagon-layer'}
          data={chargingData}
          // pickable={true}
          coverage={0.9}
          wireframe={false}
          filled={true}
          extruded={true}
          elevationScale={20}
          getHexagon={d => d.hex}
          getFillColor={d => [255, d.onShift * 255, 0]}
          getElevation={d => d.atHome * 100}
        />
      </DeckGL>
      {isLoading && <LoadingIcon withBackground />}
    </StyledContainer>
  );
}
