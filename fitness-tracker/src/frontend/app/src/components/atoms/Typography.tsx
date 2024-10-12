import React from 'react';
import { tw } from 'tailwind-css'; // Import Tailwind CSS for styling (version 3.4.13)
import { typographyStyles } from './Typography.styles'; // Import typography styles from the styles file

interface TypographyProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body'
    | 'label'
    | 'textSm'
    | 'textLg'
    | 'textXl'
    | 'text2Xl'
    | 'text3Xl'
    | 'text4Xl'
    | 'text5Xl'
    | 'text6Xl'
    | 'text7Xl'
    | 'text8Xl'
    | 'text9Xl';
  align?: 'center' | 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  align = 'left',
  className,
  children,
}) => {
  const typographyClasses = tw(
    `${typographyStyles.body} ${typographyStyles[variant]} ${typographyStyles[`text${align}`]} ${className}`,
    {
      [typographyStyles.fontBold]:
        variant === 'h1' ||
        variant === 'h2' ||
        variant === 'h3' ||
        variant === 'h4' ||
        variant === 'h5' ||
        variant === 'h6',
    }
  );

  return <span className={typographyClasses}>{children}</span>;
};

export default Typography;