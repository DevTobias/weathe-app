import React, { FunctionComponent } from 'react';

import styles from './Button.module.scss';
import type { ButtonProps, LabelProps } from './Button.types';
import classNames from '@Utils/classNames';
import createClickAnimation from '@Utils/createClickAnimation';

interface IButtonComposition {
  Label: FunctionComponent<LabelProps>;
}

/**
 * Generates a custom button component.
 *
 * @param type        (button)  The type of the button.
 * @param disabled    (false)   Whether the button should be disabled or not.
 * @param onClick     (null)    The Callback which gets called if the button gets clicked.
 * @param className   ('')      The Styling which should be applied to the component.
 * @param variant     (text)    Defines the style of the button.
 *
 * @example <Button type="submit">...</Button>
 */
const Button: FunctionComponent<ButtonProps> & IButtonComposition = ({
  children,
  disabled = false,
  type = 'button',
  onClick = null,
  className = '',
  variant = 'text',
}) => {
  /**
   * Handles the button click event. It prevents default behavior and runs a
   * ripple animation and the provided on click handler.
   *
   * @param event The fired click event.
   */
  const handleClick = (event: React.MouseEvent) => {
    // event.preventDefault();
    createClickAnimation(
      event,
      styles.ripple,
      `dark:bg-neutral-0/30 ${variant === 'contained' ? 'bg-neutral-0/30' : 'bg-primary-700/30'}`,
    );
    if (onClick) onClick();
  };

  /**
   * Returns the styling of the button based on the variant prop.
   */
  const getVariantClasses = () => {
    switch (variant) {
      case 'contained':
        return 'bg-primary-700/90 dark:bg-primary-600/80 hover:bg-primary-700 dark:hover:bg-primary-600';
      case 'outlined':
        return 'text-neutral-700 border-2 border-primary-400/75 hover:border-primary-700 dark:border-primary-200/75 hover:dark:border-primary-200 hover:bg-primary-700/5 dark:hover:bg-primary-200/5';
      case 'text':
        return 'shadow-none hover:bg-primary-700/25 dark:hover:bg-primary-200/25';
    }
  };

  /**
   * Returns the styling of the button based of the disabled state.
   */
  const getDisabledClasses = () => {
    if (disabled) {
      return 'border-opacity-100 disabled:bg-neutral-100 disabled:border-neutral-150 dark:disabled:bg-neutral-700 dark:disabled:border-neutral-700';
    }

    if (variant === 'contained') return 'border-primary-700/0';

    return '';
  };

  return (
    <button
      className={classNames(
        className,
        'shadow-sm w-full rounded-[0.25rem] py-2 flex border-2 space-x-3 justify-center items-center relative overflow-hidden group transition-colors',
        getVariantClasses(),
        getDisabledClasses(),
      )}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

/**
 * Creates a component to add labels to buttons.

 * @param className   ('')      The Styling which should be applied to the component.
 *
 * @example <Button.Label>Sign in</Button.Label>
 */
const Label: FunctionComponent<LabelProps> = ({ children, className = '', hidden = false }) => {
  return (
    <label
      className={classNames(
        className,
        'text-neutral-0 font-bold body3 group-disabled:text-neutral-600 dark:group-disabled:text-neutral-300 cursor-pointer group-disabled:cursor-default',
        hidden && 'sr-only',
      )}
    >
      {children}
    </label>
  );
};

Button.Label = Label;

export default Button;
