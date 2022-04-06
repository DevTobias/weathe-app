import { useApolloClient } from '@apollo/client';
import PlusIcon from '@heroicons/react/solid/esm/PlusIcon';
import { FunctionComponent } from 'react';
import { ADD_LOCATION_MUTATION } from './AddLocationCard.constants';
import { AddLocationCardProps } from './AddLocationCard.types';
import { useWeather } from '@Context/WeatherContext';
import classNames from '@Utils/classNames';

/**
 * Component to render a card which enables you to add an location
 * to the dashboard.
 *
 * @param className - The class name styles which should get applied to the component.
 */
const AddLocationCard: FunctionComponent<AddLocationCardProps> = ({ className = '' }) => {
  const { dispatch } = useWeather();
  const client = useApolloClient();

  /**
   * Opens an popup where the user can add a new location.
   */
  const addLocation = async () => {
    const { data } = await client.mutate({
      mutation: ADD_LOCATION_MUTATION,
      variables: { locationName: 'Kassel' },
    });

    dispatch({ type: 'add', value: [data.locationAdd.location] });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={addLocation}
      onKeyDown={addLocation}
      className={classNames(
        className,
        'bg-neutral-0 text-neutral-200 py-5 space-y-9 w-[100%] sm:w-[27rem] sm:h-56 shadow-sm rounded-sm flex items-center justify-center cursor-pointer transition-all border-dotted border-2 border-neutral-100 hover:border-teal-400 hover:scale-105',
      )}
    >
      <div className="flex items-center space-x-3 select-none">
        <PlusIcon className="w-6 h-6" />
        <h3 className="text-center text-2xl">Ort hinzufügen</h3>
      </div>
    </div>
  );
};

export default AddLocationCard;
