import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Product from './Product';

describe('Product Component', () => {
  const product = {
    id: 1,
    title: 'Product 1',
    price: 10,
    image: 'path/to/image',
    rating: { rate: 4.5, count: 100 }
  };

  const addToCartMock = vi.fn();

  it('renders product details correctly', () => {
    render(<Product product={product} addToCart={addToCartMock} />);


    expect(screen.getByText(`$${product.title}`)).toBeInTheDocument();

 
    expect(screen.getByText('$10.00')).toBeInTheDocument();

    expect(screen.getByText(`${product.rating.count}`)).toBeInTheDocument();


    const productImage = screen.getByAltText(product.title);
    expect(productImage).toBeInTheDocument();
    expect(productImage.src).toContain('path/to/image');
  });

  it('handles quantity change', () => {
    render(<Product product={product} addToCart={addToCartMock} />);

    const quantityInput = screen.getByPlaceholderText('Quantity');
    fireEvent.change(quantityInput, { target: { value: '2' } });

    expect(quantityInput.value).toBe('2');
  });

  it('adds items to cart', () => {
    render(<Product product={product} addToCart={addToCartMock} />);

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(addToCartMock).toHaveBeenCalledWith(product, 1);

    const addedMessage = screen.getByText('Added');
    expect(addedMessage).toBeInTheDocument();
  });

  it('displays the correct star rating image', () => {
    render(<Product product={product} addToCart={addToCartMock} />);


    const ratingImage = screen.getByAltText('Rating stars');
    expect(ratingImage).toBeInTheDocument();
    expect(ratingImage.src).toContain('/rating-45.png'); 
  });
});
