import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { tw } from 'tailwind-css'; // Import Tailwind CSS for styling (version 3.4.13)
import { buttonStyles } from './Button.styles'; // Import button styles from the styles file

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The text to display inside the button. */
  children: ReactNode;
  /** The variant of the button (e.g., 'primary', 'secondary', 'disabled'). */
  variant?: 'primary' | 'secondary' | 'disabled';
  /** The size of the button (e.g., 'lg', 'sm'). */
  size?: 'lg' | 'sm';
  /** Additional CSS classes to apply to the button. */
  className?: string;
  /** Flag to indicate whether the button is disabled. */
  disabled?: boolean;
  /** Callback function to handle button clicks. */
  onClick?: () => void;
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