import { tw } from 'tailwind-css'; // Import Tailwind CSS for styling

interface InputStyles {
  base: string;
  error: string;
  disabled: string;
  lg: string;
  sm: string;
}

export const inputStyles: InputStyles = {
  base: tw`
    block
    w-full
    px-3
    py-2
    text-gray-900
    placeholder-gray-500
    border
    border-gray-300
    rounded-md
    focus:outline-none
    focus:ring-blue-500
    focus:border-blue-500
    sm:text-sm
    sm:leading-5
    `,
  error: tw`
    border-red-500
    focus:ring-red-500
    focus:border-red-500
    `,
  disabled: tw`
    opacity-50
    cursor-not-allowed
    `,
  lg: tw`
    px-4
    py-3
    text-base
    `,
  sm: tw`
    px-3
    py-2
    text-sm
    `,
};