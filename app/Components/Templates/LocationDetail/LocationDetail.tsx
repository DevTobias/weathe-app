/* eslint-disable jsx-a11y/anchor-is-valid */

import { useQuery } from '@apollo/client';
import ChevronLeftIcon from '@heroicons/react/solid/esm/ChevronLeftIcon';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { LOCATION_DETAIL_QUERY } from './LocationDetail.constants';
import { LocationDetailProps, LocationDetailQuery } from './LocationDetail.types';
import Button from '@Elements/Button';
import Container from '@Layouts/Container';
import Navbar from '@Modules/Navbar';

/**
 * Simple Navbar component to render a page title.
 */
const LocationDetail: FunctionComponent<LocationDetailProps> = ({ locationName }) => {
  const { data } = useQuery<LocationDetailQuery>(LOCATION_DETAIL_QUERY, {
    variables: { locationName },
  });

  if (!data) return null;

  const { currentTemperature, date, description, icon, probabilityRain, windSpeed } = data.location;

  return (
    <>
      <Navbar />
      <Container className="justify-start">
        <div className="space-y-7 w-full">
          <h1 className="text-neutral-200 text-xl">Dashboard / Detailansicht</h1>

          <div className="w-full bg-white p-6 rounded-sm shadow-sm space-y-2">
            <h2 className="text-neutral-700 text-2xl">
              {locationName[0].toUpperCase() + locationName.slice(1)}
            </h2>

            <div className="text-neutral-400 flex justify-between w-2/3">
              <div>
                <div>{date}</div>
                <div>{description}</div>
              </div>
              <div>
                <div>Niederschlag: {probabilityRain}%</div>
                <div>Luftfeuchte: {probabilityRain}%</div>
                <div>Wind: {windSpeed} km/h</div>
              </div>
            </div>

            <div className="flex justify-start items-center">
              <div className="w-48 pointer-events-none select-none">
                <Image
                  src={`/images/${icon}.png`}
                  alt={`${icon} icon`}
                  width={1012}
                  height={664}
                  layout="responsive"
                />
              </div>
              <h3 className="text-4xl text-neutral-700 font-bold">{currentTemperature} °C</h3>
            </div>
          </div>

          <Link href="/">
            <a>
              <div className="w-40 mt-7">
                <Button type="submit" variant="contained">
                  <ChevronLeftIcon className="w-7 h-7 text-neutral-0" />
                  <Button.Label>Dashboard</Button.Label>
                </Button>
              </div>
            </a>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default LocationDetail;
