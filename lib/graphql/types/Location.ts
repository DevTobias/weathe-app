import { extendType, nonNull, objectType } from 'nexus';
import { resolveLocations, resolveDetailsFromName } from '../resolvers/Location';

/**
 * Describes the API Endpoint for details of a specific
 * weather location.
 */
export const LocationDetails = objectType({
  name: 'LocationDetails',
  definition(t) {
    t.string('icon');
    t.string('date');
    t.string('temperature');
    t.string('description');
    t.float('probabilityRain');
  },
});

/**
 * Describes the API Endpoint for location data.
 */
export const Location = objectType({
  name: 'Location',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('locationName');
    t.nonNull.field('details', {
      type: LocationDetails,
      resolve: async ({ locationName }) => resolveDetailsFromName(locationName),
    });
  },
});

/**
 * Describes the API Endpoint which returns the data of all the
 * persisted locations.
 */
export const LocationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('locations', {
      type: nonNull(Location),
      resolve: async (_, __, ctx) => resolveLocations(ctx),
    });
  },
});
