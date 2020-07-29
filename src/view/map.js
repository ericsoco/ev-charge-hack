// @flow
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DeckGL from '@deck.gl/react';
import { AmbientLight, DirectionalLight, LightingEffect } from '@deck.gl/core';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { FlyToInterpolator } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import styled, { type BareStyledComponent } from 'styled-components';

import LoadingIcon from './loading-icon';
import { type Dataset } from '../hooks/use-data';
import {
  colorAccessor,
  heightAccessor,
  type ChargingDatum,
} from '../state/data-processors';
import { selectColorScale, selectHeightScale } from '../state/data-selectors';
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

const Tooltip = styled.div`
  position: absolute;
  z-index: 1;
  width: 16rem;
  height: auto;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  padding: 1rem;
  background-color: #ffffff;
  color: #000000;
  pointer-events: none;
`;
// const TooltipTitle = styled.h2`
//   font-size: 1rem;
//   margin-bottom: 0.5rem;
// `;
const TooltipBody = styled.div`
  font-size: 1rem;
`;

function renderHexTooltip(hoverInfo) {
  if (!hoverInfo || !hoverInfo.picked || !hoverInfo.object) {
    return null;
  }
  const { object, x, y } = hoverInfo;
  return (
    <Tooltip left={x + 16} top={y + 16}>
      <TooltipBody>
        <ul>
          <li>{`KwH demand: ${colorAccessor(object)}`}</li>
          <li>{`# chargers: ${heightAccessor(object)}`}</li>
        </ul>
      </TooltipBody>
    </Tooltip>
  );
}

const commonViewState = {
  pitch: 0,
  bearing: 0,
  transitionDuration: 3000,
  transitionInterpolator: new FlyToInterpolator(),
};

// TODO: prune for EV Charging-relevant cities
const mapViewState = {
  LON: {
    longitude: -0.2,
    latitude: 51.5,
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

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 0.6,
});
const afternoonLight = new DirectionalLight({
  color: [255, 255, 255],
  intensity: 0.9,
  direction: [-300, -90, -500],
});
const lightingEffect = new LightingEffect({ ambientLight, afternoonLight });
const hexMaterial = {
  ambient: 0.85,
  diffuse: 0.5,
  shininess: 32,
  specularColor: [30, 30, 30],
};

const is3d = true;

const RGB_REGEX = /rgb\((.*)\)/;
function rgbToArray(rgbStr) {
  const match = (rgbStr || '').match(RGB_REGEX);
  return match && match[1]
    ? match[1].split(',').map(d => parseInt(d.trim()))
    : [0, 0, 0, 0];
}

type Props = $ReadOnly<{|
  currentCity: City,
  chargingData: Dataset<ChargingDatum> | null,
|}>;
export default function Map({ currentCity, chargingData }: Props) {
  const [viewState, setViewState] = useState(mapViewState[currentCity]);
  useEffect(() => {
    setViewState(mapViewState[currentCity]);
  }, [currentCity]);

  const [hoverInfo, setHoverInfo] = useState(null);

  const colorScale = useSelector(selectColorScale);
  const heightScale = useSelector(selectHeightScale);

  // TODO: implement / remove as necessary
  const isHovering = hoverInfo && hoverInfo.picked;
  const isLoading = !chargingData;

  return (
    <StyledContainer>
      <DeckGL
        controller={true}
        effects={is3d ? [lightingEffect] : undefined}
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
        {colorScale && heightScale && (
          <H3HexagonLayer
            id={'h3-hexagon-layer'}
            data={chargingData}
            pickable={true}
            onHover={setHoverInfo}
            coverage={0.9}
            wireframe={false}
            filled={true}
            extruded={is3d}
            elevationScale={20}
            getHexagon={d => d.hex}
            getFillColor={d => rgbToArray(colorScale(d))}
            getElevation={is3d ? d => heightScale(d) : undefined}
            material={is3d ? hexMaterial : undefined}
          />
        )}
        {renderHexTooltip(hoverInfo)}
      </DeckGL>
      {isLoading && <LoadingIcon withBackground />}
    </StyledContainer>
  );
}
