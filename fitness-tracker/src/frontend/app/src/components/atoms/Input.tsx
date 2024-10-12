import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { tw } from 'tailwind-css'; // Import Tailwind CSS for styling (version 3.4.13)
import { inputStyles } from './Input.styles'; // Import input styles from the styles file

interface InputProps {
  /** The label for the input field. */
  label?: string;
  /** The type of input field (e.g., 'text', 'email', 'password'). */
  type?: string;
  /** The placeholder text for the input field. */
  placeholder?: string;
  /** The initial value of the input field. */
  value?: string;
  /** Callback function to handle changes to the input value. */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Flag to indicate whether the input field is disabled. */
  disabled?: boolean;
  /** Flag to indicate whether the input field has an error. */
  error?: boolean;
  /** Flag to indicate whether the input field should be read-only. */
  readOnly?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value = '',
  onChange,
  disabled = false,
  error = false,
  readOnly = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange && onChange(e);
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const inputClasses = tw(
    `${inputStyles.base} ${error ? inputStyles.error : ''} ${
      disabled ? inputStyles.disabled : ''
    } ${readOnly ? 'bg-gray-100' : ''}`,
    {
      [inputStyles.lg]: label === 'lg',
      [inputStyles.sm]: label === 'sm',
    }
  );

  return (
    <div className={tw`mb-4`}>
      {label && (
        <label htmlFor="input" className={tw`block font-medium text-gray-700`}>
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        className={inputClasses}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
      />
      {error && (
        <span className={tw`text-red-500`}>Error: Please check your input.</span>
      )}
    </div>
  );
};

export default Input;