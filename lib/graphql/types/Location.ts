import { extendType, list, nonNull, objectType, stringArg } from 'nexus';
import {
  resolveLocations,
  resolveDetailsFromName,
  resolveAddLocation,
  resolveForecastByName,
} from '../resolvers/Location';
import { Error } from './Error';

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
    t.float('windSpeed');
    t.string('currentTemperature');
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

/**
 * Describes the API Endpoint which returns the details of the location
 * with the provided name.
 */
export const LocationDetailQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('location', {
      type: nonNull(LocationDetails),
      args: {
        locationName: nonNull(stringArg()),
      },
      resolve: async (_, { locationName }) => resolveDetailsFromName(locationName),
    });
  },
});

const LocationForecastPayload = objectType({
  name: 'LocationForecastPayload',
  definition(t) {
    t.string('time');
    t.string('icon');
    t.string('temperature');
    t.string('probabilityRain');
  },
});

export const LocationHourlyForecastQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('locationForecast', {
      type: nonNull(list(LocationForecastPayload)),
      args: {
        locationName: nonNull(stringArg()),
      },
      resolve: async (_, { locationName }) => resolveForecastByName(locationName),
    });
  },
});

/**
 * Describes the result of the add location functions. If an location got created,
 * the mutation returns the created object. If not, the location field will be null
 * and an error will be listed in the errors field.
 */
const AddLocationPayload = objectType({
  name: 'AddLocationPayload',
  definition(t) {
    t.field('location', {
      type: Location,
    });
    t.nonNull.list.field('errors', { type: nonNull(Error) });
  },
});

/**
 * Describes the API Endpoint which adds an location to the
 * database.
 */
export const AddLocationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('locationAdd', {
      type: AddLocationPayload,
      args: {
        locationName: nonNull(stringArg()),
      },
      resolve: async (_, { locationName }, ctx) => resolveAddLocation(locationName, ctx),
    });
  },
});
