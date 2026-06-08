import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from './Footer';
import '@testing-library/jest-dom';

describe('Footer Component Tests', () => {
  it('renders branding and copyright information', () => {
    const setActiveTabMock = vi.fn();
    render(<Footer setActiveTab={setActiveTabMock} />);
    
    expect(screen.getByText('CarbonWise AI')).toBeInTheDocument();
    expect(screen.getByText(/Developed for PromptWars Challenge 3/i)).toBeInTheDocument();
  });

  it('renders navigation buttons and responds to tab change events', () => {
    const setActiveTabMock = vi.fn();
    render(<Footer setActiveTab={setActiveTabMock} />);
    
    const homeBtn = screen.getByRole('button', { name: 'Home' });
    const calcBtn = screen.getByRole('button', { name: 'Calculator' });
    const chalBtn = screen.getByRole('button', { name: 'Challenges' });
    const abtBtn = screen.getByRole('button', { name: 'About' });

    expect(homeBtn).toBeInTheDocument();
    expect(calcBtn).toBeInTheDocument();
    expect(chalBtn).toBeInTheDocument();
    expect(abtBtn).toBeInTheDocument();

    // Trigger clicks
    fireEvent.click(homeBtn);
    expect(setActiveTabMock).toHaveBeenCalledWith('home');

    fireEvent.click(calcBtn);
    expect(setActiveTabMock).toHaveBeenCalledWith('calculator');

    fireEvent.click(chalBtn);
    expect(setActiveTabMock).toHaveBeenCalledWith('challenges');

    fireEvent.click(abtBtn);
    expect(setActiveTabMock).toHaveBeenCalledWith('about');
  });

  it('renders the external links with correct URLs and accessibility attributes', () => {
    const setActiveTabMock = vi.fn();
    render(<Footer setActiveTab={setActiveTabMock} />);

    const githubLink = screen.getByLabelText('GitHub Repository');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/devanshmittal3/carbonwise-ai');
    expect(githubLink).toHaveAttribute('target', '_blank');

    const hack2skillLink = screen.getByLabelText('Hack2Skill Website');
    expect(hack2skillLink).toBeInTheDocument();
    expect(hack2skillLink).toHaveAttribute('href', 'https://hack2skill.com');
  });
});
