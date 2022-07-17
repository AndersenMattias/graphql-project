import '../../../styles/components/_button.scss';

interface IButtonProps {
  colour: string;
  text?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  id?: string;
}

const STYLES: Array<string> = [
  'btn--cancel',
  'btn--icon',
  'btn--primary',
  'btn--warning',
  'btn--danger',
  'btn--success',
  'btn--dark',
  'btn--primary--outline',
  'btn--warning--outline',
  'btn--danger--outline',
  'btn--success--outline',
];

const Button = ({
  disabled,
  text,
  type,
  onClick,
  colour,
  children,
  id,
}: IButtonProps) => {
  const checkButtonStyle = STYLES.includes(colour) ? colour : STYLES[0];

  return (
    <button
      disabled={disabled}
      className={`btn ${checkButtonStyle}`}
      onClick={onClick}
      type={type}
      id={id}
    >
      {text}
      {children}
    </button>
  );
};
export default Button;
