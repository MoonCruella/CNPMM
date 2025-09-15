import React from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/base.css';
import { CartProvider, AddToCartButton, CartItemCard, useCart, CartSummary } from '../src';

// Vertical product list
const ProductList: React.FC = () => (
  <div className="stack">
    <div className="card" style={{ padding:0 }}>
      <div className="card-body" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
        <div style={{ flex:1 }}><strong>Áo thun</strong><div style={{ fontSize:12, opacity:.7 }}>120.000 đ</div></div>
        <AddToCartButton product={{ id: 'a', name: 'Áo thun', price: 120000 }} label="Thêm" />
      </div>
    </div>
    <div className="card" style={{ padding:0 }}>
      <div className="card-body" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
        <div style={{ flex:1 }}><strong>Quần jean</strong><div style={{ fontSize:12, opacity:.7 }}>350.000 đ</div></div>
        <AddToCartButton product={{ id: 'b', name: 'Quần jean', price: 350000 }} label="Thêm" />
      </div>
    </div>
    <div className="card" style={{ padding:0 }}>
      <div className="card-body" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
        <div style={{ flex:1 }}><strong>Mũ lưỡi trai</strong><div style={{ fontSize:12, opacity:.7 }}>90.000 đ</div></div>
        <AddToCartButton product={{ id: 'c', name: 'Mũ lưỡi trai', price: 90000 }} label="Thêm" />
      </div>
    </div>
    <div className="card" style={{ padding:0 }}>
      <div className="card-body" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
        <div style={{ flex:1 }}><strong>Áo khoác</strong><div style={{ fontSize:12, opacity:.7 }}>540.000 đ</div></div>
        <AddToCartButton product={{ id: 'd', name: 'Áo khoác', price: 540000 }} label="Thêm" />
      </div>
    </div>
  </div>
);

const VerticalCartItems: React.FC = () => {
  const { items } = useCart();
  if (!items.length) return <p style={{ opacity:.7 }}>Chưa có sản phẩm trong giỏ.</p>;
  return <div className="stack">{items.map(i => <CartItemCard key={i.id} item={i} />)}</div>;
};

const CartSection: React.FC = () => (
  <div className="stack" style={{ paddingTop: 8 }}>
    <div className="card">
      <div className="card-header">Sản phẩm demo</div>
      <div className="card-body" style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <ProductList />
      </div>
    </div>

    <div className="card">
      <div className="card-header">Giỏ hàng</div>
      <div className="card-body">
        <VerticalCartItems />
      </div>
    </div>

    <CartSummary orientation="horizontal" title="Tóm tắt" />
  </div>
);

const App: React.FC = () => (
  <CartProvider>
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px 80px' }}>
      <h1 style={{ marginTop:0, marginBottom:24, letterSpacing:.5 }}>Playground Cart UI</h1>
      <CartSection />
    </div>
  </CartProvider>
);

createRoot(document.getElementById('root')!).render(<App />);
