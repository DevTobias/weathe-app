import PlusIcon from '@heroicons/react/solid/esm/PlusIcon';
import { FunctionComponent } from 'react';
import { AddLocationCardProps } from './AddLocationCard.types';
import classNames from '@Utils/classNames';

/**
 * Component to render a card which enables you to add an location
 * to the dashboard.
 *
 * @param className - The class name styles which should get applied to the component.
 */
const AddLocationCard: FunctionComponent<AddLocationCardProps> = ({ className = '' }) => {
  return (
    <div
      className={classNames(
        className,
        'bg-neutral-0 text-neutral-200 py-5 space-y-9 w-96 h-56 shadow-sm rounded-sm flex items-center justify-center cursor-pointer border-dotted border-2 border-neutral-100',
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
