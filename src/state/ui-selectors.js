// @flow
import { type RootState } from './root-reducer';

export const selectCurrentCity = (state: RootState) => state.ui.currentCity;
