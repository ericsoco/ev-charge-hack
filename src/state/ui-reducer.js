// @flow
import reduceReducers from 'reduce-reducers';
import { createAction, handleActions } from 'redux-actions';

import { reduceOver } from './utils';
import { type RootState } from './root-reducer';

// TODO: prune per this project
export const CITIES = Object.freeze({
  LON: 'LON', // city_id: 18
  // CHI: 'CHI', // city_id: 7
  // DEN: 'DEN', // city_id: 24
  // DET: 'DET', // city_id: 50
  // LA: 'LA', // city_id: 12
  // MIA: 'MIA', // city_id: 14
  // NOLA: 'NOLA', // city_id: 190
  // NYC: 'NYC', // city_id: 5
  // SEA: 'SEA', // city_id: 10
  // SF: 'SF', // city_id: 1
});
export type City = $Keys<typeof CITIES>;
const DEFAULT_CITY = 'LON';

export type UIState = $ReadOnly<{|
  currentCity: City,
|}>;

export const INITIAL_STATE: UIState = {
  currentCity: DEFAULT_CITY,
};

export const setCurrentCity = createAction('SET_CURRENT_CITY');

const reducer = handleActions(
  {
    [setCurrentCity]: (state, { payload }) => ({
      ...state,
      currentCity: payload,
    }),
  },
  INITIAL_STATE
);

export default reduceOver<RootState, _>('ui')(reduceReducers(null, reducer));
