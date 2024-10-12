import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { tw } from 'tailwind-css'; // Import Tailwind CSS for styling (version 3.4.13)
import { InputProps } from '@shared/ui-components/src/Input/Input.types'; // Import type definition for InputProps
import { Typography } from '@shared/ui-components'; // Import Typography component from shared ui-components
import { Input } from '@shared/ui-components'; // Import Input component from shared ui-components

interface FormFieldProps extends InputProps {
  /** The label for the form field. */
  label: string;
  /** Flag to indicate whether the form field has an error. */
  error?: boolean;
}

/**
 * Reusable form field component that combines a label, input, and error display.
 *
 * @param {FormFieldProps} props - The props for the FormField component.
 * @returns {JSX.Element} The rendered FormField component.
 */
const FormField: React.FC<FormFieldProps> = ({ label, error = false, ...inputProps }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const labelClasses = tw(
    'block font-medium text-gray-700',
    {
      'text-red-500': error && !isFocused, // Red label if error and not focused
    }
  );

  const inputClasses = tw(
    'block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5',
    {
      'border-red-500 focus:ring-red-500 focus:border-red-500': error && isFocused, // Red border if error and focused
    }
  );

  return (
    <div className={tw`mb-4`}>
      <label htmlFor="input" className={labelClasses}>
        {label}
      </label>
      <Input
        ref={inputRef}
        className={inputClasses}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...inputProps}
      />
      {error && (
        <Typography variant="textSm" className={tw`text-red-500`}>
          Error: Please check your input.
        </Typography>
      )}
    </div>
  );
};

export default FormField;