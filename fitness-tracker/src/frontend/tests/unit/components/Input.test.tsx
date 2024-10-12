import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@shared/ui-components';

describe('Input Component', () => {
  it('should render an Input component with a label', () => {
    render(<Input label="Email" type="email" placeholder="Enter your email" />);
    const inputElement = screen.getByLabelText('Email');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(
      'block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5'
    );
  });

  it('should render an Input component with a placeholder', () => {
    render(<Input type="text" placeholder="Enter your name" />);
    const inputElement = screen.getByPlaceholderText('Enter your name');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(
      'block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5'
    );
  });

  it('should render an Input component with a value', () => {
    render(<Input type="text" value="Test Value" />);
    const inputElement = screen.getByDisplayValue('Test Value');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(
      'block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5'
    );
  });

  it('should update the value when onChange is called', () => {
    const handleChange = jest.fn();
    render(<Input type="text" value="Initial Value" onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: 'New Value' } })
    );
  });

  it('should render an Input component as disabled', () => {
    render(<Input type="text" disabled />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(
      'block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5 opacity-50 cursor-not-allowed'
    );
    expect(inputElement).toBeDisabled();
  });

  it('should render an Input component with an error', () => {
    render(<Input type="text" error />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(
      'block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-red-500 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm sm:leading-5'
    );
    expect(screen.getByText('Error: Please check your input.')).toBeInTheDocument();
  });

  it('should render an Input component as read-only', () => {
    render(<Input type="text" readOnly />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(
      'block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5 bg-gray-100'
    );
    expect(inputElement).toBeReadOnly();
  });
});