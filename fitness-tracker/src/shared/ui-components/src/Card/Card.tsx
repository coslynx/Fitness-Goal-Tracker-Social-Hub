import React, { FC, ReactNode } from 'react';
import { tw } from 'tailwind-css';
import { cardStyles } from './Card.styles';

interface CardProps {
  variant?: 'primary' | 'secondary';
  size?: 'lg' | 'sm';
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  title,
  children,
  className,
  onClick,
}) => {
  const cardClasses = tw(
    `${cardStyles.base} ${cardStyles[variant]} ${cardStyles[size]} ${className}`,
    {
      [cardStyles.hover]: !!onClick,
    }
  );

  return (
    <div className={cardClasses} onClick={onClick}>
      {title && (
        <div className={tw`font-bold text-lg mb-2`}>{title}</div>
      )}
      <div className={tw`text-gray-700`}>{children}</div>
    </div>
  );
};

export default Card;