import axios from 'axios';
import { DateTime } from 'luxon';
import { Context } from '../context';

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
 * Get the details from the open weather api from a provided name.
 *
 * @param name  The name of the location.
 * @returns     The weather details for this location.
 */
export const resolveDetailsFromName = async (name: string) => {
  // Remove umlauts from the name so the request don't get corrupted
  const cleanName = name.toLowerCase().replace('ö', 'oe').replace('ä', 'ae').replace('ü', 'ue');

  const { data } = await axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cleanName}&appid=${process.env.WEATHER_KEY}&units=metric&lang=de`,
  });

  // Parse the data into a valid format
  const { weather, main } = data;
  const date = DateTime.local(DateTime.now()).setZone('UTC').toFormat('EEEE, D');
  const temperature = `${Math.round(main.temp_min)}°C / ${Math.round(main.temp_max)}°C`;

  return {
    icon: weather[0].icon,
    date,
    temperature,
    description: weather[0].description,
    probabilityRain: main.humidity,
  };
};
