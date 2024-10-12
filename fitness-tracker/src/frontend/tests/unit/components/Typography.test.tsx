import { render, screen } from '@testing-library/react';
import { Typography } from '@shared/ui-components';

describe('Typography Component', () => {
  it('should render a Typography component with the "body" variant correctly', () => {
    render(<Typography>This is body text.</Typography>);
    const typographyElement = screen.getByText('This is body text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-base font-normal');
  });

  it('should render a Typography component with the "h1" variant correctly', () => {
    render(<Typography variant="h1">This is a heading.</Typography>);
    const typographyElement = screen.getByText('This is a heading.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-4xl font-bold');
  });

  it('should render a Typography component with the "h2" variant correctly', () => {
    render(<Typography variant="h2">This is a subheading.</Typography>);
    const typographyElement = screen.getByText('This is a subheading.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-3xl font-bold');
  });

  it('should render a Typography component with the "h3" variant correctly', () => {
    render(<Typography variant="h3">This is a smaller heading.</Typography>);
    const typographyElement = screen.getByText('This is a smaller heading.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-2xl font-bold');
  });

  it('should render a Typography component with the "h4" variant correctly', () => {
    render(<Typography variant="h4">This is an even smaller heading.</Typography>);
    const typographyElement = screen.getByText('This is an even smaller heading.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-xl font-bold');
  });

  it('should render a Typography component with the "h5" variant correctly', () => {
    render(<Typography variant="h5">This is a small heading.</Typography>);
    const typographyElement = screen.getByText('This is a small heading.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-lg font-bold');
  });

  it('should render a Typography component with the "h6" variant correctly', () => {
    render(<Typography variant="h6">This is a very small heading.</Typography>);
    const typographyElement = screen.getByText('This is a very small heading.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-base font-bold');
  });

  it('should render a Typography component with the "label" variant correctly', () => {
    render(<Typography variant="label">This is a label.</Typography>);
    const typographyElement = screen.getByText('This is a label.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-sm font-medium');
  });

  it('should render a Typography component with the "textSm" variant correctly', () => {
    render(<Typography variant="textSm">This is small text.</Typography>);
    const typographyElement = screen.getByText('This is small text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-sm');
  });

  it('should render a Typography component with the "textLg" variant correctly', () => {
    render(<Typography variant="textLg">This is large text.</Typography>);
    const typographyElement = screen.getByText('This is large text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-lg');
  });

  it('should render a Typography component with the "textXl" variant correctly', () => {
    render(<Typography variant="textXl">This is extra-large text.</Typography>);
    const typographyElement = screen.getByText('This is extra-large text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-xl');
  });

  it('should render a Typography component with the "text2Xl" variant correctly', () => {
    render(<Typography variant="text2Xl">This is extra-extra-large text.</Typography>);
    const typographyElement = screen.getByText('This is extra-extra-large text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-2xl');
  });

  it('should render a Typography component with the "text3Xl" variant correctly', () => {
    render(<Typography variant="text3Xl">This is extra-extra-extra-large text.</Typography>);
    const typographyElement = screen.getByText('This is extra-extra-extra-large text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-3xl');
  });

  it('should render a Typography component with the "text4Xl" variant correctly', () => {
    render(<Typography variant="text4Xl">This is extra-extra-extra-extra-large text.</Typography>);
    const typographyElement = screen.getByText('This is extra-extra-extra-extra-large text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-4xl');
  });

  it('should render a Typography component with the "text5Xl" variant correctly', () => {
    render(<Typography variant="text5Xl">This is extra-extra-extra-extra-extra-large text.</Typography>);
    const typographyElement = screen.getByText('This is extra-extra-extra-extra-extra-large text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-5xl');
  });

  it('should render a Typography component with the "text6Xl" variant correctly', () => {
    render(<Typography variant="text6Xl">This is extra-extra-extra-extra-extra-extra-large text.</Typography>);
    const typographyElement = screen.getByText('This is extra-extra-extra-extra-extra-extra-large text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-6xl');
  });

  it('should render a Typography component with the "text7Xl" variant correctly', () => {
    render(<Typography variant="text7Xl">This is extra-extra-extra-extra-extra-extra-extra-large text.</Typography>);
    const typographyElement = screen.getByText('This is extra-extra-extra-extra-extra-extra-extra-large text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-7xl');
  });

  it('should render a Typography component with the "text8Xl" variant correctly', () => {
    render(<Typography variant="text8Xl">This is extra-extra-extra-extra-extra-extra-extra-extra-large text.</Typography>);
    const typographyElement = screen.getByText('This is extra-extra-extra-extra-extra-extra-extra-extra-large text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-8xl');
  });

  it('should render a Typography component with the "text9Xl" variant correctly', () => {
    render(<Typography variant="text9Xl">This is extra-extra-extra-extra-extra-extra-extra-extra-extra-large text.</Typography>);
    const typographyElement = screen.getByText('This is extra-extra-extra-extra-extra-extra-extra-extra-extra-large text.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-9xl');
  });

  it('should render a Typography component with the "center" alignment correctly', () => {
    render(<Typography align="center">This text is centered.</Typography>);
    const typographyElement = screen.getByText('This text is centered.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-center');
  });

  it('should render a Typography component with the "left" alignment correctly', () => {
    render(<Typography align="left">This text is left-aligned.</Typography>);
    const typographyElement = screen.getByText('This text is left-aligned.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-left');
  });

  it('should render a Typography component with the "right" alignment correctly', () => {
    render(<Typography align="right">This text is right-aligned.</Typography>);
    const typographyElement = screen.getByText('This text is right-aligned.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-right');
  });

  it('should render a Typography component with custom className correctly', () => {
    render(<Typography className="my-custom-class">This text has a custom class.</Typography>);
    const typographyElement = screen.getByText('This text has a custom class.');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('my-custom-class');
  });
});