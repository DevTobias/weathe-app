import { FunctionComponent } from 'react';
import { PopupWindowProps } from './PopupWindow.types';
import classNames from '@Utils/classNames';

const PopupWindow: FunctionComponent<PopupWindowProps> = ({
  className = '',
  isActive = false,
  children,
}) => {
  if (isActive) {
    return (
      <div
        className={classNames(
          className,
          'bg-slate-800/40 absolute w-full h-screen top-0 left-0 z-30',
        )}
        style={{ margin: 0 }}
      >
        <div className="w-full h-screen flex justify-center items-center">{children}</div>
      </div>
    );
  }

  return null;
};

export default PopupWindow;
