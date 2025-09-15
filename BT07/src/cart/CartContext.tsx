import React, { createContext, useContext, useReducer, useMemo, ReactNode } from 'react';
import { cartReducer, initialCartState } from './reducer';
import { CartContextValue, CartItem } from './types';

const CartContext = createContext<CartContextValue | undefined>(undefined);

export interface CartProviderProps {
  children: ReactNode;
  currency?: string;
  initialItems?: CartItem[];
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, currency = 'VND', initialItems = [] }) => {
  const [state, dispatch] = useReducer(cartReducer, { ...initialCartState, currency, items: initialItems });

  const value: CartContextValue = useMemo(() => {
    const addItem: CartContextValue['addItem'] = (item) => {
      const quantity = item.quantity ?? 1;
      dispatch({ type: 'ADD_ITEM', item: { ...item, quantity } });
    };
    const removeItem: CartContextValue['removeItem'] = (id) => dispatch({ type: 'REMOVE_ITEM', id });
    const updateQuantity: CartContextValue['updateQuantity'] = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
    const clear: CartContextValue['clear'] = () => dispatch({ type: 'CLEAR' });
    const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);

    return { ...state, addItem, removeItem, updateQuantity, clear, totalItems, subtotal };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart phải dùng bên trong CartProvider');
  return ctx;
}
