import { tw } from 'tailwind-css';

export const buttonStyles = {
  base: tw`
    rounded-md
    px-4
    py-2
    text-sm
    font-medium
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
  `,
  primary: tw`
    bg-primary-500
    text-white
    hover:bg-primary-600
    focus:ring-primary-600
  `,
  secondary: tw`
    bg-secondary-500
    text-white
    hover:bg-secondary-600
    focus:ring-secondary-600
  `,
  disabled: tw`
    opacity-50
    cursor-not-allowed
    hover:bg-opacity-50
  `,
  lg: tw`
    px-6
    py-3
    text-base
  `,
  sm: tw`
    px-3
    py-1
    text-xs
  `,
};