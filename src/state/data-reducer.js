// @flow
import reduceReducers from 'reduce-reducers';
import { createAction, handleActions } from 'redux-actions';

import { reduceOver } from './utils';
import { type RootState } from './root-reducer';

export type ChargingRawDatum = $ReadOnly<{
  hex: string,
  od_kwh: string,
  home_kwh: string,
}>;
export type ChargingDatum = $ReadOnly<{
  hex: string,
  onShift: number,
  atHome: number,
}>;

export type DataState = $ReadOnly<{|
  colorScale: (ChargingDatum => string) | null,
  heightScale: (ChargingDatum => number) | null,
|}>;

export const INITIAL_STATE: DataState = {
  colorScale: null,
  heightScale: null,
};

export const setColorScale = createAction('SET_COLOR_SCALE');
export const setHeightScale = createAction('SET_HEIGHT_SCALE');

const reducer = handleActions(
  {
    [setColorScale]: (state, { payload }) => ({
      ...state,
      colorScale: payload,
    }),
    [setHeightScale]: (state, { payload }) => ({
      ...state,
      heightScale: payload,
    }),
  },
  INITIAL_STATE
);

export default reduceOver<RootState, _>('data')(reduceReducers(null, reducer));
