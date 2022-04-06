import { useState } from 'react';

/**
 * Helper hook to stateful toggle a boolean on or off.
 *
 * @param initial The initial value of the switch.
 *
 * @returns The boolean as first and the toggle function as second arg.
 */
const useToggle = (initial: boolean) => {
  const [value, setValue] = useState(initial);
  const toggleValue = () => setValue(!value);
  return [value, toggleValue] as const;
};

export default useToggle;
