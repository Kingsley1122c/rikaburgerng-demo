import React from 'react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { ROUTES } from '../constants/routes';
import { formatCurrency } from '../utils/formatCurrency';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/ui/Button';
import QuantitySelector from '../components/ui/QuantitySelector';
import Reveal from '../components/common/Reveal';
import './CartPage.css';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const deliveryFee = items.length > 0 ? 1200 : 0;
  const tax = Math.round(cartTotal * 0.075);
  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0;

  const grandTotal = useMemo(
    () => cartTotal + deliveryFee + tax - discount,
    [cartTotal, deliveryFee, tax, discount]
  );

  const applyCoupon = () => {
    setCouponApplied(coupon.trim().toUpperCase() === 'RIKA10');
  };

  return (
    <div className="cart-page">
      <PageHeader title="Your Cart" subtitle="Review your selected meals before checkout." />

      <section className="cart-page-section">
        <Container>
          {items.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              description="Add a meal from our menu to get started."
              action={
                <Button as={Link} to={ROUTES.MENU} className="cart-link-button">
                  Browse Menu
                </Button>
              }
            />
          ) : (
            <div className="cart-layout">
              <Reveal>
                <motion.section className="cart-panel" whileHover={{ y: -2 }}>
                  <div className="cart-list" role="list" aria-label="Cart items">
                    {items.map((item) => (
                      <article key={item.id} className="cart-item" role="listitem">
                        <div>
                          <h2>{item.name}</h2>
                          <p>{formatCurrency(item.price)} each</p>
                        </div>
                        <div className="cart-item-line">
                          <QuantitySelector
                            value={item.quantity}
                            onChange={(value) => updateQuantity(item.id, value)}
                            label={`Quantity for ${item.name}`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            Remove
                          </Button>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="cart-coupon">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(event) => setCoupon(event.target.value)}
                      placeholder="Coupon code (try RIKA10)"
                      aria-label="Coupon code"
                    />
                    <Button type="button" variant="secondary" onClick={applyCoupon}>Apply</Button>
                  </div>

                  <div className="cart-panel-actions">
                    <Button type="button" variant="ghost" onClick={clearCart}>Clear cart</Button>
                  </div>
                </motion.section>
              </Reveal>

              <Reveal delay={0.06}>
                <motion.aside className="cart-summary-panel" whileHover={{ y: -2 }}>
                  <h3>Cart Summary</h3>
                  <ul className="cart-summary-list">
                    <li><span>Subtotal</span><strong>{formatCurrency(cartTotal)}</strong></li>
                    <li><span>Delivery Fee</span><strong>{formatCurrency(deliveryFee)}</strong></li>
                    <li><span>Tax (7.5%)</span><strong>{formatCurrency(tax)}</strong></li>
                    <li><span>Discount</span><strong>-{formatCurrency(discount)}</strong></li>
                  </ul>

                  <div className="cart-grand-total">
                    <span>Grand Total</span>
                    <strong>{formatCurrency(grandTotal)}</strong>
                  </div>

                  <div className="cart-summary-actions">
                    <Button as={Link} to={ROUTES.MENU} variant="ghost">Continue Shopping</Button>
                    <Button as={Link} to={ROUTES.CHECKOUT} variant="secondary">Proceed to Checkout</Button>
                  </div>
                </motion.aside>
              </Reveal>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default CartPage;
