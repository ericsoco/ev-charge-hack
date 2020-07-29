// @flow
import { type Dataset } from '../hooks/use-data';

export type ChargingRawDatum = $ReadOnly<{
  hex: string,
  od_kwh: number,
  home_kwh: number,
  fast_chargers_100: number,
  ov_chargers: number,
}>;
export type ChargingDatum = $ReadOnly<{
  hex: string,
  onShiftDemand: number,
  offShiftDemand: number,
  onShiftChargers: number,
  offShiftChargers: number,
}>;

export const processChargingData = (
  data: Dataset<ChargingRawDatum>
): Dataset<ChargingDatum> =>
  data.map(d => ({
    hex: d.hex,
    onShiftDemand: parseFloat(d.od_kwh),
    offShiftDemand: parseFloat(d.home_kwh),
    onShiftChargers: Math.round(d.fast_chargers_100),
    offShiftChargers: Math.round(d.ov_chargers),
  }));

// on-shift
// export const colorAccessor = (d: ChargingDatum) => d.onShiftDemand;
// export const heightAccessor = (d: ChargingDatum) => d.onShiftChargers;

// off-shift
export const colorAccessor = (d: ChargingDatum) => d.offShiftDemand;
export const heightAccessor = (d: ChargingDatum) => d.offShiftChargers;
