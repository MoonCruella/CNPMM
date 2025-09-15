import React from 'react';
import { useCart } from '../../cart/CartContext';
import '../../styles/base.css';
import { BaseButton } from '../BaseButton';

export interface CartSummaryProps {
  showClear?: boolean;
  currencyPosition?: 'left' | 'right';
  format?: (value: number) => string;
  className?: string;
  title?: string;
  /** orientation = 'horizontal' chỉ thay đổi layout trình bày thống kê (không ảnh hưởng cart items) */
  orientation?: 'vertical' | 'horizontal';
}

const defaultFormat = (v: number) => v.toLocaleString();

export const CartSummary: React.FC<CartSummaryProps> = ({
  showClear = true,
  currencyPosition = 'right',
  format = defaultFormat,
  className = '',
  title = 'Tổng quan giỏ hàng',
  orientation = 'vertical'
}) => {
  const { subtotal, totalItems, currency, clear, items } = useCart();
  const formatted = format(subtotal);
  const priceStr = currencyPosition === 'left'
    ? `${currency} ${formatted}`
    : `${formatted} ${currency}`;

  return (
    <div className={`card ${className}`.trim()}>
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="cart-summary" style={orientation === 'horizontal' ? { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '18px' } : undefined}>
          <div><strong>Tổng sản phẩm:</strong> {totalItems}</div>
          <div><strong>Tạm tính:</strong> {priceStr}</div>
        </div>
      </div>
      <div className="card-footer" style={{ display: 'flex', gap: 8, justifyContent: 'flex-start', alignItems: 'center' }}>
        {showClear && items.length > 0 && (
          <BaseButton variant="secondary" size="sm" onClick={clear}>Xóa hết</BaseButton>
        )}
      </div>
    </div>
  );
};
