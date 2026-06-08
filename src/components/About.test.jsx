import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from './About';
import '@testing-library/jest-dom';

describe('About Component Tests', () => {
  it('renders the About header and subtitle', () => {
    render(<About />);
    
    const titleElement = screen.getByRole('heading', { name: /About CarbonWise AI/i });
    expect(titleElement).toBeInTheDocument();
    
    const subtitleElement = screen.getByText(/Understanding our impact and moving toward a zero-carbon future/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  it('renders the mission card section', () => {
    render(<About />);
    
    const missionHeading = screen.getByRole('heading', { name: /Our Mission/i });
    expect(missionHeading).toBeInTheDocument();
    expect(screen.getByText(/At CarbonWise AI, we believe that climate action starts with awareness/i)).toBeInTheDocument();
  });

  it('renders the step details for application walkthrough', () => {
    render(<About />);
    
    expect(screen.getByText('Calculate Footprint')).toBeInTheDocument();
    expect(screen.getByText('Learn & Adapt')).toBeInTheDocument();
    expect(screen.getByText('Form New Habits')).toBeInTheDocument();
  });

  it('renders the educational estimate disclaimer warning card', () => {
    render(<About />);
    
    const disclaimerHeading = screen.getByRole('heading', { name: /Educational Estimate Disclaimer/i });
    expect(disclaimerHeading).toBeInTheDocument();
    expect(screen.getByText(/The calculations provided by CarbonWise AI are estimates intended for educational/i)).toBeInTheDocument();
  });
});
