import { createContext, useContext, FunctionComponent } from 'react';
import useToggle from '@Hooks/useToggle';

type State = {
  disabled: boolean;
  errorMsg: string;
  title: string;
  passwordVisible: boolean;
  togglePassword: VoidFunction;
};

type InputFieldProviderProps = {
  disabled: boolean;
  errorMsg: string;
  title: string;
};

const InputFieldStateContext = createContext<State | null>(null);

/**
 * The Provider for the input field context, which provides
 * values for input field components.
 *
 * @param disabled  Whether the input field should be disabled or not.
 * @param errorMsg  The displayed error message. No error with empty string.
 * @param title     The title of the input field.
 */
const InputFieldProvider: FunctionComponent<InputFieldProviderProps> = ({
  children,
  disabled,
  errorMsg,
  title,
}) => {
  const [passwordVisible, togglePassword] = useToggle(false);

  return (
    <InputFieldStateContext.Provider
      value={{ disabled, errorMsg, title, passwordVisible, togglePassword }}
    >
      {children}
    </InputFieldStateContext.Provider>
  );
};

/**
 * Wraps around the use context hook for the input field context.
 *
 * @throws useInputField must be used within a InputFieldProvider
 *
 * @returns The current context of the input field.
 */
const useInputField = () => {
  const context = useContext(InputFieldStateContext);

  if (!context) throw new Error('useInputField must be used within a InputFieldProvider');

  return context;
};

export { InputFieldProvider, useInputField };
