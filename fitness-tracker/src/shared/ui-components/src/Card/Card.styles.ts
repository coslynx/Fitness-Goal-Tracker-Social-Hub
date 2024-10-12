import { tw } from 'tailwind-css';

interface CardStyles {
  base: string;
  primary: string;
  secondary: string;
  hover: string;
  focus: string;
  lg: string;
  sm: string;
}

export const cardStyles: CardStyles = {
  base: tw`
    rounded-md
    shadow-md
    bg-white
    p-4
  `,
  primary: tw`
    bg-primary-500
    text-white
  `,
  secondary: tw`
    bg-secondary-500
    text-white
  `,
  hover: tw`
    shadow-lg
  `,
  focus: tw`
    outline-none
    ring-2
    ring-offset-2
    ring-primary-500
  `,
  lg: tw`
    p-6
  `,
  sm: tw`
    p-2
  `,
};