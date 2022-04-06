import Image from 'next/image';
import { FunctionComponent } from 'react';
import { AddLocationCardProps } from './AddLocationCard.types';
import classNames from '@Utils/classNames';

const Navbar: FunctionComponent<AddLocationCardProps> = ({ className = '' }) => {
  return (
    <div className={classNames(className, 'bg-neutral-0 py-5 space-y-9 w-96 shadow-sm rounded-sm')}>
      <h3 className="text-neutral-700 text-center text-2xl">{location}</h3>

      <div className="grid grid-cols-2 justify-center">
        <div className="flex justify-center items-center">
          <div className="w-2/3">
            <Image
              src={`/images/${icon}.png`}
              alt={`${icon} icon`}
              width={1012}
              height={664}
              layout="responsive"
            />
          </div>
        </div>

        <section className="text-neutral-400 space-y-3 pr-5">
          <h4 className="border-b-2 border-b-neutral-100">{date}</h4>
          <div>
            <div>{temperature}</div>
            <div>{description}</div>
            <div>{probabilityRain}% Regen</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
