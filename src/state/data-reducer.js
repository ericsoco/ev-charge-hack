// @flow
import reduceReducers from 'reduce-reducers';
import { createAction, handleActions } from 'redux-actions';

import { reduceOver } from './utils';
import { type RootState } from './root-reducer';

//
// TODO: this file has not yet been adapted from hospital-trips
//

export type ChargingRawDatum = $ReadOnly<{
  hex: string,
  od_kwh: number,
  home_kwh: number,
}>;
export type ChargingDatum = $ReadOnly<{
  hex: string,
  onShift: number,
  atHome: number,
}>;

export type DataState = $ReadOnly<{|
  colorScale: (number => number) | null,
  sizeScale: (number => number) | null,
|}>;

export const INITIAL_STATE: DataState = {
  colorScale: null,
  sizeScale: null,
};

export const GRID_SIZE_METERS = 1113.2;

export const setColorScale = createAction('SET_COLOR_SCALE');
export const setSizeScale = createAction('SET_SIZE_SCALE');

const reducer = handleActions(
  {
    [setColorScale]: (state, { payload }) => ({
      ...state,
      colorScale: payload,
    }),
    [setSizeScale]: (state, { payload }) => ({
      ...state,
      sizeScale: payload,
    }),
  },
  INITIAL_STATE
);

export default reduceOver<RootState, _>('data')(reduceReducers(null, reducer));
