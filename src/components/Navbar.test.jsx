import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';
import '@testing-library/jest-dom';

describe('Navbar Component Tests', () => {
  it('renders logo and application title button', () => {
    const setActiveTabMock = vi.fn();
    render(
      <Navbar 
        activeTab="home" 
        setActiveTab={setActiveTabMock} 
        greenPoints={150} 
        currentBadge="Eco Friendly" 
        darkMode={false} 
        setDarkMode={() => {}} 
      />
    );
    
    const logoButton = screen.getByRole('button', { name: /CarbonWise AI Logo Home/i });
    expect(logoButton).toBeInTheDocument();
    expect(screen.getByText('CarbonWise AI')).toBeInTheDocument();
  });

  it('renders all desktop navigation links and responds to click events', () => {
    const setActiveTabMock = vi.fn();
    render(
      <Navbar 
        activeTab="home" 
        setActiveTab={setActiveTabMock} 
        greenPoints={150} 
        currentBadge="Eco Friendly" 
        darkMode={false} 
        setDarkMode={() => {}} 
      />
    );

    const calcBtn = screen.getByRole('button', { name: 'Calculator' });
    const progressBtn = screen.getByRole('button', { name: 'My Progress' });

    expect(calcBtn).toBeInTheDocument();
    expect(progressBtn).toBeInTheDocument();

    fireEvent.click(calcBtn);
    expect(setActiveTabMock).toHaveBeenCalledWith('calculator');
  });

  it('toggles dark mode when dark mode button is clicked', () => {
    const setDarkModeMock = vi.fn();
    render(
      <Navbar 
        activeTab="home" 
        setActiveTab={() => {}} 
        greenPoints={150} 
        currentBadge="Eco Friendly" 
        darkMode={false} 
        setDarkMode={setDarkModeMock} 
      />
    );

    const toggleBtn = screen.getByLabelText('Switch to Dark Mode');
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(setDarkModeMock).toHaveBeenCalledWith(true);
  });
});
