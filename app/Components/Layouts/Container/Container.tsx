import { FunctionComponent } from 'react';

import type { ContainerProps } from './Container.types';
import classNames from '@Utils/classNames';

/**
 * Container component with min screen height.
 */
const Container: FunctionComponent<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div
      className={classNames(
        className,
        'bg-neutral-100 text-neutral-900 min-h-innerScreen transition-colors selection:bg-teal-50',
      )}
    >
      <div className="container space-y-5 p-5 mx-auto min-h-innerScreen flex flex-col items-center pt-24">
        {children}
      </div>
    </div>
  );
};

export default Container;
