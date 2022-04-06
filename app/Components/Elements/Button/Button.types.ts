export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: VoidFunction;
  type?: 'submit' | 'button' | 'reset';
  variant?: 'text' | 'contained' | 'outlined';
};

export type LabelProps = {
  className?: string;
  hidden?: boolean;
};
