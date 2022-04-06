import { ApolloClient, gql, useApolloClient } from '@apollo/client';
import { createContext, useContext, FunctionComponent, useReducer, useEffect } from 'react';

type Location = {
  locationName: string;
  details: {
    icon: string;
    date: string;
    temperature: string;
    description: string;
    probabilityRain: number;
  };
};

type Action = { type: 'add' | 'set'; value: Location[] };

type Dispatch = (action: Action) => void;

type State = {
  locations: Location[];
};

const WeatherContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

/**
 * The Reducer for the weather context. The following actions can be emitted:
 * - add: Adds an location to the context.
 */
const weatherReducer = ({ locations }: State, { type, value }: Action) => {
  switch (type) {
    case 'set': {
      return { locations: value };
    }
    case 'add': {
      return { locations: [...locations, ...value] };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

const ALL_LOCATIONS_QUERY = gql`
  query Query {
    locations {
      locationName
      details {
        icon
        date
        temperature
        description
        probabilityRain
      }
    }
  }
`;

/**
 * Fetches the initial locations from the graphql api and saves them into context.
 *
 * @param dispatch  The dispatch method for the reducer of the context.
 * @param client    The provided apollo client.
 */
const fetchInitialLocations = async (dispatch: Dispatch, client: ApolloClient<object>) => {
  const { data } = await client.query({
    query: ALL_LOCATIONS_QUERY,
  });

  dispatch({ type: 'set', value: data.locations });
};

/**
 * The Provider for the weather context, which provides an add function and
 * the location values.
 */
export const WeatherProvider: FunctionComponent = ({ children }) => {
  const client = useApolloClient();
  const [state, dispatch] = useReducer(weatherReducer, { locations: [] });

  useEffect(() => {
    fetchInitialLocations(dispatch, client);
  }, [client]);

  return <WeatherContext.Provider value={{ state, dispatch }}>{children}</WeatherContext.Provider>;
};

/**
 * Wraps around the use context hook for the weather context.
 *
 * @throws useWeather must be used within a AuthProvider
 *
 * @returns The current context of the weather state.
 */
export const useWeather = () => {
  const context = useContext(WeatherContext);

  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }

  return context;
};
