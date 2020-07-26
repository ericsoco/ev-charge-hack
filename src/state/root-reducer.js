// @flow
import reduceReducers from 'reduce-reducers';

import data, {
  INITIAL_STATE as dataState,
  type DataState,
} from './data-reducer';
import ui, { INITIAL_STATE as uiState, type UIState } from './ui-reducer';

export type RootState = $ReadOnly<{|
  data: DataState,
  ui: UIState,
|}>;

export const ROOT_STATE: RootState = {
  data: dataState,
  ui: uiState,
};

export default reduceReducers(null, data, ui);
