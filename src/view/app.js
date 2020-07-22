import React from 'react';
import styled from 'styled-components';

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

export default function App() {
  return (
    <div>
      <Map />
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
