import { FunctionComponent } from 'react';
import { WeatherCardsProps } from './WeatherCards.types';
import { useWeather } from '@Context/WeatherContext';
import AddLocationCard from '@Elements/AddLocationCard';
import WeatherCard from '@Elements/WeatherCard';
import classNames from '@Utils/classNames';

/**
 * Component to render the weather cards of the weather data
 * context.
 *
 * @param className - The class name styles which should get applied to the component.
 */
const WeatherCards: FunctionComponent<WeatherCardsProps> = ({ className = '' }) => {
  const { state } = useWeather();
  return (
    <div
      className={classNames(className, 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 x gap-6')}
    >
      {state.locations.map(
        ({ location, date, description, icon, probabilityRain, temperature }) => (
          <WeatherCard
            key={location}
            location={location}
            icon={icon}
            date={date}
            temperature={temperature}
            description={description}
            probabilityRain={probabilityRain}
          />
        ),
      )}

      <AddLocationCard />
    </div>
  );
};

export default WeatherCards;
