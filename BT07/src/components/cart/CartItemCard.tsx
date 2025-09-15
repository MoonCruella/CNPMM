import React from 'react';
import { CartItem } from '../../cart/types';
import { BaseButton } from '../BaseButton';
import { TextInput } from '../TextInput';
import { useCart } from '../../cart/CartContext';
import '../../styles/base.css';

export interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  return (
    <div className="cart-item-card" style={{ padding:'10px 0' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, width:'100%' }}>
        <div style={{ flex:1, minWidth:140 }} className="cart-item-name">{item.name}</div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <TextInput
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
            style={{ width: 70 }}
            aria-label="Số lượng"
          />
        </div>
        <div style={{ width:90, textAlign:'right', whiteSpace:'nowrap' }} className="cart-item-price">{item.price.toLocaleString()} đ</div>
        <BaseButton variant="danger" size="sm" onClick={() => removeItem(item.id)}>Xóa</BaseButton>
      </div>
    </div>
  );
};
