import { createContext, useContext, FunctionComponent, useReducer } from 'react';

type Location = {
  location: string;
  icon: string;
  date: string;
  temperature: string;
  description: string;
  probabilityRain: number;
};

type Action = { type: 'add'; value: Location };

type Dispatch = (action: Action) => void;

type State = {
  locations: Location[];
};

const WeatherContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

/**
 * The Reducer for the weather context. The following actions can be emitted:
 * - add: Adds an location to the context.
 */
const weatherReducer = (state: State, action: Action) => {
  switch (action.type) {
    // TODO: ADD FUNCTIONALITY
    case 'add': {
      return { locations: state.locations };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

/**
 * The Provider for the weather context, which provides an add function and
 * the location values.
 */
export const WeatherProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, { locations: [] });
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
