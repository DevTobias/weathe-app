/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { DateTime } from 'luxon';
import { Context } from '../context';
// import redis from '@Lib/redis';

/**
 * Get all locations which are currently persisted.
 *
 * @param prisma    The prisma connection client.
 *
 * @returns An array of locations.
 */
export const resolveLocations = async ({ prisma }: Context) => {
  return prisma.locations.findMany({
    orderBy: [{ locationName: 'desc' }],
  });
};

/**
 * Maps the open weather icon name to a more specific one used by the frontend.
 *
 * @param icon The open weather icon key.
 * @returns    The mapped icon name (same name as image in public folder).
 */
const mapWeatherIcon = (icon: string) => {
  switch (icon) {
    case '01d':
      return 'clear-day';
    case '01n':
      return 'clear-night';
    case '02d':
      return 'partly-cloudy-day';
    case '02n':
      return 'partly-cloudy-night';
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return 'cloudy';
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return 'rain';
    case '11d':
    case '11n':
      return 'thunderstorm';
    case '13d':
    case '13n':
      return 'snow';
    case '50d':
    case '50n':
      return 'fog';
    default:
      return 'clear-day';
  }
};

/**
 * Get the details from the open weather api from a provided name.
 *
 * @param name  The name of the location.
 * @returns     The weather details for this location.
 */
export const resolveDetailsFromName = async (name: string) => {
  // Remove umlauts from the name so the request don't get corrupted
  const cleanName = name.toLowerCase().replace('ö', 'oe').replace('ä', 'ae').replace('ü', 'ue');

  // const cache = await redis.get(`details-${cleanName}`);

  //if (cache) {
  //  return JSON.parse(cache);
  //}

  const { data } = await axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cleanName}&appid=${process.env.WEATHER_KEY}&units=metric&lang=de`,
  });

  // Parse the data into a valid format
  const { weather, main, wind } = data;
  const date = DateTime.local(DateTime.now()).setZone('UTC').toFormat('EEEE, D');
  const temperature = `${Math.round(main.temp_min)}°C / ${Math.round(main.temp_max)}°C`;

  const result = {
    icon: mapWeatherIcon(weather[0].icon),
    date,
    temperature,
    description: weather[0].description,
    probabilityRain: main.humidity,
    windSpeed: wind.speed,
    currentTemperature: main.temp,
  };

  //redis.set(`details-${cleanName}`, JSON.stringify(result));

  return result;
};

export const resolveForecastByName = async (name: string) => {
  // Remove umlauts from the name so the request don't get corrupted
  const cleanName = name.toLowerCase().replace('ö', 'oe').replace('ä', 'ae').replace('ü', 'ue');

  // const cache = await redis.get(`forecast-${cleanName}`);

  //if (cache) {
  //  return JSON.parse(cache);
  //}

  const { data: geoData } = await axios({
    method: 'get',
    url: `http://api.openweathermap.org/geo/1.0/direct?q=${cleanName}&appid=${process.env.WEATHER_KEY}`,
  });

  const { lat, lon } = geoData[0];

  const { data: foreCast } = await axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&excludecurrent,minutely,daily,alerts&appid=${process.env.WEATHER_KEY}`,
  });

  const hourly = foreCast.hourly.map((location: any, index: number) => {
    if (index % 3 != 0) {
      return null;
    }

    return {
      time: DateTime.fromSeconds(location.dt).toFormat('T'),
      icon: mapWeatherIcon(location.weather.icon),
      temperature: Math.round(location.temp),
      probabilityRain: location.humidity,
    };
  });

  const filtered = hourly.filter((hour: any) => hour !== null);

  //redis.set(`forecast-${cleanName}`, JSON.stringify(result));

  return filtered;
};

/**
 * Adds the location with the provided name to the database.
 *
 * Following errors can happen:
 * - InvalidLocationError    - If the location already exists in database.
 *
 * @param locationName The name of the location which should get added.
 * @param prisma       The prisma connection client.
 * @returns            The created location entity.
 */
export const resolveAddLocation = async (locationName: string, { prisma }: Context) => {
  try {
    const location = await prisma.locations.create({ data: { locationName } });
    return { errors: [], location };
  } catch (_) {
    return { errors: [{ message: 'location already exists' }], location: null };
  }
};
