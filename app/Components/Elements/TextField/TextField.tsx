import KeyIcon from '@heroicons/react/solid/esm/KeyIcon';
import MailIcon from '@heroicons/react/solid/esm/MailIcon';
import SearchIcon from '@heroicons/react/solid/esm/SearchIcon';

import { FunctionComponent } from 'react';
import { InputFieldProvider, useInputField } from './InputField.context';
import styles from './TextField.module.scss';
import type { InputFieldProps, InputProps, LabelProps, IconProps } from './TextField.types';
import classNames from '@Utils/classNames';

interface IInputComposition {
  Label: FunctionComponent<LabelProps>;
  Input: FunctionComponent<InputProps>;
  Icon: FunctionComponent<IconProps>;
}

/**
 * Generates input field to provide user input.
 *
 * @param className   ('')      The Styling which should be applied to the component.
 * @param disabled    (false)   Whether the input field should be disabled or not.
 * @param errorMsg    ('')      The displayed error message. No error with empty string.
 * @param title       ('')      The title of the input field.
 *
 * @example <InputField title="Password" />
 */
const InputField: FunctionComponent<InputFieldProps> & IInputComposition = ({
  children,
  className = '',
  disabled = false,
  errorMsg = '',
  title = '',
}) => {
  /**
   * Returns the styling of the button based on the error and disabled state.
   */
  const getBorderStyles = () => {
    if (errorMsg) return 'border-danger-700 dark:border-danger-500';
    if (disabled) return 'border-neutral-200 dark:border-neutral-700';
    return 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 focus-within:border-primary-600 focus-within:hover:border-primary-600 dark:hover:border-neutral-600 dark:focus-within:border-primary-200 dark:focus-within:hover:border-primary-200';
  };

  /**
   * Returns the styling of the button based on the disabled state.
   */
  const getDisabledStyles = () => {
    return disabled && 'dark:bg-neutral-700 bg-neutral-150';
  };

  return (
    <InputFieldProvider disabled={disabled} errorMsg={errorMsg} title={title}>
      <div className={classNames(className, 'space-y-1')}>
        <label
          aria-label={title}
          className={classNames(
            'text-neutral-800 dark:text-neutral-100 body3 font-medium border-2 rounded-md p-3 flex items-center transition-colors relative',
            className,
            getBorderStyles(),
            getDisabledStyles(),
          )}
        >
          {children}
        </label>
        <span
          className={classNames(
            !errorMsg && 'hidden',
            'text-danger-700 dark:text-danger-500 body4 inline-block',
          )}
          aria-hidden={!errorMsg}
          aria-errormessage={errorMsg}
        >
          {errorMsg}
        </span>
      </div>
    </InputFieldProvider>
  );
};

/**
 * Generates the input field component.
 *
 * @param className   ('')      The Styling which should be applied to the component.
 * @param readonly    (false)   If the text field should be read only or not.
 * @param required    (true)    If the text field should be required or not.
 * @param onChange    (null)    Called with string if the value in field changed.
 * @param type        ('text)   The type of the input field.
 * @param value       ('')      The value inside the field.
 *
 * @example <InputField.Input type="password" value={password} onChange={setPassword} />
 */
const Input: FunctionComponent<InputProps> = ({
  className = '',
  readonly = false,
  type = 'text',
  onChange = () => {},
  required = false,
  value = '',
}) => {
  const { disabled, errorMsg, passwordVisible } = useInputField();

  const getInputType = () => {
    if (type !== 'password') return type;
    return passwordVisible ? 'text' : 'password';
  };

  return (
    <input
      className={classNames(
        className,
        'text-neutral-600 dark:text-neutral-150 bg-transparent outline-none w-full px-3',
        styles['input-field'],
      )}
      disabled={disabled}
      type={getInputType()}
      placeholder=" "
      readOnly={readonly}
      aria-invalid={errorMsg !== ''}
      defaultValue={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      required={required}
    />
  );
};

/**
 * Generates a label for the input field. If no children are provided,
 * it uses the input field title.
 *
 * @param className   ('')      The Styling which should be applied to the component.
 *
 * @example <InputField.Label />
 */
const InputLabel: FunctionComponent<LabelProps> = ({ children, className = '' }) => {
  const { disabled, title } = useInputField();

  /**
   * Returns the styling of the button based on the disabled state.
   */
  const getDisabledStyles = () => {
    if (disabled) return 'bg-neutral-150 dark:bg-neutral-700 rounded-md';
    return 'bg-neutral-0 dark:bg-neutral-800';
  };

  return (
    <label
      aria-hidden
      className={classNames(
        getDisabledStyles(),
        ' text-neutral-600 dark:text-neutral-400 absolute pointer-events-none px-3 transition-all',
        styles.label,
        className,
      )}
    >
      {children ? children : title}
    </label>
  );
};

/**
 * Generates an icon for the input field. The password toggle is able
 * to toggle the text visibility of type password.
 *
 * @param className   ('')  The Styling which should be applied to the component.
 * @param icon              The icon type which should get displayed.

 * @example <InputField.Icon icon="password_toggle" />
 */
const InputIcon: FunctionComponent<IconProps> = ({ className = '', icon }) => {
  const iconClasses = classNames(
    'w-7 h-7 text-neutral-600 dark:text-neutral-150',
    className,
    styles.icon,
  );

  switch (icon) {
    case 'key':
      return <KeyIcon className={iconClasses} />;
    case 'mail':
      return <MailIcon className={iconClasses} />;
    case 'search':
      return <SearchIcon className={iconClasses} />;
    default:
      return null;
  }
};

InputField.Label = InputLabel;
InputField.Input = Input;
InputField.Icon = InputIcon;

export default InputField;
