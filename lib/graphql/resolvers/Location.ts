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
