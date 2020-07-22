// @flow
import React, { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { FlyToInterpolator } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import styled from 'styled-components';

import LoadingIcon from './loading-icon';

const performAdditiveBlending = false;
// https://docs.mapbox.com/api/maps/#styles
const basemap = performAdditiveBlending
  ? 'mapbox://styles/mapbox/dark-v10'
  : 'mapbox://styles/mapbox/light-v10';

const StyledContainer = styled.div`
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

export default function Map(props) {
  // eslint-disable-next-line react/prop-types
  const currentCity = props.currentCity || 'SF';
  const [viewState, setViewState] = useState(mapViewState[currentCity]);
  useEffect(() => {
    setViewState(mapViewState[currentCity]);
  }, [currentCity]);

  // TODO: implement / remove as necessary
  const isHovering = false;
  const isLoading = false;

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
      </DeckGL>
      {isLoading && <LoadingIcon withBackground />}
    </StyledContainer>
  );
}
