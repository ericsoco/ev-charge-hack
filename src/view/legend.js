// @flow
import React from 'react';
import styled, { type BareStyledComponent } from 'styled-components';

const Container: BareStyledComponent = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20rem;
  height: 7rem;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 1rem;
  padding: 1.5rem;
  display: flex;
`;

type Props = $ReadOnly<{||}>;

// eslint-disable-next-line no-empty-pattern
export default function Legend({}: Props) {
  return <Container></Container>;
}
