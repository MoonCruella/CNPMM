import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, AddToCartButton, CartSummary, CartItemCard, useCart } from '../src';

const ItemsList = () => {
  const { items } = useCart();
  return (
    <div>
      {items.map(i => <CartItemCard key={i.id} item={i} />)}
    </div>
  );
};

describe('Cart basic flow', () => {
  it('adds items and updates quantity', () => {
    render(
      <CartProvider>
        <AddToCartButton product={{ id: 'p1', name: 'Sản phẩm A', price: 1000 }} />
        <AddToCartButton product={{ id: 'p1', name: 'Sản phẩm A', price: 1000 }} />
        <AddToCartButton product={{ id: 'p2', name: 'Sản phẩm B', price: 500 }} />
        <CartSummary />
        <ItemsList />
      </CartProvider>
    );

    // 2 lần thêm p1 => quantity = 2, 1 lần thêm p2
    expect(screen.getByText(/Tổng sản phẩm: 3/)).toBeInTheDocument();
    expect(screen.getByText(/Tạm tính: 2,500/)).toBeInTheDocument();
  });

  it('removes item', () => {
    render(
      <CartProvider>
        <AddToCartButton product={{ id: 'p1', name: 'Sản phẩm A', price: 1000 }} />
        <AddToCartButton product={{ id: 'p2', name: 'Sản phẩm B', price: 500 }} />
        <ItemsList />
      </CartProvider>
    );

    // remove p1
    const removeButtons = screen.getAllByText('Xóa');
    fireEvent.click(removeButtons[0]);

    // p1 removed => only B remains
    expect(screen.queryByText('Sản phẩm A')).toBeNull();
    expect(screen.getByText('Sản phẩm B')).toBeInTheDocument();
  });
});
