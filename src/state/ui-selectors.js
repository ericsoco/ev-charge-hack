// @flow
import { type RootState } from './root-reducer';

export function selectCurrentCity() {
  return (state: RootState) => state.ui.currentCity;
}
