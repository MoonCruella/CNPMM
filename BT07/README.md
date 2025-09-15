# @bt07/cart-ui

Thư viện React đơn giản cung cấp chức năng Giỏ hàng (thêm / sửa số lượng / xóa / clear) kèm các component UI chuẩn hóa (Button, Input, Modal, Card, CartItemCard, CartSummary, AddToCartButton).

## Tính năng chính
- Context + hook `useCart` (ADD / UPDATE / REMOVE / CLEAR)
- Component UI tối giản có thể tùy biến bằng CSS variable
- Hỗ trợ ESM + CJS + Type declarations
- Playground nội bộ (Vite) để thử nhanh: `npm run play`

## Cài đặt
```bash
npm install @bt07/cart-ui
```
Peer dependencies: `react >=18`, `react-dom >=18`.

## Sử dụng nhanh
```tsx
import { CartProvider, AddToCartButton, CartItemCard, CartSummary, useCart } from '@bt07/cart-ui';

const Demo = () => {
  const { items } = useCart();
  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Sản phẩm</h2>
      <AddToCartButton product={{ id: 'p1', name: 'Sản phẩm A', price: 120000 }} />
      <AddToCartButton product={{ id: 'p2', name: 'Sản phẩm B', price: 80000 }} />

      <h2>Giỏ hàng</h2>
      {items.map(i => <CartItemCard key={i.id} item={i} />)}
      <CartSummary />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <Demo />
    </CartProvider>
  );
}
```

## API
### CartProvider
Props:
- `currency?: string` (mặc định 'VND')
- `initialItems?: CartItem[]`

### useCart()
Trả về:
- `items: CartItem[]`
- `addItem(item)` thêm mới hoặc cộng dồn số lượng
- `removeItem(id)`
- `updateQuantity(id, quantity)`
- `clear()`
- `totalItems: number`
- `subtotal: number`
- `currency?: string`

### Component UI
| Component | Props chính | Ghi chú |
|-----------|-------------|--------|
| `BaseButton` | `variant`, `size`, `loading` | size: sm|md|lg |
| `TextInput` | `label`, ...input props | Có style focus ring |
| `Modal` | `open`, `onClose`, `title`, `footer` | Backdrop blur |
| `Card` | `title`, `footer`, `children` | Hover elevation |
| `CartItemCard` | `item` | Editable quantity + remove |
| `CartSummary` | `showClear`, `currencyPosition`, `format`, `title` | Hiển thị tổng quan |
| `AddToCartButton` | `product`, `defaultQuantity`, `label` | Wrapper button |

### CartSummary Props chi tiết
- `showClear?: boolean` (mặc định true)
- `currencyPosition?: 'left' | 'right'` (mặc định 'right')
- `format?: (value:number)=>string` custom format tiền tệ
- `title?: string`

## Theming / Thiết kế
Dùng CSS variables trong `:root`:
```css
:root {
  --color-primary: #2563eb;
  --color-danger: #dc2626;
  --radius-md: 8px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.08);
  /* ... */
}
```
Ghi đè bằng cách thêm file CSS của bạn trước khi import component hoặc override sau:
```css
:root { --color-primary: #8b5cf6; }
```
Dark mode tự động dựa theo `prefers-color-scheme: dark` (có thể tắt bằng cách override selector).

## Build
```bash
npm run build
```
Đầu ra trong `dist/`.

## Playground
```bash
npm run play
```
Mở: http://localhost:5173

## Test
```bash
npm test
```

## Mở rộng gợi ý
- LocalStorage persistence
- Coupon / giảm giá
- Đa tiền tệ & định dạng chuẩn quốc tế
- i18n (react-intl / lingui)
- Kiểm thử thêm edge cases (giá âm, quantity 0)

## License
MIT
