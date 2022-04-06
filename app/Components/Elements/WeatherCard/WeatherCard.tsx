/* eslint-disable jsx-a11y/anchor-is-valid */

import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { WeatherCardProps } from './WeatherCard.types';
import classNames from '@Utils/classNames';

/**
 * Component to render a overview of weather data in a specific location.
 *
 * @param className       - The class name styles which should get applied to the component.
 * @param location        - The location the data was taken.
 * @param icon            - A name of an icon which symbolizes the current weather.
 * @param date  	        - The date of the weather data for the location.
 * @param temperature     - A temperature string of the format: x°C / y°C
 * @param probabilityRain - The probability of rain in the location.
 * @param description     - Short description of the current weather.
 */
const WeatherCard: FunctionComponent<WeatherCardProps> = ({
  className = '',
  location,
  icon,
  date,
  temperature,
  description,
  probabilityRain,
}) => {
  return (
    <Link href={`/location/${location.toLowerCase()}`}>
      <a
        className={classNames(
          className,
          'bg-neutral-0 py-5 space-y-9 w-[100%] sm:w-[27rem] h-56 shadow-sm rounded-sm cursor-pointer transition-all  hover:border-2 hover:border-neutral-800 hover:scale-105',
        )}
      >
        <h3 className="text-neutral-700 text-center text-2xl">{location}</h3>

        <div className="grid grid-cols-2 justify-center">
          <div className="flex justify-center items-center">
            <div className="w-2/3 pointer-events-none select-none">
              <Image
                src={`/images/${icon}.png`}
                alt={`${icon} icon`}
                width={1012}
                height={664}
                layout="responsive"
              />
            </div>
          </div>

          <section className="text-neutral-400 space-y-3 pr-5">
            <h4 className="border-b-2 border-b-neutral-100">{date}</h4>
            <div>
              <div>{temperature}</div>
              <div>{description}</div>
              <div>{probabilityRain}% Regen</div>
            </div>
          </section>
        </div>
      </a>
    </Link>
  );
};

export default WeatherCard;
