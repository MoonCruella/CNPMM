export interface CartItem {
  id: string;
  name: string;
  price: number; // đơn giá
  quantity: number; // số lượng
  image?: string;
  metadata?: Record<string, any>;
}

export interface CartState {
  items: CartItem[];
  currency?: string;
}

export type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'CLEAR' };

export interface CartContextValue extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
}
