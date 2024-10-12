import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@shared/ui-components';

describe('Button Component', () => {
  it('should render a Button component with the "primary" variant correctly', () => {
    render(<Button variant="primary">Click Me</Button>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'rounded-md px-4 py-2 text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-600'
    );
  });

  it('should render a Button component with the "secondary" variant correctly', () => {
    render(<Button variant="secondary">Click Me</Button>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'rounded-md px-4 py-2 text-sm font-medium bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-600'
    );
  });

  it('should render a Button component with the "disabled" variant correctly', () => {
    render(<Button variant="disabled">Click Me</Button>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'rounded-md px-4 py-2 text-sm font-medium opacity-50 cursor-not-allowed hover:bg-opacity-50'
    );
    expect(buttonElement).toBeDisabled();
  });

  it('should render a Button component with the "lg" size correctly', () => {
    render(<Button size="lg">Click Me</Button>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'rounded-md px-6 py-3 text-base bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-600'
    );
  });

  it('should render a Button component with the "sm" size correctly', () => {
    render(<Button size="sm">Click Me</Button>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'rounded-md px-3 py-1 text-xs bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-600'
    );
  });

  it('should trigger the onClick callback when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});