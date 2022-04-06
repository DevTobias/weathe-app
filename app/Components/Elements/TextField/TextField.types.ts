export type InputFieldProps = {
  className?: string;
  disabled?: boolean;
  errorMsg?: string;
  title?: string;
};

export type InputProps = {
  className?: string;
  type?: 'email' | 'password' | 'text';
  required?: boolean;
  onChange?: (value: string) => void;
  readonly?: boolean;
  value?: string;
};

export type LabelProps = {
  className?: string;
};

export type IconProps = {
  className?: string;
  icon: 'mail' | 'key' | 'search';
};
