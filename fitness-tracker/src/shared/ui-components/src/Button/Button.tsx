import React, { ButtonHTMLAttributes } from 'react';
import { tw } from 'tailwind-css';
import { buttonStyles } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'disabled';
  size?: 'lg' | 'sm';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  onClick,
  ...rest
}) => {
  const buttonClasses = tw(
    `${buttonStyles.base} ${buttonStyles[variant]} ${buttonStyles[size]} ${className}`,
    {
      [buttonStyles.disabled]: disabled,
    }
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;