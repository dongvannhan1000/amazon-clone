import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header'

// Mock the images to avoid issues with file imports
vi.mock('../assets/images/amazon-logo-white.png', () => ({ default: 'mocked-amazon-logo' }));
vi.mock('../assets/images/amazon-mobile-logo-white.png', () => ({ default: 'mocked-amazon-mobile-logo' }));
vi.mock('../assets/images/icons/search-icon.png', () => ({ default: 'mocked-search-icon' }));
vi.mock('../assets/images/icons/cart-icon.png', () => ({ default: 'mocked-cart-icon' }));

const renderHeader = (props = {}) => {
  return render(
    <BrowserRouter>
      <Header {...props} />
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  it('renders without crashing', () => {
    renderHeader();
    expect(screen.getByAltText('Amazon Logo')).toBeInTheDocument();
  });

  it('displays the correct cart item count', () => {
    renderHeader({ cartItemCount: 5 });
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onSearch when search input changes', () => {
    const mockOnSearch = vi.fn();
    renderHeader({ onSearch: mockOnSearch });
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  it('renders all navigation links', () => {
    renderHeader();
    expect(screen.getByText('Returns')).toBeInTheDocument();
    expect(screen.getByText('& Orders')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('has correct link for logo', () => {
    renderHeader();
    const logoLink = screen.getByAltText('Amazon Logo').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('has correct link for orders', () => {
    renderHeader();
    const ordersLink = screen.getByText('& Orders').closest('a');
    expect(ordersLink).toHaveAttribute('href', '/orders');
  });

  it('has correct link for cart', () => {
    renderHeader();
    const cartLink = screen.getByText('Cart').closest('a');
    expect(cartLink).toHaveAttribute('href', '/checkout');
  });

  it('renders mobile logo', () => {
    renderHeader();
    expect(screen.getByAltText('Amazon Mobile Logo')).toBeInTheDocument();
  });
});