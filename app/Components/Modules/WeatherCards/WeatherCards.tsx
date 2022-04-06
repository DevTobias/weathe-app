import { FunctionComponent } from 'react';
import { WeatherCardsProps } from './WeatherCards.types';
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
  return (
    <div
      className={classNames(className, 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 x gap-6')}
    >
      <WeatherCard
        location="Darmstadt"
        icon="cloudy"
        date="Montag, 01.10.18"
        temperature="4°C / 14°C"
        description="Bewölkt"
        probabilityRain={20}
      />
      <WeatherCard
        location="Darmstadt"
        icon="cloudy"
        date="Montag, 01.10.18"
        temperature="4°C / 14°C"
        description="Bewölkt"
        probabilityRain={20}
      />
      <AddLocationCard />
    </div>
  );
};

export default WeatherCards;
