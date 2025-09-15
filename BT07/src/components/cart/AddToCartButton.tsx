import React from 'react';
import { BaseButton } from '../BaseButton';
import { useCart } from '../../cart/CartContext';
import { CartItem } from '../../cart/types';

export interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
  defaultQuantity?: number;
  label?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, defaultQuantity = 1, label = 'Thêm vào giỏ' }) => {
  const { addItem } = useCart();
  return (
    <BaseButton onClick={() => addItem({ ...product, quantity: defaultQuantity })}>
      {label}
    </BaseButton>
  );
};
