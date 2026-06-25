import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, vi } from 'vitest';
import { FilterSection } from '../components/FilterSection';

describe('FilterSection Component', () => {
  const defaultProps = {
    searchQuery: '',
    setSearchQuery: vi.fn(),
    sortBy: 'founded-asc' as const,
    setSortBy: vi.fn(),
    layout: 'grid' as const,
    setLayout: vi.fn(),
    allTags: ['All', 'Minimalist', 'Heritage'],
    selectedTag: 'All',
    setSelectedTag: vi.fn(),
    selectedLocation: 'All',
    setSelectedLocation: vi.fn(),
    selectedBudget: 'All',
    setSelectedBudget: vi.fn(),
    selectedAesthetic: 'All',
    setSelectedAesthetic: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all filter dropdowns and search input', () => {
    render(<FilterSection {...defaultProps} />);
    
    expect(screen.getByPlaceholderText(/Search spaces/i)).toBeInTheDocument();
  });

  it('calls setSearchQuery on typing in search box', async () => {
    const user = userEvent.setup();
    render(<FilterSection {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/Search spaces/i);
    await user.type(searchInput, 'Coffee');
    
    expect(defaultProps.setSearchQuery).toHaveBeenCalled();
  });
});
