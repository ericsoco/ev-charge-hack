// @flow
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { quantile } from 'd3-array';
import { scalePow, scaleSequential } from 'd3-scale';
import { interpolateOrRd } from 'd3-scale-chromatic';

import { setColorScale, setHeightScale } from '../state/data-reducer';
import { type Dataset } from './use-data';

// TODO: type d3 scales and use as return type here
// TODO: move column-specific logic to data-processors
type ScaleType = 'color' | 'height';
function deriveScale<T>(
  dataset: Dataset<T>,
  scaleType: ScaleType,
  accessor: T => number
) {
  switch (scaleType) {
    case 'color': {
      const p90 = quantile(dataset, 0.9, accessor);
      return scaleSequential()
        .domain([0, p90])
        .interpolator(interpolateOrRd);
    }
    case 'height': {
      // TODO: bucket into quantiles / use band scale?
      // there are typically many zeroes; filter out to avoid scale skew
      const nonZeros = dataset.filter(d => accessor(d) > 0);
      const pBottom = quantile(nonZeros, 0.1, accessor);
      const pTop = quantile(nonZeros, 0.99, accessor);
      // const extents = extent(nonZeros, accessor);
      return scalePow()
        .domain([pBottom, pTop])
        .range([10, 500])
        .exponent(0.5)
        .clamp(true);
    }
    default:
      return null;
  }
}

export default function useDeriveScale<T>(
  dataset: Dataset<T> | null,
  scaleType: ScaleType,
  accessor: T => number
) {
  const dispatch = useDispatch();
  const setScale =
    scaleType === 'color'
      ? setColorScale
      : scaleType === 'height'
      ? setHeightScale
      : null;

  useEffect(() => {
    if (dataset && setScale) {
      const scale = deriveScale(dataset, scaleType, accessor);
      if (scale) {
        dispatch(setScale(d => scale(accessor(d))));
      }
    }
  }, [scaleType, setScale, dispatch, dataset, accessor]);
}
