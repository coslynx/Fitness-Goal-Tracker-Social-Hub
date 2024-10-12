import { useState, ChangeEvent, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { apiClient } from '@shared/utils/api/apiClient';
import { User } from '@shared/utils/types/user';
import { Goal } from '@shared/utils/types/goal';
import { Post } from '@shared/utils/types/post';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';
import { useToast } from '@frontend/app/src/components/organisms/Toast';

interface FormFieldProps<T> {
  label: string;
  type: string;
  placeholder?: string;
  initialValue?: T;
  validationSchema?: any;
  onChange: (value: T) => void;
  error?: string;
}

/**
 * Custom hook for managing form data, validation, and submission.
 *
 * @param {FormFieldProps<T>} props - Props for the form field, including label, type, initial value, validation schema, onChange handler, and error message.
 * @returns {{ value: T; handleChange: (e: ChangeEvent<HTMLInputElement>) => void; handleSubmit: (event: React.FormEvent) => Promise<void>; error: string | null; }} - An object containing the form value, handleChange function, handleSubmit function, and error message.
 */
export const useForm = <T>({ label, type, placeholder, initialValue, validationSchema, onChange, error }: FormFieldProps<T>) => {
  const { data: session } = useSession();
  const [value, setValue] = useState<T>(initialValue || '');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as unknown as T;
    setValue(newValue);
    onChange(newValue);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    // Validate the form data (implement your validation logic here)
    // Example: 
    // if (validationSchema) {
    //   try {
    //     await validationSchema.validate(value);
    //   } catch (error: any) {
    //     setSubmitError(error.message);
    //     showToast({ type: 'error', message: error.message });
    //     return;
    //   }
    // }

    // Send the form data to the backend API (implement your API calls here)
    // Example:
    // try {
    //   const response = await apiClient.post('/users', value);
    //   if (response.status === httpStatusCodes.OK) {
    //     // Handle success
    //   } else {
    //     setSubmitError('Failed to submit form.');
    //     showToast({ type: 'error', message: 'Failed to submit form.' });
    //   }
    // } catch (error: any) {
    //   if (error.response?.status === httpStatusCodes.UNAUTHORIZED) {
    //     showToast({
    //       type: 'error',
    //       message: 'Session expired. Please log in again.',
    //     });
    //     // Redirect to login page (handle this based on your routing implementation)
    //   } else {
    //     setSubmitError('Failed to submit form. Please try again later.');
    //     showToast({
    //       type: 'error',
    //       message: 'Failed to submit form. Please try again later.',
    //     });
    //   }
    //   console.error('Error submitting form:', error);
    // }
  };

  return { value, handleChange, handleSubmit, error: submitError || error };
};