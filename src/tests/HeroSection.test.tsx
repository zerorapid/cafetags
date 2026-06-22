import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '../components/HeroSection';
import { INITIAL_CAFES } from '../data';

describe('HeroSection Component', () => {
  it('renders the correct title and subtitle', () => {
    render(<HeroSection cafes={INITIAL_CAFES} onSelectCafe={() => {}} />);
    
    // Check main title
    expect(screen.getByText(/Hyderabad/i)).toBeInTheDocument();
    expect(screen.getByText(/Cafe/i)).toBeInTheDocument();
    
    // Check subtitle
    expect(screen.getByText(/A curated lookbook of standout aesthetic spaces/i)).toBeInTheDocument();
  });
});
