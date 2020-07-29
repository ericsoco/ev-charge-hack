// @flow
import { useEffect, useState } from 'react';
import { csv, json } from 'd3-fetch';

import { type City } from '../state/ui-reducer';

// $FlowFixMe -- Flow doesn't know about Parcel's tilde resolver
import chargingFileLON from 'url:~/static/data/LON-sample.csv';

// NOTE: temp until endpoint is working
const tripsFiles = {
  LON: chargingFileLON,
  LA: chargingFileLON,
  NYC: chargingFileLON,
  SEA: chargingFileLON,
  SF: chargingFileLON,
};

const FILE_EXT_REGEX = /\.([0-9a-z]+)$/i;

export type Dataset<T: Object> = $ReadOnlyArray<T>;

export default function useData<T>({
  city = null,
  url = null,
  processor = identityProcessor,
}: {
  city?: City,
  url?: string,
  processor?: Object => Dataset<T>,
}): Dataset<T> | null {
  const file = url || (city ? tripsFiles[city] : null);
  if (!file) {
    throw new Error(
      `Cannot load file for params: ${JSON.stringify({ city, url })}`
    );
  }
  const [data, setData] = useState<Dataset<T> | null>(null);
  const match = file.match(FILE_EXT_REGEX);
  const extension = match ? match[1] : null;

  useEffect(() => {
    if (extension) {
      // eslint-disable-next-line no-inner-declarations
      async function fetch() {
        try {
          let response = null;
          switch (extension) {
            case 'csv':
              response = await csv(file);
              break;
            case 'json':
              response = await json(file);
              break;
            default:
              return;
          }
          setData(processor(response));
        } catch (error) {
          console.error(error);
        }
      }

      fetch();
    }
  }, [file, extension, processor]);

  return data;
}

const identityProcessor = d => d;
