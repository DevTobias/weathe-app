import CloudIcon from '@heroicons/react/solid/esm/CloudIcon';
import { FunctionComponent } from 'react';
import { NavbarProps } from './Navbar.types';
import classNames from '@Utils/classNames';

const Navbar: FunctionComponent<NavbarProps> = ({ className = '' }) => {
  return (
    <nav
      className={classNames(
        className,
        'bg-neutral-900 text-neutral-0 fixed h-16  w-full flex items-center px-4 lg:px-16 space-x-4',
      )}
    >
      <CloudIcon className="hidden sm:block w-10 h-10 " />
      <h1 className="text-base lg:text-lg">Wetter Online</h1>
    </nav>
  );
};

export default Navbar;
