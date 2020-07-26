// @flow
import { type RootState } from './root-reducer';

export const selectColorScale = (state: RootState) => state.data.colorScale;

export const selectHeightScale = (state: RootState) => state.data.heightScale;
