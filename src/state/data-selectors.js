// @flow
import { type RootState } from './root-reducer';

export function selectColorScale() {
  return (state: RootState) => state.data.colorScale;
}

export function selectSizeScale() {
  return (state: RootState) => state.data.sizeScale;
}
