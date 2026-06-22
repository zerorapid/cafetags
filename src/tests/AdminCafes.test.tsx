import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminCafes } from '../components/admin/AdminCafes';
import { INITIAL_CAFES } from '../data';
import { ToastProvider } from '../components/ui/ToastContext';
import { vi } from 'vitest';

// Mock Supabase to avoid real network calls
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({
      upsert: vi.fn().mockResolvedValue({ error: null }),
      delete: vi.fn().mockResolvedValue({ error: null }),
    })
  }
}));

describe('AdminCafes Component', () => {
  it('renders the admin dashboard list view', () => {
    render(
      <ToastProvider>
        <AdminCafes cafes={INITIAL_CAFES} setCafes={vi.fn()} />
      </ToastProvider>
    );
    expect(screen.getByText(/Home Listings Vault/i)).toBeInTheDocument();
    expect(screen.getByText('CATALOG NEW CAFE')).toBeInTheDocument();
    expect(screen.getByText('BULK IMPORT CSV')).toBeInTheDocument();
  });

  it('switches to add new cafe form when clicking CATALOG NEW CAFE', () => {
    render(
      <ToastProvider>
        <AdminCafes cafes={INITIAL_CAFES} setCafes={vi.fn()} />
      </ToastProvider>
    );
    
    const addButton = screen.getByText('CATALOG NEW CAFE');
    fireEvent.click(addButton);

    // After clicking, the CafeForm should render
    expect(screen.getByText(/Catalog New Fine Coffee Spot/i)).toBeInTheDocument();
    expect(screen.getByText(/Registry Identity & Coordinates/i)).toBeInTheDocument();
  });
});
